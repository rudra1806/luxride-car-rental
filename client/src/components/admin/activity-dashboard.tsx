import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Car, Booking, User } from '@shared/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { format, subDays, startOfMonth, isAfter } from 'date-fns';
import { formatCurrency } from '@/lib/utils';

interface BookingStat {
  date: string;
  count: number;
  revenue: number;
}

interface CarTypeStat {
  name: string;
  value: number;
}

const ActivityDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [bookingStats, setBookingStats] = useState<BookingStat[]>([]);
  const [carTypeStats, setCarTypeStats] = useState<CarTypeStat[]>([]);
  const [popularCars, setPopularCars] = useState<{car: Car, count: number, revenue: number}[]>([]);

  // Fetch data
  const { data: cars, isLoading: carsLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });

  const isLoading = carsLoading || bookingsLoading || usersLoading;

  // Calculate summary statistics
  const totalCars = cars?.length || 0;
  const totalUsers = users?.length || 0;
  const totalBookings = bookings?.length || 0;
  const activeBookings = bookings?.filter(booking => 
    booking.status === 'active' || booking.status === 'confirmed'
  ).length || 0;

  // Calculate total revenue
  const totalRevenue = bookings?.reduce((sum, booking) => sum + booking.totalPrice, 0) || 0;

  // Generate date-based statistics based on selected time range
  useEffect(() => {
    if (!bookings || !cars) return;

    let startDate: Date;
    const today = new Date();
    
    switch (timeRange) {
      case '7days':
        startDate = subDays(today, 7);
        break;
      case '30days':
        startDate = subDays(today, 30);
        break;
      case 'thisMonth':
        startDate = startOfMonth(today);
        break;
      default:
        startDate = subDays(today, 7);
    }

    // Generate booking stats by date
    const dateStats: Record<string, {count: number, revenue: number}> = {};
    const carTypeCount: Record<string, number> = {};
    const carBookingCount: Record<number, {count: number, revenue: number}> = {};

    // Initialize date stats for all dates in range
    let currentDate = new Date(startDate);
    while (currentDate <= today) {
      const dateStr = format(currentDate, 'MMM dd');
      dateStats[dateStr] = { count: 0, revenue: 0 };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Count bookings by date and car type
    bookings.forEach(booking => {
      const bookingDate = new Date(booking.createdAt || booking.pickupDate);
      
      if (isAfter(bookingDate, startDate)) {
        const dateStr = format(bookingDate, 'MMM dd');
        
        // Update date stats
        if (dateStats[dateStr]) {
          dateStats[dateStr].count += 1;
          dateStats[dateStr].revenue += booking.totalPrice;
        }

        // Update car type stats
        const car = cars.find(c => c.id === booking.carId);
        if (car) {
          carTypeCount[car.type] = (carTypeCount[car.type] || 0) + 1;
          
          // Update car popularity
          if (!carBookingCount[car.id]) {
            carBookingCount[car.id] = { count: 0, revenue: 0 };
          }
          carBookingCount[car.id].count += 1;
          carBookingCount[car.id].revenue += booking.totalPrice;
        }
      }
    });

    // Convert booking stats to array
    const bookingStatsArray = Object.entries(dateStats).map(([date, stats]) => ({
      date,
      count: stats.count,
      revenue: stats.revenue
    }));

    // Convert car type stats to array
    const carTypeStatsArray = Object.entries(carTypeCount).map(([name, value]) => ({
      name,
      value
    }));

    // Get popular cars
    const popularCarsArray = Object.entries(carBookingCount)
      .map(([carId, stats]) => ({
        car: cars.find(c => c.id === Number(carId))!,
        count: stats.count,
        revenue: stats.revenue
      }))
      .filter(item => item.car) // Filter out undefined cars
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setBookingStats(bookingStatsArray);
    setCarTypeStats(carTypeStatsArray);
    setPopularCars(popularCarsArray);
  }, [bookings, cars, timeRange]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#EAB308', '#9333EA'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#0F172A] font-playfair">Activity Dashboard</h2>
        <div>
          <Tabs defaultValue="7days" value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="7days">Last 7 Days</TabsTrigger>
              <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
              <TabsTrigger value="thisMonth">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-3xl font-bold">{totalUsers}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Cars</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-3xl font-bold">{totalCars}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-3xl font-bold">{activeBookings}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Booking Trends Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>Number of bookings and revenue over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="h-full w-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bookingStats}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="count"
                    name="Bookings"
                    stroke="#0F172A"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue (₹)"
                    stroke="#EAB308"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Car Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Car Type</CardTitle>
            <CardDescription>Distribution of bookings across vehicle categories</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {isLoading ? (
              <div className="h-full w-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={carTypeStats}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {carTypeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Most Popular Cars */}
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Cars</CardTitle>
            <CardDescription>Top 5 most booked vehicles</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {isLoading ? (
              <div className="h-full w-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={popularCars.map(item => ({
                    name: item.car.name,
                    bookings: item.count,
                    revenue: item.revenue
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" name="Bookings" fill="#0F172A" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityDashboard;