import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { addDays, format, differenceInDays } from 'date-fns';
import { Car } from '@shared/schema';
import { motion, AnimatePresence } from 'framer-motion';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  "New York City",
  "Los Angeles",
  "Chicago",
  "Miami",
  "Las Vegas",
  "San Francisco"
];

const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, isOpen, onClose }) => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextWeek = addDays(today, 7);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [location, setLocation] = useState<string>(locations[0]);
  const [pickupDate, setPickupDate] = useState<Date>(tomorrow);
  const [returnDate, setReturnDate] = useState<Date>(nextWeek);
  const [selectedExtras, setSelectedExtras] = useState({
    insurance: true,
    gps: false,
    childSeat: false
  });
  
  // Simulate multiple images for the car (in a real app, this would come from the API)
  const carImages = [
    car?.imageUrl,
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ].filter(Boolean) as string[];
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
  };
  
  // Calculate total price
  const calculateTotal = () => {
    if (!car) return 0;
    
    const days = differenceInDays(returnDate, pickupDate);
    const baseRate = car.dailyRate * days;
    
    let extras = 0;
    if (selectedExtras.insurance) extras += 25 * days;
    if (selectedExtras.gps) extras += 10 * days;
    if (selectedExtras.childSeat) extras += 5 * days;
    
    const taxesAndFees = (baseRate + extras) * 0.1; // 10% for taxes and fees
    
    return {
      baseRate,
      extras,
      taxesAndFees,
      total: baseRate + extras + taxesAndFees
    };
  };
  
  const pricing = calculateTotal();
  
  if (!car) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto" onClick={onClose}>
          <motion.div 
            className="h-full overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-end mb-2">
                <button className="text-white text-2xl hover:text-[#D4AF37]" onClick={onClose}>
                  <X size={24} />
                </button>
              </div>
              
              <motion.div 
                className="bg-white rounded-lg overflow-hidden"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Car Image Carousel */}
                <div className="relative h-96 md:h-[500px]">
                  <img 
                    src={carImages[currentImageIndex]} 
                    alt={car.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button 
                      className="bg-[#0F1A2A]/80 text-white h-10 w-10 flex items-center justify-center rounded-full"
                      onClick={handlePrevImage}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button 
                      className="bg-[#0F1A2A]/80 text-white h-10 w-10 flex items-center justify-center rounded-full"
                      onClick={handleNextImage}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                  {/* Car Details */}
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-start">
                      <h2 className="text-3xl font-bold font-playfair">{car.name}</h2>
                      <div className="bg-[#D4AF37] text-[#0F1A2A] font-bold py-1 px-3 rounded">
                        ${car.dailyRate}<span className="text-xs font-normal">/day</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas ${i < Math.floor(car.rating) ? 'fa-star' : i < car.rating ? 'fa-star-half-alt' : 'fa-star text-gray-300'} text-[#D4AF37]`}
                          ></i>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-[#2A2A2A]/70">{car.reviewCount} reviews</span>
                    </div>
                    
                    <p className="text-[#2A2A2A]/80 mb-8">
                      {car.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-4">Key Specifications</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#0F1A2A]/10 flex items-center justify-center mr-3">
                          <i className="fas fa-car text-[#0F1A2A]"></i>
                        </div>
                        <div>
                          <p className="text-sm text-[#2A2A2A]/60">Engine</p>
                          <p className="font-medium">{car.engine}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#0F1A2A]/10 flex items-center justify-center mr-3">
                          <i className="fas fa-tachometer-alt text-[#0F1A2A]"></i>
                        </div>
                        <div>
                          <p className="text-sm text-[#2A2A2A]/60">0-60 mph</p>
                          <p className="font-medium">{car.acceleration} seconds</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#0F1A2A]/10 flex items-center justify-center mr-3">
                          <i className="fas fa-horse text-[#0F1A2A]"></i>
                        </div>
                        <div>
                          <p className="text-sm text-[#2A2A2A]/60">Type</p>
                          <p className="font-medium">{car.type.charAt(0).toUpperCase() + car.type.slice(1)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#0F1A2A]/10 flex items-center justify-center mr-3">
                          <i className="fas fa-cog text-[#0F1A2A]"></i>
                        </div>
                        <div>
                          <p className="text-sm text-[#2A2A2A]/60">Transmission</p>
                          <p className="font-medium">{car.transmission}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#0F1A2A]/10 flex items-center justify-center mr-3">
                          <i className="fas fa-user-friends text-[#0F1A2A]"></i>
                        </div>
                        <div>
                          <p className="text-sm text-[#2A2A2A]/60">Seats</p>
                          <p className="font-medium">{car.seats} Passengers</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#0F1A2A]/10 flex items-center justify-center mr-3">
                          <i className="fas fa-suitcase text-[#0F1A2A]"></i>
                        </div>
                        <div>
                          <p className="text-sm text-[#2A2A2A]/60">Luggage</p>
                          <p className="font-medium">{car.seats <= 2 ? '1 Large Bag' : '2 Large Bags'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
                    
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {car.features && car.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <i className="fas fa-check text-[#D4AF37] mr-2"></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Booking Form */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Book This Vehicle</h3>
                    
                    <form>
                      <div className="mb-4">
                        <Label className="block text-sm font-medium text-[#2A2A2A] mb-1">Pick-up Location</Label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger className="w-full px-4 py-2 rounded-md border border-gray-200">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="mb-4">
                        <Label className="block text-sm font-medium text-[#2A2A2A] mb-1">Pick-up Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full px-4 py-2 justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {pickupDate ? format(pickupDate, 'PPP') : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={pickupDate}
                              onSelect={(date) => date && setPickupDate(date)}
                              disabled={(date) => date < today}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="mb-4">
                        <Label className="block text-sm font-medium text-[#2A2A2A] mb-1">Return Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full px-4 py-2 justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {returnDate ? format(returnDate, 'PPP') : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={returnDate}
                              onSelect={(date) => date && setReturnDate(date)}
                              disabled={(date) => date <= pickupDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="mb-6">
                        <Label className="block text-sm font-medium text-[#2A2A2A] mb-1">Additional Options</Label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox 
                              id="insurance" 
                              checked={selectedExtras.insurance}
                              onCheckedChange={(checked) => 
                                setSelectedExtras({...selectedExtras, insurance: checked === true})
                              }
                              className="h-4 w-4 text-[#D4AF37]"
                            />
                            <label htmlFor="insurance" className="ml-2 text-sm">Premium Insurance ($25/day)</label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox 
                              id="gps" 
                              checked={selectedExtras.gps}
                              onCheckedChange={(checked) => 
                                setSelectedExtras({...selectedExtras, gps: checked === true})
                              }
                              className="h-4 w-4 text-[#D4AF37]"
                            />
                            <label htmlFor="gps" className="ml-2 text-sm">GPS Navigation ($10/day)</label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox 
                              id="child-seat" 
                              checked={selectedExtras.childSeat}
                              onCheckedChange={(checked) => 
                                setSelectedExtras({...selectedExtras, childSeat: checked === true})
                              }
                              className="h-4 w-4 text-[#D4AF37]"
                            />
                            <label htmlFor="child-seat" className="ml-2 text-sm">Child Seat ($5/day)</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mb-4">
                        <div className="flex justify-between mb-2">
                          <span>Base Rate ({differenceInDays(returnDate, pickupDate)} days)</span>
                          <span className="font-medium">${pricing.baseRate.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Extras</span>
                          <span className="font-medium">${pricing.extras.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Taxes & Fees</span>
                          <span className="font-medium">${pricing.taxesAndFees.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                          <span className="font-bold">Total</span>
                          <span className="font-bold">${pricing.total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#D4AF37] hover:bg-[#E4BF47] text-[#0F1A2A] font-semibold py-3 rounded-md transition-colors"
                      >
                        Reserve Now
                      </Button>
                      
                      <p className="text-xs text-center mt-4 text-[#2A2A2A]/60">
                        No charge until pickup. Free cancellation up to 24 hours before pickup.
                      </p>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CarDetailModal;
