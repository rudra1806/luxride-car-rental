import { users, cars, bookings, reviews } from "@shared/schema";
import type { User, InsertUser, Car, InsertCar, Booking, InsertBooking, Review, InsertReview } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  getAllCars(): Promise<Car[]>;
  getCarById(id: number): Promise<Car | undefined>;
  getCarsByType(type: string): Promise<Car[]>;
  createCar(car: InsertCar): Promise<Car>;
  updateCar(id: number, car: Partial<InsertCar>): Promise<Car | undefined>;
  deleteCar(id: number): Promise<boolean>;

  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  getBookingsByCarId(carId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;

  getAllReviews(): Promise<Review[]>;
  getReviewsByCarId(carId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cars: Map<number, Car>;
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;
  private userCurrentId: number;
  private carCurrentId: number;
  private bookingCurrentId: number;
  private reviewCurrentId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    this.userCurrentId = 1;
    this.carCurrentId = 1;
    this.bookingCurrentId = 1;
    this.reviewCurrentId = 1;

    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Initialize with some demo cars
    this.initializeDemoCars();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Car methods
  async getAllCars(): Promise<Car[]> {
    return Array.from(this.cars.values());
  }

  async getCarById(id: number): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async getCarsByType(type: string): Promise<Car[]> {
    return Array.from(this.cars.values()).filter(
      (car) => car.type.toLowerCase() === type.toLowerCase(),
    );
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const id = this.carCurrentId++;
    const car: Car = { ...insertCar, id };
    this.cars.set(id, car);
    return car;
  }

  async updateCar(id: number, carData: Partial<InsertCar>): Promise<Car | undefined> {
    const existingCar = this.cars.get(id);
    if (!existingCar) return undefined;
    
    const updatedCar = { ...existingCar, ...carData };
    this.cars.set(id, updatedCar);
    return updatedCar;
  }

  async deleteCar(id: number): Promise<boolean> {
    return this.cars.delete(id);
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId,
    );
  }

  async getBookingsByCarId(carId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.carId === carId,
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingCurrentId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, bookingData: Partial<InsertBooking>): Promise<Booking | undefined> {
    const existingBooking = this.bookings.get(id);
    if (!existingBooking) return undefined;
    
    const updatedBooking = { ...existingBooking, ...bookingData };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async deleteBooking(id: number): Promise<boolean> {
    return this.bookings.delete(id);
  }

  // Review methods
  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewsByCarId(carId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.carId === carId,
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewCurrentId++;
    const review: Review = { ...insertReview, id, createdAt: new Date() };
    this.reviews.set(id, review);
    
    // Update car rating
    const carReviews = await this.getReviewsByCarId(insertReview.carId);
    const car = await this.getCarById(insertReview.carId);
    if (car) {
      const totalRating = carReviews.reduce((acc, review) => acc + review.rating, 0) + insertReview.rating;
      const averageRating = totalRating / (carReviews.length + 1);
      await this.updateCar(car.id, { 
        rating: parseFloat(averageRating.toFixed(1)),
        reviews: carReviews.length + 1
      });
    }
    
    return review;
  }

  // Initialize with demo cars for testing
  private initializeDemoCars() {
    const demoCars: InsertCar[] = [
      {
        name: "Porsche 911 Carrera",
        brand: "Porsche",
        model: "911 Carrera",
        year: 2023,
        type: "Sports",
        price: 24999,
        horsepower: 450,
        seats: 2,
        transmission: "Automatic",
        fuelType: "Premium",
        image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Experience the iconic Porsche 911 with its perfect balance of performance and luxury.",
        availability: true,
        rating: 4.8,
        reviews: 24
      },
      {
        name: "Lamborghini Huracan",
        brand: "Lamborghini",
        model: "Huracan",
        year: 2023,
        type: "Sports",
        price: 41999,
        horsepower: 630,
        seats: 2,
        transmission: "Automatic",
        fuelType: "Premium",
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Turn heads with the aggressive styling and raw power of the Lamborghini Huracan.",
        availability: true,
        rating: 5.0,
        reviews: 18
      },
      {
        name: "BMW X7",
        brand: "BMW",
        model: "X7",
        year: 2023,
        type: "SUV",
        price: 20999,
        horsepower: 335,
        seats: 7,
        transmission: "Automatic",
        fuelType: "Premium",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Luxury meets spaciousness in the BMW X7, perfect for family trips or group travel.",
        availability: true,
        rating: 4.1,
        reviews: 31
      },
      {
        name: "Tesla Model S",
        brand: "Tesla",
        model: "Model S",
        year: 2023,
        type: "Electric",
        price: 18499,
        horsepower: 670,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Electric",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Eco-friendly luxury with blistering performance. Experience the future of driving.",
        availability: true,
        rating: 4.7,
        reviews: 42
      },
      {
        name: "Mercedes-Benz S-Class",
        brand: "Mercedes-Benz",
        model: "S-Class",
        year: 2023,
        type: "Luxury",
        price: 22999,
        horsepower: 429,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Premium",
        image: "https://images.unsplash.com/photo-1549399542-7e8f2e928464?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "The pinnacle of luxury sedans with cutting-edge technology and sumptuous comfort.",
        availability: true,
        rating: 4.9,
        reviews: 37
      },
      {
        name: "Audi R8",
        brand: "Audi",
        model: "R8",
        year: 2023,
        type: "Sports",
        price: 33999,
        horsepower: 562,
        seats: 2,
        transmission: "Automatic",
        fuelType: "Premium",
        image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Everyday supercar with German engineering precision and jaw-dropping aesthetics.",
        availability: true,
        rating: 4.2,
        reviews: 19
      }
    ];

    demoCars.forEach((car) => {
      this.createCar(car);
    });
  }
}

export const storage = new MemStorage();
