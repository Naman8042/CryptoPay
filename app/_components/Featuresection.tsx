"use client";

import Ethereum from "@/public/ethereum.png";
import Rupee from "@/public/money-transfer.png";
import Affordable from "@/public/credit-card.png";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    icon: Ethereum,
    title: "Pay with Ethereum",
    description:
      "Accept seamless payments directly in Ethereum, enabling fast, borderless, and secure global transactions.",
  },
  {
    icon: Rupee,
    title: "Zero Transaction Fees",
    description:
      "Minimize overhead costs. We optimize gas usage to ensure you keep more of your earnings without high banking fees.",
  },
  {
    icon: Affordable,
    title: "Secure & Transparent",
    description:
      "Every transaction is immutable and verifiable on the blockchain, ensuring complete transparency for merchants and users.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FeatureSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 dark:bg-black">
      {/* Background Decoration (Optional: Matches your hero section grid) */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-500">
              Why Choose CryptoPay?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Fast, Secure, and Global <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Ethereum Payments
              </span>
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Experience the future of finance. We bridge the gap between traditional commerce and the blockchain ecosystem.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-gray-50/50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-blue-500/50"
              >
                {/* Icon Container with Glow */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-900/10 transition-transform duration-300 group-hover:scale-110 dark:bg-neutral-800 dark:ring-white/10">
                  <div className="relative h-8 w-8">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>

                {/* Decorative Gradient on Hover */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-transparent group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;