
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white max-h-[90vh]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#dbe4ff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

      {/* Side Glow */}
      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid items-center gap-20 lg:grid-cols-[60%_40%]">
          {/* Left Content */}
          <div className="max-w-4xl">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold leading-[0.95] tracking-tight text-slate-900 md:text-6xl lg:text-7xl"
            >
              Accept{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Ethereum
              </span>{" "}
              payments{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                instantly
              </span>{" "}
              with our seamless gateway
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl"
            >
              Launch your payment gateway quickly and securely.
              Start receiving Ethereum within minutes with
              lightning-fast setup, instant settlements, and
              global reach.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/docs">
                <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <button className="rounded-xl border border-slate-200 bg-white px-8 py-4 font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50">
                Contact Sales
              </button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap gap-8"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Zap className="h-4 w-4 text-blue-600" />
                No setup fees
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                Instant settlement
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Code2 className="h-4 w-4 text-blue-600" />
                Developer friendly
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Circle */}
            <div className="absolute h-[550px] w-[550px] rounded-full border border-blue-100" />

            <div className="absolute h-[450px] w-[450px] rounded-full bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-3xl" />

            {/* Payment Card */}
            <div className="relative z-10 w-full max-w-[480px] rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
              {/* Amount */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6">
                <p className="text-sm text-slate-500">
                  Amount
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-5xl font-bold text-slate-900">
                    1.25 ETH
                  </h3>

                  <Image
                    src="/ethereum.png"
                    alt="Ethereum"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              {/* Wallet */}
              <div className="mt-5 rounded-3xl border border-slate-100 bg-white p-6">
                <p className="text-sm text-slate-500">
                  To
                </p>

                <p className="mt-3 text-xl font-semibold text-slate-800">
                  0x8F3...ab12
                </p>
              </div>

              {/* Button */}
              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-semibold text-white transition-all hover:scale-[1.02]">
                <Zap className="h-5 w-5" />
                Pay with Ethereum
              </button>
            </div>

            {/* Floating ETH */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -right-8 top-1/2 z-20"
            >
              <Image
                src="/ethereum.png"
                alt="Ethereum"
                width={140}
                height={140}
                className="drop-shadow-[0_20px_40px_rgba(59,130,246,0.25)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
