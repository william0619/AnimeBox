/**
 author: william   email:362661044@qq.com
 create_at: 2024/8/30
 **/
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  age: integer('age')
})

export const record = sqliteTable('record', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  text: text('text')
})

export const ideas = sqliteTable('ideas', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  text: text('text'),
  status: text('status', { enum: ['approved', 'rejected', 'pending'] }),
  time: text('time'),
  creator: integer('creator_id').references(() => users.id)
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Idea = typeof ideas.$inferSelect
export type NewIdea = typeof ideas.$inferInsert
