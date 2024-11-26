"use client";

import * as React from "react";
import { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
// import { getConfig } from "@/config/wagmi";
import { getConfig } from "@/config/wagmi-config";

interface ProviderProps extends ThemeProviderProps {
  initialState: State | undefined;
}

export function ThemeProvider({ children, ...props }: ProviderProps) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextThemesProvider {...props}>
      <WagmiProvider config={config} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </NextThemesProvider>
  );
}
