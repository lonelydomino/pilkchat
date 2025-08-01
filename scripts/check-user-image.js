const { drizzle } = require('drizzle-orm/postgres-js')
const postgres = require('postgres')
require('dotenv').config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString)
const db = drizzle(client)

async function checkUserImage() {
  try {
    console.log('🔍 Checking user image in database...')
    
    // Check the specific user
    const user = await db.execute(`
      SELECT id, name, username, email, image 
      FROM users 
      WHERE id = 'cmdpra33e0000w5wb2ziev96i'
    `)
    
    if (user.length > 0) {
      const userData = user[0]
      console.log('🔍 User data:', {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        image: userData.image,
        hasImage: !!userData.image,
        imageLength: userData.image?.length || 0
      })
    } else {
      console.log('❌ User not found')
    }
    
    // Check all users to see if any have images
    const allUsers = await db.execute(`
      SELECT id, name, username, image 
      FROM users 
      WHERE image IS NOT NULL AND image != ''
      LIMIT 5
    `)
    
    console.log('🔍 Users with images:', allUsers.length)
    allUsers.forEach((u, i) => {
      console.log(`  ${i + 1}. ${u.username}: ${u.image?.substring(0, 50)}...`)
    })
    
  } catch (error) {
    console.error('❌ Error checking user image:', error)
  } finally {
    await client.end()
  }
}

checkUserImage() 