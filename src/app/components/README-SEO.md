# SEO Component Documentation

## Overview

The `SeoComponent.tsx` provides a reusable SEO solution for Next.js App Router applications. It includes both server-side metadata generation and client-side structured data (JSON-LD).

## Features

- ✅ Next.js App Router compatible
- ✅ Server-side metadata generation
- ✅ Client-side structured data (JSON-LD)
- ✅ TypeScript support
- ✅ Flexible and extensible
- ✅ SEO best practices

## Basic Usage

### 1. Server Component (Metadata Generation)

```typescript
// app/your-page/page.tsx
import { generateMetadata } from '@/app/components/SeoComponent';

export const metadata = generateMetadata({
  title: "Your Page Title",
  description: "Your page description",
  canonicalUrl: "https://yoursite.com/your-page"
});

export default function YourPage() {
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

### 2. Client Component (Structured Data)

```typescript
// app/your-page/page.tsx
import { SeoComponent } from '@/app/components/SeoComponent';

export default function YourPage() {
  return (
    <div>
      <SeoComponent
        title="Your Page Title"
        description="Your page description"
        canonicalUrl="https://yoursite.com/your-page"
      />
      {/* Your page content */}
    </div>
  );
}
```

## Advanced Usage

### With All Optional Props

```typescript
export const metadata = generateMetadata({
  title: "Advanced Page Title",
  description: "Detailed page description",
  canonicalUrl: "https://yoursite.com/advanced-page",
  keywords: ["keyword1", "keyword2", "keyword3"],
  image: "https://yoursite.com/og-image.jpg",
  type: "article",
  author: "Author Name"
});
```

### Dynamic Pages

```typescript
// app/blog/[slug]/page.tsx
import { generateMetadata } from '@/app/components/SeoComponent';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  // Fetch your data
  const post = await getPost(params.slug);
  
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    canonicalUrl: `https://yoursite.com/blog/${params.slug}`,
    keywords: post.tags,
    image: post.featuredImage,
    type: "article",
    author: post.author
  });
}
```

## Props Reference

### Required Props
- `title` (string): Page title
- `description` (string): Page description
- `canonicalUrl` (string): Canonical URL of the page

### Optional Props
- `keywords` (string[]): Array of keywords
- `image` (string): Open Graph image URL
- `type` ("website" | "article"): Page type for Open Graph
- `author` (string): Author name

## Generated Metadata

The component generates:

1. **Basic Meta Tags**
   - Title
   - Description
   - Keywords
   - Canonical URL

2. **Open Graph Tags**
   - og:title
   - og:description
   - og:url
   - og:image
   - og:type
   - og:site_name

3. **Twitter Cards**
   - twitter:card
   - twitter:title
   - twitter:description
   - twitter:image

4. **Structured Data (JSON-LD)**
   - Organization schema
   - WebPage schema
   - Article schema (when type="article")

## Implementation Example

See `SeoExample.tsx` for complete implementation examples including:
- Basic usage
- Advanced usage with all props
- Dynamic page integration
- Best practices

## Best Practices

1. Always provide meaningful titles and descriptions
2. Use canonical URLs to prevent duplicate content
3. Include relevant keywords but avoid keyword stuffing
4. Provide high-quality Open Graph images
5. Use appropriate schema types for different content types
6. Test your metadata with tools like:
   - Google Rich Results Test
   - Facebook Sharing Debugger
   - Twitter Card Validator

## Migration from Existing SEO

If you have an existing SEO implementation, you can gradually migrate by:

1. Replace existing metadata exports with `generateMetadata()`
2. Add the `SeoComponent` for structured data
3. Update your canonical URLs
4. Test each page after migration