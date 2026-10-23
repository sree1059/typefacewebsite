# Secure Razorpay + Supabase Integration via Vercel Serverless Functions

This document outlines the architecture, database schema, serverless API design, and security controls for integrating Razorpay payments into your React + Vite + Supabase project.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **No application source files have been changed yet.** Please review this plan, the database schema migration, and the list of files to modify. Once you approve by clicking **Proceed**, the integration will be implemented systematically.

- **Confirmed Decision 1 (Server-Authoritative Pricing)**: The browser will never pass payment amounts or currency to the server. The client sends only the `invoice_id` and the user's Supabase session token. The server validates user ownership and reads the amount directly from your Supabase database.
- **Confirmed Decision 2 (Strict Secrets Isolation)**: `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, and `SUPABASE_SERVICE_ROLE_KEY` will exist strictly in server-side Vercel environment variables. The browser only ever sees `VITE_RAZORPAY_KEY_ID` (public key for the checkout modal) and `VITE_SUPABASE_ANON_KEY`.
- **Confirmed Decision 3 (Idempotency & Reconciling Webhook)**: We implement two layers of payment capture: immediate client return verification and an asynchronous Razorpay webhook (`/api/webhook`). Both write to an idempotent `webhook_events` table and update the invoice atomically so duplicate callbacks never cause double-processing.

---

## 1. Overview & Core Concept

### What It Delivers
A production-grade, secure billing and invoice payment flow:
1. **Invoice Checkout View**: Displays the client's invoice details (invoice number, line items, amount, currency, and payment status) fetched via Supabase with Row Level Security (RLS).
2. **Server-Side Order Creation (`/api/create-order`)**: Authenticates the user via Supabase JWT, verifies invoice ownership, queries the authoritative amount, creates a Razorpay Order, and binds `razorpay_order_id` to the invoice record.
3. **Razorpay Standard Checkout Modal**: Opens the trusted Razorpay payment popup using `VITE_RAZORPAY_KEY_ID`.
4. **Server-Side Signature Verification (`/api/verify-payment`)**: Cryptographically validates the HMAC SHA-256 signature using `RAZORPAY_KEY_SECRET` with `crypto.timingSafeEqual` before marking the invoice as `paid`.
5. **Idempotent Webhook (`/api/webhook`)**: Handles `payment.captured`, `order.paid`, and `payment.failed` events sent directly from Razorpay's servers, verifying webhook signatures and updating invoice records even if the client closes their browser mid-checkout.

---

## 2. Technical Architecture & Data Strategy

### System Architecture & Data Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Client-Side)                         │
│  - React + Vite SPA                                                    │
│  - Supabase Client (VITE_SUPABASE_ANON_KEY)                            │
│  - Razorpay Standard Checkout SDK (VITE_RAZORPAY_KEY_ID)               │
└──────────────┬──────────────────────────────────────────▲──────────────┘
               │                                          │
       1. POST /api/create-order                  4. Open Checkout Modal
          (Bearer JWT, invoice_id)                   (order_id, public key)
               │                                          │
               ▼                                          │
┌─────────────────────────────────────────────────────────┴──────────────┐
│                    VERCEL SERVERLESS FUNCTIONS (/api)                  │
│                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────┐ │
│  │   /api/create-order   │  │  /api/verify-payment  │  │/api/webhook │ │
│  └───────────┬───────────┘  └───────────┬───────────┘  └──────┬──────┘ │
│              │                          │                     │        │
│     Validates Auth &           Verifies HMAC SHA-256     Validates     │
│     reads DB amount            using KEY_SECRET          Webhook Sig   │
│              │                          │                     │        │
│              ▼                          ▼                     ▼        │
│    ┌──────────────────┐       ┌──────────────────────────────────┐     │
│    │  Razorpay API    │       │     Supabase Service Role        │     │
│    │  (orders.create) │       │     (Atomic DB Updates)          │     │
│    └──────────────────┘       └─────────────────┬────────────────┘     │
└─────────────────────────────────────────────────┼──────────────────────┘
                                                  │
                                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE (PostgreSQL + RLS)                     │
│  - auth.users (Authentication)                                         │
│  - public.invoices (Invoice metadata, amount, currency, status)        │
│  - public.payments (Audit log: payment_id, order_id, signature, method)│
│  - public.webhook_events (Idempotency deduplication log)               │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema & RLS Policies (Missing Schema Report)

Your repository currently contains `src/lib/supabase.ts` configured for authentication, but no invoice or payment tables. We provide the following SQL migration script to run in your Supabase SQL Editor:

```sql
-- 1. Create Enums for Invoice & Payment Lifecycle
CREATE TYPE invoice_status AS ENUM ('draft', 'pending', 'paid', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('created', 'authorized', 'captured', 'failed', 'refunded');

-- 2. Invoices Table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  status invoice_status NOT NULL DEFAULT 'pending',
  razorpay_order_id TEXT UNIQUE,
  paid_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Payments Audit Table (Record of every verified transaction)
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT NOT NULL UNIQUE,
  razorpay_signature TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  status payment_status NOT NULL DEFAULT 'captured',
  payment_method TEXT,
  verified_via TEXT NOT NULL, -- 'client_signature' OR 'webhook'
  raw_response JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Webhook Events Table (Ensures Strict Idempotency)
CREATE TABLE public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL UNIQUE, -- Razorpay event ID (e.g. event_00000000000001)
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies: Clients can ONLY read their own invoices and payments
CREATE POLICY "Users can view their own invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own payments"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

-- Webhook events and service updates are restricted to Service Role (server-side only)
CREATE POLICY "Service role full access to invoices"
  ON public.invoices FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to payments"
  ON public.payments FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access to webhook_events"
  ON public.webhook_events FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

---

## 4. Environment Variables Report

Add the following variables to your environment:

### In `.env.local` (Local Development) & Vercel Project Settings (Production)

| Variable Name | Environment | Purpose | Client-Safe? |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Client & Server | Supabase project endpoint URL | **YES** |
| `VITE_SUPABASE_ANON_KEY` | Client & Server | Browser-safe Supabase publishable key | **YES** |
| `VITE_RAZORPAY_KEY_ID` | Client & Server | Public Key ID for Razorpay Checkout popup | **YES** |
| `RAZORPAY_KEY_ID` | Server-side only | Server credential for Razorpay API | **NO (Secret)** |
| `RAZORPAY_KEY_SECRET` | Server-side only | Used to generate orders and verify HMAC signatures | **NO (Secret)** |
| `RAZORPAY_WEBHOOK_SECRET` | Server-side only | Secret used to verify webhook signatures | **NO (Secret)** |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only | Bypasses RLS on server to verify & update invoice status atomically | **NO (Secret)** |

> [!WARNING]
> Never prefix `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, or `SUPABASE_SERVICE_ROLE_KEY` with `VITE_`. Vite embeds any variable starting with `VITE_` directly into the client JavaScript bundle.

---

## 5. Detailed List of Files to Modify & Create

### 1. `api/lib/supabaseServer.ts` (New Server Helper)
- **Role**: Server-side Supabase client initialized with `SUPABASE_SERVICE_ROLE_KEY`.
- **Purpose**: Authenticates client Bearer JWT tokens via `supabaseServer.auth.getUser(token)` to verify the customer, and performs atomic, administrative database updates.

### 2. `api/create-order.ts` (Modified Vercel Serverless Function)
- **Role**: Upgrades the order generation logic to accept `{ invoiceId }` and Bearer JWT.
- **Workflow**:
  1. Validates the caller's JWT token against Supabase Auth.
  2. Queries `public.invoices` where `id = invoiceId AND user_id = authUser.id`.
  3. Verifies invoice is in `'pending'` or `'draft'` state.
  4. Derives amount in paise (`Math.round(invoice.amount * 100)`) and currency directly from the database record.
  5. Calls `razorpay.orders.create({ amount, currency, receipt, notes })`.
  6. Updates `public.invoices` setting `razorpay_order_id = order.id`.
  7. Returns `{ success: true, orderId: order.id, amount, currency, keyId }` to the client.

### 3. `api/verify-payment.ts` (Modified Vercel Serverless Function)
- **Role**: Serverless endpoint for client payment signature verification.
- **Workflow**:
  1. Receives `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`, and client JWT.
  2. Cryptographically calculates `HMAC-SHA256(order_id + "|" + payment_id, RAZORPAY_KEY_SECRET)`.
  3. Validates using `crypto.timingSafeEqual` (prevents timing attacks).
  4. Validates that the invoice associated with `razorpay_order_id` belongs to the authenticated user.
  5. Executes an idempotent, atomic status update:
     - If invoice is already `'paid'`, returns success immediately.
     - Else marks invoice as `'paid'`, sets `paid_at = NOW()`, and inserts a record in `public.payments`.

### 4. `api/webhook.ts` (New Vercel Serverless Webhook Handler)
- **Role**: Razorpay server-to-server webhook endpoint for reconciliation.
- **Workflow**:
  1. Reads raw HTTP body buffer.
  2. Validates `X-Razorpay-Signature` against `RAZORPAY_WEBHOOK_SECRET` using `Razorpay.validateWebhookSignature(rawBody, signature, secret)`.
  3. Checks `public.webhook_events` for `event.id` to prevent duplicate processing.
  4. Inserts `event.id` into `public.webhook_events`.
  5. Handles `payment.captured` / `order.paid`: Finds the invoice matching `order_id` and marks it `'paid'` atomically, logging the payment in `public.payments`.
  6. Responds with `{ status: 'ok' }` and HTTP 200 within 2 seconds.

### 5. `src/utils/razorpay.ts` (Updated Client Utility)
- **Role**: Updated client utility functions.
- **Additions**:
  - `createInvoiceOrder(invoiceId, token)`
  - `verifyInvoicePayment({ invoiceId, razorpay_order_id, razorpay_payment_id, razorpay_signature }, token)`
  - Reusable Razorpay modal launcher hook.

### 6. `src/components/InvoicePaymentModal.tsx` (New Client UI Component)
- **Role**: Modern, accessible payment modal matching the Typeface design system.
- **Features**: Displays invoice breakdown, handles checkout initialization, shows real-time payment states (processing, verifying, success checkmark, or failure explanation with retry).

### 7. `.env.example` (Updated Configuration Reference)
- **Role**: Documents all required environment variables with dummy placeholder values and instructions.

---

## 6. Test-Mode Checklist & Verification Guide

Once approved and implemented, test the integration with this step-by-step checklist:

1. **Prerequisites Verification**:
   - [ ] Run the SQL migration in Supabase SQL editor.
   - [ ] Insert a sample pending invoice row in `public.invoices`.
   - [ ] Set `RAZORPAY_KEY_ID` (starts with `rzp_test_`), `RAZORPAY_KEY_SECRET`, and `SUPABASE_SERVICE_ROLE_KEY` in environment.

2. **Test Flow 1 — Successful Payment**:
   - [ ] Log in as the user owning the invoice.
   - [ ] Open the Invoice Checkout modal.
   - [ ] Click **Pay with Razorpay**.
   - [ ] In the Razorpay popup, select **Netbanking** (e.g. HDFC / SBI) or **Card** with test card credentials:
     - Card Number: `4012 0000 0000 0002` (Visa test card)
     - Expiry: Any future date (e.g. `12/28`)
     - CVV: `123`
     - OTP: `123456`
   - [ ] Verify success screen displays with Payment ID and Order ID.
   - [ ] Inspect database: `public.invoices.status` is now `'paid'`, and a row exists in `public.payments`.

3. **Test Flow 2 — Payment Failure / Bank Decline**:
   - [ ] Trigger payment modal with test card `4012 0000 0000 0005` (Declined Card).
   - [ ] Verify modal captures the bank decline gracefully, displays friendly error message, and invoice remains `'pending'`.

4. **Test Flow 3 — Asynchronous Webhook Reconciliation**:
   - [ ] Use Razorpay Dashboard > Settings > Webhooks > **Send Test Webhook** pointing to `/api/webhook`.
   - [ ] Send `payment.captured` event.
   - [ ] Verify `200 OK` response, and check `public.webhook_events` has recorded the event.
   - [ ] Resend the same event: verify the endpoint recognizes it as a duplicate and returns `200 OK` without duplicating database rows.

---

Please review this implementation plan. Once you are ready, click **Proceed** (or reply to confirm) and I will begin the implementation.
