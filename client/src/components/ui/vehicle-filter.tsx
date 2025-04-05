import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface VehicleFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Vehicles' },
    { id: 'sports', label: 'Sports' },
    { id: 'luxury', label: 'Luxury Sedans' },
    { id: 'suv', label: 'SUVs' },
    { id: 'convertible', label: 'Convertibles' }
  ];

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeFilter === filter.id
                ? 'bg-[#0F1A2A] text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-[#2A2A2A]'
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default VehicleFilter;
