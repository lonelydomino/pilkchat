const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkUserImage() {
  try {
    // Find all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      }
    })

    console.log('All users in database:')
    users.forEach(user => {
      console.log(`- ${user.name} (@${user.username}): ${user.image ? 'Has image' : 'No image'}`)
      if (user.image) {
        console.log(`  Image length: ${user.image.length}`)
        console.log(`  Image preview: ${user.image.substring(0, 50)}...`)
      }
    })

    // Check if any user has an image
    const usersWithImage = users.filter(user => user.image)
    console.log(`\nUsers with images: ${usersWithImage.length}/${users.length}`)

  } catch (error) {
    console.error('Error checking user images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUserImage() 