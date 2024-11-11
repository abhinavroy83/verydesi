export interface RoomInterface {
  _id: string;
  postedon: Date;
  Title: string;
  postingincity: string;
  postingtype: string;
  Description: string;
  Propertytype: string;
  city: string;
  Stay_lease: string;
  Avaliblity_from: string;
  Available_to: string;
  Day_Available: string;
  Attchd_Bath: string;
  Preferred_gender: string;
  Expected_Rooms: number;
  Pricemodel: string;
  Bath_Location: string;
  Couples_welcome: string;
  Desposite: number;
  is_room_furnished: string;
  Utility_include: string[];
  Amenities_include: string[];
  Vegeterian_prefernce: string;
  Smoking_policy: string;
  Pet_friendly: string;
  Open_house_schedule: string;
  Imgurl: string[];
  user_name: string;
  phone_number: string;
  address: string;
  state: string;
  zip_code: string;
  email: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}
