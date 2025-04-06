import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, Award, Shield, Users, Clock, Star } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight mb-4">
              About <span className="text-[#EAB308]">LuxRide</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-300 mb-12">
              Redefining luxury car rentals in India since 2015
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#EAB308]/20 mr-3">
                  <Shield className="h-5 w-5 text-[#EAB308]" />
                </div>
                <span className="text-white">Premium Insurance</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#EAB308]/20 mr-3">
                  <Award className="h-5 w-5 text-[#EAB308]" />
                </div>
                <span className="text-white">Award-Winning Service</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#EAB308]/20 mr-3">
                  <Star className="h-5 w-5 text-[#EAB308]" />
                </div>
                <span className="text-white">5-Star Experience</span>
              </div>
            </div>
          </div>
        </div>
        {/* High-end luxury car background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        
        {/* Bottom shadow gradient */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  Founded in 2015, LuxRide began with a vision to transform the luxury car rental experience. What started as a small collection of premium vehicles has grown into one of the most prestigious fleets in the country.
                </p>
                <p>
                  Our founder, a passionate car enthusiast, recognized a gap in the market for truly exceptional rental experiences that went beyond just handing over keys. The idea was simple: provide access to extraordinary vehicles with extraordinary service.
                </p>
                <p>
                  Today, we're proud to offer an unparalleled selection of luxury and exotic cars, accompanied by personalized service that ensures every journey with us is memorable.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl relative">
              <img 
                src="https://images.unsplash.com/photo-1562911791-c7a97b729ec5?auto=format&fit=crop&q=80&w=2070" 
                alt="Luxury car experience" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="bg-[#EAB308]/80 text-[#0F172A] font-semibold py-2 px-4 rounded-full inline-block mb-2">EST. 2015</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at LuxRide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-[#EAB308]/10 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-[#EAB308]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We're committed to providing only the finest vehicles and service experiences that exceed expectations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-[#EAB308]/10 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-[#EAB308]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Reliability</h3>
                <p className="text-gray-600">
                  Our meticulously maintained fleet ensures safety, performance, and peace of mind on every journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-[#EAB308]/10 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-[#EAB308]" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Personalization</h3>
                <p className="text-gray-600">
                  We believe every client is unique, which is why we tailor our services to meet individual preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-4">
              Why Choose LuxRide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference of premium car rental service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-[#0F172A] flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Flexible Rental Periods</h3>
                <p className="text-gray-600">
                  Whether you need a luxury car for a few hours, a day, or a month, we offer flexible rental options to suit your schedule.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-[#0F172A] flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Convenient Locations</h3>
                <p className="text-gray-600">
                  With multiple pickup and drop-off locations across major cities, accessing your dream car has never been easier.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-[#0F172A] flex items-center justify-center">
                  <CalendarDays className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Simple Booking Process</h3>
                <p className="text-gray-600">
                  Our streamlined online booking system allows you to reserve your preferred vehicle in minutes with real-time availability.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-[#0F172A] flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Premium Fleet</h3>
                <p className="text-gray-600">
                  Our collection features only the most prestigious brands and models, all maintained to the highest standards of performance and luxury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The experts behind our exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=774" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">Michael Johnson</h3>
              <p className="text-[#EAB308] font-medium mb-3">CEO & Founder</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Car enthusiast with 20+ years in the luxury automotive industry.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=776" 
                  alt="Operations Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">Sarah Martinez</h3>
              <p className="text-[#EAB308] font-medium mb-3">Operations Director</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Logistics expert ensuring seamless rental experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=774" 
                  alt="Fleet Manager" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">David Chen</h3>
              <p className="text-[#EAB308] font-medium mb-3">Fleet Manager</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Automotive specialist maintaining our vehicles to perfection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;