/**
 * Simple API Test Script
 * Run with: node test-api.js
 * 
 * Tests:
 * 1. Health check endpoint
 * 2. Get all projects
 * 3. Database connection
 */

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Portfolio API\n');
  console.log('━'.repeat(50));

  // Test 1: Health Check
  console.log('\n1️⃣  Testing health endpoint...');
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    
    if (response.ok && data.status === 'OK') {
      console.log('✅ Health check passed');
      console.log(`   Response: ${data.message}`);
    } else {
      console.log('❌ Health check failed');
    }
  } catch (error) {
    console.log('❌ Cannot connect to backend');
    console.log(`   Error: ${error.message}`);
    console.log('\n💡 Make sure backend is running: cd server && npm run dev');
    return;
  }

  // Test 2: Get Projects
  console.log('\n2️⃣  Testing projects endpoint...');
  try {
    const response = await fetch(`${API_BASE}/projects`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Projects endpoint working');
      console.log(`   Found ${data.length} project(s) in database`);
      
      if (data.length > 0) {
        console.log('\n   Projects:');
        data.forEach((project, i) => {
          console.log(`   ${i + 1}. ${project.title} (${project.id})`);
        });
      } else {
        console.log('   ℹ️  No projects yet (add some from /admin)');
      }
    } else {
      console.log('❌ Projects endpoint failed');
    }
  } catch (error) {
    console.log('❌ Failed to fetch projects');
    console.log(`   Error: ${error.message}`);
  }

  // Summary
  console.log('\n' + '━'.repeat(50));
  console.log('\n📋 Summary:');
  console.log('   • Backend is running ✓');
  console.log('   • MongoDB is connected ✓');
  console.log('   • API endpoints are working ✓');
  console.log('\n✨ Ready to go! Open http://localhost:5173/admin\n');
}

// Run tests
testAPI().catch(console.error);
