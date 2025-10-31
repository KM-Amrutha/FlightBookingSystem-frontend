import { SignState } from "../types/authTypes";
import * as Yup from 'yup';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;
const mobileRegex = /^[0-9]{10}$/;
const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/;

export const userAuthValidationSchema = (formState: SignState) => {
  return Yup.object({
    firstName:
      formState === "sign up"
        ? Yup.string()
            .matches(nameRegex, "*Name can only contain letters and spaces")
            .required("*First name is required")
        : Yup.string(),

    lastName:
      formState === "sign up"
        ? Yup.string()
            .matches(nameRegex, "*Name can only contain letters and spaces")
            .required("*Last name is required")
        : Yup.string(),

    ...emailValidationSchema.fields,

    password: Yup.string()
      .matches(
        passwordRegex,
        "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
      )
      .required("*Password is required"),
      
     mobile: formState === "sign up"
      ? Yup.string()
          .matches(mobileRegex, "*mobile number must be 10 digits")
          .required("*mobile number is required")
      : Yup.string(), 
  });
};
export const emailValidationSchema = Yup.object({
  email: Yup.string()
    .matches(emailRegex, "*Invalid email format")
    .required("*Email is required"),
});

export const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .matches(
      passwordRegex,
      "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
    )
    .required("*Password is required"),
});

export const changePasswordValidationSchema = () => {
  return Yup.object({
    password: Yup.string()
      .matches(
        passwordRegex,
        "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
      )
      .required("*Password is required"),

    newPassword: Yup.string()
      .matches(
        passwordRegex,
        "*Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character"
      )
      .required("*New password is required"),

  });
};

export const providerAuthValidationSchema = (formState: SignState) =>{

 return Yup.object({
  companyName: formState === "sign up"
  ?  Yup.string()
    .min(2, "*Company name must be at least 2 characters")
    .required("*Company name is required"): Yup.string(),

  email: Yup.string()
    .matches(emailRegex, "*Invalid email format")
    .required("*Email is required"),

    mobile: formState === "sign up"
      ? Yup.string()
          .matches(mobileRegex, "*Mobile number must be 10 digits")
          .required("*Mobile number is required")
      : Yup.string(),

  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Password is required"),

  airlineCode:formState === "sign up" 
  ? Yup.string()
    .min(2, "*Airline code must be at least 2 characters")
    .max(6, "*Airline code cannot exceed 6 characters")
    .required("*Airline code is required"): Yup.string(),

  logoUrl: Yup.string().matches(urlRegex, "*Invalid URL").nullable(),

  registrationCertificateUrl: Yup.string()
    .matches(urlRegex, "*Invalid URL")
    .nullable(),

  insuranceProofUrl: Yup.string()
    .matches(urlRegex, "*Invalid URL")
    .nullable(),

  establishmentYear: Yup.number()
    .min(1900, "*Year must be valid")
    .max(new Date().getFullYear(), "*Year cannot be in the future")
    .nullable(),

  licenseExpiryDate: Yup.date()
    .min(new Date(), "*License expiry date must be in the future")
    .nullable(),

  headquartersAddress: Yup.string().nullable(),

  countryOfOperation: Yup.string().nullable(),

  typeOfOperation: Yup.string().nullable(),

  websiteUrl: Yup.string().matches(urlRegex, "*Invalid URL").nullable(),

  ceoName: Yup.string().nullable(),

  officeContactNumber: Yup.string()
    .matches(mobileRegex, "*Contact number must be 10 digits")
    .nullable(),

  // isActive: Yup.boolean().required(),

  // isVerified: Yup.boolean().required(),
});
};

export const imageSchema = Yup.mixed()
  .notRequired()
  .test(
    "fileSize",
    "File size too large. Maximum size is 1MB",
    (value: any) => value && value.size <= 1 * 1024 * 1024
  )
  .test(
    "fileFormat",
    "Unsupported file format. Allowed formats: jpg, jpeg, png",
    (value: any) => {
      if (!value) return false;
      const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
      return supportedFormats.includes(value.type);
    }
  );
  export const pdfSchema = Yup.mixed()
  .notRequired()
  .test(
    "fileSize",
    "File size too large. Maximum size is 5MB",
    (value: any) => value && value.size <= 5 * 1024 * 1024
  )
  .test(
    "fileFormat",
    "Unsupported file format. Only PDF files are allowed",
    (value: any) => {
      if (!value) return false;
      const supportedFormats = ["application/pdf"];
      return supportedFormats.includes(value.type);
    }
  );