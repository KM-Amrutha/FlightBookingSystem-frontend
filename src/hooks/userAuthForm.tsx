import { useFormik, FormikProps } from "formik";
import {
  userAuthValidationSchema,
  providerAuthValidationSchema
} from "../utils/validationSchema";
import {
  UserAuthFormData,
  ProviderAuthFormData,
  SignState
} from "../types/authTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signinUser,
  signupUser,
  signupProvider
} from "../redux/auth/authThunk";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { AppDispatch } from "../redux/store";
import {
  setUser,
  setAdmin,
  setProvider,
  setOtp
} from "../redux/auth/authSlice";

interface UseAuthFormReturn {
  handleUserAuth: FormikProps<UserAuthFormData>;
  handleProviderAuth: FormikProps<ProviderAuthFormData>;
}

const useAuthForm = (formState: SignState = "sign in"): UseAuthFormReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleUserAuth = useFormik<UserAuthFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: ""
    },
    validationSchema: userAuthValidationSchema(formState),
    onSubmit: async (values) => {

       console.log('🔴 FORM SUBMITTED!'); // ADD THIS FIRST
  console.log('📋 Form values:', values); 
  console.log('📊 Form state:', formState); 
      try {
        if (formState === "sign up") {
          const response = await dispatch(signupUser({ userData: values })).unwrap();
          
          const expiryTime = new Date(Date.now() + 60000).toISOString();
          dispatch(setOtp({
            email: values.email,
            countDown: 60,
            expiryTime,
            is_verified: false
          }));
          showSuccessToast(response.message);
          handleUserAuth.resetForm();
          navigate("/verify-otp");
        } else {
          console.log('🔵 ENTERING SIGN-IN BRANCH');
           

          const response = await dispatch(
            signinUser({ email: values.email, password: values.password })
          ).unwrap();
          localStorage.setItem("accessToken", response.data.accessToken);
          const role = response.data.userData.role;
          if (role === "user") dispatch(setUser(response.data.userData));
          if (role === "provider") dispatch(setProvider(response.data.userData));
          if (role === "admin") dispatch(setAdmin(response.data.userData));
          showSuccessToast(`Welcome back ${response.data.userData.firstName}`);
          handleUserAuth.resetForm();

           console.log('About to navigate to welcome...');

           
          // navigate(
          //   role === "user"
          //     ? "/user/dashboard"
          //     : role === "provider"
          //     ? "/provider/dashboard"
          //     : "/admin/dashboard"
          // );
          navigate("/welcome")

           console.log(' Navigation called');
        }
      } catch (error: any) {

          console.log('🔴 ERROR in form submission:', error);
        showErrorToast(error.message || "Authentication failed");
      }
    }
  });

  const handleProviderAuth = useFormik<ProviderAuthFormData>({
    initialValues: {
      companyName: "",
      email: "",
      mobile: "",
      password: "",
      airlineCode: "",
      
    },
    validationSchema: providerAuthValidationSchema(formState),
    onSubmit: async (values) => {
      try {
  
        const response = await dispatch(
          signupProvider({
            companyName: values.companyName,
            email: values.email,
            mobile: values.mobile,
            password: values.password,
            airlineCode: values.airlineCode 
          
          })
        ).unwrap();
        const expiryTime = new Date(Date.now() + 60000).toISOString();
        dispatch(setOtp({
          email: values.email,
          countDown: 60,
          expiryTime,
          is_verified: false
        }));
        showSuccessToast(response.message);
        handleProviderAuth.resetForm();
        navigate("/verify-otp");
      } catch (error: any) {
        showErrorToast(error.message || "Provider registration failed");
      }
    }
  });

  useEffect(() => {
    handleUserAuth.setErrors({});
    handleProviderAuth.setErrors({});
  }, [formState]);

  return { handleUserAuth, handleProviderAuth };
};

export default useAuthForm;
