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

  // Select specific cars for featuring - higher-end models and new additions
  const featuredCars = cars 
    ? [
        // Find specific cars by ID
        cars.find(car => car.id === 2), // Lamborghini Huracan
        cars.find(car => car.id === 7), // Rolls-Royce Ghost
        cars.find(car => car.id === 8), // Ferrari Roma
        cars.find(car => car.id === 9), // Bentley Continental GT
        cars.find(car => car.id === 6), // Audi R8
        cars.find(car => car.id === 5), // Mercedes-Benz S-Class
      ].filter(Boolean) as Car[] // Filter out any undefined values
    : [];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />

      {/* Featured Vehicles Section */}
      <section id="vehicles" className="py-24 bg-[#0F172A]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-[#0F172A] font-['Playfair_Display'] mb-3">
                Featured <span className="text-[#EAB308]">Vehicles</span>
              </h2>
              <div className="w-24 h-1 bg-[#EAB308] mb-5"></div>
              <p className="text-xl text-gray-600 max-w-2xl">
                Discover our handpicked selection of premium vehicles for your next adventure
              </p>
            </div>
            
            <div className="mt-8 md:mt-0">
              <div className="inline-flex flex-wrap gap-2 p-1 bg-[#F8FAFC] rounded-lg shadow-md">
                <Link href="/vehicles">
                  <Button className="bg-[#0F172A] hover:bg-[#1E293B] font-medium">All</Button>
                </Link>
                <Link href="/vehicles?type=Sports">
                  <Button variant="ghost" className="hover:bg-[#EAB308]/10 hover:text-[#0F172A]">Sports</Button>
                </Link>
                <Link href="/vehicles?type=SUV">
                  <Button variant="ghost" className="hover:bg-[#EAB308]/10 hover:text-[#0F172A]">SUVs</Button>
                </Link>
                <Link href="/vehicles?type=Luxury">
                  <Button variant="ghost" className="hover:bg-[#EAB308]/10 hover:text-[#0F172A]">Luxury</Button>
                </Link>
                <Link href="/vehicles?type=Ultra-Luxury">
                  <Button variant="ghost" className="hover:bg-[#EAB308]/10 hover:text-[#0F172A]">Ultra-Luxury</Button>
                </Link>
                <Link href="/vehicles?type=Grand%20Tourer">
                  <Button variant="ghost" className="hover:bg-[#EAB308]/10 hover:text-[#0F172A]">Grand Tourer</Button>
                </Link>
                <Link href="/vehicles?type=Electric">
                  <Button variant="ghost" className="hover:bg-[#EAB308]/10 hover:text-[#0F172A]">Electric</Button>
                </Link>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
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
              {featuredCars.map((car, index) => (
                <div 
                  key={car.id} 
                  className="transform transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <VehicleCard car={car} />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Link href="/vehicles">
              <Button 
                variant="outline" 
                className="border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white px-8 py-6 rounded-full text-lg font-medium group transition-all duration-300"
              >
                View All Vehicles
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
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
