"use client";

import Link from "next/link";
import { Github, Twitter, DiscIcon as Discord, Send } from "lucide-react";

const navigation = {
  product: [
    { name: "Features", href: "#" },
    { name: "Integration", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Changelog", href: "#" },
  ],
  support: [
    { name: "Documentation", href: "#" },
    { name: "API Status", href: "#" },
    { name: "Contact", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative  overflow-hidden border-t border-slate-200 bg-white">
      {/* Background Glow */}
      <div className="absolute max-w-7xl  left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Top CTA */}
        <div className="mb-16 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Ready to accept Ethereum payments?
              </h3>

              <p className="mt-2 text-slate-600">
                Launch your crypto payment gateway in minutes.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white transition hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-bold">
                <span className="text-slate-900">Etharis</span>
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Pay
                </span>
              </h2>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              The easiest way for businesses to accept Ethereum payments
              globally.
            </p>

            {/* Socials */}
            
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} EtharisPay. All rights reserved.</p>

          <p>Built for developers • Powered by Ethereum</p>
        </div>
      </div>
    </footer>
  );
}
