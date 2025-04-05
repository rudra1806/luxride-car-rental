import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { MenuIcon, X, Search, User } from 'lucide-react';
import Logo from '@/components/ui/logo';

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
  
  // For homepage with transparent background on top
  const navbarClasses = scrolled || location !== '/' 
    ? 'bg-[#0C1323] shadow-lg' 
    : 'bg-transparent';

  const textColorClass = 'text-white';

  const activeClass = (path: string) => {
    return location === path 
      ? 'text-[#F59E0B] font-medium' 
      : `${textColorClass} hover:text-[#F59E0B]`;
  };
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo 
              size="md"
              color="#F59E0B"
              textColor="#FFFFFF"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/">
              <a className={`${activeClass('/')} transition-colors duration-200`}>
                Home
              </a>
            </Link>
            <Link href="/vehicles">
              <a className={`${activeClass('/vehicles')} transition-colors duration-200`}>
                Our Fleet
              </a>
            </Link>
            <Link href="/about">
              <a className={`${activeClass('/about')} transition-colors duration-200`}>
                About
              </a>
            </Link>
            <Link href="/contact">
              <a className={`${activeClass('/contact')} transition-colors duration-200`}>
                Contact
              </a>
            </Link>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className={`${textColorClass} focus:outline-none hidden md:flex`}>
              <Search className="h-5 w-5" />
            </button>
            
            {/* User Section */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/dashboard">
                  <a className="flex items-center space-x-1">
                    <User className={`h-5 w-5 ${textColorClass}`} />
                    <span className={`${textColorClass} font-medium`}>Account</span>
                  </a>
                </Link>
                
                {user.isAdmin && (
                  <Link href="/admin">
                    <a className={`${textColorClass} hover:text-[#F59E0B] transition-colors font-medium`}>
                      Admin
                    </a>
                  </Link>
                )}
                
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  className={`${textColorClass} hover:text-[#F59E0B] transition-colors font-medium p-0`}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/auth">
                  <a className="flex items-center space-x-1">
                    <User className={`h-5 w-5 ${textColorClass}`} />
                    <span className={`${textColorClass} font-medium`}>Account</span>
                  </a>
                </Link>
                
                <Link href="/vehicles">
                  <a className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0C1323] font-semibold py-2 px-6 rounded transition-colors">
                    Book Now
                  </a>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className={`h-6 w-6 ${textColorClass}`} />
              ) : (
                <MenuIcon className={`h-6 w-6 ${textColorClass}`} />
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C1323] border-t border-white/10 shadow-lg">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <Link href="/">
              <a className={`block py-2 ${location === '/' ? 'text-[#F59E0B] font-medium' : 'text-white'}`}>
                Home
              </a>
            </Link>
            <Link href="/vehicles">
              <a className={`block py-2 ${location === '/vehicles' ? 'text-[#F59E0B] font-medium' : 'text-white'}`}>
                Our Fleet
              </a>
            </Link>
            <Link href="/about">
              <a className={`block py-2 ${location === '/about' ? 'text-[#F59E0B] font-medium' : 'text-white'}`}>
                About
              </a>
            </Link>
            <Link href="/contact">
              <a className={`block py-2 ${location === '/contact' ? 'text-[#F59E0B] font-medium' : 'text-white'}`}>
                Contact
              </a>
            </Link>
            
            <div className="pt-2 border-t border-white/10">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <a className="block py-2 text-white">
                      Account
                    </a>
                  </Link>
                  {user.isAdmin && (
                    <Link href="/admin">
                      <a className="block py-2 text-white">
                        Admin
                      </a>
                    </Link>
                  )}
                  <Button 
                    onClick={handleLogout} 
                    variant="ghost" 
                    className="w-full justify-start p-0 h-auto text-white py-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/auth">
                    <a className="block py-2 text-white">
                      Sign In / Register
                    </a>
                  </Link>
                  <Link href="/vehicles">
                    <a className="bg-[#F59E0B] text-[#0C1323] font-medium py-2 px-4 rounded text-center">
                      Book Now
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
