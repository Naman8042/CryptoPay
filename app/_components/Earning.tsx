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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Merchant Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your balance, transactions and revenue.
          </p>
        </div>

        {merchant && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
            <p className="text-xs text-slate-500">
              Connected Wallet
            </p>

            <p className="font-mono text-sm font-medium">
              {merchant.slice(0, 6)}...
              {merchant.slice(-4)}
            </p>
          </div>
        )}
      </div>

      {!merchant ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Wallet className="h-7 w-7 text-slate-500" />
          </div>

          <h3 className="mt-5 text-xl font-semibold">
            Wallet Not Connected
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Connect your wallet to access merchant statistics.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Hover Glow */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/5 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl",
                      stat.bgColor,
                      stat.color
                    )}
                  >
                    <stat.icon className="h-7 w-7" />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      stat.color.replace("text-", "bg-")
                    )}
                  />

                  <span className="text-xs text-slate-500">
                    Updated live from blockchain
                  </span>
                </div>
              </div>

              {/* Bottom Accent */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 h-1 w-full",
                  stat.bgColor.replace("/20", "")
                )}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

}