import { activities } from '../../drizzle/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { authenticateUser } from '../_apiUtils';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  const user = await authenticateUser(req);
  const client = postgres(process.env.COCKROACH_DB_URL);
  const db = drizzle(client);

  try {
    if (req.method === 'GET') {
      const result = await db.select()
        .from(activities)
        .where(eq(activities.userId, user.id));
      return res.status(200).json(result);
    }

    if (req.method === 'POST') {
      const newActivity = {
        ...req.body,
        userId: user.id,
        scheduledTime: new Date(req.body.scheduledTime),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.insert(activities).values(newActivity).returning();
      return res.status(201).json(result[0]);
    }

    if (req.method === 'PATCH') {
      const { id, ...updates } = req.body;
      const result = await db.update(activities)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(activities.id, id))
        .returning();
      return res.status(200).json(result[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}