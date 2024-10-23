import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { UserData } from "@myrepo/types";
import useAuthStore from "@/store/useAuthStore";

const fetchUserData = async (token: string): Promise<UserData> => {
  const response = await axios.get(
    "https://apiv2.verydesi.com/user/userprofile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const useUserData = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const { updateCity, setVerified, setname } = useAuthStore();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchUserData(token);
        setUserData(data);

        // Update store based on fetched user data
        updateCity(data.belongcity);
        setVerified(data.IsEmailVerified);
        setname(data.firstName);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, updateCity, setVerified, setname]);

  return { userData, isLoading, error };
};
