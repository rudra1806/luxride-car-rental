import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { navigate } from 'wouter/use-browser-location';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Booking, Car, User } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { format } from 'date-fns';
import { Check, Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const BookingSuccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking & { car?: Car; user?: User }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!id) return;

        // Get the booking
        const response = await apiRequest('GET', `/api/bookings/${id}`);
        const bookingData = await response.json();
        setBooking(bookingData);
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EAB308]"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
        <p className="mb-6">We couldn't find the booking you're looking for.</p>
        <Button onClick={() => navigate('/vehicles')}>Browse Vehicles</Button>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    return format(new Date(date), 'dd MMM yyyy');
  };

  // Calculate the number of days
  const pickupDate = new Date(booking.pickupDate);
  const returnDate = new Date(booking.returnDate);
  const days = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate pricing
  const subtotal = booking.totalPrice;
  const gst = subtotal * 0.18;
  const totalAmount = subtotal + gst;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
          <Check className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4 font-['Playfair_Display']">Booking Confirmed!</h1>
        <p className="text-gray-600 text-lg">
          Your reservation has been successfully confirmed. A confirmation email has been sent to your registered email address.
        </p>
      </div>

      <Card className="shadow-lg border-0 mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h2 className="text-xl font-bold">{booking.car?.brand} {booking.car?.name}</h2>
              <p className="text-gray-500">Booking ID: {`BOOKING-${booking.id}${Date.now().toString().slice(-4)}`}</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-[#EAB308] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Date</p>
                    <p className="font-medium">{formatDate(booking.pickupDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-[#EAB308] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Return Date</p>
                    <p className="font-medium">{formatDate(booking.returnDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#EAB308] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium">{booking.pickupLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-[#EAB308] mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Rental Duration</p>
                    <p className="font-medium">{days} days</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
              <h3 className="font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>{formatCurrency(gst)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="flex items-center"
        >
          Go to My Bookings
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
        
        <Button 
          onClick={() => navigate('/vehicles')}
          className="bg-[#EAB308] hover:bg-[#FDE68A] text-black flex items-center"
        >
          Browse More Vehicles
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccessPage;