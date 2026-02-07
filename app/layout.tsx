import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { WebVitals } from '@/components/WebVitals';
import { SkipLink } from '@/components/SkipLink';

export const metadata: Metadata = {
  title: 'Productivity Dashboard',
  description: 'Personal productivity management space',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SkipLink />
        <WebVitals />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
