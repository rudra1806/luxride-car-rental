import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-lg overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-['Playfair_Display'] leading-tight">Ready for a Premium Driving Experience?</h2>
              <p className="mt-4 text-lg text-gray-300">Join thousands of satisfied customers who have elevated their journeys with our luxury vehicles.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/vehicles">
                  <Button className="bg-[#EAB308] hover:bg-[#FDE68A] text-[#0F172A]">
                    Browse Vehicles
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" className="text-white border-[#EAB308] hover:bg-[#0F172A]">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-transparent"></div>
              <img
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                alt="Luxury car on the road"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
