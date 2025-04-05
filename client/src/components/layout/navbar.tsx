import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { MenuIcon, X, Search, User } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion, AnimatePresence } from 'framer-motion';

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
      ? 'text-[#F59E0B] font-medium nav-link active' 
      : `${textColorClass} hover:text-[#F59E0B] nav-link`;
  };
  
  // Animation variants for navbar items
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  // Staggered animation for nav items
  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
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
          <motion.div 
            className="hidden md:flex items-center space-x-10"
            initial="hidden"
            animate="visible"
            variants={navContainerVariants}
          >
            <motion.div variants={navItemVariants}>
              <Link href="/">
                <a className={`${activeClass('/')} transition-colors duration-200`}>
                  Home
                </a>
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <Link href="/vehicles">
                <a className={`${activeClass('/vehicles')} transition-colors duration-200`}>
                  Our Fleet
                </a>
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <Link href="/about">
                <a className={`${activeClass('/about')} transition-colors duration-200`}>
                  About
                </a>
              </Link>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <Link href="/contact">
                <a className={`${activeClass('/contact')} transition-colors duration-200`}>
                  Contact
                </a>
              </Link>
            </motion.div>
          </motion.div>
          
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-[#0C1323] border-t border-white/10 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="container mx-auto px-4 py-3 space-y-2"
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={navItemVariants} className="stagger-item">
                <Link href="/">
                  <a className={`block py-2 ${location === '/' ? 'text-[#F59E0B] font-medium nav-link active' : 'text-white nav-link'}`}>
                    Home
                  </a>
                </Link>
              </motion.div>
              <motion.div variants={navItemVariants} className="stagger-item">
                <Link href="/vehicles">
                  <a className={`block py-2 ${location === '/vehicles' ? 'text-[#F59E0B] font-medium nav-link active' : 'text-white nav-link'}`}>
                    Our Fleet
                  </a>
                </Link>
              </motion.div>
              <motion.div variants={navItemVariants} className="stagger-item">
                <Link href="/about">
                  <a className={`block py-2 ${location === '/about' ? 'text-[#F59E0B] font-medium nav-link active' : 'text-white nav-link'}`}>
                    About
                  </a>
                </Link>
              </motion.div>
              <motion.div variants={navItemVariants} className="stagger-item">
                <Link href="/contact">
                  <a className={`block py-2 ${location === '/contact' ? 'text-[#F59E0B] font-medium nav-link active' : 'text-white nav-link'}`}>
                    Contact
                  </a>
                </Link>
              </motion.div>
              
              <motion.div 
                className="pt-2 border-t border-white/10"
                variants={navItemVariants}
              >
                {user ? (
                  <>
                    <motion.div variants={navItemVariants} className="stagger-item">
                      <Link href="/dashboard">
                        <a className="block py-2 text-white nav-link">
                          Account
                        </a>
                      </Link>
                    </motion.div>
                    {user.isAdmin && (
                      <motion.div variants={navItemVariants} className="stagger-item">
                        <Link href="/admin">
                          <a className="block py-2 text-white nav-link">
                            Admin
                          </a>
                        </Link>
                      </motion.div>
                    )}
                    <motion.div variants={navItemVariants} className="stagger-item">
                      <Button 
                        onClick={handleLogout} 
                        variant="ghost" 
                        className="w-full justify-start p-0 h-auto text-white py-2 nav-link"
                      >
                        Logout
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div 
                    className="flex flex-col space-y-2"
                    variants={navItemVariants}
                  >
                    <motion.div variants={navItemVariants} className="stagger-item">
                      <Link href="/auth">
                        <a className="block py-2 text-white nav-link">
                          Sign In / Register
                        </a>
                      </Link>
                    </motion.div>
                    <motion.div variants={navItemVariants} className="stagger-item">
                      <Link href="/vehicles">
                        <a className="bg-[#F59E0B] text-[#0C1323] font-medium py-2 px-4 rounded text-center shine-effect">
                          Book Now
                        </a>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
