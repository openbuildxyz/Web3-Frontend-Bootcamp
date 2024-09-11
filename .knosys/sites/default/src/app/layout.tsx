import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'OpenBuild Web3 前端训练营',
  description: 'Help more front-end developers dive into Web3 world smoothly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" dir="ltr">
      <body>
        {children}
      </body>
    </html>
  );
}
