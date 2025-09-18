import { Metadata } from 'next';
import PageHero from '../components/PageHero';
import PortfolioGrid from '../components/PortfolioGrid';
import { generateSeoMetadata } from '../components/Seo';

export const metadata: Metadata = generateSeoMetadata({
  title: 'Portfolio - Trimax',
  description:
    "Explore our portfolio of successful web development, design, and digital marketing projects. See how we've helped businesses achieve their goals.",
  keywords: [
    'portfolio',
    'web development projects',
    'design showcase',
    'trimax work',
    'case studies',
  ],
  url: 'https://trimax.com/portfolio',
});

export default function PortfolioPage() {
  const portfolioItems = [
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      description:
        'A modern e-commerce platform built with Next.js and Stripe integration, featuring advanced product filtering, wishlist functionality, and seamless checkout experience.',
      image: '/portfolio/ecommerce.jpg',
      category: 'E-commerce',
      tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
      href: '#',
      client: 'Fashion Forward',
      year: '2024',
      featured: true,
    },
    {
      id: 'saas-dashboard',
      title: 'SaaS Analytics Dashboard',
      description:
        'A comprehensive analytics dashboard for a SaaS platform with real-time data visualization, user management, and subscription handling.',
      image: '/portfolio/dashboard.jpg',
      category: 'Web App',
      tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      href: '#',
      client: 'DataFlow Inc',
      year: '2024',
    },
    {
      id: 'restaurant-website',
      title: 'Restaurant Website',
      description:
        'A beautiful restaurant website with online reservation system, menu showcase, and location finder with integrated Google Maps.',
      image: '/portfolio/restaurant.jpg',
      category: 'Website',
      tags: ['WordPress', 'PHP', 'MySQL', 'Google Maps API'],
      href: '#',
      client: 'Bella Vista',
      year: '2023',
    },
    {
      id: 'mobile-app',
      title: 'Fitness Mobile App',
      description:
        'A cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features for motivation.',
      image: '/portfolio/mobile-app.jpg',
      category: 'Mobile App',
      tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
      href: '#',
      client: 'FitLife',
      year: '2024',
      featured: true,
    },
    {
      id: 'corporate-website',
      title: 'Corporate Website',
      description:
        'A professional corporate website with multi-language support, content management system, and integrated blog platform.',
      image: '/portfolio/corporate.jpg',
      category: 'Website',
      tags: ['Next.js', 'Sanity CMS', 'i18n', 'Vercel'],
      href: '#',
      client: 'TechCorp Solutions',
      year: '2023',
    },
    {
      id: 'portfolio-website',
      title: 'Artist Portfolio',
      description:
        'A stunning portfolio website for a digital artist featuring image galleries, contact forms, and social media integration.',
      image: '/portfolio/artist.jpg',
      category: 'Portfolio',
      tags: ['Gatsby', 'GraphQL', 'Netlify', 'Instagram API'],
      href: '#',
      client: 'Sarah Martinez',
      year: '2023',
    },
    {
      id: 'booking-system',
      title: 'Hotel Booking System',
      description:
        'A comprehensive hotel booking platform with room availability, pricing management, and payment processing capabilities.',
      image: '/portfolio/hotel.jpg',
      category: 'Web App',
      tags: ['Vue.js', 'Laravel', 'MySQL', 'PayPal API'],
      href: '#',
      client: 'Grand Hotel',
      year: '2024',
    },
    {
      id: 'learning-platform',
      title: 'Online Learning Platform',
      description:
        'An interactive e-learning platform with video courses, quizzes, progress tracking, and certificate generation.',
      image: '/portfolio/learning.jpg',
      category: 'E-learning',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      href: '#',
      client: 'EduTech Academy',
      year: '2024',
    },
    {
      id: 'real-estate',
      title: 'Real Estate Platform',
      description:
        'A modern real estate platform with property listings, virtual tours, mortgage calculator, and agent profiles.',
      image: '/portfolio/realestate.jpg',
      category: 'Website',
      tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Mapbox'],
      href: '#',
      client: 'Prime Properties',
      year: '2023',
    },
  ];

  const categories = [
    'All',
    'Website',
    'Web App',
    'E-commerce',
    'Mobile App',
    'Portfolio',
    'E-learning',
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Our Portfolio"
        subtitle="Our Work"
        description="Explore our collection of successful projects and see how we've helped businesses achieve their digital goals through innovative solutions."
      />

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-trimax mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a look at some of our recent work and see how we&apos;ve
              helped businesses transform their digital presence.
            </p>
          </div>

          <PortfolioGrid
            items={portfolioItems}
            categories={categories}
            showFilter={true}
            columns={3}
            showLoadMore={true}
            initialItemsCount={6}
          />
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technologies We Use
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with cutting-edge technologies to deliver modern,
              scalable, and performant solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'React',
              'Next.js',
              'Vue.js',
              'Node.js',
              'TypeScript',
              'Tailwind CSS',
              'MongoDB',
              'PostgreSQL',
              'Firebase',
              'AWS',
              'Vercel',
              'Figma',
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 text-center hover:border-trimax/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-trimax font-bold text-lg">
                    {tech.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients
              have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Trimax delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and user experience is outstanding.',
                author: 'Jennifer Smith',
                role: 'CEO, Fashion Forward',
              },
              {
                quote:
                  'The team at Trimax transformed our outdated website into a modern, responsive platform that has significantly improved our online presence.',
                author: 'Michael Johnson',
                role: 'Marketing Director, TechCorp',
              },
              {
                quote:
                  'Working with Trimax was a pleasure. They understood our vision and delivered a mobile app that our users absolutely love.',
                author: 'Sarah Davis',
                role: 'Founder, FitLife',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="text-trimax mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-trimax rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-trimax-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-trimax-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s work together to create something amazing. Get in touch
              to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-trimax-foreground text-trimax px-6 py-3 rounded-lg hover:bg-trimax-foreground/90 transition-colors duration-200 font-medium"
              >
                Start Your Project
              </a>
              <a
                href="/services"
                className="border border-trimax-foreground/20 text-trimax-foreground px-6 py-3 rounded-lg hover:bg-trimax-foreground/10 transition-colors duration-200 font-medium"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
