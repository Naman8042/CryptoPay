"use client";
import { motion } from "motion/react";

const stats = [
  { id: 1, name: "Transactions Processed", value: "$500M+" },
  { id: 2, name: "Active Merchants", value: "10,000+" },
  { id: 3, name: "Uptime Guarantee", value: "99.99%" },
  { id: 4, name: "Average Gas Savings", value: "~40%" },
];

export default function StatsSection() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl lg:max-w-none"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Trusted by developers worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Our Ethereum infrastructure scales with your business, from your first transaction to your millionth.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8 dark:bg-white/5">
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  )
}