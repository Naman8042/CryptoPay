"use client";

import { useSession } from "next-auth/react";
import WalletConnector from "../_components/Walletconnector";
import MerchantStats from "../_components/Earning";
import RecentTransactions from "../_components/RecentTransactions";
import WithdrawFunds from "../_components/Withdrawfunds";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <p className="mb-4 text-lg font-medium">
          You must be logged in to access this page.
        </p>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-end ">
        <WalletConnector />
      </div>
      <MerchantStats />
      <WithdrawFunds />
      <RecentTransactions />
    </div>
  );
};

export default Page;
