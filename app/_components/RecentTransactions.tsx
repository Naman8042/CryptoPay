"use client";

import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import type { Address } from "viem";

export default function RecentTransactions() {
  const { address: merchant } = useAccount();

  // 1️⃣ Get total transactions
  const { data: txCount } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getPaymentCount",
    args: merchant ? [merchant as Address] : undefined, // cast merchant
  });

  const count = Number(txCount ?? 0);
  const start = Math.max(0, count - 5);

  // 2️⃣ Batch fetch last 5 payments
  const { data: txs } = useReadContracts({
    contracts: merchant
      ? Array.from({ length: count - start }, (_, idx) => ({
          abi: CONTRACT_ABI,
          address: CONTRACT_ADDRESS,
          functionName: "getPayment",
          args: [merchant as Address, BigInt(start + idx)], // cast + BigInt
        }))
      : [],
  });

  // 3️⃣ Format results
  const txArray =
    txs
      ?.map((result, i) => {
        if (!result.result) return null;
        const [payer, amount, timestamp] = result.result as [
          Address,
          bigint,
          bigint
        ];
        return {
          id: `#${start + i + 1}`,
          buyer: `${payer.slice(0, 6)}...${payer.slice(-4)}`,
          token: "ETH",
          amount: (Number(amount) / 1e18).toFixed(4),
          date: new Date(Number(timestamp) * 1000).toLocaleDateString(),
        };
      })
      // ✅ type guard removes null
      .filter((tx): tx is NonNullable<typeof tx> => Boolean(tx))
      .reverse() ?? [];

  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="p-2 rounded-lg w-12 flex justify-center bg-black text-white">
            ☰
          </span>
          Recent Transactions
        </h1>

        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="px-6 py-4">TRANSACTION ID</th>
                <th className="px-6 py-4">BUYER</th>
                <th className="px-6 py-4">TOKEN</th>
                <th className="px-6 py-4">AMOUNT</th>
                <th className="px-6 py-4">DATE</th>
              </tr>
            </thead>
            <tbody>
              {txArray.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                txArray.map((tx, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">{tx.id}</td>
                    <td className="px-6 py-4">{tx.buyer}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-sm font-semibold border border-gray-300">
                        {tx.token}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
