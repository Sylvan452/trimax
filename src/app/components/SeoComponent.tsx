import { Metadata } from 'next';

interface SeoComponentProps {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
}

/**
 * Generates metadata for Next.js App Router pages
 * @param props - SEO properties including title, description, and canonicalUrl
 * @returns Metadata object for Next.js App Router
 */
export function generateMetadata({
  title,
  description,
  canonicalUrl,
  keywords = [],
  image = '/og-image.jpg',
  type = 'website',
  author = 'Trimax Team',
}: SeoComponentProps): Metadata {
  const siteName = 'Trimax';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Ensure canonicalUrl is absolute
  const absoluteCanonicalUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `https://trimax.com${canonicalUrl}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: author }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: 'en_US',
      url: absoluteCanonicalUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image.startsWith('http') ? image : `https://trimax.com${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `https://trimax.com${image}`],
      creator: '@trimax',
      site: '@trimax',
    },
    alternates: {
      canonical: absoluteCanonicalUrl,
    },
    verification: {
      google: 'your-google-verification-code',
    },
    category: 'technology',
  };
}

/**
 * SEO Component for client-side usage (if needed)
 * Note: In App Router, metadata should be generated at the page level
 * This component can be used for additional structured data
 */
interface SeoProps extends SeoComponentProps {
  jsonLd?: Record<string, unknown>;
}

export default function SeoComponent({ 
  title, 
  description, 
  canonicalUrl,
  jsonLd 
}: SeoProps) {
  // Generate structured data for the page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl.startsWith('http') ? canonicalUrl : `https://trimax.com${canonicalUrl}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Trimax',
      url: 'https://trimax.com',
    },
    ...jsonLd,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

/**
 * Utility function to create basic metadata quickly
 */
export function createBasicMetadata(
  title: string, 
  description: string, 
  canonicalUrl: string
): Metadata {
  return generateMetadata({ title, description, canonicalUrl });
}