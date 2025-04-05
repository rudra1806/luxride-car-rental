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
    cardName: 'John Smith',
    cardNumber: '1234 5678 9012 3456',
    expiryDate: 'MM/YY',
    cvv: '123',
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
        description: "Your car has been successfully booked. You can view it in your dashboard.",
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
    <div className="bg-white min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Complete Your Reservation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <div className="border rounded-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                <p className="text-sm text-gray-500 mt-1">Please provide your payment details to confirm your booking</p>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <RadioGroup
                    defaultValue="credit-card"
                    className="grid grid-cols-3 gap-2 mb-6"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className={`border rounded-md p-4 flex items-center justify-center cursor-pointer transition-all ${paymentMethod === 'credit-card' ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                      <CreditCardIcon className="h-5 w-5 mr-2 text-gray-700" />
                      <span className="font-medium text-gray-800">Credit Card</span>
                    </div>
                    <div className={`border rounded-md p-4 flex items-center justify-center cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                      <span className="font-medium text-gray-800">UPI</span>
                    </div>
                    <div className={`border rounded-md p-4 flex items-center justify-center cursor-pointer transition-all ${paymentMethod === 'net-banking' ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                      <span className="font-medium text-gray-800">Net Banking</span>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="cardName" className="text-gray-700">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber" className="text-gray-700">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="mt-1 border-gray-300"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="text-gray-700">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="mt-1 border-gray-300"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-gray-700">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="mt-1 border-gray-300"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="upiId" className="text-gray-700">UPI ID</Label>
                        <Input
                          id="upiId"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          placeholder="yourname@upi"
                          className="mt-1 border-gray-300"
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
                    className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Reservation'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Right Column - Reservation Summary */}
          <div>
            <div className="border rounded-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Reservation Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{cartItem.car.brand} {cartItem.car.name}</h3>
                  <p className="text-sm text-gray-500">Booking ID: {bookingId}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pickup Location</span>
                    <span className="font-medium text-gray-900">{cartItem.pickupLocation}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pickup Date</span>
                    <span className="font-medium text-gray-900">{format(new Date(cartItem.pickupDate), 'dd MMM yyyy')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Return Date</span>
                    <span className="font-medium text-gray-900">{format(new Date(cartItem.returnDate), 'dd MMM yyyy')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rental Duration</span>
                    <span className="font-medium text-gray-900">{days} days</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium text-gray-900">₹{gst.toLocaleString()}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="font-bold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t">
                <h3 className="font-semibold mb-3">Cancellation Policy</h3>
                <ul className="text-sm text-gray-600 space-y-2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;