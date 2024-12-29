"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface EventTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function EventTimePicker({ value, onChange }: EventTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(value.split(":")[0]);
  const [minutes, setMinutes] = useState(value.split(":")[1]);

  const updateTime = (newHours: string, newMinutes: string) => {
    const formattedHours = newHours.padStart(2, "0");
    const formattedMinutes = newMinutes.padStart(2, "0");
    onChange(`${formattedHours}:${formattedMinutes}`);
    setHours(formattedHours);
    setMinutes(formattedMinutes);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHours = e.target.value;
    if (parseInt(newHours) > 23) newHours = "23";
    if (parseInt(newHours) < 0) newHours = "00";
    updateTime(newHours, minutes);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinutes = e.target.value;
    if (parseInt(newMinutes) > 59) newMinutes = "59";
    if (parseInt(newMinutes) < 0) newMinutes = "00";
    updateTime(hours, newMinutes);
  };

  const incrementHours = () => {
    const newHours = (parseInt(hours) + 1) % 24;
    updateTime(newHours.toString(), minutes);
  };

  const decrementHours = () => {
    const newHours = (parseInt(hours) - 1 + 24) % 24;
    updateTime(newHours.toString(), minutes);
  };

  const incrementMinutes = () => {
    const newMinutes = (parseInt(minutes) + 1) % 60;
    updateTime(hours, newMinutes.toString());
  };

  const decrementMinutes = () => {
    const newMinutes = (parseInt(minutes) - 1 + 60) % 60;
    updateTime(hours, newMinutes.toString());
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? value : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex flex-col items-center">
            <Button size="sm" onClick={incrementHours}>
              ▲
            </Button>
            <Input
              type="number"
              value={hours}
              onChange={handleHoursChange}
              className="w-[60px] text-center"
              min={0}
              max={23}
            />
            <Button size="sm" onClick={decrementHours}>
              ▼
            </Button>
          </div>
          <span className="text-2xl">:</span>
          <div className="flex flex-col items-center">
            <Button size="sm" onClick={incrementMinutes}>
              ▲
            </Button>
            <Input
              type="number"
              value={minutes}
              onChange={handleMinutesChange}
              className="w-[60px] text-center"
              min={0}
              max={59}
            />
            <Button size="sm" onClick={decrementMinutes}>
              ▼
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
