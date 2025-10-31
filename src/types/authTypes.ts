export type SignState = "sign in" | "sign up";

export interface UserAuthFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
}

export interface ProviderAuthFormData {
    companyName: string;
    email: string;
    password: string;
    mobile: string;
    address?: string;
    logoUrl?: string;  
    airlineCode: string;
  establishmentYear?: number;
  typeOfOperation?: string;
  registrationCertificateUrl?: string;
  insuranceProofUrl?: string;
  headquartersAddress?: string;
  countryOfOperation?: string;
  websiteUrl?: string;
  ceoName?: string;
  officeContactNumber?: string;
 
   

}