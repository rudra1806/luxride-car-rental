import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
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
    <section className="relative min-h-screen pt-32 pb-48">
      <div 
        className="absolute inset-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-[rgba(15,23,42,0.7)] before:to-[rgba(15,23,42,0.8)]" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070')" }}
      >
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="animate-[fadeIn_0.5s_ease-out] mb-20 mt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight max-w-2xl">
            Experience Luxury on <span className="text-[#EAB308]">Your Terms</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-200 font-['Inter']">
            Rent premium vehicles for any occasion. Elevate your journey with our exclusive fleet of luxury cars.
          </p>
          <div className="mt-10">
            <Link href="/vehicles">
              <Button size="lg" className="bg-[#EAB308] hover:bg-[#FDE68A] text-[#0F172A] hover:text-[#0F172A]">
                Browse Our Fleet
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="ml-4 border-[#EAB308] text-white hover:bg-[#1E293B] hover:text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-5xl mx-auto px-4 animate-[slideUp_0.5s_ease-out] z-10 mt-10 w-full">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-5">
              <h2 className="text-2xl font-['Playfair_Display'] font-semibold text-[#0F172A] mb-4">Find Your Perfect Ride</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <Select onValueChange={setPickupLocation}>
                      <SelectTrigger className="pl-10 w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-york">New York City</SelectItem>
                        <SelectItem value="los-angeles">Los Angeles</SelectItem>
                        <SelectItem value="miami">Miami</SelectItem>
                        <SelectItem value="chicago">Chicago</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-10 text-left font-normal",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        {pickupDate ? (
                          format(pickupDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-10 text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        {returnDate ? (
                          format(returnDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleSearch}
                  className="bg-[#0F172A] hover:bg-[#1E293B]"
                >
                  <span className="mr-2">🔍</span> Search Available Cars
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
