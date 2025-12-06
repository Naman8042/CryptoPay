"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import { Loader2, AlertCircle, CheckCircle2, Wallet, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function WithdrawFunds() {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  
  // 1. Write Hook
  const { writeContractAsync, isPending: isWritePending, error: writeError } = useWriteContract();

  // 2. Wait for Transaction Receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
  });

  // 3. Read User's Balance from Contract (to show "Max" amount)
  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getBalance",
    args: address ? [address] : undefined,
  });

  const availableBalance = balanceData ? formatEther(balanceData as bigint) : "0";

  // Refresh balance after successful withdrawal
  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
      setAmount("");
    }
  }, [isConfirmed, refetchBalance]);

  const handleSetMax = () => {
    setAmount(availableBalance);
  };

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) return;

    try {
      // Use parseEther to handle decimals correctly (18 decimals)
      const weiAmount = parseEther(amount);

      const hash = await writeContractAsync({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "withdraw",
        args: [weiAmount],
      });
      setTxHash(hash);
    } catch (err) {
      console.error("Withdraw failed", err);
    }
  };

  const isLoading = isWritePending || isConfirming;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end w-full">
            <Button className="bg-black text-white hover:bg-gray-800 transition-all gap-2 shadow-lg">
                <Wallet className="h-4 w-4" />
                Withdraw Funds
            </Button>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Transfer earnings from the smart contract to your wallet.
          </DialogDescription>
        </DialogHeader>

        {isConfirmed ? (
            // --- SUCCESS STATE ---
            <div className="flex flex-col items-center justify-center gap-4 py-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="text-center">
                    <h3 className="font-semibold text-lg">Withdrawal Successful!</h3>
                    <p className="text-sm text-gray-500">Your funds are on the way to your wallet.</p>
                </div>
                <div className="flex gap-2 w-full mt-2">
                    <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button asChild className="w-full gap-2" variant="default">
                        <Link href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">
                             View on Explorer <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        ) : (
            // --- FORM STATE ---
            <div className="grid gap-4 py-4">
            
              {/* Balance Display */}
              <div className="flex items-center justify-between text-sm bg-gray-50 dark:bg-neutral-900 p-3 rounded-lg border">
                <span className="text-gray-500">Available Balance:</span>
                <span className="font-mono font-medium">{Number(availableBalance).toFixed(4)} ETH</span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount">Amount to Withdraw</Label>
                <div className="relative">
                    <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isLoading}
                    className="pr-16" // Make room for MAX button
                    />
                    <button 
                        type="button"
                        onClick={handleSetMax}
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-700 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                        MAX
                    </button>
                </div>
              </div>

              {/* Error Display */}
              {writeError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription className="text-xs">
                        {writeError.message.includes("exceeds balance") 
                            ? "Insufficient funds in contract." 
                            : "Transaction rejected or failed."}
                    </AlertDescription>
                  </Alert>
              )}

              {/* Status Display during transaction */}
              {isConfirming && (
                   <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                   <Loader2 className="h-4 w-4 animate-spin" />
                   <AlertTitle>Processing</AlertTitle>
                   <AlertDescription className="text-xs">
                       Waiting for blockchain confirmation...
                   </AlertDescription>
                 </Alert>
              )}

            <DialogFooter className="mt-4">
                <Button 
                    onClick={handleWithdraw} 
                    disabled={isLoading || !amount || Number(amount) <= 0} 
                    className="w-full"
                >
                    {isWritePending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sign in Wallet
                        </>
                    ) : isConfirming ? (
                        "Processing..."
                    ) : (
                        "Confirm Withdraw"
                    )}
                </Button>
            </DialogFooter>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}