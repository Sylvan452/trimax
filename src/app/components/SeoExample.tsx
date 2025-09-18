// Example usage of the SeoComponent in Next.js App Router pages

import { Metadata } from 'next';
import { generateMetadata, createBasicMetadata } from './SeoComponent';

// Example 1: Basic usage with minimal props
export const basicMetadata: Metadata = createBasicMetadata(
  'About Us',
  'Learn more about Trimax and our mission to transform digital experiences.',
  '/about'
);

// Example 2: Advanced usage with all props
export const advancedMetadata: Metadata = generateMetadata({
  title: 'Our Services - Web Development & Design',
  description: 'Discover our comprehensive web development and design services. We create modern, responsive websites that drive results.',
  canonicalUrl: '/services',
  keywords: ['web development', 'web design', 'responsive design', 'SEO'],
  image: '/services-hero.jpg',
  type: 'website',
  author: 'Trimax Development Team',
});

// Example 3: Blog post metadata
export const blogPostMetadata: Metadata = generateMetadata({
  title: 'The Future of Web Development',
  description: 'Explore the latest trends and technologies shaping the future of web development in 2024.',
  canonicalUrl: '/blog/future-of-web-development',
  keywords: ['web development', 'technology trends', 'javascript', 'react'],
  image: '/blog/future-web-dev.jpg',
  type: 'article',
  author: 'John Doe',
});

/*
HOW TO USE IN YOUR PAGES:

1. For a basic page (e.g., app/about/page.tsx):

import { Metadata } from 'next';
import { createBasicMetadata } from '../components/SeoComponent';

export const metadata: Metadata = createBasicMetadata(
  'About Us',
  'Learn more about our company and mission.',
  '/about'
);

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our about page...</p>
    </div>
  );
}

2. For an advanced page (e.g., app/services/page.tsx):

import { Metadata } from 'next';
import { generateMetadata } from '../components/SeoComponent';

export const metadata: Metadata = generateMetadata({
  title: 'Our Services',
  description: 'Comprehensive web development and design services.',
  canonicalUrl: '/services',
  keywords: ['web development', 'design', 'SEO'],
  image: '/services-hero.jpg',
});

export default function ServicesPage() {
  return (
    <div>
      <h1>Our Services</h1>
      <p>We offer...</p>
    </div>
  );
}

3. For dynamic pages (e.g., app/blog/[slug]/page.tsx):

import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata } from '../../components/SeoComponent';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch post data
  const post = await getPostBySlug(params.slug);
  
  return generateSeoMetadata({
    title: post.title,
    description: post.excerpt,
    canonicalUrl: `/blog/${params.slug}`,
    keywords: post.tags,
    image: post.featuredImage,
    type: 'article',
    author: post.author,
  });
}

export default function BlogPost({ params }: Props) {
  return (
    <article>
      <h1>Blog Post</h1>
    </article>
  );
}
*/