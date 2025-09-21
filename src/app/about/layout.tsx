import { Metadata } from 'next';
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}