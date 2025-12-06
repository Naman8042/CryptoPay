"use client";

import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import type { Address } from "viem";
import { useEffect, useState } from "react";
import { 
  History, 
  // ArrowUpRight, 
  User, 
  Calendar, 
  Hash, 
  Copy, 
  CheckCircle2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";

export default function RecentTransactions() {
  const { address: merchant } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1️⃣ Get total transactions
  const { data: txCount, isLoading: loadingCount } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getPaymentCount",
    args: merchant ? [merchant as Address] : undefined,
  });

  const count = Number(txCount ?? 0);
  const start = Math.max(0, count - 5);

  // 2️⃣ Batch fetch last 5 payments
  const { data: txs, isLoading: loadingTxs } = useReadContracts({
    contracts: merchant && count > 0
      ? Array.from({ length: count - start }, (_, idx) => ({
          abi: CONTRACT_ABI,
          address: CONTRACT_ADDRESS,
          functionName: "getPayment",
          args: [merchant as Address, BigInt(start + idx)],
        }))
      : [],
  });

  const isLoading = loadingCount || loadingTxs;

  // 3️⃣ Format results
  const txArray = txs
    ?.map((result, i) => {
      if (!result.result) return null;
      const [payer, amount, timestamp] = result.result as [Address, bigint, bigint];
      return {
        id: start + i + 1,
        buyer: payer,
        shortBuyer: `${payer.slice(0, 6)}...${payer.slice(-4)}`,
        amount: (Number(amount) / 1e18).toFixed(4),
        date: new Date(Number(timestamp) * 1000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        }),
      };
    })
    .filter((tx): tx is NonNullable<typeof tx> => Boolean(tx))
    .reverse() ?? [];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <History className="h-5 w-5 text-gray-500" />
          Recent Transactions
        </h2>
      </div>

      {isLoading ? (
        // --- LOADING STATE ---
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
        </div>
      ) : txArray.length === 0 ? (
        // --- EMPTY STATE ---
        <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                    <History className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="font-medium text-lg">No transactions yet</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-1">
                    Once you start receiving payments, they will appear here.
                </p>
            </CardContent>
        </Card>
      ) : (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border shadow-sm overflow-hidden">
          
          {/* --- DESKTOP TABLE VIEW (Hidden on Mobile) --- */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-neutral-800/50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Buyer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                {txArray.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">#{tx.id}</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20" />
                            <span className="font-medium font-mono">{tx.shortBuyer}</span>
                            <button 
                                onClick={() => handleCopy(tx.buyer)} 
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                {copiedId === tx.buyer ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                            </button>
                        </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                        + {tx.amount} ETH
                    </td>
                    <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                    <td className="px-6 py-4 text-right">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100">
                            Completed
                        </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE LIST VIEW (Visible only on Mobile) --- */}
          <div className="md:hidden divide-y divide-gray-100 dark:divide-neutral-800">
            {txArray.map((tx) => (
              <div key={tx.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="font-medium font-mono text-sm">{tx.shortBuyer}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {tx.date}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">
                            {tx.amount} ETH
                        </p>
                        <p className="text-xs text-gray-400 flex items-center justify-end gap-1">
                             <Hash className="h-3 w-3" /> {tx.id}
                        </p>
                    </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}