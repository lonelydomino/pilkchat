const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const testUsers = [
  {
    name: 'Alice Johnson',
    username: 'alice',
    email: 'alice@example.com',
    bio: 'Software developer and coffee enthusiast ☕',
    location: 'San Francisco, CA',
    website: 'https://alice.dev',
  },
  {
    name: 'Bob Smith',
    username: 'bobsmith',
    email: 'bob@example.com',
    bio: 'Designer and photographer 📸',
    location: 'New York, NY',
    website: 'https://bob.design',
  },
  {
    name: 'Carol Davis',
    username: 'carol',
    email: 'carol@example.com',
    bio: 'Product manager and startup enthusiast 🚀',
    location: 'Austin, TX',
  },
  {
    name: 'David Wilson',
    username: 'davidw',
    email: 'david@example.com',
    bio: 'Full-stack developer and open source contributor 💻',
    location: 'Seattle, WA',
    website: 'https://davidwilson.dev',
  },
  {
    name: 'Emma Brown',
    username: 'emma',
    email: 'emma@example.com',
    bio: 'UX researcher and accessibility advocate ♿',
    location: 'Portland, OR',
  },
  {
    name: 'Frank Miller',
    username: 'frankm',
    email: 'frank@example.com',
    bio: 'Data scientist and machine learning enthusiast 🤖',
    location: 'Boston, MA',
  },
  {
    name: 'Grace Lee',
    username: 'gracelee',
    email: 'grace@example.com',
    bio: 'Frontend developer and CSS wizard ✨',
    location: 'Chicago, IL',
    website: 'https://gracelee.dev',
  },
  {
    name: 'Henry Taylor',
    username: 'henry',
    email: 'henry@example.com',
    bio: 'Backend engineer and database expert 🗄️',
    location: 'Denver, CO',
  },
]

async function createTestUsers() {
  try {
    console.log('Creating test users...')
    
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash('password123', 10)
      
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          ...userData,
          password: hashedPassword,
        },
      })
      
      console.log(`Created user: ${user.name} (@${user.username})`)
    }
    
    console.log('✅ All test users created successfully!')
    console.log('\nTest users:')
    testUsers.forEach(user => {
      console.log(`- ${user.name} (@${user.username}) - ${user.email}`)
    })
    console.log('\nAll users have password: password123')
    
  } catch (error) {
    console.error('Error creating test users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUsers() 