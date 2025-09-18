import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchPublicData } from '@/lib/api';
import { GET_ALL_POSTS, GET_CATEGORIES } from '@/lib/queries';

// Types for our blog data
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  author: {
    node: {
      name: string;
      slug: string;
      avatar?: {
        url: string;
      };
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

interface BlogPageData {
  posts: {
    nodes: BlogPost[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

interface CategoriesData {
  categories: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
      description: string;
      count: number;
    }>;
  };
}

// Generate metadata for the blog page
export const metadata: Metadata = {
  title: 'Blog | Trimax - Latest Insights & Updates',
  description:
    'Stay updated with the latest insights, tutorials, and industry news from Trimax. Explore our blog for expert tips and valuable content.',
  keywords: 'blog, insights, tutorials, industry news, Trimax, updates',
  openGraph: {
    title: 'Blog | Trimax - Latest Insights & Updates',
    description:
      'Stay updated with the latest insights, tutorials, and industry news from Trimax.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Trimax - Latest Insights & Updates',
    description:
      'Stay updated with the latest insights, tutorials, and industry news from Trimax.',
  },
};

// Fetch blog posts with ISR
async function getBlogPosts(): Promise<BlogPageData> {
  try {
    const data = await fetchPublicData<BlogPageData>(GET_ALL_POSTS, {
      first: 12, // Show 12 posts per page
    });
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
          endCursor: '',
        },
      },
    };
  }
}

// Fetch categories for sidebar
async function getCategories(): Promise<CategoriesData> {
  try {
    const data = await fetchPublicData<CategoriesData>(GET_CATEGORIES);
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      categories: {
        nodes: [],
      },
    };
  }
}

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Extract text from HTML excerpt
function extractTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .trim();
}

// Blog Post Card Component
function BlogPostCard({ post }: { post: BlogPost }) {
  const excerpt = extractTextFromHtml(post.excerpt);
  const truncatedExcerpt =
    excerpt.length > 150 ? excerpt.substring(0, 150) + '...' : excerpt;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Featured Image */}
      {post.featuredImage?.node && (
        <div className="relative h-48 w-full">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        {/* Categories */}
        {post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.nodes.slice(0, 2).map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">{truncatedExcerpt}</p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {post.author.node.avatar?.url && (
              <Image
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>By {post.author.node.name}</span>
          </div>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        {/* Read More Link */}
        <div className="mt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read More
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

// Categories Sidebar Component
function CategoriesSidebar({
  categories,
}: {
  categories: CategoriesData['categories']['nodes'];
}) {
  if (categories.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/blog/category/${category.slug}`}
              className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span>{category.name}</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main Blog Page Component
export default async function BlogPage() {
  // Fetch data with ISR
  const [blogData, categoriesData] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  const posts = blogData.posts.nodes;
  const categories = categoriesData.categories.nodes;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-blue-100">
              Stay updated with the latest insights, tutorials, and industry
              news
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              {posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {posts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination placeholder - can be enhanced later */}
                  {blogData.posts.pageInfo.hasNextPage && (
                    <div className="text-center">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Load More Posts
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    No Posts Found
                  </h2>
                  <p className="text-gray-600">
                    We&apos;re working on creating amazing content for you.
                    Check back soon!
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                <CategoriesSidebar categories={categories} />

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Get the latest posts delivered right to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-3 py-2 rounded text-gray-900 text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-blue-600 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enable ISR with 60 seconds revalidation
export const revalidate = 60;
