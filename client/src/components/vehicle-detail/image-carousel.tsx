import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Car } from '@shared/schema';

interface ImageCarouselProps {
  car: Car;
}

// For this example, we'll use the main image and generate additional views
const ImageCarousel = ({ car }: ImageCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Generate additional images (in a real app, these would come from the database)
  const images = [
    car.image, // Main image
    // Generate additional angles by adding URL parameters or using different images
    car.image + '?angle=side',
    car.image + '?angle=interior',
    car.image + '?angle=rear',
  ];

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* Thumbnail navigation */}
      <div className="flex mt-4 gap-2 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
              currentImage === index ? 'border-[#EAB308]' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`${car.name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
