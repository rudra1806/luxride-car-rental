import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import BookingHistory from '@/components/dashboard/booking-history';
import ProfileSection from '@/components/dashboard/profile-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0F172A]" />
      </div>
    );
  }

  if (!user) {
    return null; // Protected route will handle redirection
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] font-playfair">My Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and account settings</p>
        </div>

        {/* Welcome Card */}
        <Card className="mb-8 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back, {user.firstName || user.username}!</CardTitle>
            <CardDescription className="text-gray-300">
              Here's an overview of your LuxeRide experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Total Bookings</p>
                <h3 className="text-2xl font-bold">...</h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Upcoming Trips</p>
                <h3 className="text-2xl font-bold">...</h3>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-gray-300">Member Since</p>
                <h3 className="text-2xl font-bold">{new Date().getFullYear()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <BookingHistory />
          </TabsContent>
          
          <TabsContent value="profile">
            <ProfileSection user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
