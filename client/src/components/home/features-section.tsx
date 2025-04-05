import { Car, Wallet, ClipboardCheck, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

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
      whileHover={{ 
        y: -5, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.2 } 
      }}
      className="relative overflow-hidden bg-white rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Animated accent line */}
      <motion.div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#EAB308] to-[#EAB308]/50"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        viewport={{ once: true }}
      />
      
      <div className="p-8">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-[#EAB308]/10 rounded-full transform group-hover:scale-150 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 mb-4 ml-4 w-12 h-12 bg-[#0F172A]/5 rounded-full transform group-hover:scale-150 transition-transform duration-700" />
        
        <div className="relative">
          <div className="w-16 h-16 bg-[#0F172A] rounded-xl flex items-center justify-center mb-6 text-[#EAB308] transform group-hover:scale-110 group-hover:rotate-0 transition-all duration-300 shadow-lg">
            <motion.div
              initial={{ rotate: 3 }}
              whileHover={{ rotate: 0, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          </div>
          
          <h3 className="text-2xl font-bold text-[#0F172A] font-['Playfair_Display'] mb-3 group-hover:text-[#EAB308] transition-colors duration-300">{title}</h3>
          
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          {/* Subtle animated arrow indicator */}
          <motion.div 
            className="mt-4 flex items-center text-[#EAB308] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0 }}
            whileHover={{ x: 5 }}
            animate={undefined}
          >
            <span className="mr-2">Learn more</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
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
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EAB308]/10 via-[#EAB308] to-[#EAB308]/10" />
      <motion.div 
        className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[#EAB308]/5"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute top-40 -left-16 w-40 h-40 rounded-full bg-[#0F172A]/5"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-3 px-6 py-1.5 bg-[#EAB308]/10 rounded-full"
          >
            <span className="text-[#0F172A] font-semibold">Discover Our Advantages</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] font-['Playfair_Display'] mb-4">
            Why Choose <span className="text-[#EAB308]">LuxRide</span>
          </h2>
          
          <motion.div 
            className="w-24 h-1 bg-[#EAB308] mx-auto mb-5"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference of premium car rental service with exceptional 
            attention to detail and uncompromising quality
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
        
        {/* Premium service highlight */}
        <motion.div 
          className="mt-20 bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-12 lg:p-16 flex flex-col justify-center">
              <motion.h3 
                className="text-3xl font-bold text-white font-['Playfair_Display'] mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Premium Service, <span className="text-[#EAB308]">Extraordinary Experience</span>
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Our commitment to excellence ensures that every journey with us is more than just a ride—it's an experience crafted for the most discerning clientele.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/about">
                  <Button className="bg-[#EAB308] hover:bg-[#EAB308]/90 text-black font-medium px-8 py-6">
                    Learn More About Us
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <div className="bg-[#0F172A] relative h-full min-h-[300px]">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-60" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025')" }}
              />
              
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#0F172A] via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#0F172A]/80 via-transparent to-transparent" />
              
              {/* Overlay text */}
              <div className="absolute bottom-8 right-8 text-right">
                <span className="text-[#EAB308] font-medium text-sm tracking-wider">REFINED LUXURY</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
