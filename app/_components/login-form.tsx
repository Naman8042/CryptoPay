
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute left-8 top-8 z-50 flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center border-r border-neutral-200 bg-neutral-50 px-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <Sparkles className="h-5 w-5" />
              </div>

              <span className="text-xl font-semibold">
                Your Brand
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-black">
              Welcome Back
            </h1>

            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Sign in to access your dashboard and continue
              where you left off.
            </p>

            {/* Decorative UI */}
            <div className="mt-16 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <div className="h-3 w-32 rounded-full bg-neutral-200" />
                <div className="h-3 w-full rounded-full bg-neutral-100" />
                <div className="h-3 w-4/5 rounded-full bg-neutral-100" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="h-24 rounded-2xl bg-neutral-100" />
                <div className="h-24 rounded-2xl bg-neutral-100" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [isLoading, setIsLoading] =
    useState(false);
  const [error, setError] = useState("");

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
          "Invalid email or password"
        );
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
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
        y: 20,
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
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign In
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Enter your credentials below.
          </p>
        </div>

        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="mb-6 h-12 w-full rounded-xl"
          onClick={() =>
            signIn("google")
          }
        >
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-neutral-400">
              Or
            </span>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
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
                className="text-sm text-neutral-500 hover:text-black"
              >
                Forgot Password?
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
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Eye className="h-4 w-4 text-neutral-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" />

            <Label
              htmlFor="remember"
              className="cursor-pointer text-sm"
            >
              Remember me
            </Label>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-black text-white hover:bg-neutral-800"
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
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-black hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
