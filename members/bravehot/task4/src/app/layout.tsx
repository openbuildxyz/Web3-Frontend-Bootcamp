import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

import Web3ModalProvider from "@/context";

import { config } from "@/config";
import { inter } from "@/context/font";

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kabutack NFT Market",
  description: "Kabutack NFT Market",
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
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
