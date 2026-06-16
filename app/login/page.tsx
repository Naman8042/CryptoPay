
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Gradient Glow */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center px-8 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >

            <h1 className="text-5xl font-black leading-none tracking-tight lg:text-7xl">
              Access your
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                {" "}
                dashboard
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
              Sign in to manage transactions, monitor
              payments, track settlements, and access
              your payment gateway tools.
            </p>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-neutral-700">
              <div>✓ Secure Authentication</div>
              <div>✓ Instant Settlements</div>
              <div>✓ Ethereum Payments</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center p-6 lg:p-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const result = await signIn(
        "credentials",
        {
          redirect: false,
          email,
          password,
        }
      );

      if (result?.error) {
        setError(
          "Invalid email or password."
        );
        setIsLoading(false);
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="w-full max-w-md"
    >
      <div
        className={cn(
          "rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Enter your credentials to continue.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
          {...props}
        >
          <div>
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="mt-2 h-12 rounded-xl"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label htmlFor="password">
                Password
              </Label>

              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                className="h-12 rounded-xl pr-10"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Eye className="h-4 w-4 text-neutral-500" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

