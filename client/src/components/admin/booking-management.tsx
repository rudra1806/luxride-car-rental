import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, Check, X, Settings } from 'lucide-react';
import { Booking, Car, User } from '@shared/schema';

interface ExtendedBooking extends Booking {
  car?: Car;
  user?: User;
}

const BookingManagement = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);

  // Fetch all bookings
  const { data: bookings, isLoading } = useQuery<ExtendedBooking[]>({
    queryKey: ['/api/bookings'],
  });

  // Update booking status mutation
  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest('PUT', `/api/bookings/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({
        title: "Status Updated",
        description: "Booking status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete booking mutation
  const deleteBookingMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      setBookingToDelete(null);
      setDeleteDialogOpen(false);
      toast({
        title: "Booking Deleted",
        description: "The booking has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete the booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (bookingId: number, status: string) => {
    updateBookingMutation.mutate({ id: bookingId, status });
  };

  const handleDeleteBooking = (booking: Booking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      deleteBookingMutation.mutate(bookingToDelete.id);
    }
  };

  // Filter bookings based on status
  const filteredBookings = statusFilter
    ? bookings?.filter(booking => booking.status === statusFilter)
    : bookings;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] font-playfair">Booking Management</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter by Status:</span>
          <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Bookings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Bookings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>Manage customer bookings and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-64" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Pickup Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings && filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>
                          {booking.user 
                            ? `${booking.user.firstName || ''} ${booking.user.lastName || ''} (${booking.userId})` 
                            : `User #${booking.userId}`
                          }
                        </TableCell>
                        <TableCell>
                          {booking.car 
                            ? booking.car.name 
                            : `Car #${booking.carId}`
                          }
                        </TableCell>
                        <TableCell>
                          {format(new Date(booking.pickupDate), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          {format(new Date(booking.returnDate), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>{booking.pickupLocation}</TableCell>
                        <TableCell>
                          <Select 
                            defaultValue={booking.status}
                            onValueChange={(value) => handleStatusChange(booking.id, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue>
                                <Badge
                                  variant={
                                    booking.status === 'completed'
                                      ? 'outline'
                                      : booking.status === 'active'
                                      ? 'default'
                                      : booking.status === 'cancelled'
                                      ? 'destructive'
                                      : booking.status === 'confirmed'
                                      ? 'secondary'
                                      : 'secondary'
                                  }
                                >
                                  {booking.status}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>₹{booking.totalPrice}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteBooking(booking)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4">
                        No bookings found with the selected filter.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete booking #{bookingToDelete?.id} from the system.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteBookingMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingManagement;
