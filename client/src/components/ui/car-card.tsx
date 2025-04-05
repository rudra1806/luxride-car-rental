import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Car } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="car-card group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
        <div className="relative overflow-hidden h-64">
          <img 
            src={car.image || '/placeholder-car.jpg'} 
            alt={car.name} 
            className="car-img w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0F1A2A] font-bold py-1 px-3 m-3 rounded">
            ₹{car.price}<span className="text-xs font-normal">/day</span>
            <div className="text-xs font-normal mt-1">GST included</div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold font-playfair">{car.name}</h3>
            <div className="flex items-center">
              <i className="fas fa-star text-[#D4AF37]"></i>
              <span className="ml-1 font-medium">{car.rating ? car.rating.toFixed(1) : "New"}</span>
            </div>
          </div>
          <p className="text-[#2A2A2A]/70 text-sm mb-4">{car.description}</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="flex flex-col items-center text-sm">
              <i className="fas fa-tachometer-alt mb-1 text-[#0F1A2A]"></i>
              <span>{car.horsepower || '-'} HP</span>
            </div>
            <div className="flex flex-col items-center text-sm">
              <i className="fas fa-cog mb-1 text-[#0F1A2A]"></i>
              <span>{car.transmission}</span>
            </div>
            <div className="flex flex-col items-center text-sm">
              <i className="fas fa-user mb-1 text-[#0F1A2A]"></i>
              <span>{car.seats} Seats</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              className="border border-[#0F1A2A] text-[#0F1A2A] hover:bg-[#0F1A2A] hover:text-white transition-colors"
              onClick={() => onViewDetails(car)}
            >
              View Details
            </Button>
            <Link href={`/car/${car.id}`}>
              <Button className="bg-[#0F1A2A] text-white hover:bg-[#1F2A3A] transition-colors">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CarCard;
