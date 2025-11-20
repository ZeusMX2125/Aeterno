import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post('/api/quote-submissions', async (req, res) => {
    try {
      const result = insertQuoteSubmissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }
      const submission = await storage.createQuoteSubmission(result.data);
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit quote' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
