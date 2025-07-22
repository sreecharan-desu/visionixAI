// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VisionixAI',
  description: 'Zone‑based computer‑vision automation platform: CCTV-based human detection triggering smart actions.',
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
    title: 'VisionixAI – Zone‑Based Smart Automation',
    description:
      'Automate actions with CCTV-based human detection. VisionixAI provides a developer-friendly CLI and AI models for smart spaces.',
    url: 'https://github.com/VisionixAI',
    siteName: 'VisionixAI',
    images: [
      {
        url: 'https://i.ibb.co/Zpby3ddc/image.png',
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
      'Zone‑based computer‑vision automation platform with CLI support and AI models for smart space control.',
    images: ['https://i.ibb.co/Zpby3ddc/image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
