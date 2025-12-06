"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import axios from "axios";
import Link from "next/link";
import { Loader2, Wallet, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import WalletConnector from "../_components/Walletconnector";

// --- The Page Component ---
export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-black p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] pointer-events-none" />

      {/* Wallet */}
      <div className="scale-90 origin-right">
        <WalletConnector />
      </div>

      {/* Centered Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="z-10 w-full max-w-md"
      >
        <SignupForm />
      </motion.div>
    </div>
  );
}

// --- The Form Component ---
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [mounted, setMounted] = useState(false);

  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDbSaving, setIsDbSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const { address: merchant, isConnected } = useAccount();

  const {
    writeContractAsync,
    data: lastWriteHash, // sometimes wagmi will also give hash here
    isPending,
    error,
  } = useWriteContract();

  const {
    isSuccess: txConfirmed,
    isLoading: isConfirming,
  } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
  });

  // Mount flag to avoid hydration issues
  useEffect(() => setMounted(true), []);

  // Keep walletAddress in sync with connected wallet
  useEffect(() => {
    if (merchant) setWalletAddress(merchant);
  }, [merchant]);

  // Debug: log hook-level hash if needed
  useEffect(() => {
    if (lastWriteHash) {
      console.log("wagmi write data (hash):", lastWriteHash);
    }
  }, [lastWriteHash]);

  // Handle DB Save after Blockchain confirmation
  useEffect(() => {
    if (txConfirmed && txHash && !success) {
      (async () => {
        setIsDbSaving(true);
        try {
          const res = await axios.post("/api/signup", {
            email,
            password,
            walletAddress,
            txHash,
          });
          console.log("✅ User saved in DB:", res.data);
          setSuccess(true);
        } catch (err: unknown) {
          console.error("❌ API error:", err);
          setErrorMessage(
            "Transaction successful, but account creation failed in the database."
          );
        } finally {
          setIsDbSaving(false);
        }
      })();
    }
  }, [txConfirmed, txHash, email, password, walletAddress, success]);

  // React to wagmi hook errors (simulation, user reject, revert, etc.)
  useEffect(() => {
    if (!error) return;

    console.error("wagmi write error:", error);
    const msg =
      (error as any).shortMessage || error.message || "Transaction failed.";

    if (msg.includes("Already registered")) {
      setErrorMessage("This wallet is already registered.");
    } else {
      setErrorMessage(msg);
    }
  }, [error]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!merchant) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    try {
      // This will open the wallet popup and return the tx hash
      const hash = await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "registerMerchant",
        account: merchant,
        // chainId: 11155111, // <- uncomment and set your chain id if needed
      });

      console.log("📦 Tx sent, hash:", hash);
      setTxHash(hash);
    } catch (err: any) {
      console.error("❌ writeContractAsync failed:", err);

      const message =
        err?.shortMessage || err?.message || JSON.stringify(err);

      if (message.includes("Already registered")) {
        setErrorMessage("This wallet is already registered.");
      } else if (message.includes("User rejected")) {
        setErrorMessage("Transaction rejected in wallet.");
      } else {
        setErrorMessage("Transaction failed or rejected.");
      }
    }
  };

  // ✅ If registration & DB save succeeded, show success screen
  if (success) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-6 rounded-xl border bg-white p-10 text-center shadow-xl dark:bg-neutral-900 dark:border-neutral-800",
          className
        )}
      >
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Account Created!</h2>
          <p className="text-gray-500">
            Your merchant account has been registered on the blockchain.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  // 🔁 Normal form render
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-xl border bg-white p-6 shadow-xl dark:bg-neutral-900 dark:border-neutral-800",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Create Merchant Account
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Connect your wallet and sign the transaction
        </p>
      </div>

      <form onSubmit={handleRegister} className="grid gap-4" {...props}>
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="merchant@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
          />
        </div>

        {/* Wallet Address (ReadOnly) */}
        <div className="grid gap-2">
          <Label
            htmlFor="address"
            className="flex items-center justify-between"
          >
            Wallet Address
            {mounted && isConnected && (
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                ● Connected
              </span>
            )}
          </Label>
          <div className="relative">
            <Input
              id="address"
              value={walletAddress}
              readOnly
              placeholder="Connect your wallet..."
              className={cn(
                "h-10 pr-10 bg-gray-50 dark:bg-neutral-800/50",
                !isConnected && "border-dashed"
              )}
            />
            <Wallet className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {!isConnected && mounted && (
            <p className="text-xs text-amber-600">
              Please connect your wallet using the button at the top.
            </p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 mt-2"
          disabled={isPending || isConfirming || isDbSaving}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Waiting for Wallet...
            </>
          ) : isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming on Chain...
            </>
          ) : isDbSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Register Merchant"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
