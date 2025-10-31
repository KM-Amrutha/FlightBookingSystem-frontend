// components/user-authentication/ResetPasswordForm.tsx
import React from 'react';
import { FormikProps } from 'formik';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  formik: FormikProps<ResetPasswordFormData>;
  onGoBack: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  formik,
  onGoBack
}) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-base">
            Create a new password for your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-slate-900'
              }`}
              placeholder="Enter new password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-slate-900'
              }`}
              placeholder="Confirm new password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold text-base hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 mt-6"
          >
            {formik.isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Resetting Password...
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-3">
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          
          <button 
            onClick={onGoBack}
            className="text-slate-900 font-semibold hover:underline transition-colors text-sm"
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
