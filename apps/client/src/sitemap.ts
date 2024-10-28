import { MetadataRoute } from "next";
import axios from "axios";

// Function to fetch rooms for Portland
async function getRoomsForPortland() {
  try {
    const response = await axios.get(
      `https://apiv2.verydesi.com/room/ListingAllRoomByArea/Portland`,
      {
        withCredentials: true,
      }
    );
    return response.data.rooms;
  } catch (error) {
    console.error(`Error fetching rooms for Portland:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://verydesi.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/post-room`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/find-roommate`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rooms/Portland`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Fetch rooms for Portland
  const portlandRooms = await getRoomsForPortland();

  // Create room pages for Portland
  const roomPages = portlandRooms.map(
    (room: { _id: string; updatedAt: string }) => ({
      url: `${baseUrl}/room/${room._id}`,
      lastModified: new Date(room.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  // Combine all entries
  return [...staticPages, ...roomPages];
}
