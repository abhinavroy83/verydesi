import { useState, useEffect } from "react";
import axios from "axios";
import { RoomInterface } from "@myrepo/types";
import { stateAbbreviations } from "@/constants";

export function useRoomFetching(currentCity: string) {
  const [Room, setRooms] = useState<RoomInterface[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();
  }, [currentCity]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const [roomsRes, areaRes] = await Promise.all([
        axios.get<{ rooms: RoomInterface[] }>(
          `https://apiv2.verydesi.com/room/ListingAllRoomByArea/${currentCity}`,
          {
            withCredentials: true,
          }
        ),
        axios.get(`https://api.verydesi.com/api/admin/area/${currentCity}`, {
          withCredentials: true,
        }),
      ]);

      if (roomsRes.data.rooms.length === 0) {
        setError(`No rooms found in ${currentCity}`);
        setRooms([]);
        return;
      }

      const rooms = roomsRes.data.rooms.reverse();
      const areaData = areaRes.data.area[0];

      const sortedRooms = sortRoomsByPriority(rooms, areaData);
      setRooms(sortedRooms);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while fetching rooms");
    } finally {
      setLoading(false);
    }
  };

  const sortRoomsByPriority = (
    rooms: RoomInterface[],
    areaData: any
  ): RoomInterface[] => {
    const priority = (room: RoomInterface): number => {
      const roomStateFullName = Object.keys(stateAbbreviations).find(
        (key) => stateAbbreviations[key] === room.state
      );

      const isPrimaryState =
        roomStateFullName === areaData.primaryState ||
        room.state === areaData.primaryState;
      const isStateListed = areaData.state.includes(
        roomStateFullName || room.state
      );
      const isCityListed = areaData.subarea.some(
        (subarea: string) => subarea.split(",")[0] === room.city
      );
      const isZipListed = areaData.zipcode.includes(room.zip_code);

      if (isPrimaryState && (isCityListed || isZipListed)) return 1;
      if (isStateListed && (isCityListed || isZipListed)) return 2;
      if (isCityListed) return 3;
      if (isZipListed) return 4;
      if (isPrimaryState) return 5;
      return 6;
    };

    return [...rooms].sort((a, b) => priority(a) - priority(b));
  };

  return { Room, loading, error, fetchRooms };
}
