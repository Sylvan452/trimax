# Trimax Media Deployment Guide

## Overview
This guide covers deploying the Trimax Media website with:
- **WordPress Backend**: Deployed to Hostinger (managed hosting)
- **Next.js Frontend**: Deployed to Vercel
- **Domain**: www.trimaxmedia.dev

## Part 1: WordPress Deployment on Hostinger

### Prerequisites
- Hostinger hosting account with WordPress support
- Domain access for www.trimaxmedia.dev
- WordPress files and database backup (if migrating)

### Step 1: Set Up WordPress on Hostinger

1. **Access Hostinger Control Panel**
   - Log into your Hostinger account
   - Navigate to the hosting dashboard

2. **Install WordPress**
   ```bash
   # Option A: Auto-installer
   - Go to "Auto Installer" in hPanel
   - Select WordPress
   - Choose domain: trimaxmedia.dev
   - Set subdirectory: /wp (recommended for headless setup)
   
   # Option B: Manual installation
   - Download WordPress from wordpress.org
   - Upload via File Manager or FTP
   ```

3. **Configure WordPress for Headless CMS**
   - Install required plugins:
     - WPGraphQL
     - WPGraphQL for ACF
     - JWT Authentication for WP-API
     - Custom Post Type UI (if needed)

### Step 2: Configure WordPress Plugins

1. **Install WPGraphQL Plugin**
   ```bash
   # Via WordPress Admin
   Plugins > Add New > Search "WPGraphQL" > Install & Activate
   ```

2. **Configure JWT Authentication**
   ```php
   # Add to wp-config.php
   define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
   define('JWT_AUTH_CORS_ENABLE', true);
   ```

3. **Set Permalink Structure**
   ```bash
   Settings > Permalinks > Post name
   ```

### Step 3: Configure CORS and API Access

1. **Add CORS Headers** (in .htaccess or server config)
   ```apache
   Header add Access-Control-Allow-Origin "https://www.trimaxmedia.dev"
   Header add Access-Control-Allow-Methods "GET, POST, OPTIONS"
   Header add Access-Control-Allow-Headers "Content-Type, Authorization"
   ```

2. **Test GraphQL Endpoint**
   ```bash
   # Test URL: https://trimaxmedia.dev/wp/graphql
   # Should return GraphQL playground
   ```

## Part 2: Next.js Deployment on Vercel

### Prerequisites
- Vercel account
- GitHub repository with your Next.js code
- Domain access for www.trimaxmedia.dev

### Step 1: Prepare Next.js Project

1. **Update Environment Variables**
   ```bash
   # Create .env.local for local development
   WORDPRESS_API_URL=https://trimaxmedia.dev/wp/graphql
   WORDPRESS_API_TOKEN=your-jwt-token
   MAIL_API_KEY=your-mail-service-api-key
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=https://www.trimaxmedia.dev
   ```

2. **Configure Next.js for Production**
   ```javascript
   // next.config.ts
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       domains: ['trimaxmedia.dev'],
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'trimaxmedia.dev',
           pathname: '/wp/wp-content/uploads/**',
         },
       ],
     },
     env: {
       WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
     },
   }
   
   module.exports = nextConfig
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub Repository**
   ```bash
   # Via Vercel Dashboard
   1. Go to vercel.com
   2. Click "New Project"
   3. Import from GitHub
   4. Select your trimax repository
   ```

2. **Configure Build Settings**
   ```bash
   # Build Command: npm run build
   # Output Directory: .next
   # Install Command: npm install
   # Development Command: npm run dev
   ```

3. **Set Environment Variables in Vercel**
   ```bash
   # In Vercel Dashboard > Project > Settings > Environment Variables
   WORDPRESS_API_URL=https://trimaxmedia.dev/wp/graphql
   WORDPRESS_API_TOKEN=your-jwt-token-here
   MAIL_API_KEY=your-mail-api-key
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=https://www.trimaxmedia.dev
   ```

### Step 3: Configure Custom Domain

1. **Add Domain in Vercel**
   ```bash
   # Vercel Dashboard > Project > Settings > Domains
   # Add: www.trimaxmedia.dev
   # Add: trimaxmedia.dev (redirect to www)
   ```

2. **Update DNS Records**
   ```bash
   # Add these DNS records in your domain provider:
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel's IP)
   ```

## Part 3: Environment Variables Configuration

### Required Environment Variables

```bash
# WordPress API Configuration
WORDPRESS_API_URL=https://trimaxmedia.dev/wp/graphql
WORDPRESS_API_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9... # JWT token from WordPress

# Mail Service (Choose one)
MAIL_API_KEY=your-sendgrid-api-key # For SendGrid
RESEND_API_KEY=your-resend-api-key # For Resend
MAILGUN_API_KEY=your-mailgun-api-key # For Mailgun

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://www.trimaxmedia.dev

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

### Environment Setup by Environment

```bash
# Development (.env.local)
WORDPRESS_API_URL=http://localhost/wordpress/graphql
NEXTAUTH_URL=http://localhost:3000

# Staging (.env.staging)
WORDPRESS_API_URL=https://staging.trimaxmedia.dev/wp/graphql
NEXTAUTH_URL=https://staging-trimaxmedia.vercel.app

# Production (Vercel Environment Variables)
WORDPRESS_API_URL=https://trimaxmedia.dev/wp/graphql
NEXTAUTH_URL=https://www.trimaxmedia.dev
```

## Part 4: ISR (Incremental Static Regeneration) Setup

### Configure ISR for WordPress Content

