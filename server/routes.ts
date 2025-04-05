import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertBookingSchema, insertCarSchema, insertReviewSchema } from "@shared/schema";

// Middleware to check if user is authenticated
const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Middleware to check if user is an admin
const isAdmin = (req: any, res: any, next: any) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Forbidden" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Cars routes
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await storage.getAllCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cars" });
    }
  });

  app.get("/api/cars/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const car = await storage.getCarById(id);
      
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Error fetching car" });
    }
  });

  app.get("/api/cars/type/:type", async (req, res) => {
    try {
      const type = req.params.type;
      const cars = await storage.getCarsByType(type);
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cars by type" });
    }
  });

  app.post("/api/cars", isAdmin, async (req, res) => {
    try {
      const validatedCar = insertCarSchema.parse(req.body);
      const car = await storage.createCar(validatedCar);
      res.status(201).json(car);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid car data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating car" });
    }
  });

  app.put("/api/cars/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedCar = await storage.updateCar(id, req.body);
      
      if (!updatedCar) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      res.json(updatedCar);
    } catch (error) {
      res.status(500).json({ message: "Error updating car" });
    }
  });

  app.delete("/api/cars/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteCar(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting car" });
    }
  });

  // Bookings routes
  app.get("/api/bookings", isAdmin, async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings" });
    }
  });

  app.get("/api/bookings/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const bookings = await storage.getBookingsByUserId(userId);
      
      // Get car details for each booking
      const bookingsWithCarDetails = await Promise.all(
        bookings.map(async (booking) => {
          const car = await storage.getCarById(booking.carId);
          return { ...booking, car };
        })
      );
      
      res.json(bookingsWithCarDetails);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user bookings" });
    }
  });

  app.post("/api/bookings", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const bookingData = { ...req.body, userId };
      
      try {
        console.log("Booking data received:", JSON.stringify(bookingData, null, 2));
        var validatedBooking = insertBookingSchema.parse(bookingData);
        
        // Convert date strings to Date objects for storage
        if (typeof validatedBooking.pickupDate === 'string') {
          validatedBooking.pickupDate = new Date(validatedBooking.pickupDate);
        }
        
        if (typeof validatedBooking.returnDate === 'string') {
          validatedBooking.returnDate = new Date(validatedBooking.returnDate);
        }
      } catch (error) {
        console.error("Booking validation error:", error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
        }
        return res.status(500).json({ message: "Error validating booking data" });
      }
      
      // Check if car is available for the requested dates
      const carBookings = await storage.getBookingsByCarId(validatedBooking.carId);
      const requestedPickup = new Date(validatedBooking.pickupDate);
      const requestedReturn = new Date(validatedBooking.returnDate);
      
      const isOverlapping = carBookings.some(booking => {
        const bookingPickup = new Date(booking.pickupDate);
        const bookingReturn = new Date(booking.returnDate);
        
        return (
          (requestedPickup >= bookingPickup && requestedPickup <= bookingReturn) ||
          (requestedReturn >= bookingPickup && requestedReturn <= bookingReturn) ||
          (requestedPickup <= bookingPickup && requestedReturn >= bookingReturn)
        );
      });
      
      if (isOverlapping) {
        return res.status(400).json({ message: "Car is not available for the selected dates" });
      }
      
      const booking = await storage.createBooking(validatedBooking);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating booking" });
    }
  });

  app.put("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Get the booking to check ownership
      const booking = await storage.getBookingById(id);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      // Only allow admin or booking owner to update
      if (booking.userId !== userId && !req.user!.isAdmin) {
        return res.status(403).json({ message: "Forbidden - You do not own this booking" });
      }
      
      const updatedBooking = await storage.updateBooking(id, req.body);
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Error updating booking" });
    }
  });

  app.delete("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Get the booking to check ownership
      const booking = await storage.getBookingById(id);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      // Only allow admin or booking owner to delete
      if (booking.userId !== userId && !req.user!.isAdmin) {
        return res.status(403).json({ message: "Forbidden - You do not own this booking" });
      }
      
      const deleted = await storage.deleteBooking(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking" });
    }
  });

  // Reviews routes
  app.get("/api/reviews/car/:carId", async (req, res) => {
    try {
      const carId = parseInt(req.params.carId);
      const reviews = await storage.getReviewsByCarId(carId);
      
      // Get user details for each review (excluding password)
      const reviewsWithUserDetails = await Promise.all(
        reviews.map(async (review) => {
          const user = await storage.getUser(review.userId);
          if (user) {
            const { password, ...userWithoutPassword } = user;
            return { ...review, user: userWithoutPassword };
          }
          return review;
        })
      );
      
      res.json(reviewsWithUserDetails);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews" });
    }
  });

  app.post("/api/reviews", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const reviewData = { ...req.body, userId };
      
      const validatedReview = insertReviewSchema.parse(reviewData);
      const review = await storage.createReview(validatedReview);
      
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating review" });
    }
  });

  // User profile routes
  app.put("/api/user/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const { password, isAdmin, ...userData } = req.body; // Prevent updating password or admin status through this endpoint
      
      const updatedUser = await storage.updateUser(userId, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password in response
      const { password: pwd, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error updating profile" });
    }
  });

  // Check car availability
  app.post("/api/cars/check-availability", async (req, res) => {
    try {
      const { carId, pickupDate, returnDate } = req.body;
      
      if (!carId || !pickupDate || !returnDate) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const car = await storage.getCarById(parseInt(carId));
      
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      const carBookings = await storage.getBookingsByCarId(parseInt(carId));
      const requestedPickup = new Date(pickupDate);
      const requestedReturn = new Date(returnDate);
      
      const isOverlapping = carBookings.some(booking => {
        const bookingPickup = new Date(booking.pickupDate);
        const bookingReturn = new Date(booking.returnDate);
        
        return (
          (requestedPickup >= bookingPickup && requestedPickup <= bookingReturn) ||
          (requestedReturn >= bookingPickup && requestedReturn <= bookingReturn) ||
          (requestedPickup <= bookingPickup && requestedReturn >= bookingReturn)
        );
      });
      
      res.json({ available: !isOverlapping });
    } catch (error) {
      res.status(500).json({ message: "Error checking availability" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
