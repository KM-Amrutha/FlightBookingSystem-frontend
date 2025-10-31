import React, { useRef, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { FormikProps } from 'formik';

interface OtpFormData {
  otp: string[];
}

interface OtpFormProps {
  formik: FormikProps<OtpFormData>;
  email: string;
  countDown: number;
  isResending: boolean;
  onResendOtp: () => void;
  onGoBack: () => void;
  otpType?: 'signup' | 'forgotPassword'; 
}

const OtpForm: React.FC<OtpFormProps> = ({
  formik,
  email,
  countDown,
  isResending,
  onResendOtp,
  onGoBack,
  otpType = 'signup' 
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // DYNAMIC TEXT BASED ON CONTEXT
  const getTexts = () => {
    if (otpType === 'forgotPassword') {
      return {
        title: "Verify Reset Code",
        subtitle: "We've sent a 6-digit reset code to",
        buttonText: "Verify & Continue",
        backButtonText: "← Back to Email Entry"
      };
    }
    return {
      title: "Verify Your Account",
      subtitle: "We've sent a 6-digit code to",
      buttonText: "Verify OTP",
      backButtonText: "← Back to Sign Up"
    };
  };

  const texts = getTexts();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue('otp', newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            {texts.title}
          </h1>
          <p className="text-gray-600 text-base mb-3">
            {texts.subtitle}
          </p>
          <p className="text-black font-semibold text-base mb-4">
            {email}
          </p>
          
          {/* Countdown Timer */}
          {countDown > 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-blue-600 text-sm font-semibold">
                Time remaining: {formatTime(countDown)}
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-500 text-sm font-semibold">
                OTP expired. Please request a new one.
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* OTP Input Fields */}
          <div>
            <label className="block text-sm font-medium text-black mb-4 text-center">
              Enter 6-Digit Verification Code
            </label>
            <div className="flex justify-center space-x-3 mb-4">
              {formik.values.otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`
                    w-12 h-12 text-center text-xl font-bold text-black
                    border-2 rounded-lg bg-white placeholder-gray-400 
                    transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10
                    ${formik.errors.otp ? 'border-red-500 focus:border-red-500' : 
                      digit ? 'border-slate-900 bg-slate-50 focus:border-slate-900' : 'border-gray-300 focus:border-slate-900'
                    }
                  `}
                  disabled={formik.isSubmitting || countDown === 0}
                />
              ))}
            </div>

            {/* Error Message */}
            {formik.errors.otp && (
              <p className="text-red-500 text-xs mt-2 font-medium text-center">
                Please enter a valid 6-digit OTP
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={
              formik.isSubmitting || 
              formik.values.otp.some(digit => !digit) || 
              countDown === 0
            }
            className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold text-base hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-6"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              texts.buttonText
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-gray-600 text-sm">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={onResendOtp}
              disabled={isResending || countDown > 0}
              className={`font-semibold transition-colors ${
                countDown > 0 || isResending
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-slate-900 hover:underline'
              }`}
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </button>
          </p>
          
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          
          <button 
            onClick={onGoBack}
            className="text-slate-900 font-semibold hover:underline transition-colors text-sm"
          >
            {texts.backButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
