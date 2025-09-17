import { Metadata } from 'next';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import { generateSeoMetadata } from '../components/Seo';

export const metadata: Metadata = generateSeoMetadata({
  title: 'Services - Trimax',
  description:
    'Explore our comprehensive digital services including web development, UI/UX design, e-commerce solutions, and digital marketing.',
  keywords: [
    'web development',
    'ui ux design',
    'e-commerce',
    'digital marketing',
    'trimax services',
  ],
  url: 'https://trimax.com/services',
});

export default function ServicesPage() {
  const services = [
    {
      title: 'Web Development',
      description:
        'Custom web applications built with modern technologies like React, Next.js, and Node.js for optimal performance and scalability.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      features: [
        'Responsive Design',
        'Modern Frameworks',
        'Performance Optimization',
        'SEO Implementation',
        'Cross-browser Compatibility',
      ],
      href: '/contact',
      buttonText: 'Get Quote',
    },
    {
      title: 'UI/UX Design',
      description:
        'User-centered design solutions that create intuitive and engaging experiences for your customers across all digital touchpoints.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          />
        </svg>
      ),
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Visual Design',
        'Usability Testing',
        'Design Systems',
      ],
      href: '/contact',
      buttonText: 'Get Quote',
      iconColor: 'accent' as const,
    },
    {
      title: 'E-commerce Solutions',
      description:
        'Complete e-commerce platforms with secure payment processing, inventory management, and conversion optimization.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      features: [
        'Shopping Cart Integration',
        'Payment Gateway Setup',
        'Inventory Management',
        'Order Processing',
        'Analytics & Reporting',
      ],
      href: '/contact',
      buttonText: 'Get Quote',
      featured: true,
    },
    {
      title: 'Digital Marketing',
      description:
        'Comprehensive digital marketing strategies including SEO, content marketing, and social media management to grow your online presence.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      features: [
        'SEO Optimization',
        'Content Strategy',
        'Social Media Management',
        'PPC Campaigns',
        'Analytics & Insights',
      ],
      href: '/contact',
      buttonText: 'Get Quote',
    },
    {
      title: 'Mobile Development',
      description:
        'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android devices.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
          />
        </svg>
      ),
      features: [
        'iOS & Android Apps',
        'Cross-platform Development',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
      ],
      href: '/contact',
      buttonText: 'Get Quote',
      iconColor: 'accent' as const,
    },
    {
      title: 'Consulting & Strategy',
      description:
        'Strategic digital consulting to help you make informed decisions about technology, user experience, and digital transformation.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      features: [
        'Digital Strategy',
        'Technology Consulting',
        'Process Optimization',
        'Team Training',
        'Project Management',
      ],
      href: '/contact',
      buttonText: 'Get Quote',
    },
  ];

  const pricingPlans = [
    {
      title: 'Starter',
      description:
        'Perfect for small businesses and startups looking to establish their online presence.',
      price: { amount: '2,999', period: 'project' },
      features: [
        '5-page responsive website',
        'Basic SEO optimization',
        'Contact form integration',
        'Mobile-friendly design',
        '3 months support',
      ],
      href: '/contact',
      buttonText: 'Get Started',
    },
    {
      title: 'Professional',
      description:
        'Ideal for growing businesses that need advanced features and custom functionality.',
      price: { amount: '7,999', period: 'project' },
      features: [
        'Custom web application',
        'Advanced SEO & analytics',
        'CMS integration',
        'E-commerce functionality',
        '6 months support',
        'Performance optimization',
      ],
      href: '/contact',
      buttonText: 'Get Started',
      featured: true,
    },
    {
      title: 'Enterprise',
      description:
        'Comprehensive solutions for large organizations with complex requirements.',
      price: { amount: 'Custom', period: 'quote' },
      features: [
        'Full-scale web platform',
        'Custom integrations',
        'Advanced security',
        'Scalable architecture',
        '12 months support',
        'Dedicated project manager',
        'Training & documentation',
      ],
      href: '/contact',
      buttonText: 'Contact Us',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Our Services"
        subtitle="What We Do"
        description="We offer comprehensive digital solutions to help your business thrive in the digital landscape. From web development to digital marketing, we've got you covered."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in creating digital experiences that drive results
              and help businesses grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow a proven methodology to ensure every project is
              delivered on time and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description:
                  'We start by understanding your business goals, target audience, and project requirements.',
              },
              {
                step: '02',
                title: 'Planning',
                description:
                  'We create a detailed project plan with timelines, milestones, and deliverables.',
              },
              {
                step: '03',
                title: 'Development',
                description:
                  'Our team brings your vision to life using the latest technologies and best practices.',
              },
              {
                step: '04',
                title: 'Launch',
                description:
                  'We deploy your project and provide ongoing support to ensure continued success.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-trimax text-trimax-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pricing Plans
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include our
              commitment to quality and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <ServiceCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-trimax rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-trimax-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-trimax-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and how we can help you achieve
              your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-trimax-foreground text-trimax px-6 py-3 rounded-lg hover:bg-trimax-foreground/90 transition-colors duration-200 font-medium"
              >
                Start Your Project
              </a>
              <a
                href="/portfolio"
                className="border border-trimax-foreground/20 text-trimax-foreground px-6 py-3 rounded-lg hover:bg-trimax-foreground/10 transition-colors duration-200 font-medium"
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
