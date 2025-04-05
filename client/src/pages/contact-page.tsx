import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    
    // Here you would typically send the data to your backend
    
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly.",
    });
    
    form.reset();
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Playfair_Display'] leading-tight mb-4">
              Contact <span className="text-[#EAB308]">Us</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-300 mb-12">
              Have questions or need assistance? We're here to help you with your luxury car rental experience.
            </p>
            
            {/* Contact Info Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#EAB308]/20 mr-3">
                  <Phone className="h-5 w-5 text-[#EAB308]" />
                </div>
                <span className="text-white">+91 79 4890 1234</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#EAB308]/20 mr-3">
                  <Mail className="h-5 w-5 text-[#EAB308]" />
                </div>
                <span className="text-white">info@luxride.com</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-[#EAB308]/20 mr-3">
                  <MapPin className="h-5 w-5 text-[#EAB308]" />
                </div>
                <span className="text-white">Ahmedabad, India</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        
        {/* Bottom shadow gradient */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Let us know how we can help you..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-[#0F172A] hover:bg-[#1E293B] w-full md:w-auto"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-6">
                Our Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Reach out using any of the methods below.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-[#EAB308]/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-[#EAB308]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Main Office</h3>
                    <p className="text-gray-600 mt-1">
                      Time Square Grande<br />
                      PRL Colony, Thaltej<br />
                      Ahmedabad, Gujarat 380059<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-[#EAB308]/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-[#EAB308]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Phone Numbers</h3>
                    <p className="text-gray-600 mt-1">
                      Bookings: +91 79 4890 1234<br />
                      Customer Support: +91 79 4890 5678
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-[#EAB308]/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-[#EAB308]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Email Addresses</h3>
                    <p className="text-gray-600 mt-1">
                      Reservations: bookings@luxewheel.com<br />
                      Customer Service: support@luxewheel.com<br />
                      General Inquiries: info@luxewheel.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-[#EAB308]/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-[#EAB308]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Business Hours</h3>
                    <p className="text-gray-600 mt-1">
                      Monday - Friday: 8:00 AM - 8:00 PM<br />
                      Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#0F172A] mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at one of our premium showrooms across the country
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <div className="text-gray-500 text-center px-4">
                  <MapPin className="h-10 w-10 mx-auto mb-2" />
                  <p>Map placeholder - Ahmedabad</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Ahmedabad</h3>
                <p className="text-gray-600 mb-4">
                  Time Square Grande<br />
                  PRL Colony, Thaltej<br />
                  Gujarat 380059
                </p>
                <p className="text-sm text-[#EAB308] font-medium">Flagship Location</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <div className="text-gray-500 text-center px-4">
                  <MapPin className="h-10 w-10 mx-auto mb-2" />
                  <p>Map placeholder - Mumbai</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Mumbai</h3>
                <p className="text-gray-600 mb-4">
                  Luxury Tower, Bandra<br />
                  Mumbai, Maharashtra 400050
                </p>
                <p className="text-sm text-gray-500">West Coast Showroom</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <div className="text-gray-500 text-center px-4">
                  <MapPin className="h-10 w-10 mx-auto mb-2" />
                  <p>Map placeholder - Delhi</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Delhi</h3>
                <p className="text-gray-600 mb-4">
                  Connaught Place<br />
                  New Delhi 110001
                </p>
                <p className="text-sm text-gray-500">North India Collection</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Can't visit in person? Call us at <span className="font-medium text-[#0F172A]">+91 79 4890 1234</span> for a virtual tour of our collection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;