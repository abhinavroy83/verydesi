import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Norooms() {
  const { currentCity } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Rooms Available in {currentCity}
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn't find any rooms at your location. Would you like to create
          a new room?
        </p>
        <Button
        onClick={()=>{router.push('/po')}}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out">
          Post Room
        </Button>
      </div>
    </div>
  );
}
