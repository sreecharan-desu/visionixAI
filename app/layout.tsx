import './globals.css';
import { Geist, Geist_Mono, Jura } from 'next/font/google';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const jura = Jura({ variable: '--font-jura', subsets: ['latin'], weight: ['300', '400', '700'] });

export const metadata = {
  title: 'VisionixAI • Zone-Based CV Automation',
  description:
    'VisionixAI is a computer vision automation platform that uses CCTV-based zone detection to trigger smart actions. Fast, developer-friendly CLI + models.',
  keywords: [
    'VisionixAI',
    'Computer Vision',
    'Zone Automation',
    'Smart Lighting',
    'YOLO',
    'MediaPipe',
    'CLI',
    'AI Vision',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'VisionixAI – Zone-Based Smart Automation',
    description:
      'Automate with CCTV-based zone detection. VisionixAI provides CLI tools and AI models for intelligent space control.',
    url: 'https://github.com/VisionixAI',
    siteName: 'VisionixAI',
    images: [
      {
        url: '/visionixai.webp',
        width: 1200,
        height: 630,
        alt: 'VisionixAI logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VisionixAI',
    description:
      'Zone-based computer vision platform with developer CLI and custom-trained models for smart automation.',
    images: ['/visionixai.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />

        {/* Preload */}
        <link rel="preload" as="image" href="/visionixai.webp" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'VisionixAI',
              url: 'https://github.com/VisionixAI',
              logo: 'https://github.com/VisionixAI/visionixai.webp',
              description:
                'Zone-based computer vision automation with YOLO, MediaPipe, and developer tools for smart control systems.',
              sameAs: [
                'https://github.com/VisionixAI',
                'https://twitter.com/VisionixAI',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jura.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
