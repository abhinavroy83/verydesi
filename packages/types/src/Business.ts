export interface BusinessForm {
  _id: string;

  userName: string;
  userPhone: string;
  businessName: string;
  legalName: string;
  businessType: "business" | "service";
  categories: string[];
  address: string;
  website?: string;
  phone: string;
  verificationMethod: "ein" | "license" | "bill" | "registration" | "other";
  einNumber?: string;
  description: string;
  languages: string[];
  status: string;
  sales?: {
    description?: string;
    startDate?: Date;
    endDate?: Date;
    couponCodes?: string;
  };
}
