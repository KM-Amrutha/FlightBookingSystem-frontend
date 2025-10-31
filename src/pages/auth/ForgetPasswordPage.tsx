import React from "react";
import ForgotPasswordForm from "../../components/user-authentication/ForgotPasswordForm";
import useForgotPasswordForm from "../../hooks/useFrogotpasswordForm";

const ForgotPasswordPage: React.FC = () => {
  const { handleForgotPasswordForm, handleGoBack } = useForgotPasswordForm();

  return (
    <ForgotPasswordForm
      formik={handleForgotPasswordForm}
      onGoBack={handleGoBack}
    />
  );
};

export default ForgotPasswordPage;
