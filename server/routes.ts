import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertBookingSchema, insertCarSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // CAR ROUTES
  
  // Get all cars
  app.get("/api/cars", async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      
      if (type) {
        const cars = await storage.getCarsByType(type);
        res.json(cars);
      } else {
        const cars = await storage.getCars();
        res.json(cars);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching cars" });
    }
  });

  // Get car by ID
  app.get("/api/cars/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid car ID" });
      }
      
      const car = await storage.getCarById(id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Error fetching car" });
    }
  });

  // Create car (admin only)
  app.post("/api/cars", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const carData = insertCarSchema.parse(req.body);
      const car = await storage.createCar(carData);
      res.status(201).json(car);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid car data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating car" });
    }
  });

  // Update car (admin only)
  app.put("/api/cars/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid car ID" });
      }
      
      const car = await storage.getCarById(id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      const updatedCar = await storage.updateCar(id, req.body);
      res.json(updatedCar);
    } catch (error) {
      res.status(500).json({ message: "Error updating car" });
    }
  });

  // Delete car (admin only)
  app.delete("/api/cars/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid car ID" });
      }
      
      const car = await storage.getCarById(id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      await storage.deleteCar(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting car" });
    }
  });

  // BOOKING ROUTES
  
  // Get all bookings (admin only)
  app.get("/api/bookings", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings" });
    }
  });

  // Get user's bookings
  app.get("/api/user/bookings", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const bookings = await storage.getBookingsByUser(req.user.id);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings" });
    }
  });

  // Create booking
  app.post("/api/bookings", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const bookingData = insertBookingSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      // Check if car exists
      const car = await storage.getCarById(bookingData.carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      // Check if car is available
      if (!car.available) {
        return res.status(400).json({ message: "Car is not available for booking" });
      }
      
      // Check date conflicts
      const carBookings = await storage.getBookingsByCar(bookingData.carId);
      const pickupDate = new Date(bookingData.pickupDate);
      const returnDate = new Date(bookingData.returnDate);
      
      const hasConflict = carBookings.some(booking => {
        const existingPickup = new Date(booking.pickupDate);
        const existingReturn = new Date(booking.returnDate);
        
        return (
          (pickupDate >= existingPickup && pickupDate <= existingReturn) ||
          (returnDate >= existingPickup && returnDate <= existingReturn) ||
          (pickupDate <= existingPickup && returnDate >= existingReturn)
        );
      });
      
      if (hasConflict) {
        return res.status(400).json({ message: "Selected dates are not available for this car" });
      }
      
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating booking" });
    }
  });

  // Update booking status (admin only)
  app.put("/api/bookings/:id/status", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid booking ID" });
      }
      
      const { status } = req.body;
      if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const booking = await storage.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      const updatedBooking = await storage.updateBooking(id, { status });
      res.json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: "Error updating booking status" });
    }
  });

  // REVIEW ROUTES
  
  // Get car reviews
  app.get("/api/cars/:id/reviews", async (req, res) => {
    try {
      const carId = parseInt(req.params.id);
      if (isNaN(carId)) {
        return res.status(400).json({ message: "Invalid car ID" });
      }
      
      const reviews = await storage.getReviewsByCar(carId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews" });
    }
  });

  // Add review
  app.post("/api/reviews", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      // Check if car exists
      const car = await storage.getCarById(reviewData.carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      
      // Check if user has booked this car before
      const userBookings = await storage.getBookingsByUser(req.user.id);
      const hasBooked = userBookings.some(booking => 
        booking.carId === reviewData.carId && booking.status === "completed"
      );
      
      if (!hasBooked) {
        return res.status(403).json({ message: "You can only review cars you have rented" });
      }
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating review" });
    }
  });

  // ADMIN USER MANAGEMENT ROUTES
  
  // Get all users (admin only)
  app.get("/api/users", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const users = Array.from((await storage.getCars()).values());
      
      // Remove passwords from response
      const sanitizedUsers = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(sanitizedUsers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });

  // Create admin user (if no users exist)
  app.post("/api/setup-admin", async (req, res, next) => {
    try {
      const users = Array.from((await storage.getCars()).values());
      
      // Only allow setup if no users exist
      if (users.length > 0) {
        return res.status(403).json({ message: "Admin already exists" });
      }
      
      const { username, password, email, firstName, lastName } = req.body;
      
      if (!username || !password || !email || !firstName || !lastName) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const user = await storage.createUser({
        username,
        password,
        email,
        firstName,
        lastName,
        phone: req.body.phone || ""
      });
      
      // Set as admin
      const admin = await storage.updateUser(user.id, { role: "admin" });
      
      if (!admin) {
        return res.status(500).json({ message: "Failed to create admin" });
      }
      
      res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
