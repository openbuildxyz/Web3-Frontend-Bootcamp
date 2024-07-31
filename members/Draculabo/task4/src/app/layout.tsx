import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NFTMarket',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full touch-manipulation">
      <body className={`min-h-full font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
