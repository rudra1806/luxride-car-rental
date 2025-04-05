import { useState } from 'react';
import { Link } from 'wouter';
import { Car } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Icons for car specs
import { Gauge, Settings, Users, Fuel } from 'lucide-react';

interface VehicleCardProps {
  car: Car;
}

const VehicleCard = ({ car }: VehicleCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <i key={i} className="fas fa-star text-[#EAB308]"></i>;
          } else if (i === fullStars && hasHalfStar) {
            return <i key={i} className="fas fa-star-half-alt text-[#EAB308]"></i>;
          } else {
            return <i key={i} className="far fa-star text-[#EAB308]"></i>;
          }
        })}
      </div>
    );
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
      <Link href={`/vehicles/${car.id}`}>
        <div className="relative overflow-hidden h-60">
          <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-[#EAB308] px-3 py-1 rounded text-sm font-bold text-[#0F172A]">
            ₹{car.price}/day
          </div>
          {car.fuelType === 'Electric' && (
            <div className="absolute bottom-4 left-4 bg-green-600 px-2 py-1 rounded text-xs font-bold text-white">
              <i className="fas fa-leaf mr-1"></i> Electric
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-[#0F172A] font-['Playfair_Display']">{car.name}</h3>
              <div className="flex items-center mt-1">
                {renderStars(car.rating || 0)}
                <span className="ml-2 text-sm text-gray-600">{car.rating} ({car.reviews} reviews)</span>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={toggleFavorite}
                    className={`text-[#0F172A] hover:text-[#EAB308] transition-colors duration-200 ${isFavorite ? 'text-red-500' : ''}`}
                  >
                    <Heart className={isFavorite ? 'fill-red-500' : ''} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <Gauge className="text-[#1E293B] mr-2" size={16} />
              <span className="text-sm text-gray-600">{car.horsepower} HP</span>
            </div>
            <div className="flex items-center">
              <Settings className="text-[#1E293B] mr-2" size={16} />
              <span className="text-sm text-gray-600">{car.transmission}</span>
            </div>
            <div className="flex items-center">
              <Users className="text-[#1E293B] mr-2" size={16} />
              <span className="text-sm text-gray-600">{car.seats} Seats</span>
            </div>
            <div className="flex items-center">
              <Fuel className="text-[#1E293B] mr-2" size={16} />
              <span className="text-sm text-gray-600">{car.fuelType}</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <span className="text-[#0F172A] hover:text-[#EAB308] transition-colors duration-200 text-sm font-semibold flex items-center">
              View Details
              <i className="fas fa-chevron-right ml-1 text-xs"></i>
            </span>
            <Button size="sm" className="bg-[#0F172A] hover:bg-[#1E293B]">
              Book Now
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VehicleCard;
