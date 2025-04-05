import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Car, Booking } from '@shared/schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

interface BookingWithCar extends Booking {
  car?: Car;
}

const BookingHistory = () => {
  const { toast } = useToast();
  
  const { data: bookings, isLoading, isError } = useQuery<BookingWithCar[]>({
    queryKey: ['/api/bookings/user'],
  });

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await apiRequest('DELETE', `/api/bookings/${bookingId}`);
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled",
      });
      
      // Invalidate bookings query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['/api/bookings/user'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>View and manage your car bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 text-red-500" />
            Error Loading Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>There was an error loading your booking history. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>View and manage your car bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">You don't have any bookings yet.</p>
            <Button className="mt-4 bg-[#0F172A]" asChild>
              <a href="/vehicles">Browse Cars</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking History</CardTitle>
        <CardDescription>View and manage your car bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {booking.car?.name || `Car #${booking.carId}`}
                </TableCell>
                <TableCell>
                  {format(new Date(booking.pickupDate), 'MMM d, yyyy')} - 
                  {format(new Date(booking.returnDate), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>{booking.pickupLocation}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === 'completed'
                        ? 'outline'
                        : booking.status === 'active'
                        ? 'default'
                        : booking.status === 'cancelled'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>₹{booking.totalPrice.toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  {booking.status === 'pending' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BookingHistory;
