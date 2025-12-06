"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CodeBlock } from "@/components/Codeblock";
import { Terminal, Wallet, ArrowRightLeft } from "lucide-react";

// --- Types ---
interface StepData {
  title: string;
  description: string;
  code: string;
  language: string;
  filename: string;
}

type GuideType = "setup" | "pay" | "withdraw";

// --- Data Configuration ---
const guides: Record<GuideType, StepData[]> = {
  setup: [
    {
      title: "Create Project",
      description: "Create your Vite project and enter the directory.",
      code: `npm create vite@latest my-cryptoproject\ncd my-project`,
      language: "bash",
      filename: "Terminal",
    },
    {
      title: "Install Dependencies",
      description: "Install wagmi, viem, react-query, and your SDK dependency.",
      code: `npm install wagmi viem @tanstack/react-query my-gateway-sdk`,
      language: "bash",
      filename: "Terminal",
    },
    {
      title: "Configure Providers",
      description: "Set up your main entry file with WagmiProvider and QueryClientProvider.",
      code: `import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const config = createConfig({
  chains: [sepolia], 
  transports: {
    [sepolia.id]: http() // use your alchemy url sometime http does not work
  }
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);`,
      language: "tsx",
      filename: "Index/Main.ts",
    },
    {
      title: "Connect Button",
      description: "Create a ConnectButton component to connect and disconnect wallets.",
      code: `"use client";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { useState } from "react";

export function ConnectButton() {
  const { connectors, connect, status, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [activating, setActivating] = useState<string | null>(null);

  if (isConnected) {
    return (
      <div className="space-y-2">
        <p className="text-sm break-all">Connected: {address}</p>
        <button onClick={() => disconnect()} className="px-4 py-2 bg-red-500 text-white rounded-md">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => {
            setActivating(connector.id);
            connect({ connector });
          }}
          disabled={status === "pending" && activating === connector.id}
          className="flex items-center justify-between px-4 py-2 bg-gray-200 rounded-md w-full"
        >
          {connector.name}
          {status === "pending" && activating === connector.id && " (connecting...)"}
        </button>
      ))}
      {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
    </div>
  );
}`,
      language: "tsx",
      filename: "ConnectButton.tsx",
    },
    {
      title: "Merchant Dashboard",
      description: "Fetch and display merchant balance with your SDK.",
      code: `"use client";
import { useMerchantBalance } from "my-gateway-sdk";

export default function MerchantDashboard({ merchant }: { merchant: \`0x\${string}\` }) {
  const { balance, isLoading, refetch } = useMerchantBalance(merchant);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <p><strong>Merchant Balance:</strong> {balance ? balance.toString() : "0"} wei</p>
      <button onClick={() => refetch()} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Refresh
      </button>
    </div>
  );
}`,
      language: "tsx",
      filename: "MerchantDashboard.tsx",
    },
    {
      title: "Example App",
      description: "Bring it all together in your App component.",
      code: `import { ConnectButton } from "./ConnectButton";
import MerchantDashboard from "./MerchantDashboard";

function App() {
  return (
    <div>
      <h1>Crypto Payment Gateway</h1>
      <ConnectButton />
      <MerchantDashboard merchant="0x1234...abcd" />
    </div>
  );
}
export default App;`,
      language: "tsx",
      filename: "App.tsx",
    },
  ],
  pay: [
    {
      title: "Import Hook",
      description: "First, import the `usePay` hook from your SDK. This hook allows you to send payments to a merchant on-chain.",
      code: `import { usePay } from "my-gateway-sdk";`,
      language: "tsx",
      filename: "Pay.tsx",
    },
    {
      title: "Initialize Hook",
      description: "Initialize the hook inside your React component. It provides the pay function along with transaction states.",
      code: `const { pay, isPending, isConfirming, isConfirmed, hash } = usePay();`,
      language: "tsx",
      filename: "Pay.tsx",
    },
    {
      title: "Handle Payment",
      description: "Call the pay function with the merchant’s address and the amount in wei.",
      code: `const handlePay = async () => {
  try {
    // Pay 0.01 ETH in wei
    await pay("0xMerchantRegisteredWalletAddress", BigInt("10000000000000000"));
  } catch (err) {
    console.error("Payment failed:", err);
  }
};`,
      language: "tsx",
      filename: "Pay.tsx",
    },
    {
      title: "Render UI",
      description: "Finally, handle the transaction states and provide user feedback.",
      code: `return (
  <button onClick={handlePay} disabled={isPending || isConfirming}>
    {isPending ? "Sending..." : isConfirming ? "Confirming..." : "Pay"}
  </button>
);`,
      language: "tsx",
      filename: "Pay.tsx",
    },
  ],
  withdraw: [
    {
      title: "Import Hook",
      description: "First, import the `useWithdraw` hook from your SDK.",
      code: `import { useWithdraw } from "my-gateway-sdk";`,
      language: "tsx",
      filename: "Withdraw.tsx",
    },
    {
      title: "Initialize Hook",
      description: "Initialize the hook inside your React component.",
      code: `const { withdraw, isPending, isConfirming, isConfirmed, hash } = useWithdraw();`,
      language: "tsx",
      filename: "Withdraw.tsx",
    },
    {
      title: "Handle Withdrawal",
      description: "Call the `withdraw` function with the amount (in wei) you want to withdraw.",
      code: `const handleWithdraw = async () => {
  try {
    // Withdraw 0.05 ETH (in wei)
    const tx = await withdraw(BigInt("50000000000000000"));
    console.log("Withdraw transaction sent:", tx);
  } catch (error) {
    console.error("Withdraw failed:", error);
  }
};`,
      language: "tsx",
      filename: "Withdraw.tsx",
    },
    {
      title: "Render UI",
      description: "Finally, handle the transaction states and show feedback to the merchant.",
      code: `return (
  <button onClick={handleWithdraw} disabled={isPending || isConfirming}>
    {isPending ? "Withdrawing..." : isConfirming ? "Confirming..." : "Withdraw"}
  </button>
);`,
      language: "tsx",
      filename: "Withdraw.tsx",
    },
  ],
};

