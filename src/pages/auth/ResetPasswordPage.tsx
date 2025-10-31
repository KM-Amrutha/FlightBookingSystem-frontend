import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResetPasswordForm from "../../components/user-authentication/ResetPasswordForm";
import useResetPasswordForm from "../../hooks/useResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  
  const { handleResetPasswordForm, handleGoBack } = useResetPasswordForm();

  
  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <ResetPasswordForm
      formik={handleResetPasswordForm}
      onGoBack={handleGoBack}
    />
  );
};

export default ResetPasswordPage;
