'use client'

import { ReactNode, useState } from "react";
import { State, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config/config";
import {NextUIProvider} from "@nextui-org/react";

export function Providers(props: { children: ReactNode; initialState?: State }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextUIProvider>
      <WagmiProvider config={config} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
