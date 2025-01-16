"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { AreaData } from "@myrepo/types";
import { AreaForm } from "@/components/module/Area/form/area-form";

export default function UpdateArea() {
  const { id } = useParams();
  const [areaData, setAreaData] = useState<AreaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await axios.get(
          `https://apiv2.verydesi.com/area/find-city-by-area/${id}`
        );
        setAreaData(response.data.area[0]);
      } catch (error) {
        console.error("Error fetching area data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAreaData();
  }, [id]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!areaData) {
    return <div>Error: Area not found</div>;
  }

  return <AreaForm initialData={areaData} />;
}
