
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Ethereum from "@/public/ethereum.png";

import {
  ShieldCheck,
  Globe,
  Zap,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Why Choose EtharisPay
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Ethereum Payments
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Built For Business
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Accept payments globally, settle instantly,
            and integrate Ethereum payments into your
            products with a developer-first experience.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* HERO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl lg:col-span-7"
          >
            <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Image
                  src={Ethereum}
                  alt="Ethereum"
                  width={28}
                  height={28}
                />
              </div>

              <h3 className="mt-6 text-3xl font-bold leading-tight text-slate-900">
                Accept Ethereum
                <br />
                payments instantly
              </h3>

              <p className="mt-4 max-w-xl text-slate-600">
                Receive payments directly to your wallet
                with instant settlement, transparent fees,
                and no banking restrictions.
              </p>

              {/* Payment Preview */}
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Amount
                  </span>

                  <Image
                    src={Ethereum}
                    alt="ETH"
                    width={24}
                    height={24}
                  />
                </div>

                <h4 className="mt-3 text-4xl font-bold text-slate-900">
                  1.25 ETH
                </h4>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-4 text-center text-sm font-semibold text-white">
                  Pay with Ethereum
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECURITY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl lg:col-span-5"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
              <ShieldCheck className="h-7 w-7 text-blue-600" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Secure by Design
            </h3>

            <p className="mt-3 text-slate-600">
              Blockchain-backed payments with transparent,
              verifiable transaction records.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Wallet verified
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
                <CheckCircle2 className="h-4 w-4" />
                Smart contract secured
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-violet-50 p-3 text-sm text-violet-700">
                <CheckCircle2 className="h-4 w-4" />
                On-chain settlements
              </div>
            </div>
          </motion.div>

          {/* LOW FEES */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl lg:col-span-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
              <Zap className="h-7 w-7 text-green-600" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Low Fees
            </h3>

            <p className="mt-3 text-slate-600">
              Reduce payment processing costs and maximize
              revenue retention.
            </p>
          </motion.div>

          {/* GLOBAL */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl lg:col-span-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
              <Globe className="h-7 w-7 text-violet-600" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Global Reach
            </h3>

            <p className="mt-3 text-slate-600">
              Accept Ethereum payments worldwide without
              banking restrictions.
            </p>
          </motion.div>

          {/* BENEFITS */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[32px] bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white shadow-xl lg:col-span-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                Benefits
              </h3>

              <ArrowUpRight className="h-5 w-5" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold">
                  Instant
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Settlement
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Self-Custody
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Full control
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  No Chargebacks
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Final payments
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Worldwide
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  Borderless
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
