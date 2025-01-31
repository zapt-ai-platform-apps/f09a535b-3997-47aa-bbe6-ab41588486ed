import { clients } from '../../drizzle/schema';
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
        .from(clients)
        .where(eq(clients.userId, user.id));
      return res.status(200).json(result);
    }

    if (req.method === 'POST') {
      const newClient = {
        ...req.body,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.insert(clients).values(newClient).returning();
      return res.status(201).json(result[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}