import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://verydesi.com";

  // Define your static routes
  const staticRoutes = ["", "/about", "/contact", "/room",].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })
  );

  // Fetch dynamic routes
  // const rooms = await fetchRooms()
  // const roomRoutes = rooms.map(room => ({
  //   url: `${baseUrl}/room/${room.slug}`,
  //   lastModified: new Date(room.updatedAt).toISOString(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6
  // }))

  // const events = await fetchEvents()
  // const eventRoutes = events.map(event => ({
  //   url: `${baseUrl}/event/${event.slug}`,
  //   lastModified: new Date(event.updatedAt).toISOString(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6
  // }))

  return [
    ...staticRoutes,
    // ...roomRoutes,
    // ...eventRoutes,
  ];
}
