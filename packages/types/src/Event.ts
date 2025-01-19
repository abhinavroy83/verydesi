export interface Event {
  _id: string;
  entryoption: string;
  eventTitle: string;
  eventType: string;
  timeZone: string;
  eventprice: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  venueName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  images: string[];
  hostedBy: string;
  contactNumber: string;
  virtualurl: string;
  eventpostingcity: string;
  languages: string[];
  artists: { name: string }[];
  location: {
    coordinates: number[];
  };
}

export interface Location {
  lat: number;
  lng: number;
}
