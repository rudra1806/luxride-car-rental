import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const locations = [
  "New York City",
  "Los Angeles",
  "Chicago",
  "Miami",
  "Las Vegas",
  "San Francisco"
];

const SearchBar: React.FC = () => {
  const [, navigate] = useLocation();
  const [location, setLocation] = useState<string>(locations[0]);
  
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextWeek = addDays(today, 7);
  
  const [pickupDate, setPickupDate] = useState<Date>(tomorrow);
  const [returnDate, setReturnDate] = useState<Date>(nextWeek);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    searchParams.set('location', location);
    searchParams.set('pickup', format(pickupDate, 'yyyy-MM-dd'));
    searchParams.set('return', format(returnDate, 'yyyy-MM-dd'));
    
    navigate(`/vehicles?${searchParams.toString()}`);
  };

  return (
    <Card className="bg-white rounded-lg shadow-xl">
      <CardContent className="px-4 py-6 md:py-8">
        <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" onSubmit={handleSearch}>
          <div className="space-y-2">
            <Label htmlFor="location" className="block text-sm font-medium text-[#2A2A2A]">Pick-up Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" className="w-full px-4 py-6 rounded-md border border-gray-200">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pickup-date" className="block text-sm font-medium text-[#2A2A2A]">Pick-up Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="pickup-date"
                  variant="outline"
                  className="w-full py-6 px-4 justify-start text-left font-normal border border-gray-200"
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
          
          <div className="space-y-2">
            <Label htmlFor="return-date" className="block text-sm font-medium text-[#2A2A2A]">Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="return-date"
                  variant="outline"
                  className="w-full py-6 px-4 justify-start text-left font-normal border border-gray-200"
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
          
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full bg-[#0F1A2A] hover:bg-[#1F2A3A] text-white py-6 px-6 rounded-md transition-colors font-semibold"
            >
              Search Vehicles
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
