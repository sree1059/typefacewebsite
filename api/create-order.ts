import type { IncomingMessage, ServerResponse } from 'http';
import Razorpay from 'razorpay';

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

// Course catalog prices in INR (server-authoritative pricing)
const COURSE_CATALOG: Record<string, { title: string; priceInr: number }> = {
  'nextjs-growth-eng': {
    title: 'Next.js & Full-Stack Growth Engineering',
    priceInr: 4999, // ₹4,999
  },
  'ai-agent-automation': {
    title: 'AI Automations & Chatbot Architecture',
    priceInr: 5999, // ₹5,999
  },
  'llm-discovery-seo': {
    title: 'SEO, AEO & LLM Discovery Engine Playbook',
    priceInr: 3499, // ₹3,499
  },
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
    // Parse body if raw stream or express body
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

    const { courseId, customerName, customerEmail, customerPhone } = body || {};

    if (!courseId || !COURSE_CATALOG[courseId]) {
      return res.status(400).json({
        error: `Invalid course selection. Available courses: ${Object.keys(COURSE_CATALOG).join(', ')}`,
      });
    }

    if (!customerEmail || !customerName) {
      return res.status(400).json({
        error: 'Customer name and email are required to generate an enrollment order.',
      });
    }

    const selectedCourse = COURSE_CATALOG[courseId];
    const amountInPaise = selectedCourse.priceInr * 100; // Razorpay expects amount in paise (1 INR = 100 paise)

    // Retrieve server-side credentials
    const key_id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return res.status(500).json({
        error: 'Razorpay credentials not configured on the server.',
        message:
          'Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment variables (Vercel Project Settings / .env).',
        missingCredentials: true,
      });
    }

    // Initialize Razorpay server instance
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    // Create unique receipt identifier
    const sanitizedCourseId = courseId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    const receipt = `rcpt_${sanitizedCourseId}_${Date.now().toString().slice(-8)}`;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        courseId,
        courseTitle: selectedCourse.title,
        customerName: String(customerName).slice(0, 50),
        customerEmail: String(customerEmail).slice(0, 50),
        customerPhone: String(customerPhone || '').slice(0, 20),
        platform: 'Typeface Growth Systems',
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
      courseTitle: selectedCourse.title,
      priceInr: selectedCourse.priceInr,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      error: 'Failed to create payment order with Razorpay.',
      details: error?.message || String(error),
    });
  }
}
