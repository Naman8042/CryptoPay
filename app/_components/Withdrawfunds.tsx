"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";

export default function WithdrawFunds() {
  const { writeContractAsync } = useWriteContract();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // modal state

  async function handleWithdraw() {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const withdrawAmount = BigInt(Math.floor(Number(amount) * 1e18));

      const hash = await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "withdraw",
        args: [withdrawAmount],
      });

      setTxHash(hash);
      setOpen(false); // close dialog on success
    } catch (err: any) {
      console.error("Withdraw failed", err);
      setError(err.message ?? "Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <div className="flex justify-end w-full">
        <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
      >
        Withdraw Funds
      </button>
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">


          {/* Modal Content */}
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Withdraw Funds
            </h2>

            <input
              type="number"
              step="0.0001"
              placeholder="Enter amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-xl mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Withdrawing..." : "Confirm"}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-500 text-center">⚠ {error}</p>
            )}
          </div>
        </div>
      )}

      {/* Success Toast-ish */}
      {txHash && (
        <p className="mt-3 text-sm text-green-600">
          ✅ Withdrawal successful!{" "}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View Transaction
          </a>
        </p>
      )}
    </>
  );
}
