import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { navigate } from 'wouter/use-browser-location';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { apiRequest } from '@/lib/queryClient';
import { Booking, Car } from '@shared/schema';
import { useAuth } from '@/hooks/use-auth';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CreditCard, Smartphone, Building } from 'lucide-react';

const PaymentConfirmationPage = () => {
  const { cartItem, removeFromCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  if (!cartItem || !user) {
    setTimeout(() => navigate('/vehicles'), 0);
    return null;
  }

  const { car, pickupDate, returnDate, pickupLocation, totalPrice, days } = cartItem;

  // Generate a booking ID
  const bookingId = `BOOKING-${Date.now()}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit-card' && (!cardName || !cardNumber || !expiryDate || !cvv)) {
      toast({
        title: "Missing Information",
        description: "Please fill all credit card details",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the booking with status successful
      const bookingData = {
        carId: car.id,
        userId: user.id,
        pickupDate,
        returnDate,
        pickupLocation,
        totalPrice,
        status: 'successful' // Set status as successful directly
      };

      const response = await apiRequest('POST', '/api/bookings', bookingData);
      
      const booking = await response.json();

      // Clear the cart
      removeFromCart();

      // Show success toast
      toast({
        title: "Booking Confirmed!",
        description: "Your reservation has been successfully confirmed.",
        variant: "default"
      });

      // Navigate directly to the dashboard without going through booking success page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "An error occurred while processing your booking. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  // The total price already includes GST (tax-inclusive pricing)
  const gstAmount = Math.round(totalPrice * 0.18 / 1.18); // Calculating the GST component from the total
  const basePrice = totalPrice - gstAmount;

  const formatDate = (date: Date) => format(date, 'dd MMM yyyy');

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-10 font-['Playfair_Display']">Complete Your Reservation</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Payment Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border-0">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Payment Information</h2>
              <p className="text-gray-600 mb-6">Please provide your payment details to confirm your booking</p>
              
              <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="credit-card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit Card</span>
                  </TabsTrigger>
                  <TabsTrigger value="upi" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span>UPI</span>
                  </TabsTrigger>
                  <TabsTrigger value="net-banking" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Net Banking</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="credit-card">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                      </label>
                      <Input 
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <Input 
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 16))}
                        placeholder="1234 5678 9012 3456"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <Input 
                          id="expiryDate"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <Input 
                          id="cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                          placeholder="123"
                          type="password"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full py-6 mt-6 bg-[#EAB308] hover:bg-[#FDE68A] text-black font-medium text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Complete Reservation'
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="upi">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID
                      </label>
                      <Input 
                        id="upiId"
                        placeholder="name@ybl"
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full py-6 mt-6 bg-[#EAB308] hover:bg-[#FDE68A] text-black font-medium text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Pay with UPI'
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="net-banking">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank) => (
                        <div key={bank} className="border rounded-md p-4 text-center hover:border-[#EAB308] cursor-pointer">
                          {bank}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full py-6 mt-6 bg-[#EAB308] hover:bg-[#FDE68A] text-black font-medium text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Pay with Net Banking'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Reservation Summary */}
        <div>
          <Card className="shadow-md border-0">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Reservation Summary</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{car.brand} {car.name}</h3>
                <p className="text-gray-500 text-sm">Booking ID: {bookingId}</p>
              </div>
              
              <div className="space-y-2 border-t border-b py-4 my-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Location</span>
                  <span className="font-medium">{pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Date</span>
                  <span className="font-medium">{formatDate(pickupDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Date</span>
                  <span className="font-medium">{formatDate(returnDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental Duration</span>
                  <span className="font-medium">{days} days</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Rental Price</span>
                  <span className="font-medium">{formatCurrency(basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">{formatCurrency(gstAmount)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold mt-4">
                  <span>Total Amount (GST Incl.)</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0 mt-6">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-2">Cancellation Policy</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Free cancellation up to 48 hours before pickup</li>
                <li>50% refund for cancellations between 24-48 hours</li>
                <li>No refund for cancellations less than 24 hours</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;