1. **Update API Routes for Revalidation**
   ```typescript
   // pages/api/revalidate.ts
   import { NextApiRequest, NextApiResponse } from 'next'
   
   export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse
   ) {
     // Check for secret to confirm this is a valid request
     if (req.query.secret !== process.env.REVALIDATE_SECRET) {
       return res.status(401).json({ message: 'Invalid token' })
     }
   
     try {
       // Revalidate the home page
       await res.revalidate('/')
       
       // Revalidate specific pages based on the webhook data
       const { slug, post_type } = req.body
       
       if (post_type === 'post') {
         await res.revalidate(`/blog/${slug}`)
         await res.revalidate('/blog') // Blog listing page
       }
       
       if (post_type === 'page') {
         await res.revalidate(`/${slug}`)
       }
       
       return res.json({ revalidated: true })
     } catch (err) {
       return res.status(500).send('Error revalidating')
     }
   }
   ```

2. **Configure WordPress Webhooks**
   ```php
   // Add to WordPress functions.php or custom plugin
   function trigger_nextjs_revalidation($post_id) {
     $post = get_post($post_id);
     
     if ($post->post_status === 'publish') {
       $webhook_url = 'https://www.trimaxmedia.dev/api/revalidate';
       $secret = get_option('nextjs_revalidate_secret');
       
       $data = array(
         'slug' => $post->post_name,
         'post_type' => $post->post_type,
         'secret' => $secret
       );
       
       wp_remote_post($webhook_url, array(
         'body' => json_encode($data),
         'headers' => array('Content-Type' => 'application/json'),
       ));
     }
   }
   
   add_action('save_post', 'trigger_nextjs_revalidation');
   ```

3. **Add Revalidation Secret to Environment Variables**
   ```bash
   # Add to Vercel Environment Variables
   REVALIDATE_SECRET=your-super-secret-revalidation-key
   
   # Add to WordPress (wp-config.php or options)
   define('NEXTJS_REVALIDATE_SECRET', 'your-super-secret-revalidation-key');
   ```

### Configure ISR in Next.js Pages

```typescript
// pages/blog/[slug].tsx
export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug)
  
  return {
    props: {
      post,
    },
    // Revalidate at most once every hour
    revalidate: 3600,
  }
}

// pages/index.tsx
export async function getStaticProps() {
  const posts = await getRecentPosts()
  
  return {
    props: {
      posts,
    },
    // Revalidate at most once every 10 minutes
    revalidate: 600,
  }
}
```

## Part 5: SSL and Security Configuration

### SSL Certificate Setup

1. **Hostinger SSL (WordPress)**
   ```bash
   # Enable SSL in Hostinger hPanel
   1. Go to SSL section
   2. Enable "Force HTTPS"
   3. Install Let's Encrypt certificate
   ```

2. **Vercel SSL (Next.js)**
   ```bash
   # Automatic SSL via Vercel
   # SSL certificates are automatically provisioned
   # Force HTTPS redirect is enabled by default
   ```

### Security Headers

```typescript
// next.config.ts - Add security headers
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## Part 6: Monitoring and Analytics

### Performance Monitoring

1. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```
   
   ```typescript
   // pages/_app.tsx
   import { Analytics } from '@vercel/analytics/react'
   
   export default function App({ Component, pageProps }) {
     return (
       <>
         <Component {...pageProps} />
         <Analytics />
       </>
     )
   }
   ```

2. **WordPress Performance**
   ```bash
   # Install caching plugins:
   - W3 Total Cache
   - WP Rocket (premium)
   - LiteSpeed Cache (if using LiteSpeed server)
   ```

## Deployment Checklist

### Pre-Deployment
- [ ] WordPress plugins installed and configured
- [ ] GraphQL endpoint accessible
- [ ] JWT authentication working
- [ ] Environment variables set
- [ ] Domain DNS configured
- [ ] SSL certificates ready

### WordPress Deployment
- [ ] WordPress installed on Hostinger
- [ ] Plugins activated
- [ ] CORS headers configured
- [ ] GraphQL endpoint tested
- [ ] Content migrated (if applicable)

### Next.js Deployment
- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Custom domain added
- [ ] SSL certificate active
- [ ] ISR revalidation working

### Post-Deployment
- [ ] Test all pages load correctly
- [ ] Verify API connections
- [ ] Test contact forms
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test ISR revalidation
- [ ] Monitor performance metrics

## Troubleshooting

### Common Issues

1. **CORS Errors**
   ```bash
   # Check WordPress CORS headers
   # Verify domain whitelist
   # Test with browser dev tools
   ```

2. **Environment Variables Not Loading**
   ```bash
   # Verify variable names match exactly
   # Check Vercel deployment logs
   # Restart Vercel deployment
   ```

3. **ISR Not Working**
   ```bash
   # Check webhook URL accessibility
   # Verify revalidation secret
   # Test manual revalidation
   ```

4. **Domain Not Resolving**
   ```bash
   # Check DNS propagation (use dig or nslookup)
   # Verify CNAME/A records
   # Wait for DNS propagation (up to 48 hours)
   ```

## Support and Maintenance

### Regular Maintenance Tasks
- Update WordPress core and plugins monthly
- Monitor Vercel deployment logs
- Check SSL certificate expiration
- Review performance metrics
- Backup WordPress database weekly

### Performance Optimization
- Enable WordPress caching
- Optimize images for web
- Use Vercel Image Optimization
- Monitor Core Web Vitals
- Implement proper caching headers

This deployment guide ensures a robust, scalable setup for your Trimax Media website with proper separation of concerns between the WordPress backend and Next.js frontend.