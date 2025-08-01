const { drizzle } = require('drizzle-orm/postgres-js')
const postgres = require('postgres')
require('dotenv').config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString)
const db = drizzle(client)

async function updateUserName() {
  try {
    console.log('🔧 Updating user name...')
    
    // Update the user's name
    const result = await db.execute(`
      UPDATE users 
      SET name = 'Domino' 
      WHERE id = 'cmdpra33e0000w5wb2ziev96i'
    `)
    
    console.log('🔧 Update result:', result)
    
    // Verify the update
    const user = await db.execute(`
      SELECT id, name, username, email 
      FROM users 
      WHERE id = 'cmdpra33e0000w5wb2ziev96i'
    `)
    
    console.log('🔧 User after update:', user[0])
    
    console.log('✅ User name updated successfully!')
  } catch (error) {
    console.error('❌ Error updating user:', error)
  } finally {
    await client.end()
  }
}

updateUserName() 