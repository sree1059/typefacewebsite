// Razorpay Client SDK Utility for Typeface Website

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export interface RazorpayOrderResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  courseTitle: string;
  priceInr: number;
}

export interface VerificationResponse {
  success: boolean;
  verified: boolean;
  orderId?: string;
  paymentId?: string;
  courseId?: string;
  customerEmail?: string;
  customerName?: string;
  verifiedAt?: string;
  message?: string;
  error?: string;
}

/**
 * Dynamically loads the Razorpay Standard Checkout SDK script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      return resolve(false);
    }

    if (window.Razorpay) {
      return resolve(true);
    }

    const existingScript = document.getElementById('razorpay-checkout-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay Checkout SDK script.');
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

/**
 * Creates an order on the server-side API endpoint
 */
export const createServerOrder = async (payload: {
  courseId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}): Promise<RazorpayOrderResponse> => {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || data.message || 'Failed to initialize payment order on server.');
  }

  return data;
};

/**
 * Submits the payment response to the server for cryptographic signature verification
 */
export const verifyServerPayment = async (payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  courseId: string;
  customerName: string;
  customerEmail: string;
}): Promise<VerificationResponse> => {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.verified) {
    throw new Error(data.error || 'Server failed to verify payment signature.');
  }

  return data;
};
