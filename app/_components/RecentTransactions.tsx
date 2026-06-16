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

interface RecentTransactionsProps {
  place?: "dashboard" | "payments";
}

export default function RecentTransactions({
  place,
}: RecentTransactionsProps) {
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
  const limit =
  place === "dashboard"
    ? 5
    : count;
 const start = Math.max(
  0,
  count - limit
);

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
  <section className="w-full">
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <History className="h-5 w-5 text-blue-600" />
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest payments received on-chain
          </p>
        </div>

        {!isLoading && txArray.length > 0 && (
          <Badge
            variant="secondary"
            className="w-fit rounded-full px-3 py-1"
          >
            {txArray.length} Recent
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4 p-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-20 w-full rounded-2xl"
            />
          ))}
        </div>
      ) : txArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <History className="h-8 w-8 text-slate-400" />
          </div>

          <h3 className="mt-5 text-lg font-semibold">
            No Transactions Yet
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Payments received from customers will appear
            here once transactions start coming in.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Buyer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {txArray.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />

                        <div>
                          <p className="font-medium">
                            {tx.shortBuyer}
                          </p>

                          <button
                            onClick={() =>
                              handleCopy(tx.buyer)
                            }
                            className="mt-1 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
                          >
                            {copiedId === tx.buyer ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                Copy address
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-semibold text-emerald-600">
                        + {tx.amount} ETH
                      </span>
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {tx.date}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Completed
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 p-4 lg:hidden">
            {txArray.map((tx) => (
              <div
                key={tx.id}
                className="rounded-2xl border border-slate-200 p-4 transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />

                    <div>
                      <p className="font-medium font-mono">
                        {tx.shortBuyer}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {tx.date}
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-green-100 text-green-700">
                    Paid
                  </Badge>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Transaction #{tx.id}
                  </span>

                  <span className="font-bold text-emerald-600">
                    {tx.amount} ETH
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </section>
);


}