import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu, X, Car, Home, Info, Phone, Shield } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1E293B] shadow-lg' : 'bg-[#0F172A]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-[#EAB308] font-['Playfair_Display'] text-2xl font-bold">LuxRide</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className={`text-white hover:text-[#EAB308] px-3 py-2 text-sm font-medium transition-colors duration-200 ${location === '/' ? 'text-[#EAB308]' : ''}`}>
                Home
              </Link>
              <Link href="/vehicles" className={`text-white hover:text-[#EAB308] px-3 py-2 text-sm font-medium transition-colors duration-200 ${location === '/vehicles' ? 'text-[#EAB308]' : ''}`}>
                Vehicles
              </Link>
              <Link href="/about" className={`text-white hover:text-[#EAB308] px-3 py-2 text-sm font-medium transition-colors duration-200 ${location === '/about' ? 'text-[#EAB308]' : ''}`}>
                About
              </Link>
              <Link href="/contact" className={`text-white hover:text-[#EAB308] px-3 py-2 text-sm font-medium transition-colors duration-200 ${location === '/contact' ? 'text-[#EAB308]' : ''}`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-[#EAB308] px-3 py-2 text-sm font-medium transition-colors duration-200">
                    <User className="mr-2 h-4 w-4" />
                    {user.firstName || user.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer w-full">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="text-white hover:text-[#EAB308] px-3 py-2 text-sm font-medium transition-colors duration-200">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth?register=true">
                  <Button className="ml-4 bg-[#EAB308] hover:bg-[#FDE68A] text-[#0F172A] hover:text-[#0F172A]">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-white hover:text-[#EAB308] focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1E293B]">
          <Link href="/" className="text-white hover:bg-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
            <Home className="inline mr-2 h-4 w-4" /> Home
          </Link>
          <Link href="/vehicles" className="text-white hover:bg-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
            <Car className="inline mr-2 h-4 w-4" /> Vehicles
          </Link>
          <Link href="/about" className="text-white hover:bg-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
            <Info className="inline mr-2 h-4 w-4" /> About
          </Link>
          <Link href="/contact" className="text-white hover:bg-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
            <Phone className="inline mr-2 h-4 w-4" /> Contact
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard" className="text-white hover:bg-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
                <User className="inline mr-2 h-4 w-4" /> Dashboard
              </Link>
              {user.isAdmin && (
                <Link href="/admin" className="text-white hover:bg-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
                  <Shield className="inline mr-2 h-4 w-4" /> Admin Panel
                </Link>
              )}
              <button 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="text-white hover:bg-[#0F172A] block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                <LogOut className="inline mr-2 h-4 w-4" /> Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-white hover:bg-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
                Sign In
              </Link>
              <Link href="/auth?register=true" className="bg-[#EAB308] text-[#0F172A] block px-3 py-2 rounded-md text-base font-medium" onClick={closeMobileMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
