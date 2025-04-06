import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Car, Booking, User } from '@shared/schema';
import CarManagement from '@/components/admin/car-management';
import BookingManagement from '@/components/admin/booking-management';
import UserManagement from '@/components/admin/user-management';
import ActivityDashboard from '@/components/admin/activity-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Loader2, ShieldAlert, BarChart3, Car as CarIcon, Calendar, Users } from 'lucide-react';

const AdminPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Fetch data for the dashboard stats
  const { data: cars, isLoading: carsLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  const isLoading = authLoading || carsLoading || bookingsLoading || usersLoading;

  // Calculate stats
  const totalCars = cars?.length || 0;
  const activeBookings = bookings?.filter(booking => 
    booking.status === 'active' || booking.status === 'confirmed'
  ).length || 0;
  const totalUsers = users?.length || 0;
  const monthlyRevenue = bookings?.reduce((sum, booking) => {
    const bookingDate = new Date(booking.createdAt || booking.pickupDate);
    const currentMonth = new Date().getMonth();
    const bookingMonth = bookingDate.getMonth();
    
    if (bookingMonth === currentMonth) {
      return sum + booking.totalPrice;
    }
    return sum;
  }, 0) || 0;

  if (authLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0F172A]" />
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 font-playfair">Access Denied</h1>
        <p className="text-gray-600">You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] font-playfair">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage all aspects of the LuxeRide platform</p>
        </div>

        {/* Admin Overview Card */}
        <Card className="mb-8 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Control Panel</CardTitle>
            <CardDescription className="text-gray-300">
              Analytics and management tools for LuxeRide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Total Cars</p>
                <h3 className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    totalCars
                  )}
                </h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Active Bookings</p>
                <h3 className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    activeBookings
                  )}
                </h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Total Users</p>
                <h3 className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    totalUsers
                  )}
                </h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Revenue (Monthly)</p>
                <h3 className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    `₹${monthlyRevenue.toLocaleString()}`
                  )}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center">
              <CarIcon className="h-4 w-4 mr-2" />
              Cars
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <ActivityDashboard />
          </TabsContent>
          
          <TabsContent value="cars">
            <CarManagement />
          </TabsContent>
          
          <TabsContent value="bookings">
            <BookingManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
