"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function CitySelector() {
  const { currentCity } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (currentCity && !searchParams.has("area")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("area", currentCity);
      router.replace(
        `${window.location.pathname}?${newSearchParams.toString()}`
      );
    }
  }, [currentCity, router, searchParams]);

}
