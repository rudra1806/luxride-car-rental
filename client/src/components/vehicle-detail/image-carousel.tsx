import { Car } from '@shared/schema';

interface ImageCarouselProps {
  car: Car;
}

// Display just a single premium image for each car
const ImageCarousel = ({ car }: ImageCarouselProps) => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg shadow-xl">
        <img
          src={car.image || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2940"}
          alt={`${car.name}`}
          className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Premium badge */}
      <div className="relative">
        <div className="absolute -top-12 right-6 bg-[#EAB308] text-white px-4 py-2 rounded-b-lg font-semibold shadow-lg">
          Premium
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
