import { CodeBlock } from "@/components/Codeblock";

interface StepProps {
  step: string;
  description: string;
  code: string;
  language: string;
  filename: string;
  isLast?: boolean;
}

function Step({
  step,
  description,
  code,
  language,
  filename,
  isLast,
}: StepProps) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start pl-16 py-5">
      {/* Vertical line */}
      {!isLast && (
        <div
          className="absolute left-6 top-2 bottom-0 w-px bg-gray-200"
          aria-hidden="true"
        />
      )}

      {/* Step circle */}
      <div className="absolute left-0 top-2 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white font-semibold shadow-sm">
          {String(step).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="col-span-1 md:col-span-2 grid md:grid-cols-2 gap-8 items-start">
        {/* Left: Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Step {step}</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right: Code */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <CodeBlock language={language} filename={filename} code={code} />
        </div>
      </div>
    </div>
  );
}

export default function CodeBlockDemo() {
  const steps = [
    {
      step: "1",
      description: "Create your Vite project and enter the directory.",
      code: `npm create vite@latest my-cryptoproject\ncd my-project`,
      language: "jsx",
      filename: "Terminal",
    },
    {
      step: "2",
      description: "Install wagmi, viem, react-query, and your SDK dependency.",
      code: `npm install wagmi viem @tanstack/react-query my-gateway-sdk`,
      language: "jsx",
      filename: "Terminal",
    },
    {
      step: "3",
      description:
        "Set up your main entry file with WagmiProvider and QueryClientProvider.",
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
      step: "4",
      description:
        "Create a ConnectButton component to connect and disconnect wallets.",
      code: `import { useConnect, useAccount, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function ConnectButton() {
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}`,
      language: "tsx",
      filename: "ConnectButton.tsx",
    },
    {
      step: "5",
      description: "Fetch and display merchant balance with your SDK.",
      code: `import { useMerchantBalance } from "my-gateway-sdk";

function MerchantDashboard({ merchant }: { merchant: "0x{string}" }) {
  const { balance, isLoading, refetch } = useMerchantBalance(merchant);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <p>Merchant Balance: {balance?.toString()} wei</p>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}`,
      language: "tsx",
      filename: "MerchantDashboard.tsx",
    },
    {
      step: "6",
      description: "Example App",
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

export default App;
`,
      language: "tsx",
      filename: "App.tsx",
    },
  ];

  const pay = `import { usePay } from "my-gateway-sdk";

export default function PayButton() {
  const { pay, isPending, isConfirming, isConfirmed, hash } = usePay();

  const handlePay = async () => {
    try {
      // Pay 0.01 ETH in wei
      await pay("0xMerchantWalletHere", BigInt("10000000000000000"));
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <div>
      <button onClick={handlePay} disabled={isPending || isConfirming}>
        {isPending
          ? "Sending..."
          : isConfirming
          ? "Confirming..."
          : "Pay"}
      </button>

      {hash && <p>Tx Hash: {hash}</p>}
      {isConfirmed && <p className="text-green-600">✅ Payment Confirmed!</p>}
    </div>
  );
}
`;

  return (
    <div className="max-w-7xl mx-auto w-full py-10">
      {steps.map((step, idx) => (
        <Step key={step.step} {...step} isLast={idx === steps.length - 1} />
      ))}

      <div>
        <Step
        step={String(1)}
        description="First, import the `usePay` hook from your SDK. This hook allows you to send payments to a merchant on-chain."
        code={`import { usePay } from "my-gateway-sdk";`}
        language="tsx"
        filename="Pay.tsx"
      />

      <Step
        step={String(2)}
        description="Initialize the hook inside your React component. It provides the pay function along with transaction states like pending, confirming, and confirmed."
        code={`const { pay, isPending, isConfirming, isConfirmed, hash } = usePay();`}
        language="tsx"
        filename="Pay.tsx"
      />

      <Step
        step={String(3)}
        description="Call the pay function with the merchant’s address and the amount in wei. Here we’re sending 0.01 ETH."
        code={`const handlePay = async () => {
    try {
      // Pay 0.01 ETH in wei
      await pay("0xMerchantRegisteredWalletAddress", BigInt("10000000000000000"));
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };`}
        language="tsx"
        filename="Pay.tsx"
      />

      <Step
        step={String(4)}
        description="Finally, handle the transaction states and provide user feedback."
        code={`return (
  <button onClick={handlePay} disabled={isPending || isConfirming}>
    {isPending ? "Sending..." : isConfirming ? "Confirming..." : "Pay"}
  </button>
);`}
        language="tsx"
        filename="Pay.tsx"
        isLast
      />
      </div>
      <div>
        <Step
  step={String(1)}
  description="First, import the `useWithdraw` hook from your SDK. This hook allows merchants to withdraw their funds from the payment gateway contract."
  code={`import { useWithdraw } from "my-gateway-sdk";`}
  language="tsx"
  filename="Withdraw.tsx"
/>

<Step
  step={String(2)}
  description="Initialize the hook inside your React component. It provides the \`withdraw\` function along with transaction states like pending, confirming, and confirmed."
  code={`const { withdraw, isPending, isConfirming, isConfirmed, hash } = useWithdraw();`}
  language="tsx"
  filename="Withdraw.tsx"
/>

<Step
  step={String(3)}
  description="Call the \`withdraw\` function with the amount (in wei) you want to withdraw. Here we’re withdrawing 0.05 ETH."
  code={`const handleWithdraw = async () => {
    try {
      // Withdraw 0.05 ETH (in wei)
      const tx = await withdraw(BigInt("50000000000000000"));
      console.log("Withdraw transaction sent:", tx);
    } catch (error) {
      console.error("Withdraw failed:", error);
    }
  };`}
  language="tsx"
  filename="Withdraw.tsx"
/>

<Step
  step={String(4)}
  description="Finally, handle the transaction states and show feedback to the merchant."
  code={`return (
  <button onClick={handleWithdraw} disabled={isPending || isConfirming}>
    {isPending ? "Withdrawing..." : isConfirming ? "Confirming..." : "Withdraw"}
  </button>
);`}
  language="tsx"
  filename="Withdraw.tsx"
  isLast
/>

      </div>
    </div>
  );
}
