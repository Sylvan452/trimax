import { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ServiceCard from "./components/ServiceCard";
import BlogCard from "./components/BlogCard";
import { generateSeoMetadata } from "./components/Seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Trimax - Digital Solutions & Web Development",
  description: "Transform your digital presence with Trimax. We create stunning websites, powerful web applications, and comprehensive digital solutions for modern businesses.",
  keywords: ["web development", "digital solutions", "web design", "e-commerce", "mobile apps", "UI/UX design"],
});

// Mock data for featured services and blog posts
const featuredServices = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
    icon: "💻",
    features: ["React & Next.js", "TypeScript", "Responsive Design", "SEO Optimized"],
    price: {
      amount: "2,999",
      currency: "$",
      period: "Starting at"
    },
    href: "/services#web-development",
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that engage users and drive conversions through thoughtful user experience.",
    icon: "🎨",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    price: {
      amount: "1,999",
      currency: "$",
      period: "Starting at"
    },
    href: "/services#ui-ux-design",
  },
  {
    title: "E-commerce Solutions",
    description: "Complete online stores with secure payments, inventory management, and seamless shopping experiences.",
    icon: "🛒",
    features: ["Payment Integration", "Inventory Management", "Analytics", "Mobile Optimized"],
    price: {
      amount: "4,999",
      currency: "$",
      period: "Starting at"
    },
    href: "/services#ecommerce",
  },
];

const featuredBlogPosts = [
  {
    id: "1",
    slug: "future-of-web-development-2024",
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.",
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
    slug: "designing-for-accessibility-guide",
    title: "Designing for Accessibility: A Complete Guide",
    excerpt: "Learn how to create inclusive designs that work for everyone, including users with disabilities.",
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
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-trimax/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-trimax to-accent bg-clip-text text-transparent">
                Digital Presence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We create stunning websites, powerful web applications, and comprehensive digital solutions that drive results for modern businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-trimax text-trimax-foreground px-8 py-4 rounded-lg hover:bg-trimax/90 transition-colors duration-200 font-medium text-lg"
              >
                Start Your Project
              </Link>
              <Link
                href="/portfolio"
                className="border border-border text-foreground px-8 py-4 rounded-lg hover:bg-muted transition-colors duration-200 font-medium text-lg"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-trimax mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From concept to launch, we provide end-to-end digital solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="bg-trimax text-trimax-foreground px-8 py-3 rounded-lg hover:bg-trimax/90 transition-colors duration-200 font-medium"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Trimax?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We&apos;re not just developers – we&apos;re digital strategists who understand that great technology should serve your business goals. Our team combines technical expertise with creative vision to deliver solutions that make a real impact.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Expert Team",
                    description: "Skilled developers and designers with years of industry experience.",
                  },
                  {
                    title: "Modern Technology",
                    description: "We use the latest tools and frameworks to build future-proof solutions.",
                  },
                  {
                    title: "Client-Focused",
                    description: "Your success is our priority. We work closely with you throughout the process.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-trimax rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-trimax-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="text-trimax hover:text-trimax/80 font-medium"
                >
                  Learn more about us →
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-trimax/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <span className="text-muted-foreground text-lg">Team Photo / Illustration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Recent Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a look at some of our recent projects and see how we&apos;ve helped businesses achieve their digital goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                category: "Web Development",
                image: "/images/portfolio/ecommerce.jpg",
                description: "Modern online store with advanced features",
              },
              {
                title: "SaaS Dashboard",
                category: "UI/UX Design",
                image: "/images/portfolio/saas.jpg",
                description: "Clean and intuitive admin interface",
              },
              {
                title: "Corporate Website",
                category: "Web Development",
                image: "/images/portfolio/corporate.jpg",
                description: "Professional business website with CMS",
              },
            ].map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="w-full h-64 bg-muted rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-trimax/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-muted-foreground">{project.title}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-trimax font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="bg-trimax text-trimax-foreground px-8 py-3 rounded-lg hover:bg-trimax/90 transition-colors duration-200 font-medium"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights from the world of web development and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogPosts.map((post) => (
              <BlogCard
                key={post.id}
                {...post}
                href={`/blog/${post.id}`}
                variant="horizontal"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="bg-trimax text-trimax-foreground px-8 py-3 rounded-lg hover:bg-trimax/90 transition-colors duration-200 font-medium"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-trimax text-trimax-foreground rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let&apos;s discuss your project and see how we can help bring your vision to life with our expertise and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-trimax px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-lg"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="border border-white/20 text-trimax-foreground px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium text-lg"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
