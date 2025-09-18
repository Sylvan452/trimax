import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchPublicData } from '@/lib/api';
import { GET_POST_BY_SLUG, GET_RECENT_POSTS } from '@/lib/queries';

// Types for our blog data
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
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
      description?: string;
      avatar?: {
        url: string;
      };
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
      description?: string;
    }>;
  };
  tags: {
    nodes: Array<{
      name: string;
      slug: string;
      description?: string;
    }>;
   };
   seo?: {
     title?: string;
     metaDesc?: string;
     focuskw?: string;
     metaKeywords?: string;
     metaRobotsNoindex?: string;
     metaRobotsNofollow?: string;
     opengraphTitle?: string;
     opengraphDescription?: string;
     opengraphImage?: {
       sourceUrl: string;
     };
     twitterTitle?: string;
     twitterDescription?: string;
     twitterImage?: {
       sourceUrl: string;
     };
   };
 }

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

interface PostData {
  post: BlogPost;
}

interface RecentPostsData {
  posts: {
    nodes: Array<{
      id: string;
      title: string;
      slug: string;
      date: string;
      featuredImage?: {
        node: {
          sourceUrl: string;
          altText: string;
        };
      };
    }>;
  };
}

// Fetch individual post by slug
async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await fetchPublicData<PostData>(GET_POST_BY_SLUG, { slug });
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch recent posts for sidebar
async function getRecentPosts(): Promise<RecentPostsData> {
  try {
    const data = await fetchPublicData<RecentPostsData>(GET_RECENT_POSTS, { first: 5 });
    return data;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return {
      posts: {
        nodes: [],
      },
    };
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Trimax',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
     title: post.seo?.title || `${post.title} - Trimax Blog`,
     description: post.seo?.metaDesc || post.excerpt,
     keywords: post.seo?.metaKeywords || undefined,
     openGraph: {
       title: post.seo?.opengraphTitle || post.title,
       description: post.seo?.opengraphDescription || post.excerpt,
       type: 'article',
       publishedTime: post.date,
       modifiedTime: post.modified,
       authors: [post.author.node.name],
       images: post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node.sourceUrl ? [
         {
           url: post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node.sourceUrl || '',
           width: post.featuredImage?.node.mediaDetails.width || 1200,
           height: post.featuredImage?.node.mediaDetails.height || 630,
           alt: post.featuredImage?.node.altText || post.title,
         }
       ] : [],
     },
     twitter: {
       card: 'summary_large_image',
       title: post.seo?.twitterTitle || post.seo?.opengraphTitle || post.title,
       description: post.seo?.twitterDescription || post.seo?.opengraphDescription || post.excerpt,
       images: post.seo?.twitterImage?.sourceUrl || post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node.sourceUrl || undefined,
     },
     robots: {
       index: post.seo?.metaRobotsNoindex !== 'noindex',
       follow: post.seo?.metaRobotsNofollow !== 'nofollow',
     },
   };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, recentPostsData] = await Promise.all([
    getPostBySlug(slug),
    getRecentPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const recentPosts = recentPostsData.posts.nodes.filter(p => p.slug !== post.slug).slice(0, 3);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate reading time (rough estimate)
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900">{post.title}</li>
              </ol>
            </nav>

            {/* Categories and Reading Time */}
            <div className="flex items-center space-x-4 mb-6">
              {post.categories.nodes.length > 0 && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.categories.nodes[0].name}
                </span>
              )}
              <span className="text-gray-600 text-sm">
                {calculateReadingTime(post.content)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </p>
            )}

            {/* Author and Date */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
              {post.author.node.avatar?.url && (
                <Image
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{post.author.node.name}</p>
                <p className="text-sm text-gray-600">
                  Published on {formatDate(post.date)}
                  {post.modified !== post.date && (
                    <span> • Updated {formatDate(post.modified)}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={post.featuredImage.node.mediaDetails.width}
                  height={post.featuredImage.node.mediaDetails.height}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div 
              className="prose prose-lg prose-slate max-w-none mb-12 text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.nodes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.nodes.map((tag) => (
                    <span
                      key={tag.slug}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author.node.description && (
              <div className="bg-gray-100 rounded-lg p-6 mb-12">
                <div className="flex items-start space-x-4">
                  {post.author.node.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About {post.author.node.name}</h3>
                    <p className="text-gray-600">{post.author.node.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {relatedPost.featuredImage && (
                        <Image
                          src={relatedPost.featuredImage.node.sourceUrl}
                          alt={relatedPost.featuredImage.node.altText || relatedPost.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {formatDate(relatedPost.date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}