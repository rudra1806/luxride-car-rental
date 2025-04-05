import { Star, StarHalf } from 'lucide-react';

const TestimonialCard = ({ 
  rating, 
  content, 
  author, 
  location, 
  avatar 
}: { 
  rating: number; 
  content: string; 
  author: string; 
  location: string; 
  avatar: string; 
}) => {
  // Generate star icons based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-[#EAB308]" fill="#EAB308" size={16} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-[#EAB308]" fill="#EAB308" size={16} />);
    }
    
    return stars;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-4">
        {renderStars()}
      </div>
      <p className="text-gray-600 italic mb-4">{content}</p>
      <div className="flex items-center">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-semibold text-[#0F172A]">{author}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      rating: 5,
      content: "\"The Porsche 911 was immaculate and performed flawlessly. The booking process was effortless, and the customer service was exceptional. Will definitely rent again!\"",
      author: "James Wilson",
      location: "New York, NY",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      rating: 5,
      content: "\"LuxeRide made my anniversary weekend special with their Mercedes S-Class. The attention to detail and personalized service made all the difference. Highly recommend!\"",
      author: "Sarah Johnson",
      location: "Miami, FL",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      rating: 4.5,
      content: "\"The Tesla Model S was the perfect choice for our eco-friendly road trip. Clean, fast, and luxurious. The online booking system was intuitive and straightforward.\"",
      author: "Michael Chen",
      location: "Los Angeles, CA",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F172A] font-['Playfair_Display'] mb-2">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-[#EAB308] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Hear from clients who have experienced our premium service</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              content={testimonial.content}
              author={testimonial.author}
              location={testimonial.location}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
