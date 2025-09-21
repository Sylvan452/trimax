/**
 * Basic WordPress Site Connectivity Test
 * Tests if WordPress site is accessible before testing GraphQL
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testBasicWordPress() {
    console.log('🔍 Testing Basic WordPress Connectivity...\n');
    
    // Extract base URL from GraphQL URL
    const graphqlUrl = process.env.WORDPRESS_API_URL;
    if (!graphqlUrl) {
        console.log('❌ WORDPRESS_API_URL not found in .env.local');
        return;
    }
    
    const baseUrl = graphqlUrl.replace('/graphql', '');
    console.log(`📍 Base WordPress URL: ${baseUrl}`);
    
    try {
        console.log('🚀 Testing basic site accessibility...');
        const response = await fetch(baseUrl);
        
        if (response.ok) {
            console.log('✅ WordPress site is accessible!');
            console.log(`📊 Status: ${response.status} ${response.statusText}`);
            
            // Test GraphQL endpoint
            console.log('\n🔍 Testing GraphQL endpoint...');
            const graphqlResponse = await fetch(graphqlUrl);
            
            if (graphqlResponse.ok) {
                console.log('✅ GraphQL endpoint is accessible!');
                console.log('🎉 Your WordPress Local setup is working!');
            } else {
                console.log('❌ GraphQL endpoint not accessible');
                console.log(`📊 GraphQL Status: ${graphqlResponse.status} ${graphqlResponse.statusText}`);
                console.log('💡 Make sure WPGraphQL plugin is installed and activated');
            }
        } else {
            console.log('❌ WordPress site not accessible');
            console.log(`📊 Status: ${response.status} ${response.statusText}`);
        }
        
    } catch (error) {
        console.log('❌ Connection failed:');
        console.log(`Error: ${error.message}`);
        console.log('\n💡 Troubleshooting tips:');
        console.log('1. Make sure WordPress Local is running');
        console.log('2. Check if the site name matches your WordPress Local site');
        console.log('3. Verify the site is started (green indicator in WordPress Local)');
        console.log('4. Try accessing the site in your browser first');
    }
}

// Test different common WordPress Local URLs
async function testCommonUrls() {
    console.log('\n🔍 Testing common WordPress Local URLs...\n');
    
    const commonUrls = [
        'http://trimax-headless-cms.local',
        'http://trimax.local', 
        'http://localhost:10000',
        'http://localhost:10001',
        'http://localhost:10002',
        'http://localhost:8000'
    ];
    
    for (const url of commonUrls) {
        try {
            console.log(`Testing: ${url}`);
            const response = await fetch(url, { 
                method: 'HEAD',
                timeout: 3000 
            });
            
            if (response.ok) {
                console.log(`✅ Found working WordPress site at: ${url}`);
                console.log(`   Update your .env.local with: WORDPRESS_API_URL=${url}/graphql\n`);
                return url;
            }
        } catch (error) {
            console.log(`❌ ${url} - Not accessible`);
        }
    }
    
    console.log('\n❌ No WordPress Local sites found on common URLs');
    console.log('💡 Please check WordPress Local and provide the correct site URL');
}

// Run tests
testBasicWordPress().then(() => {
    testCommonUrls();
});