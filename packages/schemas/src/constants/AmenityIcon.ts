import {
  Dumbbell,
  Waves,
  Car,
  ParkingCircle,
  Zap,
  Trash2,
  Trees,
  Droplet,
  Shield,
  Shirt,
  Building2,
} from "lucide-react";
import { PiElevator } from "react-icons/pi";
import { MdOutlinePool } from "react-icons/md";

export const AmenityIcon = {
  "Gym/Fitness Center": Dumbbell,
  "Swimming Pool": MdOutlinePool,
  "Car Park": Car,
  "Visitors Parking": ParkingCircle,
  "Power Backup": Zap,
  "Garbage Disposal": Trash2,
  "Private Lawn": Trees,
  "Water Heater Plant": Droplet,
  "Security System": Shield,
  "Laundry Service": Shirt,
  Elevator: PiElevator,
  "Club House": Building2,
  // Add any other icons you need here
};
export type AmenityType = keyof typeof AmenityIcon;
