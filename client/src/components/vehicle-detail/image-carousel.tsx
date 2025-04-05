import { Car } from '@shared/schema';

interface ImageCarouselProps {
  car: Car;
}

// Simplified version with just one image
const ImageCarousel = ({ car }: ImageCarouselProps) => {
  // Default image if car.image is null
  const imageUrl = car.image || `https://images.unsplash.com/photo-1579762593175-20226054cad0?q=80&w=2942`;
  
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={`${car.name}`}
          className="w-full h-[380px] object-cover"
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
