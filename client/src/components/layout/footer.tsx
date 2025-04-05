import React from 'react';
import { Link } from 'wouter';
import Logo from '@/components/ui/logo';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2A2A2A] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo size="md" color="#F59E0B" textColor="#FFFFFF" />
            </div>
            <p className="text-white/70 mb-4">
              Premium car rental services for those who appreciate the finer things in life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#F59E0B] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-[#F59E0B] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-[#F59E0B] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-[#F59E0B] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/70 hover:text-[#F59E0B] transition-colors">Home</Link></li>
              <li><Link href="/vehicles" className="text-white/70 hover:text-[#F59E0B] transition-colors">Our Fleet</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-[#F59E0B] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-[#F59E0B] transition-colors">Contact</Link></li>
              <li><Link href="/vehicles" className="text-white/70 hover:text-[#F59E0B] transition-colors">Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Vehicle Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/vehicles?type=sports" className="text-white/70 hover:text-[#F59E0B] transition-colors">Sports Cars</Link></li>
              <li><Link href="/vehicles?type=luxury" className="text-white/70 hover:text-[#F59E0B] transition-colors">Luxury Sedans</Link></li>
              <li><Link href="/vehicles?type=suv" className="text-white/70 hover:text-[#F59E0B] transition-colors">SUVs</Link></li>
              <li><Link href="/vehicles?type=convertible" className="text-white/70 hover:text-[#F59E0B] transition-colors">Convertibles</Link></li>
              <li><Link href="/vehicles" className="text-white/70 hover:text-[#F59E0B] transition-colors">All Cars</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#F59E0B]"></i>
                <span>123 Premium Boulevard, Mumbai, India</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-[#F59E0B]"></i>
                <span>+91 (98765) 43210</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-[#F59E0B]"></i>
                <span>info@luxdrive.in</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3 text-[#F59E0B]"></i>
                <span>Mon-Sat: 9AM - 8PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} LuxDrive. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-white/70">
              <li><a href="#" className="hover:text-[#F59E0B] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#F59E0B] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#F59E0B] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
