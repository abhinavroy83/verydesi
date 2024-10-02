import {
  Droplet,
  Wifi,
  Zap,
  Wind,
  Refrigerator,
  Utensils,
  Shirt,
  Microwave,
  Tv,
  Flame,
  LucideIcon,
} from "lucide-react";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidWasher } from "react-icons/bi";
import { PiHairDryerLight } from "react-icons/pi";

export const utilityIcons = {
  Water: Droplet,
  "Wi-Fi": Wifi,
  Electricity: Zap,
  "Air Conditioner": Wind,
  Refrigerator: Refrigerator,
  Dishwasher: BiSolidWasher,
  Dryer: PiHairDryerLight,
  Washer: Shirt,
  Kitchen: FaKitchenSet,
  Microwave: Microwave,
  TV: Tv,
  Heater: Flame,
};

export type UtilityType = keyof typeof utilityIcons;
