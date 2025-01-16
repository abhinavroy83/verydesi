"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { stateAbbreviations } from "@repo/schemas";
import { AlertCircle, X, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AreaData } from "@myrepo/types";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/Layout/Dashboardlayout";

interface AreaFormProps {
  initialData?: AreaData;
}

export function AreaForm({ initialData }: AreaFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AreaData>({
    defaultValues: initialData || {
      country: "",
      state: [],
      primaryState: "",
      area: "",
      subarea: [],
      zipcode: [],
    },
  });
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);

  const watchedStates = watch("state");
  const watchedPrimaryState = watch("primaryState");

  const onSubmit = async (data: AreaData) => {
    const token = session?.user.accessToken;
    try {
      if (initialData?._id) {
        await axios.put(
          `https://apiv2.verydesi.com/area/updatearea/${initialData._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast({ title: "Area updated successfully" });
      } else {
        await axios.post("https://apiv2.verydesi.com/area/postcity", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast({ title: "Area created successfully" });
      }
      router.push("/admin/area-management");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the form",
        variant: "destructive",
      });
    }
  };

  const handleStateChange = (state: string, checked: boolean) => {
    const currentStates = watch("state");
    let newStates: string[];
    if (checked) {
      newStates = [...currentStates, state];
    } else {
      newStates = currentStates.filter((s) => s !== state);
      if (watchedPrimaryState === state) {
        setValue("primaryState", newStates[0] || "");
      }
    }
    setValue("state", newStates);
  };

  const handlePrimaryStateChange = (state: string) => {
    setValue("primaryState", state);
  };

  const addItems = (field: "subarea" | "zipcode", items: string) => {
    const currentItems = watch(field);
    const newItems = items
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item && !currentItems.includes(item));
    setValue(field, [...currentItems, ...newItems]);
  };

  const removeItem = (field: "subarea" | "zipcode", item: string) => {
    const currentItems = watch(field);
    setValue(
      field,
      currentItems.filter((i) => i !== item)
    );
  };

  return (
    <DashboardLayout>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{initialData ? "Edit Area" : "Add New Area"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Usa">USA</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <span className="text-red-500 text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Metro Area</Label>
                <Controller
                  name="area"
                  control={control}
                  rules={{ required: "Metro Area is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter metro area"
                      disabled={!watch("country")}
                    />
                  )}
                />
                {errors.area && (
                  <span className="text-red-500 text-sm">
                    {errors.area.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>States</Label>
              <Select
                open={stateDropdownOpen}
                disabled={!watch("country")}
                onOpenChange={setStateDropdownOpen}
                value={watchedStates?.join(",")}
                onValueChange={() => {}}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select States" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[200px]">
                    {Object.entries(stateAbbreviations).map(
                      ([state, abbreviation]) => (
                        <div
                          key={state}
                          className="flex items-center justify-between p-2 hover:bg-gray-100"
                        >
                          <label
                            htmlFor={state}
                            className="flex items-center space-x-2 cursor-pointer w-full"
                          >
                            <Checkbox
                              id={state}
                              checked={watchedStates?.includes(state)}
                              onCheckedChange={(checked) =>
                                handleStateChange(state, checked as boolean)
                              }
                            />
                            <span>
                              {state} ({abbreviation})
                            </span>
                          </label>
                        </div>
                      )
                    )}
                  </ScrollArea>
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {watchedStates?.map((state) => (
                  <Badge
                    key={state}
                    variant={
                      watchedPrimaryState === state ? "default" : "destructive"
                    }
                    className={`cursor-pointer ${watchedPrimaryState === state ? "bg-green-500" : "bg-red-500"}`}
                    onClick={() => handlePrimaryStateChange(state)}
                  >
                    {state} {watchedPrimaryState === state ? "(Primary)" : ""}
                  </Badge>
                ))}
              </div>
              {errors.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
              {errors.primaryState && (
                <span className="text-red-500 text-sm">
                  {errors.primaryState.message}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <Label>Subareas</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter subareas (comma-separated)"
                  onBlur={(e) => addItems("subarea", e.target.value)}
                  disabled={!watch("country")}
                />
                <Button type="button" onClick={() => addItems("subarea", "")}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {watch("subarea")?.map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm flex items-center"
                  >
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 p-0 h-4 w-4"
                      onClick={() => removeItem("subarea", item)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {errors.subarea && (
                <span className="text-red-500 text-sm">
                  {errors.subarea.message}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <Label>Zipcodes</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter zipcodes (comma-separated)"
                  onBlur={(e) => addItems("zipcode", e.target.value)}
                  disabled={!watch("country")}
                />
                <Button type="button" onClick={() => addItems("zipcode", "")}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {watch("zipcode")?.map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm flex items-center"
                  >
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 p-0 h-4 w-4"
                      onClick={() => removeItem("zipcode", item)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {errors.zipcode && (
                <span className="text-red-500 text-sm">
                  {errors.zipcode.message}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full">
              {initialData ? "Update Area" : "Create Area"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
