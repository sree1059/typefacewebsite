import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

// Type definitions for Vercel Serverless Function & Express compatibility
type VercelRequest = IncomingMessage & {
  body?: any;
  query?: Record<string, string | string[]>;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
  send: (body: any) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON request body' });
      }
    }

    if (!body && typeof (req as any).on === 'function') {
      const buffers = [];
      for await (const chunk of req as any) {
        buffers.push(chunk);
      }
      const raw = Buffer.concat(buffers).toString('utf-8');
      if (raw) {
        body = JSON.parse(raw);
      }
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      customerEmail,
      customerName,
    } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Missing required Razorpay payment confirmation parameters.',
      });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
      return res.status(500).json({
        success: false,
        verified: false,
        error: 'Server configuration error: RAZORPAY_KEY_SECRET is missing.',
      });
    }

    // Generate expected signature using HMAC SHA-256
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(payload)
      .digest('hex');

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(generated_signature),
      Buffer.from(razorpay_signature)
    );

    if (!isSignatureValid) {
      console.warn(
        `[Razorpay Signature Verification Failed] Order: ${razorpay_order_id}, Payment: ${razorpay_payment_id}`
      );
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Invalid payment signature. Verification failed.',
      });
    }

    // Payment successfully verified by server
    console.info(
      `[Razorpay Payment Verified] Order: ${razorpay_order_id}, Payment: ${razorpay_payment_id}, Customer: ${customerEmail}`
    );

    return res.status(200).json({
      success: true,
      verified: true,
      message: 'Payment signature verified successfully by server.',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      courseId,
      customerEmail,
      customerName,
      verifiedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error during Razorpay payment verification:', error);
    return res.status(500).json({
      success: false,
      verified: false,
      error: 'An unexpected server error occurred during verification.',
      details: error?.message || String(error),
    });
  }
}
