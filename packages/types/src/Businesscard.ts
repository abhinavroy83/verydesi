export interface BusinessData {
  _id: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  status: string;
  userName: string;
  userPhone: string;
  businessName: string;
  establishedsince: string;
  legalName: string;
  businessType: string;
  categories: string[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  additionaladress: string;
  website: string;
  phone: string;
  verificationMethod: string;
  openHours: {
    monday: DailyHours;
    tuesday: DailyHours;
    wednesday: DailyHours;
    thursday: DailyHours;
    friday: DailyHours;
    _id: string;
  };
  description: string;
  languages: string[];
  pdfurl: string;
  logoUrl: string;
  Imageurl: string[];
  sales: {
    description: string;
    couponCodes: string;
    _id: string;
  };
  __v: number;
}

interface DailyHours {
  startTime: string;
  endTime: string;
  is24Hours: boolean;
  isClosed: boolean;
}
