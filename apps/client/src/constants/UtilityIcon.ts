import {
  Droplet,
  Wifi,
  Zap,
  Wind,
  Refrigerator,
  Utensils,
  Shirt,
  KitchenPot,
  Microwave,
  Tv,
  Flame,
  LucideIcon,
} from "lucide-react";

export const utilityIcons: Record<string, LucideIcon> = {
  Water: Droplet,
  "Wi-Fi": Wifi,
  Electricity: Zap,
  "Air Conditioner": Wind,
  Refrigerator: Refrigerator,
  Dishwasher: Utensils,
  Dryer: Shirt,
  Washer: Shirt,
  Kitchen: KitchenPot,
  Microwave: Microwave,
  TV: Tv,
  Heater: Flame,
};

export type UtilityType = keyof typeof utilityIcons;
