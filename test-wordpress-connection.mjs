/**
 * WordPress Local Connection Test Script
 * Run this script to test your WordPress Local GraphQL connection
 *
 * Usage: node test-wordpress-connection.js
 */

import { GraphQLClient } from 'graphql-request';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Test GraphQL query
const TEST_QUERY = `
  query GetSiteInfo {
    generalSettings {
      title
      description
      url
    }
    posts(first: 1) {
      nodes {
        id
        title
        excerpt
        date
      }
    }
  }
`;

async function testWordPressConnection() {
  console.log('🔍 Testing WordPress Local Connection...\n');

  // Check environment variables
  const wpUrl = process.env.WORDPRESS_API_URL;
  console.log('📍 WordPress URL:', wpUrl || 'NOT SET');

  if (!wpUrl) {
    console.error('❌ WORDPRESS_API_URL not found in .env.local');
    console.log(
      '📝 Please update your .env.local file with your WordPress Local site URL',
    );
    console.log(
      '   Example: WORDPRESS_API_URL=http://your-site-name.local/graphql',
    );
    return;
  }

  try {
    // Create GraphQL client
    const client = new GraphQLClient(wpUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('🚀 Sending GraphQL request...');

    // Test the connection
    const data = await client.request(TEST_QUERY);

    console.log('✅ Connection successful!');
    console.log('📊 Site Info:');
    console.log('   Title:', data.generalSettings?.title || 'N/A');
    console.log('   Description:', data.generalSettings?.description || 'N/A');
    console.log('   URL:', data.generalSettings?.url || 'N/A');

    if (data.posts?.nodes?.length > 0) {
      console.log('📝 Latest Post:');
      const post = data.posts.nodes[0];
      console.log('   Title:', post.title || 'N/A');
      console.log('   Date:', post.date || 'N/A');
    } else {
      console.log('📝 No posts found (this is normal for a new site)');
    }
  } catch (error) {
    console.error('❌ Connection failed:');

    if (
      error.message.includes('ENOTFOUND') ||
      error.message.includes('ECONNREFUSED')
    ) {
      console.log('🔧 Troubleshooting:');
      console.log('   1. Make sure your WordPress Local site is running');
      console.log(
        '   2. Check that the site URL in .env.local matches your WordPress Local site',
      );
      console.log('   3. Verify WPGraphQL plugin is installed and activated');
      console.log('   4. Try accessing the GraphQL endpoint in your browser:');
      console.log('      ' + wpUrl);
    } else if (error.message.includes('CORS')) {
      console.log('🔧 CORS Issue:');
      console.log('   1. Add the CORS configuration to your WordPress site');
      console.log(
        '   2. Check the wordpress-local-config.php file for setup instructions',
      );
    } else {
      console.log('Error details:', error.message);
    }
  }
}

// Run the test
testWordPressConnection();
