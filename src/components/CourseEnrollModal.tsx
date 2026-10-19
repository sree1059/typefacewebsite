import React, { useState } from 'react';
import { X, Check, AlertCircle, ShieldCheck, Lock, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import {
  loadRazorpayScript,
  createServerOrder,
  verifyServerPayment,
  VerificationResponse,
} from '../utils/razorpay';

export interface CourseData {
  id: string;
  title: string;
  priceInr: number;
  duration: string;
  badge?: string;
  description: string;
  deliverables: string[];
}

interface CourseEnrollModalProps {
  course: CourseData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseEnrollModal: React.FC<CourseEnrollModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Flow states: 'idle' | 'initiating' | 'checkout_open' | 'verifying' | 'success' | 'error' | 'cancelled'
  const [paymentStatus, setPaymentStatus] = useState<
    'idle' | 'initiating' | 'checkout_open' | 'verifying' | 'success' | 'error' | 'cancelled'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifiedDetails, setVerifiedDetails] = useState<VerificationResponse | null>(null);

  if (!isOpen || !course) return null;

  const handleClose = () => {
    if (paymentStatus === 'verifying' || paymentStatus === 'initiating') return;
    setPaymentStatus('idle');
    setErrorMessage(null);
    setVerifiedDetails(null);
    onClose();
  };

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please provide your full name and email address.');
      return;
    }

    setErrorMessage(null);
    setPaymentStatus('initiating');

    try {
      // 1. Ensure client SDK is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load Razorpay Checkout script. Check your internet connection.');
      }

      // 2. Create Order on Server API
      const order = await createServerOrder({
        courseId: course.id,
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
      });

      setPaymentStatus('checkout_open');

      // 3. Launch Razorpay Standard Checkout Popup
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Typeface Growth Systems',
        description: `Enrollment: ${course.title}`,
        order_id: order.orderId,
        prefill: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          contact: formData.phone.trim(),
        },
        notes: {
          courseId: course.id,
          customerName: formData.name.trim(),
          customerEmail: formData.email.trim(),
        },
        theme: {
          color: '#0B132B',
        },
        modal: {
          ondismiss: () => {
            console.log('Customer closed Razorpay checkout popup without completing.');
            setPaymentStatus('cancelled');
          },
        },
        // Frontend callback only forwards tokens to server for cryptographic verification
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          setPaymentStatus('verifying');

          try {
            // 4. Server-side verification (NEVER trust frontend callback alone)
            const verification = await verifyServerPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course.id,
              customerName: formData.name.trim(),
              customerEmail: formData.email.trim(),
            });

            if (verification.verified) {
              setVerifiedDetails(verification);
              setPaymentStatus('success');
            } else {
              throw new Error(verification.error || 'Payment signature could not be verified by server.');
            }
          } catch (verifyErr: any) {
            console.error('Payment verification failed:', verifyErr);
            setPaymentStatus('error');
            setErrorMessage(
              verifyErr.message ||
                'Payment verification failed on the server. If money was deducted, our team will review your order ID.'
            );
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on('payment.failed', (failedResponse: any) => {
        console.error('Razorpay payment failed:', failedResponse);
        setPaymentStatus('error');
        setErrorMessage(
          failedResponse.error?.description ||
            failedResponse.error?.reason ||
            'Payment transaction failed or was declined by bank.'
        );
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error('Error in payment flow:', err);
      setPaymentStatus('error');
      setErrorMessage(
        err.message || 'Unable to initialize checkout. Please ensure server credentials are configured.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-black/10 shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-7 border-b border-black/10 bg-[#FAFAFA]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-black/60 font-medium block">
              Enrollment Checkout · Razorpay Standard
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] font-manrope tracking-tight mt-0.5">
              {course.title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            disabled={paymentStatus === 'initiating' || paymentStatus === 'verifying'}
            className="p-2 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors disabled:opacity-30 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {/* SUCCESS STATE */}
          {paymentStatus === 'success' && verifiedDetails ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-medium border border-emerald-200 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Server Verified Payment
                </span>
                <h4 className="text-2xl font-bold text-black font-manrope">
                  Enrollment Confirmed!
                </h4>
                <p className="text-sm text-black/70 mt-1 max-w-sm mx-auto font-light">
                  Welcome to <strong>{course.title}</strong>. A confirmation receipt has been generated.
                </p>
              </div>

              {/* Receipt details block */}
              <div className="bg-[#F8FAFC] border border-black/10 rounded-2xl p-4 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between text-black/70">
                  <span>Payment ID:</span>
                  <span className="font-semibold text-black">{verifiedDetails.paymentId}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Order ID:</span>
                  <span className="font-semibold text-black">{verifiedDetails.orderId}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Amount Paid:</span>
                  <span className="font-semibold text-emerald-700">₹{course.priceInr.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Student Email:</span>
                  <span className="font-semibold text-black">{verifiedDetails.customerEmail}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  style={{
                    background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                    color: '#000000',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                  }}
                  className="w-full py-3.5 px-6 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ENROLLMENT FORM & PROCESSING STATES */
            <div>
              {/* Price Callout */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F0FDF4] border border-emerald-200/60 mb-5">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-medium block">
                    Course Fee (One-Time)
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-manrope">
                    ₹{course.priceInr.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-medium">
                  {course.duration}
                </span>
              </div>

              {/* Status alerts */}
              {errorMessage && (
                <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">Checkout Notice</p>
                    <p className="mt-0.5 opacity-90">{errorMessage}</p>
                  </div>
                </div>
              )}

              {paymentStatus === 'cancelled' && (
                <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl flex items-center justify-between">
                  <span>Checkout was closed. You can retry whenever you're ready.</span>
                  <button
                    type="button"
                    onClick={() => setPaymentStatus('idle')}
                    className="font-mono underline text-xs font-semibold ml-2 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <form onSubmit={handleStartPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={paymentStatus === 'initiating' || paymentStatus === 'verifying'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm disabled:bg-black/5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                    Email Address * (For course access)
                  </label>
                  <input
                    type="email"
                    required
                    disabled={paymentStatus === 'initiating' || paymentStatus === 'verifying'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm disabled:bg-black/5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    disabled={paymentStatus === 'initiating' || paymentStatus === 'verifying'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-black text-sm disabled:bg-black/5"
                  />
                </div>

                {/* Secure Trust indicators */}
                <div className="pt-2 flex items-center justify-between text-xs text-black/60 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-bit SSL Encrypted
                  </span>
                  <span>Razorpay Standard</span>
                </div>

                {/* Submit / Pay Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={paymentStatus === 'initiating' || paymentStatus === 'verifying'}
                    style={{
                      background: 'linear-gradient(110deg, #55DCFF 0%, #69F9B0 50%, #FFE600 100%)',
                      color: '#000000',
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 600,
                    }}
                    className="w-full py-3.5 px-6 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {paymentStatus === 'initiating' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Initializing Secure Order...</span>
                      </>
                    ) : paymentStatus === 'verifying' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Verifying Payment with Server...</span>
                      </>
                    ) : paymentStatus === 'error' ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-black" />
                        <span>Retry Payment (₹{course.priceInr.toLocaleString('en-IN')})</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Pay ₹{course.priceInr.toLocaleString('en-IN')}</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollModal;
