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
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Logo from "@/components/ui/logo";

function Router() {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("animate-fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("animate-fadeOut");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "animate-fadeOut") {
      setTransitionStage("animate-fadeIn");
      setDisplayLocation(location);
    }
  };

  return (
    <div 
      className={`w-full transition-opacity duration-300 ${transitionStage === "animate-fadeIn" ? "opacity-100" : "opacity-0"}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <Switch location={displayLocation}>
        <Route path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/vehicles" component={VehiclesPage} />
        <Route path="/vehicles/:id" component={VehicleDetailsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <div className="flex min-h-screen flex-col">
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
