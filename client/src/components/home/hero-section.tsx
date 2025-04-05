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
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/logo';

const HeroSection = () => {
  const [_, setLocation] = useLocation();
  const { setSearchParams } = useSearch();
  const [location, setPickupLocation] = useState<string>('Pune');
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
    <section className="relative min-h-[100vh] bg-[#101826]">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=85&w=2070')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#101826]/95 via-[#101826]/85 to-[#101826]/70"></div>
      </div>
      
      {/* Content container */}
      <div className="relative h-full flex flex-col justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-12rem)]">
          {/* Left column - Hero text */}
          <div className="w-full animate-[fadeIn_0.8s_ease-out] text-left mt-12 lg:mt-0">
            <h1 className="text-5xl md:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight">
              Experience <span className="text-[#F59E0B]">Luxe</span><br/>
              <span className="text-white">Wheels</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
              Rent our premium cars and make your journey memorable to any destination.
              Drive in style, comfort, and sophistication.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/vehicles">
                <Button 
                  size="lg" 
                  className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-medium px-6 py-3 rounded"
                >
                  Find Vehicles
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border border-gray-300 text-white hover:bg-white/5 hover:border-white hover:text-white font-medium px-6 py-3 rounded"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right column - Calendar and search form */}
          <div className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl animate-[fadeIn_0.8s_ease-out_0.3s]">
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-white mb-1">April 2025</h2>
              <div className="flex space-x-2 text-sm text-gray-300">
                <button className="hover:text-[#F59E0B]">&lt;</button>
                <span>Select dates for your journey</span>
                <button className="hover:text-[#F59E0B]">&gt;</button>
              </div>
            </div>
            
            {/* Calendar header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              <div className="text-sm text-gray-400">Su</div>
              <div className="text-sm text-gray-400">Mo</div>
              <div className="text-sm text-gray-400">Tu</div>
              <div className="text-sm text-gray-400">We</div>
              <div className="text-sm text-gray-400">Th</div>
              <div className="text-sm text-gray-400">Fr</div>
              <div className="text-sm text-gray-400">Sa</div>
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {/* Week 1 */}
              <div className="text-center text-sm text-gray-400 p-2">30</div>
              <div className="text-center text-sm text-gray-400 p-2">31</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">1</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">2</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">3</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">4</div>
              <div className="text-center text-sm text-white p-2 bg-[#F59E0B] rounded cursor-pointer">5</div>
              
              {/* Week 2 */}
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">6</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">7</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">8</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">9</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">10</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">11</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">12</div>
              
              {/* Week 3 */}
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">13</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">14</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">15</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">16</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">17</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">18</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">19</div>
              
              {/* Week 4 */}
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">20</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">21</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">22</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">23</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">24</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">25</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">26</div>
              
              {/* Week 5 */}
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">27</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">28</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">29</div>
              <div className="text-center text-sm text-white p-2 hover:bg-white/10 rounded cursor-pointer">30</div>
              <div className="text-center text-sm text-gray-400 p-2">1</div>
              <div className="text-center text-sm text-gray-400 p-2">2</div>
              <div className="text-center text-sm text-gray-400 p-2">3</div>
            </div>
            
            {/* Search form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <Select onValueChange={setPickupLocation}>
                  <SelectTrigger className="w-full h-11 bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Pune" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#101826] border border-white/10 text-white">
                    <SelectGroup>
                      <SelectLabel className="text-[#F59E0B]">Major Cities</SelectLabel>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal bg-white/5 text-white border-white/10",
                          !pickupDate && "text-gray-400"
                        )}
                      >
                        {pickupDate ? format(pickupDate, "PPP") : "Apr 16, 2025"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#101826] border-white/10" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Return Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal bg-white/5 text-white border-white/10",
                          !returnDate && "text-gray-400"
                        )}
                      >
                        {returnDate ? format(returnDate, "PPP") : "Apr 20, 2025"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#101826] border-white/10" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white mt-4"
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