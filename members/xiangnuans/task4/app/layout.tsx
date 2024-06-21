import "../styles/globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";
import queryClient from "@/lib/queryClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
