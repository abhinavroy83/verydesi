import {
  Dumbbell,
  Pool,
  Car,
  ParkingCircle,
  Zap,
  Trash2,
  Trees,
  Droplet,
  Shield,
  Shirt,
  Elevator,
  Building2,
  LucideIcon,
} from "lucide-react";

export const AmenityIcon = {
  "Gym/Fitness Center": Dumbbell,
  "Swimming Pool": Pool,
  "Car Park": Car,
  "Visitors Parking": ParkingCircle,
  "Power Backup": Zap,
  "Garbage Disposal": Trash2,
  "Private Lawn": Trees,
  "Water Heater Plant": Droplet,
  "Security System": Shield,
  "Laundry Service": Shirt,
  Elevator: Elevator,
  "Club House": Building2,
  // Add any other icons you need here
};
export type AmenityType = keyof typeof AmenityIcon;
