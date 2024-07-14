import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { config } from "@/config";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
