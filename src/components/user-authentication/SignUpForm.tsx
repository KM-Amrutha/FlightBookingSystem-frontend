import React from 'react';
import { FormikProps } from 'formik';
import { UserAuthFormData } from '../../types/authTypes';


interface SignUpFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  formik: FormikProps<UserAuthFormData>;
  onToggleAuth: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  showPassword,
  setShowPassword,
  formik,
  onToggleAuth
}) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-base">
            Join AirTicket Booking to start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                  formik.touched.firstName && formik.errors.firstName
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-slate-900'
                }`}
                placeholder="Enter first name"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                  formik.touched.lastName && formik.errors.lastName
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-slate-900'
                }`}
                placeholder="Enter last name"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {formik.errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-slate-900'
              }`}
              placeholder="Enter email address"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-black mb-2">
              mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                formik.touched.mobile && formik.errors.mobile
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-slate-900'
              }`}
              placeholder="Enter 10-digit mobile number"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.mobile}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-lg text-black bg-white placeholder-gray-400 transition-colors focus:outline-none focus:ring-3 focus:ring-slate-900/10 ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-slate-900'
                }`}
                placeholder="Create password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.password}
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
                Creating Account...
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button 
              onClick={onToggleAuth}
              className="text-slate-900 font-semibold hover:underline transition-colors"
            >
              Sign In
            </button>
          </p>
          
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          
          <p className="text-gray-600 text-sm">
            Are you an airline provider?{' '}
            <button 
              className="text-blue-600 font-semibold hover:underline transition-colors"
            >
              Register as Provider
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
