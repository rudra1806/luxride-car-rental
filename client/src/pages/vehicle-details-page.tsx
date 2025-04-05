import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Car } from '@shared/schema';
import { useSearch } from '@/context/search-context';
import ImageCarousel from '@/components/vehicle-detail/image-carousel';
import SpecsSection from '@/components/vehicle-detail/specs-section';
import BookingForm from '@/components/vehicle-detail/booking-form';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const carId = parseInt(id);
  const { location, pickupDate, returnDate } = useSearch();

  const { data: car, isLoading, isError } = useQuery<Car>({
    queryKey: [`/api/cars/${carId}`],
  });

  // If the id is invalid or car is not found
  if (isError) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 text-red-500 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 font-playfair">Vehicle Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the vehicle you were looking for.</p>
        <Link href="/vehicles">
          <Button className="bg-[#0F172A]">
            Browse All Vehicles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/vehicles">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </Button>
        </Link>
        
        {isLoading ? (
          <>
            {/* Loading state */}
            <div className="mb-6">
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-[400px] w-full rounded-lg mb-4" />
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-20 w-20 rounded-md" />
                  ))}
                </div>
                <Skeleton className="h-6 w-1/4 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-[500px] w-full rounded-lg" />
              </div>
            </div>
          </>
        ) : car ? (
          <>
            {/* Car details when loaded */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2 font-playfair">{car.name}</h1>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`${i < Math.floor(car.rating || 0) ? 'fas' : 'far'} fa-star text-[#EAB308]`}></i>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{car.rating} ({car.reviews} reviews)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ImageCarousel car={car} />
                <SpecsSection car={car} />
              </div>
              <div>
                <BookingForm 
                  car={car} 
                  initialLocation={location} 
                  initialPickupDate={pickupDate} 
                  initialReturnDate={returnDate} 
                />
              </div>
            </div>
            
            {/* Similar vehicles section could be added here */}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
