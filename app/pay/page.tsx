"use client";

import { useState, useEffect, Suspense, FormEvent } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import WalletConnector from "../_components/Walletconnector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 🔹 helper type instead of `any`
type WagmiWriteError = Error & {
  shortMessage?: string;
};

export default function PayPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-black p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] pointer-events-none" />

      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <span className="text-xl font-bold tracking-tight">EtharisPay</span>
        </Link>
        <div className="scale-90 origin-right">
          <WalletConnector />
        </div>
      </div>

      {/* Centered Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="z-10 w-full max-w-md"
      >
        <Suspense
          fallback={
            <div className="h-64 bg-white rounded-xl shadow-xl animate-pulse" />
          }
        >
          <PaymentForm />
        </Suspense>
      </motion.div>
    </div>
  );
}

function PaymentForm() {
  const searchParams = useSearchParams();

  const [merchant, setMerchant] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.01");
  const [mounted, setMounted] = useState(false);

  const {
    data: hash,
    writeContractAsync,
    isPending,
    error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    setMounted(true);

    // Auto-fill from URL params if present
    const paramMerchant = searchParams.get("merchant");
    const paramAmount = searchParams.get("amount");

    if (paramMerchant) setMerchant(paramMerchant);
    if (paramAmount) setAmount(paramAmount);
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      console.error("wagmi writeContract error:", error);
    }
  }, [error]);

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();

    if (!merchant.startsWith("0x") || merchant.length !== 42) {
      alert("Invalid Merchant Address");
      return;
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Enter a valid amount greater than 0");
      return;
    }

    try {
      const weiValue = BigInt(Math.floor(numericAmount * 1e18));

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "pay",
        args: [merchant as `0x${string}`],
        value: weiValue,
        // chainId: 11155111, // <- uncomment & set to your network (e.g. Sepolia)
      });
    } catch (err) {
      console.error("writeContractAsync error:", err);
      // wagmi will also populate `error`, which we render below
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-xl border bg-white p-10 text-center shadow-xl dark:bg-neutral-900 dark:border-neutral-800">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Payment Successful!</h2>
          <p className="text-gray-500">
            The transaction has been confirmed on the blockchain.
          </p>
        </div>
        {hash && (
          <div className="bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg text-xs break-all text-gray-600 dark:text-gray-400">
            Tx: {hash}
          </div>
        )}
        <Button onClick={() => window.location.reload()} className="w-full">
          Make Another Payment
        </Button>
      </div>
    );
  }

  // Helper to show nice error message (no `any` used)
  const errorMessage = (() => {
    if (!error) return "";
    const wagmiError = error as WagmiWriteError;
    return wagmiError.shortMessage ?? wagmiError.message ?? "";
  })();

  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-white p-6 shadow-xl dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
          <CreditCard className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Make a Payment</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Send ETH directly to a registered merchant
        </p>
      </div>

      <form onSubmit={handlePay} className="grid gap-4">
        {/* Merchant Input */}
        <div className="grid gap-2">
          <Label htmlFor="merchant">Merchant Address</Label>
          <Input
            id="merchant"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            placeholder="0x..."
            className="h-10 font-mono text-sm"
            required
          />
        </div>

        {/* Amount Input */}
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount (ETH)</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              step="0.0001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="h-10 pl-8"
              required
            />
            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
              Ξ
            </span>
          </div>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="flex flex-col gap-1 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                {error.message.includes("User rejected")
                  ? "Transaction rejected by wallet"
                  : "Transaction failed"}
              </span>
            </div>
            {errorMessage && (
              <code className="text-xs break-all opacity-80">
                {errorMessage}
              </code>
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 text-base mt-2"
          disabled={isPending || isConfirming || !mounted}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Check Wallet...
            </>
          ) : isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              Pay {amount || "0.00"} ETH
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
