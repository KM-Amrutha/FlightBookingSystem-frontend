import React, { useEffect, useState } from "react";
import useAuthForm from "../../hooks/userAuthForm";
// import { SignState } from "../../types/authTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate, useLocation } from "react-router-dom";
import SignInForm from "../../components/user-authentication/SignInForm";

import SignUpForm from "../../components/user-authentication/SignUpForm";
import ProviderSignUpForm from "../../components/user-authentication/SignUpFormProvider";

const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialMode: "sign in" | "sign up" | "provider" =
    location.pathname === "/sign-in"
      ? "sign in"
      : location.pathname === "/sign-up"
      ? "sign up"
      : location.pathname === "/provider-sign-up"
      ? "provider"
      : "sign up";

  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  const { handleUserAuth, handleProviderAuth } = useAuthForm(
    mode === "provider" ? "sign up" : mode
  );

  const { user, provider, admin } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) navigate("/welcome");
    else if (provider) navigate("/provider/dashboard");
    else if (admin) navigate("/admin/dashboard");
  }, [user, provider, admin, navigate]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/sign-in") setMode("sign in");
    else if (path === "/sign-up") setMode("sign up");
    else if (path === "/provider-sign-up") setMode("provider");
    else setMode("sign up");
  }, [location.pathname]);

  const toggleUser = () => {
    if (mode === "sign in") navigate("/sign-up");
    else navigate("/sign-in");
  };

  const goProvider = () => navigate("/provider-sign-up");

  const goUser = () => navigate("/sign-up");

  if (mode === "sign in") {
    return (
      <>
        <SignInForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={handleUserAuth}
          onToggleAuth={toggleUser}
        />
        <div className="text-center mt-4 text-sm">
          <button className="text-blue-600" onClick={goUser}>
            New user? Sign Up
          </button>
          {" | "}
          <button className="text-blue-600" onClick={goProvider}>
            Provider? Register
          </button>
        </div>
      </>
    );
  } else if (mode === "sign up") {
    return (
      <>
        <SignUpForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={handleUserAuth}
          onToggleAuth={toggleUser}
        />
        <div className="text-center mt-4 text-sm">
          <button className="text-blue-600" onClick={toggleUser}>
            Already have an account? Sign In
          </button>
          {" | "}
          <button className="text-blue-600" onClick={goProvider}>
            Provider? Register
          </button>
        </div>
      </>
    );
  } else {
    // provider
    return (
      <>
        <ProviderSignUpForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formik={handleProviderAuth}
          onToggleAuth={goUser}
        />
        <div className="text-center mt-4 text-sm">
          <button className="text-blue-600" onClick={goUser}>
            Passenger? Create Account
          </button>
        </div>
      </>
    );
  }
};

export default AuthPage;
