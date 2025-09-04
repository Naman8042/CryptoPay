"use client";

import { useState, useEffect } from "react";
import { DollarSign, CreditCard, ShoppingBag, TrendingUp } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

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

  // ✅ Always call hooks — just guard their args
  const { data: balance, isLoading: loadingBalance } = useReadContract({
    abi: CONTRACT_ABI,
    account: merchant,
    address: CONTRACT_ADDRESS,
    functionName: "getBalance",
    args: merchant ? [merchant] : undefined,
  });

  const { data: txCount, isLoading: loadingTx } = useReadContract({
    abi: CONTRACT_ABI,
    account: merchant,
    address: CONTRACT_ADDRESS,
    functionName: "getPaymentCount",
    args: merchant ? [merchant] : undefined,
  });

  console.log(txCount)

  const { data: monthlyRevenue, isLoading: loadingRevenue } = useReadContract({
    abi: CONTRACT_ABI,
    account: merchant,
    address: CONTRACT_ADDRESS,
    functionName: "getMonthlyRevenue",
    args: merchant && year && month ? [merchant, year, month] : undefined,
  });

  console.log(monthlyRevenue)

  // Placeholder
  const products = 6;

  const formatEth = (wei: bigint | undefined) =>
    wei ? (Number(wei) / 1e18).toFixed(4) : "0";

  const stats = [
    {
      label: "Your Balance (ETH)",
      value: loadingBalance ? "Loading..." : formatEth(balance as bigint),
      icon: <DollarSign className="w-6 h-6 text-white" />,
    },
    {
      label: "Your Transactions",
      value: loadingTx ? "Loading..." : String(txCount ?? 0),
      icon: <CreditCard className="w-6 h-6 text-white" />,
    },
    {
      label: "Your Products",
      value: String(products),
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
    },
    {
      label: "Revenue This Month",
      value: loadingRevenue
        ? "Loading..."
        : formatEth(monthlyRevenue as bigint),
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-6">Your Merchant Stats</h1>

        {!mounted ? (
          <p className="text-gray-600">Loading...</p>
        ) : !merchant ? (
          <p className="text-gray-600">Please connect your wallet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-lg flex items-center justify-between bg-gray-50"
              >
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
                </div>
                <div className="p-3 rounded-xl bg-black">{stat.icon}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
