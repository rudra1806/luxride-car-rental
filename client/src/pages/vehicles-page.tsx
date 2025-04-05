import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Car } from '@shared/schema';
import VehicleCard from '@/components/vehicles/vehicle-card';
import VehicleFilters from '@/components/vehicles/vehicle-filters';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearch } from 'wouter';

const VehiclesPage = () => {
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const locationParam = searchParams.get('location');
  const pickupParam = searchParams.get('pickup');
  const returnParam = searchParams.get('return');
  const typeParam = searchParams.get('type');

  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
  });

  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Apply URL filters on component mount and when cars data changes
  useEffect(() => {
    if (cars) {
      let filtered = [...cars];
      
      // Apply type filter from URL if present
      if (typeParam) {
        filtered = filtered.filter(car => car.type.toLowerCase() === typeParam.toLowerCase());
      }
      
      // Additional URL filters could be applied here
      // e.g., for date availability, location, etc.
      
      setFilteredCars(filtered);
    }
  }, [cars, typeParam, locationParam, pickupParam, returnParam]);

  const handleFilterChange = (filtered: Car[]) => {
    setFilteredCars(filtered);
  };

  // Create loading skeletons for cars
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton className="h-60 w-full" />
        <div className="p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-4" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#0F172A] font-playfair mb-2">Our Luxury Fleet</h1>
          <div className="w-20 h-1 bg-[#EAB308] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our exclusive collection of premium vehicles and find your perfect ride
          </p>
        </div>
        
        {/* Applied Filters Summary */}
        {(locationParam || pickupParam || returnParam || typeParam) && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-medium text-[#0F172A] mb-2">Applied Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {locationParam && (
                <span className="bg-gray-100 text-[#1E293B] text-sm px-3 py-1 rounded-full">
                  Location: {locationParam}
                </span>
              )}
              {pickupParam && (
                <span className="bg-gray-100 text-[#1E293B] text-sm px-3 py-1 rounded-full">
                  Pickup: {new Date(pickupParam).toLocaleDateString()}
                </span>
              )}
              {returnParam && (
                <span className="bg-gray-100 text-[#1E293B] text-sm px-3 py-1 rounded-full">
                  Return: {new Date(returnParam).toLocaleDateString()}
                </span>
              )}
              {typeParam && (
                <span className="bg-gray-100 text-[#1E293B] text-sm px-3 py-1 rounded-full">
                  Type: {typeParam}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Filters and Vehicle Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full lg:w-1/4">
            {!isLoading && cars && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-[#0F172A] mb-4 font-playfair">Filter Vehicles</h2>
                <VehicleFilters 
                  cars={cars} 
                  onFilterChange={handleFilterChange} 
                />
              </div>
            )}
          </div>
          
          {/* Vehicles Grid */}
          <div className="w-full lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {isLoading 
                  ? "Loading vehicles..." 
                  : `Showing ${filteredCars.length} ${filteredCars.length === 1 ? 'vehicle' : 'vehicles'}`
                }
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading 
                ? renderSkeletons()
                : filteredCars.length > 0 
                  ? filteredCars.map(car => <VehicleCard key={car.id} car={car} />)
                  : (
                    <div className="col-span-full py-12 text-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                      <p className="text-xl font-medium text-gray-600">No vehicles found</p>
                      <p className="text-gray-500 mt-2">Try adjusting your filters to find more options</p>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
