"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import axios from 'axios'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const [walletAddress, setWalletAddress] = useState("");
  const [mounted, setMounted] = useState(false);

  const { address: merchant, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  useEffect(() => {
    setMounted(true); // ✅ only true after client mount
  }, []);

  useEffect(() => {
    if (merchant) {
      setWalletAddress(merchant);
    }
  }, [merchant]);

const [errorMessage, setErrorMessage] = useState<string | null>(null);

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setErrorMessage(null); // reset

  try {
    const res = await axios.post("/api/signup", {
      email,
      password,
      walletAddress,
    });

    console.log("✅ User saved in DB:", res.data);

    // Call smart contract after success
    const txs = writeContract({
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: "registerMerchant",
      account: merchant,
    });

    console.log("✅ Contract transaction sent:", txs);
  } catch (err: any) {
    console.error("❌ Registration failed:", err);

    // Show API error message if available
    if (err.response?.status === 409) {
      setErrorMessage("Email or Wallet Address already registered");
    } else if (err.response?.data?.error) {
      setErrorMessage(err.response.data.error);
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }
};



  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleRegister}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-muted-foreground text-sm text-balance w-full">
          Enter your wallet address below to create your account
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
            placeholder="Enter Your email"
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
            required
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            type="text"
            placeholder="Enter Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Processing..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}
