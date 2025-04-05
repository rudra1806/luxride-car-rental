import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import HowItWorks from "@/components/home/how-it-works";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ["/api/cars"],
  });

  const featuredCars = cars?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />

      {/* Featured Vehicles Section */}
      <section id="vehicles" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] font-playfair mb-2">Featured Vehicles</h2>
              <div className="w-20 h-1 bg-[#EAB308]"></div>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">Discover our handpicked selection of premium vehicles</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Link href="/vehicles">
                <Button className="bg-[#0F172A] hover:bg-[#1E293B]">All</Button>
              </Link>
              <Link href="/vehicles?type=SUV">
                <Button variant="outline">SUVs</Button>
              </Link>
              <Link href="/vehicles?type=Sports">
                <Button variant="outline">Sports</Button>
              </Link>
              <Link href="/vehicles?type=Luxury">
                <Button variant="outline">Luxury</Button>
              </Link>
              <Link href="/vehicles?type=Electric">
                <Button variant="outline">Electric</Button>
              </Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
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
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <VehicleCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/vehicles">
              <Button variant="outline" className="border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white">
                View All Vehicles
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
