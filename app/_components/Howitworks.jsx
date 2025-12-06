"use client";
import { motion } from "motion/react";
import { CheckCircle2, Zap, Code2 } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      id: "01",
      title: "Connect Wallet",
      description: "Sign in with Metamask to create your merchant identity on-chain.",
      icon: <Zap className="w-5 h-5 text-blue-600" />,
    },
    {
      id: "02",
      title: "Register Merchant",
      description: "One-click registration to enable payments and access your dashboard.",
      icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
    },
    {
      id: "03",
      title: "Integrate Checkout",
      description: "Drop our pre-built React component into your app and start earning.",
      icon: <Code2 className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          
          {/* Left Text Content */}
          <div className="lg:pr-8 lg:pt-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-500">
                Workflow
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                From wallet to revenue in 3 steps
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                CryptoPay abstracts the complexity of blockchain. You don't need to write Solidity to accept crypto—just use our dashboard and SDK.
              </p>

              <div className="mt-8 space-y-8">
                {steps.map((step) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex-none flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Code Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl bg-gray-900 shadow-2xl ring-1 ring-white/10 sm:w-[34rem] md:w-[40rem] lg:w-full mx-auto">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 rounded-t-xl">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <div className="ml-2 text-xs text-gray-500 font-mono">Checkout.tsx</div>
                </div>

                {/* Code Block */}
                <div className="p-6 overflow-x-auto">
                    <pre className="font-mono text-sm leading-relaxed">
                        <code className="text-gray-300">
                            <span className="text-purple-400">import</span> {"{ CryptoPayButton }"} <span className="text-purple-400">from</span> <span className="text-green-400">'@cryptopay/react'</span>;
                            {"\n\n"}
                            <span className="text-blue-400">export default</span> <span className="text-purple-400">function</span> <span className="text-yellow-200">PaymentPage</span>() {"{"}
                            {"\n"}
                            <span className="text-purple-400">  return</span> (
                            {"\n"}
                            <span className="text-gray-500">    // Simply drop this component in your app</span>
                            {"\n"}
                            <span className="text-blue-300">    &lt;CryptoPayButton</span>
                            {"\n"}
                            <span className="text-sky-300">      merchantId</span>=<span className="text-green-400">"0x71C...9A21"</span>
                            {"\n"}
                            <span className="text-sky-300">      amount</span>=<span className="text-green-400">"0.05"</span>
                            {"\n"}
                            <span className="text-sky-300">      currency</span>=<span className="text-green-400">"ETH"</span>
                            {"\n"}
                            <span className="text-sky-300">      onSuccess</span>={"{"}(<span className="text-orange-300">tx</span>) =&gt; <span className="text-yellow-200">console</span>.<span className="text-blue-300">log</span>(<span className="text-orange-300">tx</span>){"}"}
                            {"\n"}
                            <span className="text-blue-300">    /&gt;</span>
                            {"\n"}
                            <span className="text-purple-400">  )</span>;
                            {"\n"}
                            {"}"}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Floating Badge Effect */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}