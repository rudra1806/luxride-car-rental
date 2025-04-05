import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useSearch } from '@/context/search-context';
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
  const { setSearchParams } = useSearch();
  const [location, setPickupLocation] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const handleSearch = () => {
    // Store search parameters in context
    setSearchParams(location, pickupDate, returnDate);
    
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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=85&w=2070')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/95 via-[#0F172A]/80 to-[#0F172A]/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ4MCIgaGVpZ2h0PSI2NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik03MzEuMjA3IDY0OS44MDJDOTM1LjQ4NCA2NDkuODAyIDExMDIuNjMgNTA1LjQyNiAxMTAyLjYzIDMyNS4wODJDMTEwMi42MyAxNDQuNzM5IDkzNS40ODQgMC4zNjMwMzcgNzMxLjIwNyAwLjM2MzAzN0M1MjYuOTMgMC4zNjMwMzcgMzU5Ljc4NCAxNDQuNzM5IDM1OS43ODQgMzI1LjA4MkMzNTkuNzg0IDUwNS40MjYgNTI2LjkzIDY0OS44MDIgNzMxLjIwNyA2NDkuODAyWiIgZmlsbD0iI0VBQjMwOCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] bg-no-repeat bg-right-top opacity-60"></div>
      </div>
      
      {/* Content container */}
      <div className="relative h-full flex flex-col items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero text content */}
        <div className="w-full max-w-3xl mx-auto text-center animate-[fadeIn_0.8s_ease-out] mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EAB308]/10 text-[#EAB308] font-medium text-sm mb-6 border border-[#EAB308]/20 backdrop-blur-sm">
            The Ultimate Luxury Experience
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-['Playfair_Display'] leading-tight mb-6">
            Experience Luxury on <br/>
            <span className="relative">
              <span className="relative z-10 text-[#EAB308] drop-shadow-lg">Your Terms</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-[#EAB308]/20 -z-10 translate-y-2"></span>
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-100/90 font-['Inter'] max-w-2xl mx-auto leading-relaxed">
            Rent premium vehicles for any occasion. Elevate your journey with our exclusive fleet of luxury cars.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link href="/vehicles">
              <Button size="lg" className="bg-gradient-to-r from-[#EAB308] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#EAB308] text-[#0F172A] font-semibold text-lg px-10 py-7 rounded-xl shadow-[0_8px_30px_rgb(234,179,8,0.3)] transition-all duration-300 hover:shadow-[0_8px_20px_rgb(234,179,8,0.5)]">
                Browse Our Fleet
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="border-2 border-[#EAB308]/50 text-white hover:bg-[#EAB308]/10 hover:border-[#EAB308] hover:text-white font-semibold text-lg px-10 py-7 rounded-xl backdrop-blur-sm transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="w-full max-w-5xl mx-auto animate-[slideUp_0.5s_ease-out_0.3s] z-10 mt-10">
          <div className="bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/80 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.5)] overflow-hidden border border-white/10">
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="h-[2px] w-10 bg-gradient-to-r from-transparent to-[#EAB308]"></div>
                <h2 className="mx-4 text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-white">
                  Find Your <span className="text-[#EAB308]">Perfect Ride</span>
                </h2>
                <div className="h-[2px] w-10 bg-gradient-to-l from-transparent to-[#EAB308]"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative">
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    <span className="flex items-center">
                      <MapIcon className="h-4 w-4 text-[#EAB308] mr-2" />
                      <span>Pickup Location</span>
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EAB308] to-[#D4AF37] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapIcon className="h-5 w-5 text-[#EAB308]" />
                      </div>
                      <Select onValueChange={setPickupLocation}>
                        <SelectTrigger className="pl-10 w-full h-14 bg-[#0F172A]/90 text-white backdrop-blur-sm border-white/10 hover:border-[#EAB308]/70 focus:ring-[#EAB308]/50 focus:border-[#EAB308]/70 shadow-lg hover:shadow-[#EAB308]/20 rounded-xl transition-all duration-300">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto bg-[#0F172A] border border-[#EAB308]/20 text-white">
                          <SelectGroup>
                            <SelectLabel className="text-[#EAB308] font-medium text-sm">Major Cities</SelectLabel>
                            <SelectItem value="Mumbai" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">🏙️</span>
                                <span className="font-medium">Mumbai</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Delhi" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">🏛️</span>
                                <span className="font-medium">New Delhi</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Bangalore" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">💻</span>
                                <span className="font-medium">Bangalore</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Chennai" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">🌊</span>
                                <span className="font-medium">Chennai</span>
                              </div>
                            </SelectItem>
                          </SelectGroup>
                          <SelectSeparator className="bg-white/10" />
                          <SelectGroup>
                            <SelectLabel className="text-[#EAB308] font-medium text-sm">Popular Destinations</SelectLabel>
                            <SelectItem value="Ahmedabad" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">🏯</span>
                                <span className="font-medium">Ahmedabad</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Hyderabad" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">🍲</span>
                                <span className="font-medium">Hyderabad</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Jaipur" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">🏰</span>
                                <span className="font-medium">Jaipur</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Kolkata" className="hover:bg-[#EAB308]/10 focus:bg-[#EAB308]/10">
                              <div className="flex items-center py-1">
                                <span className="mr-2">🌉</span>
                                <span className="font-medium">Kolkata</span>
                              </div>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-[#EAB308] mr-2" />
                      <span>Pickup Date</span>
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EAB308] to-[#D4AF37] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-14 pl-10 text-left font-normal bg-[#0F172A]/90 text-white border-white/10 hover:border-[#EAB308]/70 focus:ring-[#EAB308]/50 focus:border-[#EAB308]/70 shadow-lg hover:shadow-[#EAB308]/20 rounded-xl transition-all duration-300",
                              !pickupDate && "text-white/50"
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
                        <PopoverContent className="w-auto p-0 bg-[#0F172A] shadow-xl rounded-xl border-[#EAB308]/30" align="start">
                          <Calendar
                            mode="single"
                            selected={pickupDate}
                            onSelect={setPickupDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="rounded-xl text-white bg-[#0F172A]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    <span className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-[#EAB308] mr-2" />
                      <span>Return Date</span>
                    </span>
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EAB308] to-[#D4AF37] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-14 pl-10 text-left font-normal bg-[#0F172A]/90 text-white border-white/10 hover:border-[#EAB308]/70 focus:ring-[#EAB308]/50 focus:border-[#EAB308]/70 shadow-lg hover:shadow-[#EAB308]/20 rounded-xl transition-all duration-300",
                              !returnDate && "text-white/50"
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
                        <PopoverContent className="w-auto p-0 bg-[#0F172A] shadow-xl rounded-xl border-[#EAB308]/30" align="start">
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
                            className="rounded-xl text-white bg-[#0F172A]"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#EAB308] to-[#D4AF37] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                  <Button 
                    onClick={handleSearch}
                    className="relative bg-gradient-to-r from-[#0F172A] to-[#1E293B] hover:from-[#1E293B] hover:to-[#0F172A] text-white h-14 px-14 text-lg font-medium rounded-full shadow-xl overflow-hidden group transition-all duration-300 border border-[#EAB308]/20"
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
      </div>
    </section>
  );
};

export default HeroSection;
