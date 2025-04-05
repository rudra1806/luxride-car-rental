import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu as MenuIcon, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const textColorClass = isScrolled ? 'text-white' : 'text-white';

  return (
    <header className="fixed top-0 w-full z-50">
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-[#0C1323]/95 shadow-md backdrop-blur-sm' : 'bg-gradient-to-b from-[#0C1323] to-transparent py-2'}`}>
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="cursor-pointer">
                <Logo size={isMobile ? 'sm' : 'md'} color="#F59E0B" textColor="#FFFFFF" />
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="hidden md:flex md:space-x-8">
                <Link href="/">
                  <div className="relative group">
                    <a className={`py-2 px-1 ${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}>
                      Home
                    </a>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full ${location === '/' ? 'w-full' : 'w-0'}`}></span>
                  </div>
                </Link>
                <Link href="/vehicles">
                  <div className="relative group">
                    <a className={`py-2 px-1 ${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}>
                      Our Fleet
                    </a>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full ${location === '/vehicles' ? 'w-full' : 'w-0'}`}></span>
                  </div>
                </Link>
                <Link href="/about">
                  <div className="relative group">
                    <a className={`py-2 px-1 ${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}>
                      About
                    </a>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full ${location === '/about' ? 'w-full' : 'w-0'}`}></span>
                  </div>
                </Link>
                <Link href="/contact">
                  <div className="relative group">
                    <a className={`py-2 px-1 ${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}>
                      Contact
                    </a>
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F59E0B] transition-all duration-300 group-hover:w-full ${location === '/contact' ? 'w-full' : 'w-0'}`}></span>
                  </div>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    {user.isAdmin && (
                      <Link href="/admin">
                        <a className={`${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}>
                          Admin
                        </a>
                      </Link>
                    )}
                    <Link href="/dashboard">
                      <a className={`${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}>
                        <span className={`${textColorClass} font-medium`}>Account</span>
                      </a>
                    </Link>
                    
                    <Button 
                      onClick={handleLogout} 
                      variant="ghost" 
                      className={`${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href="/auth">
                      <a className={`${textColorClass} hover:text-[#F59E0B] transition-colors duration-200`}>
                        <span className={`${textColorClass} font-medium`}>Login</span>
                      </a>
                    </Link>
                    
                    <Link href="/auth?register=true">
                      <a className={`${textColorClass} font-medium hover:text-[#F59E0B] transition-colors duration-200`}>
                        <span className={`${textColorClass} font-medium`}>Register</span>
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