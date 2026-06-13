
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Ethereum from "@/public/ethereum.png";
import {
  ShieldCheck,
  Zap,
  Globe,
  ArrowUpRight,
} from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#dbe4ff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Why Choose CryptoPay  
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Fast, Secure &
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {" "}Global Payments
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Everything you need to accept Ethereum payments
            with enterprise-grade reliability.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group lg:col-span-2"
          >
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Image
                  src={Ethereum}
                  alt="Ethereum"
                  width={28}
                  height={28}
                />
              </div>

              <h3 className="mt-5 text-2xl font-bold text-slate-900 md:text-3xl">
                Accept Ethereum
                <br />
                payments instantly
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 md:text-base">
                Receive Ethereum payments globally with
                instant settlements, low fees, and a
                developer-friendly integration.
              </p>

              {/* Mini Stats */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-80">
                      Monthly Volume
                    </p>

                    <h4 className="mt-1 text-2xl font-bold">
                      $12.4M
                    </h4>
                  </div>

                  <ArrowUpRight className="h-8 w-8" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Secure
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Blockchain-backed payments with complete
              transparency and security.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs font-medium text-slate-700">
              ✓ Transaction Verified
            </div>
          </motion.div>

          {/* Low Fees */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Zap className="h-6 w-6 text-green-600" />
            </div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Zero Fees
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Save more revenue with optimized settlement
              costs and reduced overhead.
            </p>
          </motion.div>

          {/* Global Reach */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Global Reach
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Accept payments worldwide without banking
              restrictions or delays.
            </p>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-xl flex flex-col items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-bold">
                  10K+
                </h4>
                <p className="text-xs text-slate-400">
                  Merchants
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold">
                  99.99%
                </h4>
                <p className="text-xs text-slate-400">
                  Uptime
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold">
                  $500M+
                </h4>
                <p className="text-xs text-slate-400">
                  Processed
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold">
                  40%
                </h4>
                <p className="text-xs text-slate-400">
                  Savings
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

