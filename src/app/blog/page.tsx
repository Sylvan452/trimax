import { Metadata } from "next";
import PageHero from "../components/PageHero";
import BlogCard from "../components/BlogCard";
import { generateSeoMetadata } from "../components/Seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Blog - Trimax",
  description: "Stay updated with the latest insights, tutorials, and industry trends in web development, design, and digital marketing.",
  keywords: ["blog", "web development", "design", "digital marketing", "tutorials", "insights"],
});

// Mock blog data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.",
    content: "",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/authors/sarah.jpg",
      bio: "Senior Full-Stack Developer"
    },
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["React", "Next.js", "AI", "PWA"],
    image: "/images/blog/web-dev-trends-2024.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Designing for Accessibility: A Complete Guide",
    excerpt: "Learn how to create inclusive designs that work for everyone, including users with disabilities.",
    content: "",
    author: {
      name: "Michael Chen",
      avatar: "/images/authors/michael.jpg",
      bio: "UX/UI Designer"
    },
    publishedAt: "2024-01-12",
    readTime: "12 min read",
    category: "Design",
    tags: ["Accessibility", "UX", "Design", "WCAG"],
    image: "/images/blog/accessibility-guide.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "Optimizing React Performance: Best Practices",
    excerpt: "Discover proven techniques to make your React applications faster and more efficient.",
    content: "",
    author: {
      name: "David Rodriguez",
      avatar: "/images/authors/david.jpg",
      bio: "React Specialist"
    },
    publishedAt: "2024-01-10",
    readTime: "10 min read",
    category: "Development",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    image: "/images/blog/react-performance.jpg",
    featured: false,
  },
  {
    id: "4",
    title: "Building Scalable E-commerce Solutions",
    excerpt: "A comprehensive guide to creating e-commerce platforms that can grow with your business.",
    content: "",
    author: {
      name: "Emily Watson",
      avatar: "/images/authors/emily.jpg",
      bio: "E-commerce Architect"
    },
    publishedAt: "2024-01-08",
    readTime: "15 min read",
    category: "E-commerce",
    tags: ["E-commerce", "Scalability", "Architecture", "Business"],
    image: "/images/blog/ecommerce-scalability.jpg",
    featured: true,
  },
  {
    id: "5",
    title: "The Art of Minimalist Web Design",
    excerpt: "Explore how minimalist design principles can create powerful and engaging user experiences.",
    content: "",
    author: {
      name: "Alex Thompson",
      avatar: "/images/authors/alex.jpg",
      bio: "Creative Director"
    },
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    category: "Design",
    tags: ["Minimalism", "Design", "UX", "Aesthetics"],
    image: "/images/blog/minimalist-design.jpg",
    featured: false,
  },
  {
    id: "6",
    title: "SEO Best Practices for Modern Websites",
    excerpt: "Master the latest SEO techniques to improve your website's visibility and search rankings.",
    content: "",
    author: {
      name: "Lisa Park",
      avatar: "/images/authors/lisa.jpg",
      bio: "SEO Specialist"
    },
    publishedAt: "2024-01-03",
    readTime: "11 min read",
    category: "Marketing",
    tags: ["SEO", "Marketing", "Search", "Analytics"],
    image: "/images/blog/seo-best-practices.jpg",
    featured: false,
  },
];

const categories = ["All", "Web Development", "Design", "Development", "E-commerce", "Marketing"];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Blog"
        subtitle="Insights & Updates"
        description="Stay updated with the latest insights, tutorials, and industry trends in web development, design, and digital marketing."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Articles
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our most popular and insightful articles, handpicked for you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  {...post}
                  href={`/blog/${post.id}`}
                  variant="horizontal"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 sm:mb-0">
                  All Articles
                </h2>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="px-4 py-2 text-sm font-medium rounded-full border border-border bg-background text-foreground hover:bg-trimax hover:text-trimax-foreground hover:border-trimax transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    {...post}
                    href={`/blog/${post.id}`}
                    variant="default"
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="bg-trimax text-trimax-foreground px-8 py-3 rounded-lg hover:bg-trimax/90 transition-colors duration-200 font-medium">
                  Load More Articles
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              {/* Newsletter Signup */}
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get the latest articles and insights delivered to your inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-trimax focus:border-transparent bg-background text-foreground"
                  />
                  <button
                    type="submit"
                    className="w-full bg-trimax text-trimax-foreground px-4 py-3 rounded-lg hover:bg-trimax/90 transition-colors duration-200 font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Popular Tags */}
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Design", "UX", "JavaScript", "SEO", "Performance", "Accessibility", "E-commerce", "AI"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-trimax hover:text-trimax-foreground cursor-pointer transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex space-x-3">
                      <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-trimax text-trimax-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help bring your vision to life with our expertise and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-trimax px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Get Started
              </a>
              <a
                href="/portfolio"
                className="border border-white/20 text-trimax-foreground px-8 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}