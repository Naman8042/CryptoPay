"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import WalletConnector from "../_components/Walletconnector";

export default function PayComponent() {
  const [merchant, setMerchant] = useState<`0x${string}` | "">("");
  const [amount, setAmount] = useState("0.01"); // default 0.01 ETH

  const {
    data: hash,
    writeContract,
    isPending,
    error,
  } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handlePay = async () => {
    if (!merchant) {
      alert("Please enter a merchant address");
      return;
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "pay",
      args: [merchant], // ✅ pass merchant explicitly
      value: BigInt(Math.floor(Number(amount) * 1e18)), // ETH → wei
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow bg-white space-y-4">
      <WalletConnector/>  
      <h2 className="text-xl font-semibold">Make a Payment</h2>

      <input
        type="text"
        value={merchant}
        onChange={(e) => setMerchant(e.target.value as `0x${string}`)}
        placeholder="Merchant address (0x...)"
        className="border rounded-lg w-full px-3 py-2"
      />

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        className="border rounded-lg w-full px-3 py-2"
      />

      <button
        disabled={isPending || isLoading}
        onClick={handlePay}
        className="w-full bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isLoading ? "Processing..." : "Pay Now"}
      </button>

      {hash && <p className="text-sm text-gray-500 break-all">Tx Hash: {hash}</p>}
      {isSuccess && <p className="text-green-600">✅ Payment Successful!</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}
    </div>
  );
}
