import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { config } from './wagmiConfig';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<WagmiProvider config={config}>
		<QueryClientProvider client={queryClient}>
			<RainbowKitProvider
				theme={darkTheme({
					accentColor: '#0E111B',
					accentColorForeground: 'white',
					fontStack: 'system',
					overlayBlur: 'small',
				})}
				>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</RainbowKitProvider>
		</QueryClientProvider>
	</WagmiProvider>
);
