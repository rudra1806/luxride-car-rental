import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import CarManagement from '@/components/admin/car-management';
import BookingManagement from '@/components/admin/booking-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Loader2, ShieldAlert } from 'lucide-react';

const AdminPage = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('cars');

  if (isLoading) {
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
          <p className="text-gray-600">Manage cars, bookings, and system settings</p>
        </div>

        {/* Admin Overview Card */}
        <Card className="mb-8 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Control Panel</CardTitle>
            <CardDescription className="text-gray-300">
              Manage all aspects of the LuxeRide platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Total Cars</p>
                <h3 className="text-2xl font-bold">...</h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Active Bookings</p>
                <h3 className="text-2xl font-bold">...</h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Total Users</p>
                <h3 className="text-2xl font-bold">...</h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Revenue (Monthly)</p>
                <h3 className="text-2xl font-bold">$...</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="cars">Car Management</TabsTrigger>
            <TabsTrigger value="bookings">Booking Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cars">
            <CarManagement />
          </TabsContent>
          
          <TabsContent value="bookings">
            <BookingManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
