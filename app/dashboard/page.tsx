
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import WalletConnector from "../_components/Walletconnector";
import MerchantStats from "../_components/Earning";
import RecentTransactions from "../_components/RecentTransactions";
import WithdrawFunds from "../_components/Withdrawfunds";

import { Button } from "@/components/ui/button";

import { useAccount, useReadContract } from "wagmi";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
} from "@/lib/contract";

import {
  Loader2,
  ShieldAlert,
} from "lucide-react";

const Page = () => {
  const { data: session, status } =
    useSession();

  const { address, isConnected } =
    useAccount();

  const {
    data: isMerchantRaw,
    isLoading: isMerchantLoading,
    error: isMerchantError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "isMerchant",
    args: [
      (address ??
        "0x0000000000000000000000000000000000000000") as `0x${string}`,
    ],
  });

  const isMerchant =
    Boolean(isMerchantRaw);

  // ------------------------
  // SESSION LOADING
  // ------------------------
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // ------------------------
  // NOT LOGGED IN
  // ------------------------
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-bold">
          Authentication Required
        </h2>

        <p className="mt-2 text-muted-foreground">
          You must be logged in to
          access the dashboard.
        </p>

        <Link
          href="/login"
          className="mt-6"
        >
          <Button>
            Go to Login
          </Button>
        </Link>
      </div>
    );
  }

  // ------------------------
  // WALLET NOT CONNECTED
  // ------------------------
  if (!isConnected || !address) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">
            Connect Your Wallet
          </h1>

          <p className="mt-3 text-muted-foreground">
            Please connect your wallet
            to access your merchant
            dashboard.
          </p>

          <div className="mt-8 flex justify-center">
            <WalletConnector />
          </div>
        </div>
      </div>
    );
  }

  // ------------------------
  // CONTRACT LOADING
  // ------------------------
  if (isMerchantLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />

        <p className="text-sm text-muted-foreground">
          Verifying merchant status...
        </p>
      </div>
    );
  }

  // ------------------------
  // CONTRACT ERROR
  // ------------------------
  if (isMerchantError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <ShieldAlert className="h-10 w-10 text-red-500" />

        <h2 className="mt-4 text-xl font-semibold">
          Something went wrong
        </h2>

        <p className="mt-2 text-muted-foreground">
          We couldn't verify your
          merchant status.
        </p>

        <div className="mt-6">
          <WalletConnector />
        </div>
      </div>
    );
  }

  // ------------------------
  // NOT REGISTERED MERCHANT
  // ------------------------
  if (!isMerchant) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <WalletConnector />
        </div>

        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <ShieldAlert className="h-8 w-8 text-yellow-600" />
          </div>

          <h2 className="mt-6 text-3xl font-bold">
            Access Restricted
          </h2>

          <p className="mt-4 text-muted-foreground">
            This wallet address is not
            registered as a merchant.
            Register first to access
            your dashboard.
          </p>

          <Link href="/register">
            <Button
              size="lg"
              className="mt-8 w-full sm:w-auto"
            >
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ------------------------
  // DASHBOARD
  // ------------------------
  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Monitor payments,
              earnings and withdrawals.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <WalletConnector />
          </div>
        </div>

        {/* STATS */}
        <MerchantStats />

        {/* CONTENT */}
        <div className="flex flex-col gap-5">
          <div className="lg:col-span-4">
            <WithdrawFunds />
          </div>

          <div className="lg:col-span-8">
            <RecentTransactions place="dashboard"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
