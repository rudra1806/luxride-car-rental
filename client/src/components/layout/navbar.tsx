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
          
          {/* Desktop Navigation with Animated Underline */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/">
              <div className="relative group">
                <a className={`${activeClass('/')} transition-colors duration-300 py-2`}>
                  Home
                </a>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full 
                  ${location === '/' ? 'w-full' : 'w-0'}`}></span>
              </div>
            </Link>
            <Link href="/vehicles">
              <div className="relative group">
                <a className={`${activeClass('/vehicles')} transition-colors duration-300 py-2`}>
                  Our Fleet
                </a>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full 
                  ${location === '/vehicles' ? 'w-full' : 'w-0'}`}></span>
              </div>
            </Link>
            <Link href="/about">
              <div className="relative group">
                <a className={`${activeClass('/about')} transition-colors duration-300 py-2`}>
                  About
                </a>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full 
                  ${location === '/about' ? 'w-full' : 'w-0'}`}></span>
              </div>
            </Link>
            <Link href="/contact">
              <div className="relative group">
                <a className={`${activeClass('/contact')} transition-colors duration-300 py-2`}>
                  Contact
                </a>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full 
                  ${location === '/contact' ? 'w-full' : 'w-0'}`}></span>
              </div>
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
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F59E0B] to-yellow-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                    <a className="relative bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0C1323] font-semibold py-2 px-6 rounded transition-all duration-300 group-hover:tracking-wider overflow-hidden">
                      Book Now
                      <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                    </a>
                  </div>
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
      
      {/* Mobile Navigation with animation */}
      <div className={`md:hidden bg-[#0C1323] border-t border-white/10 shadow-lg overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 py-3 space-y-2">
          <Link href="/">
            <div className={`transform transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} delay-100`}>
              <a className={`block py-2 ${location === '/' ? 'text-[#F59E0B] font-medium' : 'text-white'} hover:text-[#F59E0B] transition-colors`}>
                Home
              </a>
            </div>
          </Link>
          <Link href="/vehicles">
            <div className={`transform transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} delay-150`}>
              <a className={`block py-2 ${location === '/vehicles' ? 'text-[#F59E0B] font-medium' : 'text-white'} hover:text-[#F59E0B] transition-colors`}>
                Our Fleet
              </a>
            </div>
          </Link>
          <Link href="/about">
            <div className={`transform transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} delay-200`}>
              <a className={`block py-2 ${location === '/about' ? 'text-[#F59E0B] font-medium' : 'text-white'} hover:text-[#F59E0B] transition-colors`}>
                About
              </a>
            </div>
          </Link>
          <Link href="/contact">
            <div className={`transform transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} delay-300`}>
              <a className={`block py-2 ${location === '/contact' ? 'text-[#F59E0B] font-medium' : 'text-white'} hover:text-[#F59E0B] transition-colors`}>
                Contact
              </a>
            </div>
          </Link>
          
          <div className={`pt-2 border-t border-white/10 transform transition-all duration-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} delay-400`}>
            {user ? (
              <>
                <Link href="/dashboard">
                  <a className="block py-2 text-white hover:text-[#F59E0B] transition-colors">
                    Account
                  </a>
                </Link>
                {user.isAdmin && (
                  <Link href="/admin">
                    <a className="block py-2 text-white hover:text-[#F59E0B] transition-colors">
                      Admin
                    </a>
                  </Link>
                )}
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  className="w-full justify-start p-0 h-auto text-white py-2 hover:text-[#F59E0B] transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/auth">
                  <a className="block py-2 text-white hover:text-[#F59E0B] transition-colors">
                    Sign In / Register
                  </a>
                </Link>
                <Link href="/vehicles">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F59E0B] to-yellow-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                    <a className="relative block py-2 px-4 bg-[#F59E0B] text-[#0C1323] font-medium rounded text-center group-hover:tracking-wider transition-all duration-300">
                      Book Now
                    </a>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
