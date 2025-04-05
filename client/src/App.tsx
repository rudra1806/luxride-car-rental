import { Switch, Route } from "wouter";
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
import PaymentConfirmationPage from "@/pages/payment-confirmation-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/context/cart-context";
import { SearchProvider } from "@/context/search-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageTransition from "@/components/layout/page-transition";
import LoadingBar from "@/components/layout/loading-bar";

function Router() {
  return (
    <div className="relative">
      <PageTransition>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/vehicles" component={VehiclesPage} />
          <Route path="/vehicles/:id" component={VehicleDetailsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <ProtectedRoute path="/dashboard" component={DashboardPage} />
          <ProtectedRoute path="/admin" component={AdminPage} />
          <ProtectedRoute path="/payment-confirmation" component={PaymentConfirmationPage} />
          {/* Removed booking success page route */}
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
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
              <LoadingBar />
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
