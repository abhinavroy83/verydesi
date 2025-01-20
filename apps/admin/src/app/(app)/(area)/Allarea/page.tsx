"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Edit2, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import { AreaData, SelectedData } from "@myrepo/types";
import DashboardLayout from "@/components/Layout/Dashboardlayout";
import { stateAbbreviations } from "@repo/schemas";
import { any } from "zod";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AreaSearch } from "@/components/module/Area/area-search";

export default function AllArea(): JSX.Element {
  const [data, setData] = useState<AreaData[]>([]);
  const [selectedData, setSelectedData] = useState<SelectedData>({
    country: "",
    area: "",
  });
  const [areas, setAreas] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [subareas, setSubareas] = useState<string[]>([]);
  const [zipcodes, setZipcodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAreaLoading, setIsAreaLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<AreaData[]>(
          "https://apiv2.verydesi.com/area/getallcities"
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
        const result = response.data;
        setData(response.data);
        const uniqueAreas = [
          ...new Set(result.map((item: AreaData) => item.area)),
        ];
        // setAreas(uniqueAreas);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (selectedData.country) {
      const filteredData = data.filter(
        (item) => item.country === selectedData.country
      );

      const uniqueState = [
        ...new Set(filteredData.flatMap((item) => item.state)),
      ];

      const filtermetroarea = [
        ...new Set(filteredData.flatMap((item) => item.area)),
      ];
      setAreas(filtermetroarea);

      setStates(uniqueState);
    }
  }, [selectedData.country, data]);

  useEffect(() => {
    if (selectedData.area) {
      setIsAreaLoading(true);

      const selectedAreaData = data.find(
        (item) => item.area === selectedData.area
      );
      setSubareas(selectedAreaData?.subarea || [""]);
      setZipcodes(selectedAreaData?.zipcode || [""]);
    }
    setIsAreaLoading(false);
  }, [selectedData.area, data]);

  const handleCountryChange = (country: string) => {
    setSelectedData((prev) => ({ ...prev, country, area: "" }));
    setSubareas([]);
    setZipcodes([]);
  };

  const handleAreaClick = (area: string) => {
    setSelectedData((prev) => ({ ...prev, area }));
  };

  const handleEditArea = (area: string) => {
    router.push(`/updateArea/${area}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const showNoDataMessage = selectedData.country && areas.length === 0;

  return (
    <DashboardLayout>
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Area Management
          </h2>
          <div className="flex space-x-4">
            <AreaSearch data={data} />
            <Button onClick={() => router.push("/addarea")}>
              <Plus className="mr-2 h-4 w-4" /> Add Area
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Usa">USA</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!selectedData.country && (
          <Card className="mb-6 max-h-svh ">
            <CardContent className="flex items-center justify-center p-6">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-lg font-medium">
                Please select a country to view areas
              </p>
            </CardContent>
          </Card>
        )}

        {showNoDataMessage && (
          <Card className="mb-6">
            <CardContent className="flex items-center justify-center p-6">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-lg font-medium">
                No data available for the selected country
              </p>
            </CardContent>
          </Card>
        )}

        {selectedData.country && !showNoDataMessage && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataTable
              title="Metro Areas"
              data={areas}
              onRowClick={handleAreaClick}
              selectedItem={selectedData.area}
              searchable={true}
              actionRender={(item) => (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditArea(item)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            />
            <DataTable
              title="States"
              data={states}
              searchable={true}
              highlightedItems={
                selectedData.area
                  ? data.find((item) => item.area === selectedData.area)
                      ?.state || []
                  : []
              }
            />
            {selectedData.area ? (
              isAreaLoading ? (
                <div className="col-span-2 flex justify-center items-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <>
                  <DataTable title="Cities" data={subareas} searchable={true} />
                  <DataTable
                    title="Zipcodes"
                    data={zipcodes}
                    searchable={true}
                  />
                </>
              )
            ) : (
              <div className="col-span-2">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-lg font-medium">
                      Select a metro area to view cities and zipcodes
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
