import { type User, type InsertUser, type QuoteSubmission, type InsertQuoteSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuoteSubmission(submission: InsertQuoteSubmission): Promise<QuoteSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quotes: QuoteSubmission[] = [];

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuoteSubmission(submission: InsertQuoteSubmission): Promise<QuoteSubmission> {
    const newSubmission: QuoteSubmission = {
      id: this.quotes.length + 1,
      services: submission.services,
      budget: submission.budget,
      name: submission.name,
      email: submission.email,
      submittedAt: new Date(),
    };
    this.quotes.push(newSubmission);
    return newSubmission;
  }
}

export const storage = new MemStorage();