// --- Sub-Component: Step ---
function Step({
  stepNumber,
  data,
  isLast,
}: {
  stepNumber: number;
  data: StepData;
  isLast: boolean;
}) {
  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 pt-4 group">
      
      {/* --- Desktop-Only Timeline --- */}
      {!isLast && (
        <div
          className="hidden md:block absolute left-[27px] top-[50px] bottom-[-30px] w-0.5 bg-gray-200 dark:bg-neutral-800 group-last:hidden"
          aria-hidden="true"
        />
      )}
      
      {/* Desktop Big Number Badge */}
      <div className="hidden md:flex absolute left-0 top-1 items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-blue-600 shadow-sm dark:border-black dark:bg-neutral-900 dark:text-blue-400 z-10">
          <span className="font-bold text-lg">{String(stepNumber).padStart(2, "0")}</span>
        </div>
      </div>

      {/* --- Left Column: Content --- */}
      <div className="md:col-span-5 flex flex-col md:pl-16 md:pt-2">
        <div className="flex items-center gap-3 mb-2 md:mb-4">
          {/* Mobile Badge */}
          <span className="md:hidden flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
             {String(stepNumber).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {data.title}
          </h3>
        </div>
        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {data.description}
        </p>
      </div>

      {/* --- Right Column: Code Block --- */}
      <div className="md:col-span-7 mb-8 md:mb-0">
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-neutral-800 bg-white dark:bg-black w-full">
          <CodeBlock
            language={data.language}
            filename={data.filename}
            code={data.code}
          />
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export default function IntegrationDocs() {
  const [activeTab, setActiveTab] = useState<GuideType>("setup");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-black min-h-screen">
      
      {/* Header */}
      <div className="mb-10 sm:mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Integration Guide
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400">
          Complete documentation for setting up the environment, processing payments, and handling withdrawals.
        </p>
      </div>

      {/* Scrollable Tabs */}
      <div className="mb-12 flex justify-center w-full">
        <div className="scrollbar-hide flex w-full max-w-full overflow-x-auto sm:w-auto rounded-lg bg-gray-100 p-1 dark:bg-neutral-900">
          {[
            { id: "setup", label: "Initial Setup", icon: Terminal },
            { id: "pay", label: "Accept Payments", icon: Wallet },
            { id: "withdraw", label: "Withdraw Funds", icon: ArrowRightLeft },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as GuideType)}
              className={`relative flex flex-1 sm:flex-none items-center justify-center whitespace-nowrap gap-2 rounded-md px-4 sm:px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-md bg-white dark:bg-neutral-800"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {guides[activeTab].map((step, idx) => (
              <Step
                key={idx}
                stepNumber={idx + 1}
                data={step}
                isLast={idx === guides[activeTab].length - 1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}