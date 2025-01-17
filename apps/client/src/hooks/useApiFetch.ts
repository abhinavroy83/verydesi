import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseFetchOptions extends AxiosRequestConfig {
  immediate?: boolean;
}

function useApiFetch<T>(
  url: string,
  options: UseFetchOptions = { immediate: true }
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        ...options,
      });
      setData(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, [url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export default useApiFetch;
