import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Create the postgres client
const client = postgres(process.env.DATABASE_URL!, {
  max: 1, // Use only one connection for serverless
  idle_timeout: 20,
  connect_timeout: 10,
})

// Create the drizzle database instance
export const db = drizzle(client, { schema })

// Export the client for manual cleanup if needed
export { client as postgresClient } 