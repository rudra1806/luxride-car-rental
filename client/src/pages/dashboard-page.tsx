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

        {/* Welcome Hero Section */}
        <div className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute transform rotate-12 -right-10 top-10 w-96 h-96 rounded-full bg-[#DBA11C]"></div>
            <div className="absolute transform -rotate-12 -right-10 bottom-10 w-72 h-72 rounded-full bg-[#94A3B8]"></div>
          </div>
          
          <div className="relative z-10 p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
                  Welcome back, <span className="text-[#DBA11C]">{user.firstName || user.username}</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  Experience luxury on wheels with your premium membership
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white mt-4 md:mt-0">
                <span className="text-[#DBA11C] font-semibold">Premium</span> Member
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all hover:scale-105 hover:bg-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#DBA11C]/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#DBA11C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Active Bookings</h3>
                    <p className="text-gray-400 text-sm">Your current reservations</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">1</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all hover:scale-105 hover:bg-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Next Trip</h3>
                    <p className="text-gray-400 text-sm">Upcoming reservation</p>
                  </div>
                </div>
                <div className="text-white">Apr 12 - Apr 18</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 transform transition-all hover:scale-105 hover:bg-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#EC4899]/20 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#EC4899]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Experience</h3>
                    <p className="text-gray-400 text-sm">Your loyalty status</p>
                  </div>
                </div>
                <div className="text-white">Gold Member</div>
              </div>
            </div>
          </div>
        </div>

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
