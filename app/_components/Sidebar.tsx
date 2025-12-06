"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
  IconWallet,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SidebarAdmin() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    signOut({ callbackUrl: "/login" });
  };

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Payments",
      href: "/dashboard/payments",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      onClick: handleLogout,
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div className="h-dvh fixed top-0 left-0 z-50">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <div key={idx} onClick={link.onClick}>
                    <SidebarLink 
                        link={link} 
                        className={cn(
                            isActive && "bg-neutral-100 dark:bg-neutral-800 rounded-md"
                        )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* UPDATED: Profile Section using ONLY Email */}
          <div>
            {session?.user?.email ? (
                <SidebarLink
                link={{
                    label: session.user.email, // Use email here
                    href: "#",
                    icon: (
                        // Generate initials from email (e.g., "ad@gmail.com" -> "AD")
                        <div className="h-7 w-7 shrink-0 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-700 dark:text-neutral-200">
                            {session.user.email.slice(0, 2).toUpperCase()}
                        </div>
                    ),
                }}
                />
            ) : (
                // Loading Skeleton
                <div className="flex items-center gap-2 p-2">
                    <div className="h-7 w-7 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                    <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
                </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-6 w-6 shrink-0 bg-black dark:bg-white rounded-md flex items-center justify-center">
          <IconWallet className="h-4 w-4 text-white dark:text-black" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-black dark:text-white"
      >
        CryptoPay
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
       <div className="h-6 w-6 shrink-0 bg-black dark:bg-white rounded-md flex items-center justify-center">
          <IconWallet className="h-4 w-4 text-white dark:text-black" />
      </div>
    </Link>
  );
};