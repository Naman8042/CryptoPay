"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import axios from "axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [mounted, setMounted] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { address: merchant, isConnected } = useAccount();

  // contract write hook
  const { writeContract, data: pendingTxHash, isPending } = useWriteContract();

  // wait for tx confirmation
  const { isSuccess: txConfirmed, isError: txFailed } =
    useWaitForTransactionReceipt({
      hash: txHash ?? undefined,
    });

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (merchant) setWalletAddress(merchant);
  }, [merchant]);

  // when tx succeeds, call API
  useEffect(() => {
    if (txConfirmed && txHash) {
      (async () => {
        try {
          const res = await axios.post("/api/signup", {
            email,
            password,
            walletAddress,
            txHash,
          });
          console.log("✅ User saved in DB:", res.data);
        } catch (err: any) {
          console.error("❌ API error:", err);
          setErrorMessage("Database save failed after blockchain tx");
        }
      })();
    }
  }, [txConfirmed, txHash, email, password, walletAddress]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!merchant) {
      setErrorMessage("Connect your wallet first");
      return;
    }

    try {
      const hash = await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "registerMerchant",
        account: merchant,
      });

      console.log("⏳ Contract tx sent:", hash);
    } catch (err) {
      console.error("❌ Contract write failed:", err);
      setErrorMessage("Transaction rejected or failed");
    }
  };

   useEffect(() => {
    if (pendingTxHash) {
      setTxHash(pendingTxHash);
    }
  }, [pendingTxHash]);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleRegister}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-muted-foreground text-sm text-balance w-full">
          Sign the transaction and we’ll save your account
        </p>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            type="text"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label htmlFor="address">Wallet Address</Label>
          <Input
            id="address"
            value={walletAddress}
            type="text"
            placeholder={
              mounted && isConnected ? merchant : "Connect your wallet"
            }
            readOnly
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !isConnected}
        >
          {isPending ? "Processing..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
