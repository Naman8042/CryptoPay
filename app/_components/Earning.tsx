"use client";

import { useState, useEffect } from "react";
import { DollarSign, CreditCard, TrendingUp, Wallet } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { cn } from "@/lib/utils";

export default function MerchantStats() {
  const { address: merchant } = useAccount();
  const [mounted, setMounted] = useState(false);

  // 🗓️ Year & Month for monthly revenue
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setYear(now.getUTCFullYear());
    setMonth(now.getUTCMonth() + 1);
  }, []);

  // ✅ Read Balance
  const { data: balance, isLoading: loadingBalance } = useReadContract({
    abi: CONTRACT_ABI,
    account: merchant,
    address: CONTRACT_ADDRESS,
    functionName: "getBalance",
    args: merchant ? [merchant] : undefined,
  });

  // ✅ Read Tx Count
  const { data: txCount, isLoading: loadingTx } = useReadContract({
    abi: CONTRACT_ABI,
    account: merchant,
    address: CONTRACT_ADDRESS,
    functionName: "getPaymentCount",
    args: merchant ? [merchant] : undefined,
  });

  // ✅ Read Monthly Revenue
  const { data: monthlyRevenue, isLoading: loadingRevenue } = useReadContract({
    abi: CONTRACT_ABI,
    account: merchant,
    address: CONTRACT_ADDRESS,
    functionName: "getMonthlyRevenue",
    args: merchant && year && month ? [merchant, year, month] : undefined,
  });

  const formatEth = (wei: bigint | undefined) =>
    wei ? (Number(wei) / 1e18).toFixed(4) : "0.0000";

  // Configuration for the cards
  const stats = [
    {
      label: "Total Balance",
      value: loadingBalance ? "..." : `${formatEth(balance as bigint)} ETH`,
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
      borderColor: "border-emerald-100 dark:border-emerald-900/50",
    },
    {
      label: "Total Transactions",
      value: loadingTx ? "..." : String(txCount ?? 0),
      icon: CreditCard,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      borderColor: "border-blue-100 dark:border-blue-900/50",
    },
    {
      label: "Revenue This Month",
      value: loadingRevenue
        ? "..."
        : `${formatEth(monthlyRevenue as bigint)} ETH`,
      icon: TrendingUp,
      color: "text-violet-500",
      bgColor: "bg-violet-100 dark:bg-violet-900/20",
      borderColor: "border-violet-100 dark:border-violet-900/50",
    },
  ];

  if (!mounted) return null;

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
          {merchant && (
            <span className="text-xs text-muted-foreground font-mono bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                MerchID: {merchant.slice(0, 6)}...{merchant.slice(-4)}
            </span>
          )}
        </div>

        {!merchant ? (
          // Disconnected State
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
              <Wallet className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Wallet Not Connected</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connect your wallet to view your merchant statistics.
            </p>
          </div>
        ) : (
          // Stats Grid (3 Columns)
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900 dark:border-neutral-800",
                  "flex flex-col justify-between gap-4"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      stat.bgColor,
                      stat.color
                    )}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Decorative bottom bar */}
                <div className={cn("absolute bottom-0 left-0 h-1 w-full opacity-50", stat.bgColor.replace("/20", ""))} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}