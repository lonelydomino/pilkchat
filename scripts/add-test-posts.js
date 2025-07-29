const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const testPosts = [
  {
    content: "Just launched our new #startup! 🚀 Excited to see where this journey takes us. #entrepreneurship #tech",
    authorUsername: "mmartinez"
  },
  {
    content: "Beautiful day for a hike! #nature #outdoors #weekend #adventure",
    authorUsername: "johndoe"
  },
  {
    content: "Working on some amazing #AI features today. The future of #technology is here! #innovation",
    authorUsername: "alice"
  },
  {
    content: "Coffee and coding - the perfect combination! ☕️ #programming #developer #morning",
    authorUsername: "bobsmith"
  },
  {
    content: "Just finished reading an incredible book about #leadership. Highly recommend! #books #growth",
    authorUsername: "carol"
  },
  {
    content: "The #startup scene is booming! So many innovative ideas out there. #entrepreneurship",
    authorUsername: "davidw"
  },
  {
    content: "Weekend vibes with #music and #friends. Life is good! 🎵 #weekend",
    authorUsername: "emma"
  },
  {
    content: "Deep dive into #AI and #machinelearning today. The possibilities are endless! #tech",
    authorUsername: "frankm"
  },
  {
    content: "Nothing beats a good #coffee in the morning! ☕️ #morning #routine",
    authorUsername: "gracelee"
  },
  {
    content: "Exploring new #technology trends. The future is exciting! #innovation #tech",
    authorUsername: "henry"
  }
]

async function addTestPosts() {
  try {
    console.log('Adding test posts with hashtags...')
    
    for (const postData of testPosts) {
      // Find the author
      const author = await prisma.user.findUnique({
        where: { username: postData.authorUsername }
      })
      
      if (!author) {
        console.log(`User ${postData.authorUsername} not found, skipping...`)
        continue
      }
      
      // Create the post
      const post = await prisma.post.create({
        data: {
          content: postData.content,
          authorId: author.id,
          published: true,
        }
      })
      
      console.log(`✅ Created post: "${postData.content.substring(0, 50)}..."`)
    }
    
    console.log('\n🎉 Test posts added successfully!')
    console.log('You can now see trending topics and posts in the Explore page.')
    
  } catch (error) {
    console.error('Error adding test posts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addTestPosts() 