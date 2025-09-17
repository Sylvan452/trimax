import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateSeoMetadata } from "../../components/Seo";
import BlogCard from "../../components/BlogCard";

// Mock blog data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: "1",
    slug: "future-of-web-development-2024",
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.",
    content: `
      <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will reshape how we build and interact with web applications. In this comprehensive guide, we'll explore the most significant trends that developers and businesses should watch.</p>

      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing the development process. From code generation to automated testing, AI tools are becoming indispensable for modern developers. GitHub Copilot, ChatGPT, and other AI assistants are helping developers write code faster and with fewer errors.</p>

      <h3>Key Benefits:</h3>
      <ul>
        <li>Faster code generation and completion</li>
        <li>Automated bug detection and fixes</li>
        <li>Intelligent code suggestions</li>
        <li>Enhanced productivity and efficiency</li>
      </ul>

      <h2>2. Progressive Web Apps (PWAs) Evolution</h2>
      <p>PWAs continue to bridge the gap between web and native applications. With improved capabilities and better browser support, PWAs are becoming the preferred choice for businesses looking to provide app-like experiences without the complexity of native development.</p>

      <h2>3. WebAssembly (WASM) Adoption</h2>
      <p>WebAssembly is enabling high-performance applications in the browser. Languages like Rust, C++, and Go can now run in web browsers with near-native performance, opening up new possibilities for web applications.</p>

      <h2>4. Micro-Frontends Architecture</h2>
      <p>As applications grow in complexity, micro-frontends are becoming a popular architectural pattern. This approach allows teams to develop, deploy, and maintain different parts of an application independently.</p>

      <h2>5. Enhanced Developer Experience</h2>
      <p>Tools like Vite, Turbopack, and improved hot reloading are making development faster and more enjoyable. The focus on developer experience continues to drive innovation in build tools and development environments.</p>

      <h2>Conclusion</h2>
      <p>The future of web development is bright, with AI, improved performance, and better developer tools leading the way. Staying updated with these trends will help developers and businesses stay competitive in the rapidly evolving digital landscape.</p>
    `,
    author: {
      name: "Sarah Johnson",
      avatar: "/images/authors/sarah.jpg",
      bio: "Senior Full-Stack Developer with 8+ years of experience in modern web technologies."
    },
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["React", "Next.js", "AI", "PWA", "WebAssembly"],
    image: "/images/blog/web-dev-trends-2024.jpg",
    featured: true,
  },
  {
    id: "2",
    slug: "designing-for-accessibility-guide",
    title: "Designing for Accessibility: A Complete Guide",
    excerpt: "Learn how to create inclusive designs that work for everyone, including users with disabilities.",
    content: `
      <p>Accessibility in web design isn't just a nice-to-have feature—it's a fundamental requirement for creating inclusive digital experiences. This comprehensive guide will walk you through the essential principles and practices for designing accessible websites and applications.</p>

      <h2>Understanding Web Accessibility</h2>
      <p>Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them. This includes users with visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>

      <h2>The WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide the foundation for web accessibility. The guidelines are organized around four main principles:</p>

      <h3>1. Perceivable</h3>
      <ul>
        <li>Provide text alternatives for images</li>
        <li>Offer captions and transcripts for multimedia</li>
        <li>Ensure sufficient color contrast</li>
        <li>Make content adaptable to different presentations</li>
      </ul>

      <h3>2. Operable</h3>
      <ul>
        <li>Make all functionality keyboard accessible</li>
        <li>Give users enough time to read content</li>
        <li>Don't use content that causes seizures</li>
        <li>Help users navigate and find content</li>
      </ul>

      <h3>3. Understandable</h3>
      <ul>
        <li>Make text readable and understandable</li>
        <li>Make content appear and operate predictably</li>
        <li>Help users avoid and correct mistakes</li>
      </ul>

      <h3>4. Robust</h3>
      <ul>
        <li>Maximize compatibility with assistive technologies</li>
        <li>Use valid, semantic HTML</li>
        <li>Ensure content works across different browsers and devices</li>
      </ul>

      <h2>Practical Implementation Tips</h2>
      <p>Here are some practical steps you can take to improve accessibility in your designs:</p>

      <h3>Color and Contrast</h3>
      <p>Ensure your color combinations meet WCAG contrast requirements. Use tools like WebAIM's Contrast Checker to verify your color choices.</p>

      <h3>Typography</h3>
      <p>Choose readable fonts and maintain appropriate font sizes. Avoid using color alone to convey information.</p>

      <h3>Navigation</h3>
      <p>Create clear, consistent navigation patterns. Provide skip links and ensure all interactive elements are keyboard accessible.</p>

      <h2>Testing for Accessibility</h2>
      <p>Regular testing is crucial for maintaining accessibility. Use automated tools like axe-core, but also conduct manual testing with screen readers and keyboard navigation.</p>

      <h2>Conclusion</h2>
      <p>Designing for accessibility benefits everyone, not just users with disabilities. By following these guidelines and making accessibility a priority from the start, you'll create better experiences for all users.</p>
    `,
    author: {
      name: "Michael Chen",
      avatar: "/images/authors/michael.jpg",
      bio: "UX/UI Designer specializing in inclusive design and accessibility."
    },
    publishedAt: "2024-01-12",
    updatedAt: "2024-01-12",
    readTime: "12 min read",
    category: "Design",
    tags: ["Accessibility", "UX", "Design", "WCAG", "Inclusive Design"],
    image: "/images/blog/accessibility-guide.jpg",
    featured: false,
  },
  // Add more blog posts as needed...
];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(post => post.slug === params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found - Trimax Blog",
      description: "The requested blog post could not be found.",
    };
  }

  return generateSeoMetadata({
    title: `${post.title} - Trimax Blog`,
    description: post.excerpt,
    keywords: post.tags,
    image: post.image,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author.name,
  });
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-trimax transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-trimax transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category and Reading Time */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-trimax text-trimax-foreground px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-muted-foreground text-sm">
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Date */}
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-border">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-foreground">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {post.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {post.author.bio}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-muted-foreground">
                  Published on
                </p>
                <p className="font-medium text-foreground">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 bg-muted rounded-lg mb-12 flex items-center justify-center">
              <span className="text-muted-foreground">Featured Image</span>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-a:text-trimax hover:prose-a:text-trimax/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-trimax hover:text-trimax-foreground cursor-pointer transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Share this article
              </h3>
              <div className="flex space-x-4">
                {[
                  { name: "Twitter", icon: "T" },
                  { name: "LinkedIn", icon: "L" },
                  { name: "Facebook", icon: "F" },
                  { name: "Copy Link", icon: "🔗" },
                ].map((social) => (
                  <button
                    key={social.name}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-trimax hover:text-trimax-foreground transition-colors duration-200"
                    aria-label={`Share on ${social.name}`}
                  >
                    <span className="text-sm font-medium">
                      {social.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.id}
                    {...relatedPost}
                    href={`/blog/${relatedPost.id}`}
                    variant="default"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-trimax text-trimax-foreground rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Get the latest articles and insights delivered straight to your inbox. No spam, just valuable content.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-trimax px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}