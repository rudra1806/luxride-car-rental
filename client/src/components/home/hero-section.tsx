import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useSearch } from '@/context/search-context';
import { 
  Select, 
  SelectContent, 
  SelectGroup,
  SelectItem, 
  SelectLabel,
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [_, setLocation] = useLocation();
  const { setSearchParams } = useSearch();
  const [pickupLocation, setPickupLocation] = useState<string>('Mumbai');
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const handleSearch = () => {
    // Store search parameters in context
    setSearchParams(pickupLocation, pickupDate, returnDate);
    
    // Build the search query
    const searchParams = new URLSearchParams();
    if (pickupLocation) searchParams.set('location', pickupLocation);
    if (pickupDate) searchParams.set('pickup', pickupDate.toISOString());
    if (returnDate) searchParams.set('return', returnDate.toISOString());
    
    setLocation(`/vehicles?${searchParams.toString()}`);
  };

  return (
    <section className="relative min-h-screen bg-[#0C1323]">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=1934')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1323] via-[#0C1323]/95 to-[#0C1323]/90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Experience <span className="text-[#F59E0B]">Luxury</span> on<br />Wheels
          </h1>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl">
            Rent our premium cars and make your journey as exceptional as the destination.
            Drive in style, comfort, and sophistication.
          </p>

          {/* Search panel */}
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 shadow-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Location</label>
                <div className="relative rounded-md">
                  <Select defaultValue={pickupLocation} onValueChange={setPickupLocation}>
                    <SelectTrigger className="w-full bg-white/5 border-none text-white h-12">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-[#F59E0B]" />
                        <SelectValue placeholder="Select location" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-[#0C1323] border border-white/10 text-white">
                      <SelectGroup>
                        <SelectLabel className="text-[#F59E0B]">Major Cities</SelectLabel>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">New Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel className="text-[#F59E0B]">Other Destinations</SelectLabel>
                        <SelectItem value="Jaipur">Jaipur</SelectItem>
                        <SelectItem value="Goa">Goa</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Pickup Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left bg-white/5 border-none text-white",
                        !pickupDate && "text-gray-400"
                      )}
                    >
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-[#F59E0B]" />
                        {pickupDate ? format(pickupDate, "PPP") : "Select date"}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#0C1323] border border-white/10">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                      className="bg-[#0C1323] text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Return Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left bg-white/5 border-none text-white",
                        !returnDate && "text-gray-400"
                      )}
                    >
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-[#F59E0B]" />
                        {returnDate ? format(returnDate, "PPP") : "Select date"}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#0C1323] border border-white/10">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => {
                        return pickupDate ? date < pickupDate : date < new Date();
                      }}
                      initialFocus
                      className="bg-[#0C1323] text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <Button 
                onClick={handleSearch}
                className="w-full h-12 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-black font-semibold"
              >
                Find Vehicles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;