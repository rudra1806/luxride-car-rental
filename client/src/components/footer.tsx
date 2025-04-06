import { Link } from 'wouter';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-['Playfair_Display'] font-semibold text-[#EAB308] mb-4">LuxeRide</h3>
            <p className="text-gray-400 mb-4">Experience the ultimate in luxury car rentals with our premium fleet and exceptional service.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  Booking Terms
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#support" className="text-gray-400 hover:text-[#EAB308] transition-colors duration-200">
                  24/7 Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-[#EAB308] mt-1 mr-3" size={18} />
                <span className="text-gray-400">Time Square Grande, PRL Colony, Thaltej<br />Ahmedabad, Gujarat 380059, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-[#EAB308] mr-3" size={18} />
                <span className="text-gray-400">+91 79 4890 1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-[#EAB308] mr-3" size={18} />
                <span className="text-gray-400">info@luxeride.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} LuxeRide. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">We accept all major credit cards</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
