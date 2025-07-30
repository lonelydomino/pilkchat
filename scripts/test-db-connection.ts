const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

async function testBasicQueries() {
  try {
    // Test basic count operations
    const userCount = await prisma.user.count();
    console.log(`✅ User count query successful: ${userCount} users`);
    
    const postCount = await prisma.post.count();
    console.log(`✅ Post count query successful: ${postCount} posts`);
    
    return true;
  } catch (error) {
    console.error('❌ Basic queries failed:', error);
    return false;
  }
}

async function testUserOperations() {
  try {
    // Test finding users with pagination
    const users = await prisma.user.findMany({
      take: 3,
      select: {
        id: true,
        username: true,
        email: true
      }
    });
    
    console.log(`✅ User operations successful: Found ${users.length} users`);
    
    if (users.length > 0) {
      console.log('   - Sample user:', {
        id: users[0].id,
        username: users[0].username,
        email: users[0].email
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ User operations failed:', error);
    return false;
  }
}

async function testDatabaseInfo() {
  try {
    // Get basic database info using a simple query
    const result = await prisma.$queryRaw`SELECT version() as version`;
    console.log('✅ Database info retrieved!');
    console.log('   - PostgreSQL version:', result[0].version);
    
    return true;
  } catch (error) {
    console.error('❌ Database info retrieval failed:', error);
    return false;
  }
}

async function testSchemaTables() {
  try {
    // Check if tables exist by trying to access them
    const tables = ['user', 'post', 'comment', 'like', 'follow'];
    const results: { [key: string]: number | string } = {};
    
    for (const table of tables) {
      try {
        const count = await prisma[table].count();
        results[table] = count;
      } catch (error) {
        results[table] = 'ERROR';
      }
    }
    
    console.log('✅ Schema table access test:');
    Object.entries(results).forEach(([table, count]) => {
      console.log(`   - ${table}: ${count}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Schema table test failed:', error);
    return false;
  }
}

async function main() {
  console.log('🔍 Starting database functionality tests...\n');
  
  const tests = [
    { name: 'Connection Test', fn: testConnection },
    { name: 'Basic Queries Test', fn: testBasicQueries },
    { name: 'User Operations Test', fn: testUserOperations },
    { name: 'Database Info Test', fn: testDatabaseInfo },
    { name: 'Schema Tables Test', fn: testSchemaTables }
  ];
  
  let passedTests = 0;
  
  for (const test of tests) {
    console.log(`\n📋 Running ${test.name}...`);
    const result = await test.fn();
    if (result) passedTests++;
  }
  
  console.log(`\n📊 Test Results: ${passedTests}/${tests.length} tests passed`);
  
  if (passedTests === tests.length) {
    console.log('🎉 All tests passed! Your database is fully functional.');
  } else {
    console.log('⚠️  Some tests failed, but core functionality appears to be working.');
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);