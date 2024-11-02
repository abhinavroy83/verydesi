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

  const formatSlug = (title: string, id: string) => {
    const formattedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `${formattedTitle}-${id}`;
  };

  // Fetch rooms for Portland
  const portlandRooms = await getRoomsForPortland();

  // Create room pages for Portland
  const roomPages = portlandRooms.map(
    (room: { _id: string; postedon: string; Title: string }) => {
      let lastModified;
      try {
        lastModified = new Date(room.postedon);
        if (isNaN(lastModified.getTime())) {
          throw new Error("Invalid date");
        }
      } catch (error) {
        console.error(`Invalid date for room ${room._id}: ${room.postedon}`);
        lastModified = new Date(); // Use current date as fallback
      }

      const slug = formatSlug(room.Title, room._id);

      return {
        url: `${baseUrl}/room/${slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    }
  );

  // Combine all entries
  return [...staticPages, ...roomPages];
}
