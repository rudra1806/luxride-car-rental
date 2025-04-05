import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navbarClasses = scrolled || location !== '/' 
    ? 'bg-[#0F1A2A] shadow-md' 
    : '';

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      <nav className={`container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center ${navbarClasses}`}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-playfair text-white">LuxDrive</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`text-white hover:text-[#D4AF37] transition-colors font-medium ${location === '/' ? 'text-[#D4AF37]' : ''}`}>
            Home
          </Link>
          <Link href="/vehicles" className={`text-white hover:text-[#D4AF37] transition-colors font-medium ${location === '/vehicles' ? 'text-[#D4AF37]' : ''}`}>
            Vehicles
          </Link>
          <Link href="#" className="text-white hover:text-[#D4AF37] transition-colors font-medium">
            Services
          </Link>
          <Link href="#" className="text-white hover:text-[#D4AF37] transition-colors font-medium">
            About
          </Link>
          <Link href="#" className="text-white hover:text-[#D4AF37] transition-colors font-medium">
            Contact
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:inline-block text-white hover:text-[#D4AF37] transition-colors font-medium">
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="hidden md:inline-block text-white hover:text-[#D4AF37] transition-colors font-medium">
                  Admin
                </Link>
              )}
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                className="hidden md:inline-block text-white hover:text-[#D4AF37] transition-colors font-medium"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth" className="hidden md:inline-block text-white hover:text-[#D4AF37] transition-colors font-medium">
                Sign In
              </Link>
              <Link href="/auth" className="hidden md:inline-block bg-[#D4AF37] hover:bg-[#E4BF47] text-[#0F1A2A] font-medium py-2 px-6 rounded-md transition-colors">
                Register
              </Link>
            </>
          )}
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F1A2A]">
          <div className="px-6 py-4 space-y-3">
            <Link href="/" className="block text-white hover:text-[#D4AF37] font-medium py-2">
              Home
            </Link>
            <Link href="/vehicles" className="block text-white hover:text-[#D4AF37] font-medium py-2">
              Vehicles
            </Link>
            <Link href="#" className="block text-white hover:text-[#D4AF37] font-medium py-2">
              Services
            </Link>
            <Link href="#" className="block text-white hover:text-[#D4AF37] font-medium py-2">
              About
            </Link>
            <Link href="#" className="block text-white hover:text-[#D4AF37] font-medium py-2">
              Contact
            </Link>
            
            <div className="pt-4 flex flex-col space-y-3">
              {user ? (
                <>
                  <Link href="/dashboard" className="block text-white hover:text-[#D4AF37] font-medium py-2">
                    Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block text-white hover:text-[#D4AF37] font-medium py-2">
                      Admin
                    </Link>
                  )}
                  <Button 
                    onClick={handleLogout} 
                    variant="ghost" 
                    className="justify-start p-0 h-auto text-white hover:text-[#D4AF37] font-medium py-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth" className="inline-block text-white hover:text-[#D4AF37] transition-colors font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth" className="inline-block bg-[#D4AF37] hover:bg-[#E4BF47] text-[#0F1A2A] font-medium py-2 px-6 rounded-md transition-colors text-center">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
