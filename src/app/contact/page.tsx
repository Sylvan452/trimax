import { Metadata } from 'next';
import PageHero from '../components/PageHero';
import ContactForm from './ContactForm';
import { generateMetadata } from '../components/SeoComponent';

// Generate metadata using the new SEO component
export const metadata: Metadata = generateMetadata({
  title: 'Contact Us',
  description: "Get in touch with Trimax for your digital project needs. We're here to help bring your vision to life with our expert web development and design services.",
  canonicalUrl: '/contact',
  keywords: ['contact', 'web development', 'digital agency', 'project inquiry', 'consultation'],
  type: 'website',
});

export default function ContactPage() {

  const contactInfo = [
    {
      title: 'Email',
      value: 'hello@trimax.com',
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
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: 'Phone',
      value: '+1 (555) 123-4567',
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      title: 'Address',
      value: '123 Business Ave, Suite 100\nNew York, NY 10001',
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Business Hours',
      value: 'Monday - Friday\n9:00 AM - 6:00 PM EST',
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Contact Us"
        subtitle="Get In Touch"
        description="Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Get in touch
              </h2>
              <p className="text-muted-foreground mb-8">
                We&apos;re here to help and answer any question you might have.
                We look forward to hearing from you.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-trimax/10 text-trimax rounded-lg flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-foreground mb-4">
                  Follow us
                </h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Twitter', href: '#' },
                    { name: 'LinkedIn', href: '#' },
                    { name: 'GitHub', href: '#' },
                    { name: 'Instagram', href: '#' },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-trimax hover:text-trimax-foreground transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <span className="text-sm font-medium">
                        {social.name.charAt(0)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some common questions we receive. If you don&apos;t find
              what you&apos;re looking for, feel free to contact us.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How long does a typical project take?',
                answer:
                  "Project timelines vary depending on complexity and scope. A simple website typically takes 2-4 weeks, while complex web applications can take 2-6 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: 'Do you provide ongoing support and maintenance?',
                answer:
                  'Yes, we offer various support and maintenance packages to keep your website or application running smoothly. This includes security updates, bug fixes, and feature enhancements.',
              },
              {
                question: 'What is your development process?',
                answer:
                  'We follow a structured process: Discovery & Planning, Design & Prototyping, Development & Testing, Launch & Deployment, and Ongoing Support. We keep you involved throughout each phase.',
              },
              {
                question: 'Can you work with our existing team?',
                answer:
                  "Absolutely! We're experienced in collaborating with in-house teams and can adapt to your existing workflows and processes. We're flexible in how we integrate with your team.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
