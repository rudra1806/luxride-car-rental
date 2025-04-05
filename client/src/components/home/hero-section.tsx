import { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';

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

  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };
  
  const slideUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.8
      }
    }
  };
  
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative min-h-screen bg-[#0C1323] overflow-hidden">
      {/* Premium Car Background - More visible but still subtle */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1549399542-7e8f2e928464?q=80&w=2974')",
          backgroundPosition: "right center",
          backgroundSize: "60%",
          filter: "brightness(0.6)"
        }}
      />
      
      {/* Dynamic Overlay with Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[#0C1323] via-[#0C1323]/90 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Gold accent lines */}
        <motion.div 
          className="absolute top-1/4 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-[#EAB308]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "30%", opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        <motion.div 
          className="absolute top-2/3 right-10 w-1/4 h-[1px] bg-gradient-to-r from-transparent to-[#EAB308]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "20%", opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 md:pt-36 lg:pt-40 pb-16">
        <div className="max-w-4xl">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 text-white leading-tight font-['Playfair_Display']"
              variants={fadeIn}
            >
              Experience <span className="text-[#EAB308] inline-block relative">
                <span className="relative z-10">Luxury</span>
                <motion.span 
                  className="absolute bottom-2 left-0 w-full h-[6px] bg-[#EAB308]/20"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                />
              </span>
            </motion.h1>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight font-['Playfair_Display']"
              variants={fadeIn}
            >
              on Wheels
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-300 mb-12 max-w-2xl"
            variants={slideUp}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            Rent our premium cars and make your journey as exceptional as the destination.
            Drive in style, comfort, and sophistication.
          </motion.p>

          {/* Search panel */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/10"
            variants={fadeIn}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Location */}
              <motion.div variants={itemVariant}>
                <label className="block text-white text-sm font-medium mb-2">Location</label>
                <div className="relative rounded-md">
                  <Select defaultValue={pickupLocation} onValueChange={setPickupLocation}>
                    <SelectTrigger className="w-full bg-white/5 border-none text-white h-12 hover:border hover:border-[#EAB308]/50 transition-all">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-[#EAB308]" />
                        <SelectValue placeholder="Select location" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-[#0C1323] border border-[#EAB308]/20 text-white">
                      <SelectGroup>
                        <SelectLabel className="text-[#EAB308]">Major Cities</SelectLabel>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">New Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel className="text-[#EAB308]">Other Destinations</SelectLabel>
                        <SelectItem value="Jaipur">Jaipur</SelectItem>
                        <SelectItem value="Goa">Goa</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Pickup Date */}
              <motion.div variants={itemVariant}>
                <label className="block text-white text-sm font-medium mb-2">Pickup Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left bg-white/5 border-none text-white hover:border hover:border-[#EAB308]/50 transition-all",
                        !pickupDate && "text-gray-400"
                      )}
                    >
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-[#EAB308]" />
                        {pickupDate ? format(pickupDate, "PPP") : "Select date"}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#0C1323] border border-[#EAB308]/20">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                      className="bg-[#0C1323] text-white"
                    />
                  </PopoverContent>
                </Popover>
              </motion.div>

              {/* Return Date */}
              <motion.div variants={itemVariant}>
                <label className="block text-white text-sm font-medium mb-2">Return Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left bg-white/5 border-none text-white hover:border hover:border-[#EAB308]/50 transition-all",
                        !returnDate && "text-gray-400"
                      )}
                    >
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-[#EAB308]" />
                        {returnDate ? format(returnDate, "PPP") : "Select date"}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#0C1323] border border-[#EAB308]/20">
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
              </motion.div>
            </motion.div>

            {/* Search Button */}
            <motion.div 
              className="mt-8"
              variants={fadeIn}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              transition={{ delay: 1.2 }}
            >
              <Button 
                onClick={handleSearch}
                className="w-full h-12 bg-[#EAB308] hover:bg-[#EAB308]/90 text-black font-semibold relative overflow-hidden group"
              >
                <span className="relative z-10">Find Vehicles</span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated decorative elements */}
      <motion.div 
        className="absolute bottom-8 right-8 h-20 w-20 rounded-full border border-[#EAB308]/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-4 right-4 h-30 w-30 rounded-full border border-[#EAB308]/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 1.8 }}
      />
    </section>
  );
};

export default HeroSection;