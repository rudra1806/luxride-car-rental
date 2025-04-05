import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { differenceInDays, format, addDays } from 'date-fns';
import { Car } from '@shared/schema';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/context/cart-context';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface BookingFormProps {
  car: Car;
  initialLocation?: string;
  initialPickupDate?: Date;
  initialReturnDate?: Date;
}

const bookingFormSchema = z.object({
  pickupDate: z.date({
    required_error: "Pickup date is required",
  }),
  returnDate: z.date({
    required_error: "Return date is required",
  }),
  pickupLocation: z.string({
    required_error: "Pickup location is required",
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm = ({ car, initialLocation, initialPickupDate, initialReturnDate }: BookingFormProps) => {
  const { user } = useAuth();
  const { addToCart, calculateTotalPrice } = useCart();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Default values for the form, using initial values if provided
  const defaultValues: Partial<BookingFormValues> = {
    pickupDate: initialPickupDate || new Date(),
    returnDate: initialReturnDate || addDays(new Date(), 1),
    pickupLocation: initialLocation || 'Ahmedabad',
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });

  const { watch } = form;
  const pickupDate = watch('pickupDate');
  const returnDate = watch('returnDate');

  // Calculate the number of days between pickup and return
  useEffect(() => {
    if (pickupDate && returnDate) {
      const daysDiff = differenceInDays(returnDate, pickupDate);
      setDays(daysDiff > 0 ? daysDiff : 1);
    }
  }, [pickupDate, returnDate]);

  // Check if car is available for the selected dates
  useEffect(() => {
    const checkAvailability = async () => {
      if (pickupDate && returnDate) {
        try {
          const res = await apiRequest('POST', '/api/cars/check-availability', {
            carId: car.id,
            pickupDate,
            returnDate,
          });
          const data = await res.json();
          setIsAvailable(data.available);
        } catch (error) {
          console.error('Error checking availability:', error);
          setIsAvailable(true); // Default to available if there's an error
        }
      }
    };

    checkAvailability();
  }, [pickupDate, returnDate, car.id]);

  // Function to handle the booking
  const onSubmit = async (values: BookingFormValues) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login or register to book a car",
        variant: "destructive",
      });
      setLocation('/auth');
      return;
    }

    if (!isAvailable) {
      toast({
        title: "Car Not Available",
        description: "This car is not available for the selected dates",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const totalPrice = calculateTotalPrice(car, days);
      
      // Add to cart first
      addToCart({
        car,
        pickupDate: values.pickupDate,
        returnDate: values.returnDate,
        pickupLocation: values.pickupLocation,
        totalPrice,
        days,
      });

      // Create the booking directly
      const bookingData = {
        carId: car.id,
        userId: user.id,
        pickupDate: values.pickupDate,
        returnDate: values.returnDate,
        pickupLocation: values.pickupLocation,
        totalPrice,
        status: 'completed' // Set status to completed immediately
      };

      const res = await apiRequest('POST', '/api/bookings', bookingData);
      const booking = await res.json();
      
      toast({
        title: "Booking Successful",
        description: `Your reservation has been successfully confirmed.`,
      });

      // Redirect directly to dashboard
      setLocation('/dashboard');
    } catch (error) {
      console.error('Error booking car:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-['Playfair_Display'] font-semibold text-[#0F172A] mb-4">Book This Car</h2>
      <Separator className="mb-6" />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm text-gray-500">Price per day</span>
          <div className="text-3xl font-semibold text-[#0F172A]">₹{car.price}</div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">Total for {days} day{days !== 1 ? 's' : ''}</span>
          <div className="text-3xl font-semibold text-[#0F172A]">₹{car.price * days}</div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ahmedabad">Ahmedabad (Time Square Grande)</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Jaipur">Jaipur</SelectItem>
                    <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pickup Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Return Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const isPastDate = date < new Date();
                          const isBeforePickup = pickupDate ? date < pickupDate : false;
                          return isPastDate || isBeforePickup;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {!isAvailable && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
              This car is not available for the selected dates. Please choose different dates.
            </div>
          )}
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-[#0F172A] hover:bg-[#1E293B]"
              disabled={isLoading || !isAvailable}
            >
              {isLoading ? "Processing..." : "Book Now"}
            </Button>
            {!user && (
              <FormDescription className="text-center mt-2">
                You need to be logged in to book a car
              </FormDescription>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
