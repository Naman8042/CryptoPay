"use client";

import { useSession } from "next-auth/react";
import WalletConnector from "../_components/Walletconnector";
import MerchantStats from "../_components/Earning";
import RecentTransactions from "../_components/RecentTransactions";
import WithdrawFunds from "../_components/Withdrawfunds";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import { Loader2, ShieldAlert } from "lucide-react";

const Page = () => {
  const { data: session, status } = useSession();
  const { address, isConnected } = useAccount();

  const {
    data: isMerchantRaw,
    isLoading: isMerchantLoading,
    error: isMerchantError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "isMerchant",
    args: [
      (address ?? "0x0000000000000000000000000000000000000000") as `0x${string}`,
    ],
  });

  const isMerchant = Boolean(isMerchantRaw);

  // --- LOADING SESSION ---
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // --- NOT LOGGED IN ---
  if (!session) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <p className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          You must be logged in to access this page.
        </p>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  // --- WALLET NOT CONNECTED ---
  if (!isConnected || !address) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 dark:bg-neutral-900">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Connect your Wallet</h1>
          <p className="text-sm text-gray-500">
            Please connect your wallet to view your dashboard.
          </p>
        </div>
        <WalletConnector />
      </div>
    );
  }

  // --- LOADING CONTRACT ---
  if (isMerchantLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-gray-500">Verifying merchant status...</p>
      </div>
    );
  }

  // --- CONTRACT ERROR ---
  if (isMerchantError) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <ShieldAlert className="h-10 w-10 text-red-500" />
        <p className="text-red-500 font-medium">Error checking status.</p>
        <div className="absolute top-6 right-6">
           <WalletConnector />
        </div>
      </div>
    );
  }

  // --- NOT A MERCHANT (The fix you requested) ---
  if (!isMerchant) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center gap-6 px-4 text-center bg-gray-50 dark:bg-neutral-900">
        {/* Wallet Connector is moved to the top right corner, out of the center flow */}
        <div className="absolute top-6 right-6">
          <WalletConnector />
        </div>

        <div className="max-w-md space-y-4">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full w-fit mx-auto">
             <ShieldAlert className="h-8 w-8 text-yellow-600 dark:text-yellow-500" />
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight">Access Restricted</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This wallet address is not registered as a merchant. 
            You must register before you can access the dashboard.
          </p>
          
          <div className="pt-2">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- ✅ DASHBOARD (Success) ---
  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        {/* Connector stays at top right */}
        <WalletConnector />
      </div>
      
      <MerchantStats />
      
        <WithdrawFunds />
        <RecentTransactions />
    
    </div>
  );
};

export default Page;