import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  loading?: boolean;
  className?: string;
}

const ImageCarousel = ({
  images,
  loading = false,
  className,
}: ImageCarouselProps) => {
  const [hasMultipleImages, setHasMultipleImages] = useState(false);

  useEffect(() => {
    setHasMultipleImages(images?.length > 1);
  }, [images]);

  if (loading) {
    return (
      <div className={cn("w-full rounded-xl overflow-hidden", className)}>
        <div className="w-full h-[20rem] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className={cn("w-full rounded-xl overflow-hidden", className)}>
        <div className="w-full h-[25.1rem] bg-gray-300 flex items-center justify-center rounded-lg">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  if (!hasMultipleImages) {
    return (
      <div className={cn("w-full rounded-xl overflow-hidden", className)}>
        <img
          src={images[0]}
          alt="Event"
          className="w-full h-48 sm:h-64 md:h-80 lg:h-[25.1rem] object-cover rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className={cn("w-full rounded-xl overflow-hidden", className)}>
      <Carousel opts={{ align: "start" }} className="relative">
        <CarouselContent>
          {images.map((imageUrl, index) => (
            <CarouselItem key={index} className="basis-full">
              <img
                src={imageUrl}
                alt={`Event Image ${index + 1}`}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-[25.1rem] object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
