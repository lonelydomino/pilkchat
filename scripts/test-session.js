const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testSession() {
  try {
    // Find the user with the test image
    const user = await prisma.user.findUnique({
      where: { username: 'mmartinez' },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      }
    })

    if (!user) {
      console.log('User mmartinez not found')
      return
    }

    console.log('User data from database:')
    console.log(JSON.stringify(user, null, 2))
    console.log(`Has image: ${!!user.image}`)
    console.log(`Image length: ${user.image?.length || 0}`)

    // Simulate what NextAuth would return
    const authUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      image: user.image,
    }

    console.log('\nAuth user object:')
    console.log(JSON.stringify(authUser, null, 2))

  } catch (error) {
    console.error('Error testing session:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testSession() 