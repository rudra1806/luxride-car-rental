import { Car } from '@shared/schema';
import { 
  Award, 
  Calendar, 
  Car as CarIcon, 
  Fuel, 
  Gauge, 
  Settings, 
  Users 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SpecsSectionProps {
  car: Car;
}

const SpecsSection = ({ car }: SpecsSectionProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-['Playfair_Display'] font-semibold text-[#0F172A] mb-4">Vehicle Specifications</h2>
      <Separator className="mb-6" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Gauge className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Engine Power</span>
          <span className="text-lg font-semibold">{car.horsepower} HP</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Settings className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Transmission</span>
          <span className="text-lg font-semibold">{car.transmission}</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Users className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Seats</span>
          <span className="text-lg font-semibold">{car.seats}</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Fuel className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Fuel Type</span>
          <span className="text-lg font-semibold">{car.fuelType}</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <CarIcon className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Brand</span>
          <span className="text-lg font-semibold">{car.brand}</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Calendar className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Year</span>
          <span className="text-lg font-semibold">{car.year}</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Award className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Model</span>
          <span className="text-lg font-semibold">{car.model}</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Gauge className="h-8 w-8 text-[#0F172A] mb-2" />
          <span className="text-sm text-gray-500">Type</span>
          <span className="text-lg font-semibold">{car.type}</span>
        </div>
      </div>
      
      {car.description && (
        <div className="mt-8">
          <h3 className="text-xl font-['Playfair_Display'] font-semibold text-[#0F172A] mb-2">Description</h3>
          <p className="text-gray-600">{car.description}</p>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-['Playfair_Display'] font-semibold text-[#0F172A] mb-2">Customer Reviews</h3>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`${i < Math.floor(car.rating || 0) ? 'fas' : 'far'} fa-star text-[#EAB308]`}></i>
            ))}
          </div>
          <span className="ml-2 text-gray-600">{car.rating} out of 5 ({car.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default SpecsSection;
