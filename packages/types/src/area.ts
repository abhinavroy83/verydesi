export interface AreaWithZipCodes {
  area: string;
  zipcodes: string[];
}

export interface AreaData {
  _id: string;
  country: string;
  state: string[];
  primaryState: string;
  area: string;
  subarea: string[];
  zipcode: string[];
}

export interface SelectedData {
  country: string;
  area: string;
}
