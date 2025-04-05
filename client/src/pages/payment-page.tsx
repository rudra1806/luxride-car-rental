import React, { useState, useEffect } from 'react';
import { useLocation, useRoute, useLocation as useNavigate } from 'wouter';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { format } from 'date-fns';
import { CalendarIcon, CreditCardIcon, IndianRupeeIcon, AlertCircleIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const PaymentPage = () => {
  const [_, setLocation] = useNavigate();
  const { cartItem, removeFromCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });
  const [bookingId, setBookingId] = useState<string>(`BOOKING-${Math.floor(Math.random() * 1000000000000)}`);

  useEffect(() => {
    // If no cart item or user not logged in, redirect to home
    if (!cartItem || !user) {
      setLocation('/');
    }
  }, [cartItem, user, setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDays = () => {
    if (!cartItem) return 0;
    
    const pickup = new Date(cartItem.pickupDate);
    const returnDate = new Date(cartItem.returnDate);
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // Minimum 1 day
  };

  const days = calculateDays();
  const subtotal = cartItem ? cartItem.car.price * days : 0;
  const gst = subtotal * 0.18; // 18% GST
  const totalAmount = subtotal + gst;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cartItem || !user) return;
    
    try {
      setIsSubmitting(true);
      
      // Create booking
      const bookingData = {
        carId: cartItem.car.id,
        userId: user.id,
        pickupDate: cartItem.pickupDate,
        returnDate: cartItem.returnDate,
        pickupLocation: cartItem.pickupLocation,
        totalPrice: totalAmount
      };
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`${response.status}: ${text || response.statusText}`);
      }
      
      // Clear cart item
      removeFromCart();
      
      // Show success message
      toast({
        title: "Booking Confirmed!",
        description: "Your car has been successfully booked.",
        variant: "default",
      });
      
      // Redirect to dashboard
      setLocation('/dashboard');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartItem) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Reservation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Please provide your payment details to confirm your booking</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <RadioGroup
                    defaultValue="credit-card"
                    className="grid grid-cols-3 gap-4 mb-6"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'credit-card' ? 'border-[#F59E0B] bg-orange-50' : 'border-gray-200'}`}>
                      <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                      <CreditCardIcon className={`h-6 w-6 mb-2 ${paymentMethod === 'credit-card' ? 'text-[#F59E0B]' : 'text-gray-500'}`} />
                      <Label htmlFor="credit-card" className={`font-medium ${paymentMethod === 'credit-card' ? 'text-[#F59E0B]' : 'text-gray-700'}`}>Credit Card</Label>
                    </div>
                    <div className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#F59E0B] bg-orange-50' : 'border-gray-200'}`}>
                      <RadioGroupItem value="upi" id="upi" className="sr-only" />
                      <svg className={`h-6 w-6 mb-2 ${paymentMethod === 'upi' ? 'text-[#F59E0B]' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 12H14L12 16L10 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <Label htmlFor="upi" className={`font-medium ${paymentMethod === 'upi' ? 'text-[#F59E0B]' : 'text-gray-700'}`}>UPI</Label>
                    </div>
                    <div className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'net-banking' ? 'border-[#F59E0B] bg-orange-50' : 'border-gray-200'}`}>
                      <RadioGroupItem value="net-banking" id="net-banking" className="sr-only" />
                      <svg className={`h-6 w-6 mb-2 ${paymentMethod === 'net-banking' ? 'text-[#F59E0B]' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7V17H20V7H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 13H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <Label htmlFor="net-banking" className={`font-medium ${paymentMethod === 'net-banking' ? 'text-[#F59E0B]' : 'text-gray-700'}`}>Net Banking</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          placeholder="yourname@upi"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'net-banking' && (
                    <div className="space-y-4">
                      <div className="text-center py-10">
                        <p className="text-gray-600 mb-2">You will be redirected to your bank's website to complete the payment</p>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-semibold py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Reservation'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Reservation Summary */}
          <div>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Reservation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cartItem.car.brand} {cartItem.car.name}</h3>
                  <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-600">Pickup Location</p>
                  <p className="text-right font-medium">{cartItem.pickupLocation}</p>
                  
                  <p className="text-gray-600">Pickup Date</p>
                  <p className="text-right font-medium">{format(new Date(cartItem.pickupDate), 'dd MMM yyyy')}</p>
                  
                  <p className="text-gray-600">Return Date</p>
                  <p className="text-right font-medium">{format(new Date(cartItem.returnDate), 'dd MMM yyyy')}</p>
                  
                  <p className="text-gray-600">Rental Duration</p>
                  <p className="text-right font-medium">{days} days</p>
                </div>
                
                <Separator className="my-2" />
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-right font-medium">₹{subtotal.toLocaleString()}</p>
                  
                  <p className="text-gray-600">GST (18%)</p>
                  <p className="text-right font-medium">₹{gst.toLocaleString()}</p>
                </div>
                
                <Separator className="my-2" />
                
                <div className="grid grid-cols-2 gap-2 text-lg font-bold">
                  <p>Total Amount</p>
                  <p className="text-right">₹{totalAmount.toLocaleString()}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <div className="w-full">
                  <h3 className="font-semibold mb-3">Cancellation Policy</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <AlertCircleIcon className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                      <span>Free cancellation up to 48 hours before pickup</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircleIcon className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                      <span>50% charge for cancellations within 24-48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircleIcon className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                      <span>No refund for cancellations less than 24 hours</span>
                    </li>
                  </ul>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;