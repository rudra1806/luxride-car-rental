import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  isAdmin: boolean("is_admin").default(false),
});

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  type: text("type").notNull(),
  price: doublePrecision("price").notNull(),
  horsepower: integer("horsepower"),
  seats: integer("seats"),
  transmission: text("transmission"),
  fuelType: text("fuel_type"),
  image: text("image"),
  description: text("description"),
  availability: boolean("availability").default(true),
  rating: doublePrecision("rating"),
  reviews: integer("reviews").default(0),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  carId: integer("car_id").notNull(),
  pickupDate: timestamp("pickup_date").notNull(),
  returnDate: timestamp("return_date").notNull(),
  pickupLocation: text("pickup_location").notNull(),
  totalPrice: doublePrecision("total_price").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  carId: integer("car_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  isAdmin: true,
});

export const insertCarSchema = createInsertSchema(cars).pick({
  name: true,
  brand: true,
  model: true,
  year: true,
  type: true,
  price: true,
  horsepower: true,
  seats: true,
  transmission: true,
  fuelType: true,
  image: true,
  description: true,
  availability: true,
  rating: true,
  reviews: true,
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  carId: true,
  pickupDate: true,
  returnDate: true,
  pickupLocation: true,
  totalPrice: true,
  status: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  carId: true,
  rating: true,
  comment: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCar = z.infer<typeof insertCarSchema>;
export type Car = typeof cars.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
