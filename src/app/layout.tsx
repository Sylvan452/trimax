import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Trimax Media - Digital Solutions & Web Development",
  description: "Transform your digital presence with Trimax Media. We create stunning websites, powerful web applications, and comprehensive digital solutions that drive results for modern businesses.",
  keywords: "web development, digital solutions, website design, web applications, SEO, digital marketing, Trimax Media",
  authors: [{ name: "Trimax Media" }],
  creator: "Trimax Media",
  publisher: "Trimax Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.trimaxmedia.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Trimax Media - Digital Solutions & Web Development",
    description: "Transform your digital presence with Trimax Media. We create stunning websites, powerful web applications, and comprehensive digital solutions.",
    url: 'https://www.trimaxmedia.dev',
    siteName: 'Trimax Media',
    images: [
      {
        url: '/trimax_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Trimax Media - Digital Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trimax Media - Digital Solutions & Web Development",
    description: "Transform your digital presence with Trimax Media. We create stunning websites, powerful web applications, and comprehensive digital solutions.",
    images: ['/trimax_hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/trimax_hero.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/Trimax_Media_Logo.png" as="image" type="image/png" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/Trimax_Media_Logo.png" />
        <meta name="theme-color" content="#2d46d6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <PerformanceOptimizer />
        <ServiceWorkerRegistration />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
