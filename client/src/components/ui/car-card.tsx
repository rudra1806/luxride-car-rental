import React from 'react';
import { Link } from 'wouter';
import { Car } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

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
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="car-card group bg-white dark:bg-[#1E293B] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
        <div className="relative overflow-hidden h-64">
          <motion.img 
            src={car.image || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2940'} 
            alt={car.name} 
            className="car-img w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute top-0 right-0 bg-[#EAB308] text-[#0F172A] font-bold py-1 px-3 m-3 rounded-md">
            {formatCurrency(car.price)}<span className="text-xs font-normal">/day</span>
            <div className="text-xs font-normal">GST included</div>
          </div>
          
          {/* Premium badge */}
          <div className="absolute top-0 left-0 m-3 bg-[#0F172A] text-[#EAB308] text-sm font-medium py-1 px-3 rounded-md">
            Premium
          </div>
          
          {/* Type badge */}
          <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/50 text-[#0F172A] dark:text-white text-xs font-medium py-1 px-2 rounded">
            {car.type}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold font-serif tracking-tight">{car.name}</h3>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#EAB308]">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 font-medium">{car.rating ? car.rating.toFixed(1) : "New"}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex flex-col items-center text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{car.horsepower || '-'} HP</span>
            </div>
            <div className="flex flex-col items-center text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{car.transmission}</span>
            </div>
            <div className="flex flex-col items-center text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{car.seats} Seats</span>
            </div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{car.description}</p>
          
          <div className="flex justify-between items-center mt-auto">
            <Button 
              variant="outline" 
              className="border border-[#0F172A] text-[#0F172A] dark:border-gray-400 dark:text-white hover:bg-[#0F172A] hover:text-white transition-colors"
              onClick={() => onViewDetails(car)}
            >
              View Details
            </Button>
            <Link href={`/car/${car.id}`}>
              <Button className="bg-[#0F172A] text-white hover:bg-[#1A2A3A] transition-colors">
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
