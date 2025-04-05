import { Car, Wallet, ClipboardCheck } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="w-12 h-12 bg-[#1E293B] rounded-full flex items-center justify-center mb-4 text-[#EAB308]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#0F172A] font-['Playfair_Display'] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Car size={20} />,
      title: "Premium Fleet",
      description: "Curated selection of luxury vehicles from the world's most prestigious manufacturers."
    },
    {
      icon: <Wallet size={20} />,
      title: "Transparent Pricing",
      description: "No hidden fees or surprises. Get clear, upfront pricing with all amenities included."
    },
    {
      icon: <ClipboardCheck size={20} />,
      title: "Seamless Booking",
      description: "Quick and easy online reservation process with instant confirmation and 24/7 support."
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F172A] font-['Playfair_Display'] mb-2">Why Choose LuxeRide</h2>
          <div className="w-20 h-1 bg-[#EAB308] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Experience the difference of premium car rental service with exceptional attention to detail</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
