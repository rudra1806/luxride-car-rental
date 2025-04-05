import { Car, Wallet, ClipboardCheck, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-white rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="p-8">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-[#EAB308]/10 rounded-full transform group-hover:scale-150 transition-transform duration-500" />
        <div className="relative">
          <div className="w-16 h-16 bg-[#0F172A] rounded-xl flex items-center justify-center mb-6 text-[#EAB308] transform rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-md">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold text-[#0F172A] font-['Playfair_Display'] mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Car size={28} />,
      title: "Premium Fleet",
      description: "Curated selection of luxury vehicles from the world's most prestigious manufacturers, meticulously maintained for peak performance."
    },
    {
      icon: <Wallet size={28} />,
      title: "Transparent Pricing",
      description: "No hidden fees or surprises. Get clear, upfront pricing with all amenities included in your quoted rate."
    },
    {
      icon: <ClipboardCheck size={28} />,
      title: "Seamless Booking",
      description: "Quick and easy online reservation process with instant confirmation and dedicated 24/7 customer support."
    },
    {
      icon: <Shield size={28} />,
      title: "Comprehensive Insurance",
      description: "Drive with peace of mind knowing you're covered with our comprehensive insurance packages at no extra cost."
    },
    {
      icon: <Clock size={28} />,
      title: "Flexible Rentals",
      description: "From short weekend getaways to extended road trips, our flexible rental periods are designed around your schedule."
    },
    {
      icon: <Star size={28} />,
      title: "VIP Experience",
      description: "Enjoy personalized service with our VIP treatment, including exclusive upgrades and priority vehicle selection."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#0F172A] font-['Playfair_Display'] mb-3">Why Choose LuxeRide</h2>
          <div className="w-24 h-1 bg-[#EAB308] mx-auto mb-5"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference of premium car rental service with exceptional attention to detail
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
