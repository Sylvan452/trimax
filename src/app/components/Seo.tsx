import { Metadata } from "next";

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateSeoMetadata({
  title = "Trimax - Modern Digital Agency",
  description = "A modern digital agency providing innovative solutions for your business needs. We specialize in web development, design, and digital marketing.",
  keywords = ["digital agency", "web development", "design", "marketing", "trimax"],
  image = "/og-image.jpg",
  url = "https://trimax.com",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Trimax Team",
}: SeoProps = {}): Metadata {
  const siteName = "Trimax";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: type === "product" ? "website" : type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [author],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@trimax",
      site: "@trimax",
    },
    alternates: {
      canonical: url,
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
    category: "technology",
  };
}

// JSON-LD structured data component
interface JsonLdProps {
  type?: "Organization" | "WebSite" | "Article" | "Product";
  data?: Record<string, unknown>;
}

export function JsonLd({ type = "Organization", data = {} }: JsonLdProps) {
  const defaultData: Record<string, Record<string, unknown>> = {
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Trimax",
      url: "https://trimax.com",
      logo: "https://trimax.com/logo.png",
      description: "A modern digital agency providing innovative solutions for your business needs.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-555-123-4567",
        contactType: "customer service",
      },
      sameAs: [
        "https://twitter.com/trimax",
        "https://linkedin.com/company/trimax",
        "https://github.com/trimax",
      ],
    },
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Trimax",
      url: "https://trimax.com",
      description: "A modern digital agency providing innovative solutions for your business needs.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://trimax.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    Article: {
      "@context": "https://schema.org",
      "@type": "Article",
      publisher: {
        "@type": "Organization",
        name: "Trimax",
        url: "https://trimax.com",
      },
    },
    Product: {
      "@context": "https://schema.org",
      "@type": "Product",
      brand: {
        "@type": "Brand",
        name: "Trimax",
      },
    },
  };

  const structuredData = { ...defaultData[type], ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Default SEO component for pages
export default function Seo(props: SeoProps) {
  return <JsonLd type="Organization" />;
}