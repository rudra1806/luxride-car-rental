const Step = ({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-[#EAB308] rounded-full flex items-center justify-center mx-auto mb-6 text-[#0F172A]">
        <span className="text-2xl font-bold">{number}</span>
      </div>
      <h3 className="text-xl font-semibold text-white font-['Playfair_Display'] mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Choose Your Vehicle",
      description: "Browse our collection of premium vehicles and select the perfect car for your journey."
    },
    {
      number: 2,
      title: "Book & Pay Online",
      description: "Select your dates, complete the booking form, and make a secure payment to confirm your reservation."
    },
    {
      number: 3,
      title: "Enjoy Your Drive",
      description: "Pick up your vehicle at the designated location and enjoy your premium driving experience."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white font-['Playfair_Display'] mb-2">How It Works</h2>
          <div className="w-20 h-1 bg-[#EAB308] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Renting a luxury car has never been easier</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
