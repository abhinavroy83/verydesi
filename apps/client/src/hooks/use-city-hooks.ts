import { useState, useEffect } from "react";
import axios from "axios";

interface CityItem {
  area: string;
  // Add other properties if they exist in the API response
}

interface CityResponse {
  city: CityItem[];
}

const CACHE_KEY = "cityDataCache";
const CACHE_EXPIRATION = 1 * 60 * 60 * 1000;

export function useCityData() {
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRATION) {
            setCities(data);
            setIsLoading(false);
            return;
          }
        }

        const res = await axios.get<CityResponse>(
          "https://apiv2.verydesi.com/area/getallcities"
        );
        const uniqueCities = Array.from(
          new Set(res.data.city.map((item) => item.area))
        ).sort((a, b) => a.localeCompare(b));

        setCities(uniqueCities);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: uniqueCities, timestamp: Date.now() })
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching city data")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCityData();
  }, []);

  return { cities, isLoading, error };
}
