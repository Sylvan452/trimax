import { Metadata } from 'next';
import PageHero from '../components/PageHero';
import { generateSeoMetadata } from '../components/Seo';

export const metadata: Metadata = generateSeoMetadata({
  title: 'About Us - Trimax',
  description:
    'Learn about Trimax, our mission, values, and the talented team behind our innovative digital solutions.',
  keywords: [
    'about trimax',
    'digital agency team',
    'company mission',
    'web development team',
  ],
  url: 'https://trimax.com/about',
});

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/team/sarah.jpg',
      bio: '10+ years of experience in digital strategy and business development.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/team/michael.jpg',
      bio: 'Full-stack developer with expertise in modern web technologies.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director',
      image: '/team/emily.jpg',
      bio: 'Creative designer passionate about user experience and visual storytelling.',
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      image: '/team/david.jpg',
      bio: 'Senior developer specializing in React, Node.js, and cloud architecture.',
    },
  ];

  const values = [
    {
      title: 'Innovation',
      description:
        'We embrace cutting-edge technologies and creative solutions to deliver exceptional results.',
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Quality',
      description:
        'Every project receives our full attention to detail and commitment to excellence.',
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Collaboration',
      description:
        'We work closely with our clients as partners to achieve their business goals.',
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="About Trimax"
        subtitle="Our Story"
        description="We're a passionate team of digital innovators dedicated to helping businesses thrive in the digital age through cutting-edge web solutions and strategic design."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Trimax, we believe that exceptional digital experiences have
              the power to transform businesses. Our mission is to bridge the
              gap between innovative technology and meaningful human
              connections, creating digital solutions that not only look
              beautiful but drive real business results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-trimax mb-2">50+</div>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-trimax mb-2">5+</div>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-trimax mb-2">100%</div>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we
              approach every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="w-12 h-12 bg-trimax text-trimax-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of experts brings together years of experience in
              design, development, and digital strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center bg-card rounded-xl p-6 border border-border"
              >
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-trimax">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-trimax font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-trimax rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-trimax-foreground mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-trimax-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help bring your digital vision to
              life and drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-trimax-foreground text-trimax px-6 py-3 rounded-lg hover:bg-trimax-foreground/90 transition-colors duration-200 font-medium"
              >
                Get In Touch
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
