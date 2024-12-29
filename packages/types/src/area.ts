export interface City {
    country: string;
    state: string;
    area: string;
    subarea?: string[];
    zipcode?: string[];
  }
  
  export interface SelectedData {
    country: string;
    state: string;
    area: string;
  }
  
  export interface AreaWithZipCodes {
    area: string;
    zipcodes: string[];
  }
  
  