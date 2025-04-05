import { Car } from '@shared/schema';

interface ImageCarouselProps {
  car: Car;
}

// Use a map to provide high-quality car images instead of the original images
const carImageMap: Record<string, string> = {
  'Porsche 911 Carrera': 'https://images.unsplash.com/photo-1611821064430-0d40291922b3?q=80&w=3270&auto=format&fit=crop',
  'Mercedes-Benz S-Class': 'https://images.unsplash.com/photo-1622194993799-1665b7f8b2d5?q=80&w=3270&auto=format&fit=crop',
  'BMW X7': 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=3270&auto=format&fit=crop',
  'Tesla Model S': 'https://images.unsplash.com/photo-1620891549220-ac51fc5bfe21?q=80&w=3271&auto=format&fit=crop',
  'Lamborghini Huracan': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=3270&auto=format&fit=crop',
  'Audi R8': 'https://images.unsplash.com/photo-1603386329872-f845a031ed1b?q=80&w=3269&auto=format&fit=crop',
  'Range Rover Sport': 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=3024&auto=format&fit=crop',
  'Bentley Continental GT': 'https://images.unsplash.com/photo-1544567430-b878a464803a?q=80&w=3270&auto=format&fit=crop',
};

const ImageCarousel = ({ car }: ImageCarouselProps) => {
  // Use the mapped image if available, otherwise fall back to the car's default image
  const imageUrl = carImageMap[car.name] || car.image;

  return (
    <div className="w-full mb-8">
      <div className="overflow-hidden rounded-lg shadow-lg bg-gradient-to-t from-gray-900/5 to-transparent p-1">
        <div className="w-full h-[500px] overflow-hidden rounded-lg relative group">
          <img
            src={imageUrl}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-4 left-4 bg-[#0F172A]/80 text-white px-4 py-2 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {car.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
