"use client"
import { useState, useEffect } from "react";
import { 
  useConnect, 
  useAccount, 
  useDisconnect
} from "wagmi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function WalletConnector() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid hydration mismatches

  const sliceAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="flex items-center justify-end w-full h-[10vh] max-w-7xl mx-auto">
      {isConnected && address ? (
        <div className="flex items-center justify-between gap-3 w-full">
          <Badge variant="secondary" className="text-base px-4 py-2 flex gap-1 ">
            <span>Connected:</span>
            <span>{sliceAddress(address)}</span>
          </Badge>
          <Button
            variant="destructive"
            onClick={() => disconnect()}
            className="w-40"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-8 py-3">
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose a Wallet</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  variant="outline"
                  onClick={() => {
                    connect({ connector });
                    setOpen(false);
                  }}
                  className="justify-between"
                >
                  {connector.name}
                  <span className="text-muted-foreground">→</span>
                </Button>
              ))}
            </div>
            <Button
              variant="destructive"
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}