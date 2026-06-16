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
      // Applied a subtle destructive color scheme for the logout action
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors" />
      ),
      isDestructive: true,
    },
  ];

  return (
    <div className="h-dvh fixed top-0 left-0 z-50 md:shadow-sm">
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 bg-white dark:bg-neutral-900 md:border-r border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <div 
                    key={idx} 
                    onClick={link.onClick}
                    className="group" // Added group for nested hover styling
                  >
                    <SidebarLink
                      link={link}
                      className={cn(
                        "rounded-lg transition-all duration-200 px-2 py-1.5",
                        isActive
                          ? "bg-neutral-100 dark:bg-neutral-800 font-medium"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
                        link.isDestructive && "hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profile Section */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 -mx-2 px-2">
            {session?.user?.email ? (
              <div className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors duration-200 p-1">
                 <SidebarLink
                  link={{
                    label: (
                      <span className="block truncate max-w-[150px] text-sm font-medium text-neutral-700 dark:text-neutral-200">
                        {session.user.email}
                      </span>
                    ) as any, // Cast to any if SidebarLink expects strictly a string, otherwise wrap in a component
                    href: "#",
                    icon: (
                      <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-sm">
                        {session.user.email.slice(0, 2).toUpperCase()}
                      </div>
                    ),
                  }}
                />
              </div>
            ) : (
              // Enhanced Loading Skeleton
              <div className="flex items-center gap-3 p-2">
                <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 animate-pulse border border-neutral-200 dark:border-neutral-700" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-md" />
                  <div className="h-2 w-16 bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-md" />
                </div>
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
      className="relative z-20 flex items-center space-x-3 py-1 text-sm font-normal text-black transition-opacity hover:opacity-80"
    >
      <div className="h-7 w-7 shrink-0 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center shadow-sm">
        <IconWallet className="h-4 w-4 text-white dark:text-neutral-900" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-base tracking-tight whitespace-pre text-neutral-900 dark:text-white"
      >
        EtharisPay
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black transition-opacity hover:opacity-80"
    >
      <div className="h-7 w-7 shrink-0 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center shadow-sm">
        <IconWallet className="h-4 w-4 text-white dark:text-neutral-900" />
      </div>
    </Link>
  );
};