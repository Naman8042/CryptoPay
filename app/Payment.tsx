"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { 
  http, 
  createConfig, 
  WagmiProvider, 
} from "wagmi";
import { ReactNode } from "react";

const queryClient = new QueryClient();

// Define the config with ONLY Sepolia
const config = createConfig({
  chains: [sepolia], // 👈 Only allow Sepolia
  connectors: [injected()],
  transports: {
    // You can keep your Infura URL, or remove it to use the default public RPCs
    [sepolia.id]: http("https://sepolia.infura.io/v3/8452acd106ae43bcbc679a69da1d24bd"),
  },
});

export default function CryptoProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}