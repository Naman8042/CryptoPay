"use client";
import Link from "next/link";
import { motion } from "motion/react";

export function HeroSectionOne() {
  return (
    <div className="relative mx-auto flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* --- Background Elements --- */}
      
      {/* Grid Pattern with Radial Fade */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />

      {/* Ambient Glow */}
      <div className="absolute -top-40 left-0 right-0 mx-auto h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]" />

      {/* --- Content --- */}
      <div className="relative z-10 px-4 py-10 md:py-20">
        
        {/* Main Heading */}
        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-4xl font-bold tracking-tight text-slate-700 md:text-6xl lg:text-7xl dark:text-slate-300">
          {"Accept Ethereum payments instantly with our seamless gateway"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className={`mr-2 inline-block ${
                    // Highlight "Ethereum" and "instantly"
                    word.toLowerCase().includes("ethereum") || word.toLowerCase().includes("instantly")
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500" 
                    : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-lg text-neutral-600 md:text-xl dark:text-neutral-400"
        >
          Launch your payment gateway quickly and securely. Start receiving <span className="text-foreground font-semibold text-blue-600 dark:text-blue-400">Ethereum</span> with lightning-fast setup and global reach.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/docs" className="w-full sm:w-auto">
            <button className="group relative w-full overflow-hidden rounded-lg bg-black px-8 py-3.5 font-semibold text-white transition-all hover:bg-gray-900 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:w-60">
              <span className="relative z-10">Explore Now</span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            </button>
          </Link>
          
          <button className="group w-full rounded-lg border border-neutral-200 bg-white px-8 py-3.5 font-medium text-neutral-900 transition-all hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900 sm:w-60">
            Contact Sales
          </button>
        </motion.div>
      </div>
      
    </div>
  );
}