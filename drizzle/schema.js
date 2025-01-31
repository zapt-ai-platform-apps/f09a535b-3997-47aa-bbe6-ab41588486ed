import { pgTable, serial, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  address: text('address'),
  email: text('email'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
  userId: uuid('user_id').notNull(),
});

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').references(() => clients.id),
  title: text('title').notNull(),
  scheduledTime: timestamp('scheduled_time', { mode: 'string' }).notNull(),
  status: text('status').default('pending'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
  userId: uuid('user_id').notNull(),
  whatsappMessage: text('whatsapp_message'),
});