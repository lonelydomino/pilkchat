const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addTestImage() {
  try {
    // Find the first user
    const user = await prisma.user.findFirst()
    
    if (!user) {
      console.log('No users found in database')
      return
    }

    // Add a test image (base64 data URL for a simple colored square)
    const testImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM2N2ZkNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlQ8L3RleHQ+PC9zdmc+'

    await prisma.user.update({
      where: { id: user.id },
      data: { image: testImage }
    })

    console.log(`✅ Added test image to user: ${user.name} (@${user.username})`)
    console.log('Image URL:', testImage.substring(0, 50) + '...')
    
  } catch (error) {
    console.error('Error adding test image:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addTestImage() 