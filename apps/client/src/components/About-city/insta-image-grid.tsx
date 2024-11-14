import { Instagram } from "lucide-react";

const images = [
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Manhattan skyline",
    span: true,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Empire State Building view",
    span: false,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Citi Field stadium",
    span: false,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Metropolitan Museum entrance",
    span: false,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Grand Central at night",
    span: false,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Empire State with moon",
    span: false,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Grand Central information booth",
    span: false,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "Bethesda Terrace arch",
    span: false,
  },
  {
    src: "https://www.pixelstalk.net/wp-content/uploads/2016/05/America-city-wallpaper-hd.jpg",
    alt: "St Patrick's Cathedral",
    span: false,
  },
];

export default function InstaImagegrid() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-1">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative ${
                index === 0 ? "col-span-2 row-span-2" : "col-span-1"
              }`}
            >
              <div className="absolute inset-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Instagram Icon Overlay */}
              <div className="absolute left-3 top-3">
                <div className="rounded-md bg-white/90 p-1">
                  <Instagram className="h-4 w-4" />
                </div>
              </div>
              <div
                className={`pt-[100%] ${index === 0 ? "pt-[66.666%]" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
