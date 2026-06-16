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
import {
  Loader2,
  Wallet,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "motion/react";
import WalletConnector from "../_components/Walletconnector";

type WagmiWriteError = Error & {
  shortMessage?: string;
};

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-center px-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-black leading-none tracking-tight lg:text-7xl">
              Start accepting
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                {" "}
                Ethereum
              </span>
              <br />
              payments today
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
              Create your merchant account, connect your
              wallet, and register securely on-chain in
              just a few clicks.
            </p>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-neutral-700">
              <div>✓ Secure Wallet Authentication</div>
              <div>✓ On-chain Registration</div>
              <div>✓ Instant Settlements</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <SignupForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}


function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [walletAddress, setWalletAddress] =
    useState("");
  const [mounted, setMounted] = useState(false);

  const [txHash, setTxHash] =
    useState<`0x${string}` | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [isDbSaving, setIsDbSaving] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const { address: merchant, isConnected } =
    useAccount();

  const { writeContractAsync, isPending } =
    useWriteContract();

  const {
    isSuccess: txConfirmed,
    isLoading: isConfirming,
  } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (merchant) {
      setWalletAddress(merchant);
    }
  }, [merchant]);

  useEffect(() => {
    if (txConfirmed && txHash && !success) {
      (async () => {
        setIsDbSaving(true);

        try {
          await axios.post("/api/signup", {
            email,
            password,
            walletAddress,
            txHash,
          });

          setSuccess(true);
        } catch {
          setErrorMessage(
            "Transaction succeeded but account creation failed."
          );
        } finally {
          setIsDbSaving(false);
        }
      })();
    }
  }, [
    txConfirmed,
    txHash,
    email,
    password,
    walletAddress,
    success,
  ]);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrorMessage(null);

    if (!merchant) {
      setErrorMessage(
        "Please connect your wallet first."
      );
      return;
    }

    try {
      const hash = await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "registerMerchant",
        account: merchant,
      });

      setTxHash(hash);
    } catch (err) {
      const wagmiError =
        err as WagmiWriteError;

      const message =
        wagmiError.shortMessage ||
        wagmiError.message ||
        "Transaction failed";

      setErrorMessage(message);
    }
  };

  if (success) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Registration Complete
          </h2>

          <p className="mt-2 text-neutral-500">
            Your merchant account has been
            registered successfully.
          </p>
        </div>

        <Button
          asChild
          className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600"
        >
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div className="flex justify-end items-end">
        <WalletConnector />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Create Merchant Account
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Connect your wallet and complete
          registration.
        </p>
      </div>

      <form
        onSubmit={handleRegister}
        className="space-y-5"
        {...props}
      >
        <div>
          <Label>Email Address</Label>

          <Input
            type="email"
            placeholder="merchant@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="mt-2 h-12 rounded-xl"
            required
          />
        </div>

        <div>
          <Label className="flex items-center justify-between">
            Wallet Address

            {mounted &&
              isConnected && (
                <span className="text-xs font-medium text-green-600">
                  Connected
                </span>
              )}
          </Label>

          <div className="relative mt-2">
            <Input
              value={walletAddress}
              readOnly
              placeholder="Connect your wallet"
              className={cn(
                "h-12 rounded-xl bg-neutral-50 pr-10",
                !isConnected &&
                  "border-dashed"
              )}
            />

            <Wallet className="absolute right-3 top-3.5 h-5 w-5 text-neutral-400" />
          </div>
        </div>

        <div>
          <Label>Password</Label>

          <div className="relative mt-2">
            <Input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="h-12 rounded-xl pr-10"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-3.5"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-neutral-500" />
              ) : (
                <Eye className="h-4 w-4 text-neutral-500" />
              )}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          disabled={
            isPending ||
            isConfirming ||
            isDbSaving
          }
          className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90"
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

      <div className="text-center text-sm text-neutral-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

