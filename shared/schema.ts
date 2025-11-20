import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const quoteSubmissionSchema = z.object({
  id: z.number(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  budget: z.number().min(500).max(50000),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  submittedAt: z.date(),
});

export const insertQuoteSubmissionSchema = quoteSubmissionSchema.omit({
  id: true,
  submittedAt: true,
});

export type InsertQuoteSubmission = z.infer<typeof insertQuoteSubmissionSchema>;
export type QuoteSubmission = z.infer<typeof quoteSubmissionSchema>;
