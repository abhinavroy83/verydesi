import { useQuery } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { UserData } from "@myrepo/types";
import useAuthStore from "@/store/useAuthStore";

const fetchUserData = async (token: string): Promise<UserData> => {
  const response = await axios.get(
    "http://apiv2.verydesi.com/user/userprofile",
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

  const { data, isLoading, error } = useQuery<UserData, Error>(
    ["userData", token],
    () => fetchUserData(token as string),
    {
      enabled: !!token,
      onSuccess: (data) => {
        updateCity(data.belongcity);
        setVerified(data.IsEmailVerified);
        setname(data.firstName);
      },
    }
  );

  return { userData: data, isLoading, error };
};
