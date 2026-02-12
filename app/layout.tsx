import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio | Modern Software Engineer',
  description: 'A showcase of my work and experience.',
};

import { Background } from '@/components/ui/Background';
import { Navbar } from '@/components/ui/Navbar';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased selection:bg-white/20 selection:text-white',
          inter.variable,
          jetbrainsMono.variable
        )}
      >
        <SmoothScroll>
          <Background />
          <Navbar />
          <div className="relative flex min-h-screen flex-col pt-16">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
