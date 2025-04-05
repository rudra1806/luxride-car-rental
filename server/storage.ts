import { users, cars, bookings, reviews, type User, type Car, type Booking, type Review, type InsertUser, type InsertCar, type InsertBooking, type InsertReview } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Car methods
  getCars(): Promise<Car[]>;
  getCarsByType(type: string): Promise<Car[]>;
  getCarById(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  updateCar(id: number, car: Partial<Car>): Promise<Car | undefined>;
  deleteCar(id: number): Promise<boolean>;
  
  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBookingsByCar(carId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<Booking>): Promise<Booking | undefined>;
  
  // Review methods
  getReviews(): Promise<Review[]>;
  getReviewById(id: number): Promise<Review | undefined>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  getReviewsByCar(carId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Session store
  sessionStore: session.SessionStore;
}

// In-memory implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cars: Map<number, Car>;
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;
  sessionStore: session.SessionStore;
  private userIdCounter: number;
  private carIdCounter: number;
  private bookingIdCounter: number;
  private reviewIdCounter: number;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    this.userIdCounter = 1;
    this.carIdCounter = 1;
    this.bookingIdCounter = 1;
    this.reviewIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24h
    });
    
    // Add sample cars
    this.createCar({
      name: "Porsche 911 GT3",
      brand: "Porsche",
      model: "911 GT3",
      year: 2023,
      type: "sports",
      dailyRate: 299,
      imageUrl: "https://images.unsplash.com/photo-1563720223809-b82fb0d7fcc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience unparalleled performance and precision engineering.",
      seats: 2,
      transmission: "Automatic",
      acceleration: 3.8,
      engine: "3.8L Flat-6",
      features: ["Premium Sound System", "Heated Leather Seats", "Navigation System", "Apple CarPlay & Android Auto"],
      available: true
    });
    
    this.createCar({
      name: "Mercedes S-Class",
      brand: "Mercedes",
      model: "S-Class",
      year: 2023,
      type: "luxury",
      dailyRate: 249,
      imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "The pinnacle of luxury with state-of-the-art technology and comfort.",
      seats: 5,
      transmission: "Automatic",
      acceleration: 4.8,
      engine: "4.0L V8 Biturbo",
      features: ["Premium Sound System", "Heated Leather Seats", "Navigation System", "Massage Seats"],
      available: true
    });
    
    this.createCar({
      name: "BMW M4 Competition",
      brand: "BMW",
      model: "M4 Competition",
      year: 2023,
      type: "sports",
      dailyRate: 229,
      imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "German engineering meets sportscar performance with everyday usability.",
      seats: 4,
      transmission: "Manual",
      acceleration: 3.5,
      engine: "3.0L Twin-Turbo",
      features: ["Premium Sound System", "Heated Leather Seats", "Navigation System", "Apple CarPlay & Android Auto"],
      available: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id, role: "user" };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Car methods
  async getCars(): Promise<Car[]> {
    return Array.from(this.cars.values());
  }

  async getCarsByType(type: string): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(car => car.type === type);
  }

  async getCarById(id: number): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async createCar(carData: InsertCar): Promise<Car> {
    const id = this.carIdCounter++;
    const car: Car = { 
      ...carData, 
      id, 
      rating: 0, 
      reviewCount: 0,
      available: true 
    };
    this.cars.set(id, car);
    return car;
  }

  async updateCar(id: number, carData: Partial<Car>): Promise<Car | undefined> {
    const car = await this.getCarById(id);
    if (!car) return undefined;
    
    const updatedCar = { ...car, ...carData };
    this.cars.set(id, updatedCar);
    return updatedCar;
  }

  async deleteCar(id: number): Promise<boolean> {
    return this.cars.delete(id);
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }

  async getBookingsByCar(carId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.carId === carId
    );
  }

  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const booking: Booking = {
      ...bookingData,
      id,
      createdAt: new Date(),
      status: "pending"
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, bookingData: Partial<Booking>): Promise<Booking | undefined> {
    const booking = await this.getBookingById(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, ...bookingData };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Review methods
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewById(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.userId === userId
    );
  }

  async getReviewsByCar(carId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.carId === carId
    );
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const review: Review = {
      ...reviewData,
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    
    // Update car rating
    const car = await this.getCarById(reviewData.carId);
    if (car) {
      const carReviews = await this.getReviewsByCar(car.id);
      const totalRating = carReviews.reduce((sum, review) => sum + review.rating, 0);
      const newRating = totalRating / carReviews.length;
      
      await this.updateCar(car.id, {
        rating: parseFloat(newRating.toFixed(1)),
        reviewCount: carReviews.length
      });
    }
    
    return review;
  }
}

export const storage = new MemStorage();
