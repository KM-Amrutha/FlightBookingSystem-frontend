// src/components/provider-authentication/ProviderSignUpForm.tsx
import React from "react";
import { FormikProps } from "formik";
import { ProviderAuthFormData } from "../../types/authTypes";

interface ProviderSignUpFormProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  formik: FormikProps<ProviderAuthFormData>;
  onToggleAuth: () => void;
}

const ProviderSignUpForm: React.FC<ProviderSignUpFormProps> = ({
  showPassword,
  setShowPassword,
  formik,
  onToggleAuth
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Skylife
            </h1>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Partner with us?
            </h2>
            <p className="text-lg font-medium text-slate-700 mb-6">
              Register here!
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl">
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              {/* Company Name */}
              <div>
                <input
                  type="text"
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Name"
                  className="w-full px-6 py-3 rounded-full text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <p className="text-red-300 text-xs mt-1 ml-4">
                    {formik.errors.companyName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                  className="w-full px-6 py-3 rounded-full text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-300 text-xs mt-1 ml-4">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Airline Code */}
              <div>
                <input
                  type="text"
                  name="airlineCode"
                  value={formik.values.airlineCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Airline Code"
                  className="w-full px-6 py-3 rounded-full text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {formik.touched.airlineCode && formik.errors.airlineCode && (
                  <p className="text-red-300 text-xs mt-1 ml-4">
                    {formik.errors.airlineCode}
                  </p>
                )}
              </div>

              {/* mobile */}
              <div>
                <input
                  type="tel"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Mobile"
                  className="w-full px-6 py-3 rounded-full text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-red-300 text-xs mt-1 ml-4">
                    {formik.errors.mobile}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                  className="w-full px-6 py-3 pr-12 rounded-full text-center placeholder-gray-500 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-300 text-xs mt-1 ml-4">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                   onClick={() => {
    console.log('🟡 PROVIDER SUBMIT CLICKED!');
    console.log('🟦 Formik errors:', formik.errors);
    console.log('🟦 Formik values:', formik.values);
    console.log('🟦 Formik isValid:', formik.isValid);
  }}
                  disabled={formik.isSubmitting}
                  className="w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold transition-colors duration-200 disabled:bg-gray-400"
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-3">
                <p className="text-white">
                  Already a partner?{" "}
                  <button
                    type="button"
                    onClick={onToggleAuth}
                    className="underline text-green-400 hover:text-green-300 font-medium"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image - FIXED PATH */}
    <div 
  className="w-1/2 min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-orange-600"
  style={{
    backgroundImage: "url('/image/image1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
</div>
    </div>
  );
};

export default ProviderSignUpForm;
