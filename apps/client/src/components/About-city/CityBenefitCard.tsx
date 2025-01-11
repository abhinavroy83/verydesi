import Link from "next/link";
import React from "react";

interface Attraction {
  title: string;
  image: string;
  description: string;
  link: string;
}

interface CityBenefitCardProps {
  attraction: Attraction;
}

function CityBenefitCard({ attraction }: CityBenefitCardProps) {
  const formatSlug = (title: string) => {
    const decodedTitle = decodeURIComponent(title);
    const formattedTitle = decodedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/(^_|_$)/g, "");
    return formattedTitle;
  };

  const slug = formatSlug(attraction.description);
  return (
    <div className="group overflow-hidden border rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative overflow-hidden">
        <img
          src={"https://wallpapercave.com/wp/Nb3d7Ur.jpg"}
          alt={attraction.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
        />
      </div>
      <div className="px-2 py-2 text-center hover:cursor-pointer">
        <p className="lg:text-[16px] text-[14px] mb-1 text-black">
          {attraction.description}
        </p>
        <Link
          href={`${attraction.link}/ ${slug}`}
          className="lg:text-[16px] text-[14px] font-medium text-red-500 hover:text-red-600"
        >
          more
        </Link>
      </div>
    </div>
  );
}

export default CityBenefitCard;
