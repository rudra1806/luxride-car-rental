import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import VehiclesPage from "@/pages/vehicles-page";
import VehicleDetailsPage from "@/pages/vehicle-details-page";
import DashboardPage from "@/pages/dashboard-page";
import AdminPage from "@/pages/admin-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/context/cart-context";
import { SearchProvider } from "@/context/search-context";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { motion, AnimatePresence } from "framer-motion";

// Page transition animation configuration
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1] // Custom easing function
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

// Wrap component with motion for animation
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    className="page-transition"
  >
    {children}
  </motion.div>
);

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <div key={location} className="w-full">
        <Switch>
          <Route path="/" component={() => (
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          )} />
          
          <Route path="/auth" component={() => (
            <PageWrapper>
              <AuthPage />
            </PageWrapper>
          )} />
          
          <Route path="/vehicles" component={() => (
            <PageWrapper>
              <VehiclesPage />
            </PageWrapper>
          )} />
          
          <Route path="/vehicles/:id" component={() => (
            <PageWrapper>
              <VehicleDetailsPage />
            </PageWrapper>
          )} />
          
          <Route path="/about" component={() => (
            <PageWrapper>
              <AboutPage />
            </PageWrapper>
          )} />
          
          <Route path="/contact" component={() => (
            <PageWrapper>
              <ContactPage />
            </PageWrapper>
          )} />
          
          <ProtectedRoute path="/dashboard" component={DashboardPage} />
          <ProtectedRoute path="/admin" component={AdminPage} />
          
          <Route component={() => (
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          )} />
        </Switch>
      </div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <div className="flex min-h-screen flex-col bg-[#0A1222]">
              <Navbar />
              <main className="flex-grow">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
