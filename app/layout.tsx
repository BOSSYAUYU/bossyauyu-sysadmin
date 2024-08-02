import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/app/components/StoreProvider';

export const metadata: Metadata = {
  title: 'BOSSYAUYU Admin',
  description: 'BOSSYAUYU Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
