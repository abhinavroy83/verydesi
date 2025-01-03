export interface Event {
  _id: string | undefined;
  eventTitle: string;
  eventType: string;
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
  postedOn: string;
  artists: { name: string }[];
}
