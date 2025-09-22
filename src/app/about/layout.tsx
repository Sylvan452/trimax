import { Metadata } from 'next';
import { generateSeoMetadata } from '../components/Seo';

export const metadata: Metadata = generateSeoMetadata({
  title: 'About Us - Trimax Media',
  description:
    'Learn about Trimax Media, our mission, values, and the talented team behind our innovative digital solutions.',
  keywords: [
    'about trimax media',
    'digital agency team',
    'company mission',
    'web development team',
  ],
  url: 'https://trimax-media.com/about',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}