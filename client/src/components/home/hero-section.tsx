import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectLabel,
  SelectSeparator,
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [_, setLocation] = useLocation();
  const [location, setPickupLocation] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const handleSearch = () => {
    // Build the search query
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (pickupDate) searchParams.set('pickup', pickupDate.toISOString());
    if (returnDate) searchParams.set('return', returnDate.toISOString());
    
    setLocation(`/vehicles?${searchParams.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] bg-[#0F172A]">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F172A]/70"></div>
      </div>
      
      {/* Content container */}
      <div className="relative h-full flex flex-col items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero text content */}
        <div className="w-full max-w-3xl mx-auto text-center animate-[fadeIn_0.8s_ease-out] mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-['Playfair_Display'] leading-tight mb-6">
            Experience Luxury on <br/>
            <span className="text-[#EAB308] drop-shadow-lg">Your Terms</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-100 font-['Inter'] max-w-2xl mx-auto">
            Rent premium vehicles for any occasion. Elevate your journey with our exclusive fleet of luxury cars.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/vehicles">
              <Button size="lg" className="bg-[#EAB308] hover:bg-[#FDE68A] text-[#0F172A] hover:text-[#0F172A] font-semibold text-lg px-8 shadow-lg">
                Browse Our Fleet
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="border-[#EAB308] text-white hover:bg-[#EAB308]/20 hover:text-white font-semibold text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="w-full max-w-5xl mx-auto animate-[slideUp_0.5s_ease-out_0.3s] z-10 mt-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-7">
              <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-[#0F172A] mb-5 text-center">
                Find Your Perfect Ride
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <MapIcon className="h-4 w-4 text-[#EAB308] mr-1" />
                      <span>Pickup Location</span>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapIcon className="h-5 w-5 text-[#EAB308]" />
                    </div>
                    <Select onValueChange={setPickupLocation}>
                      <SelectTrigger className="pl-10 w-full h-12 bg-white/90 backdrop-blur-sm border-gray-300 hover:border-[#EAB308] focus:ring-[#EAB308] focus:border-[#EAB308] shadow-sm rounded-lg">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        <SelectGroup>
                          <SelectLabel className="text-[#EAB308] font-medium">Major Cities</SelectLabel>
                          <SelectItem value="mumbai" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">🏙️</span> Mumbai
                            </div>
                          </SelectItem>
                          <SelectItem value="delhi" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">🏛️</span> New Delhi
                            </div>
                          </SelectItem>
                          <SelectItem value="bangalore" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">💻</span> Bangalore
                            </div>
                          </SelectItem>
                          <SelectItem value="chennai" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">🌊</span> Chennai
                            </div>
                          </SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel className="text-[#EAB308] font-medium">Popular Destinations</SelectLabel>
                          <SelectItem value="ahmedabad" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">🏯</span> Ahmedabad
                            </div>
                          </SelectItem>
                          <SelectItem value="hyderabad" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">🍲</span> Hyderabad
                            </div>
                          </SelectItem>
                          <SelectItem value="jaipur" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">🏰</span> Jaipur
                            </div>
                          </SelectItem>
                          <SelectItem value="kolkata" className="hover:bg-[#EAB308]/10">
                            <div className="flex items-center">
                              <span className="mr-2">🌉</span> Kolkata
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-[#EAB308] mr-1" />
                      <span>Pickup Date</span>
                    </span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-12 pl-10 text-left font-normal border-gray-300 hover:border-[#EAB308] focus:ring-[#EAB308] focus:border-[#EAB308] shadow-sm rounded-lg",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-[#EAB308]" />
                        </div>
                        {pickupDate ? (
                          format(pickupDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 shadow-lg rounded-lg border-[#EAB308]/20" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="rounded-lg"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-[#EAB308] mr-1" />
                      <span>Return Date</span>
                    </span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-12 pl-10 text-left font-normal border-gray-300 hover:border-[#EAB308] focus:ring-[#EAB308] focus:border-[#EAB308] shadow-sm rounded-lg",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-[#EAB308]" />
                        </div>
                        {returnDate ? (
                          format(returnDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 shadow-lg rounded-lg border-[#EAB308]/20" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        disabled={(date) => {
                          const isPastDate = date < new Date();
                          const isBeforePickup = pickupDate ? date < pickupDate : false;
                          return isPastDate || isBeforePickup;
                        }}
                        initialFocus
                        className="rounded-lg"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={handleSearch}
                  className="relative bg-gradient-to-r from-[#0F172A] to-[#1E293B] hover:from-[#1E293B] hover:to-[#0F172A] text-white h-14 px-10 text-lg font-medium rounded-full shadow-xl overflow-hidden group transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    <span>Search Available Cars</span>
                    <MapIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
