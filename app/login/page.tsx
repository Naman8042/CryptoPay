"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2} from "lucide-react";
import { motion } from "motion/react";

// --- The Page Component ---
export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 dark:bg-black p-4">
      
      {/* Background Decor (Grid Pattern) */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] pointer-events-none" />
      
      {/* Back Button */}
      {/* <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link> */}

      {/* Centered Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="z-10 w-full max-w-sm"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
}

// --- The Form Component ---
export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 rounded-xl border bg-white p-6 shadow-xl dark:bg-neutral-900 dark:border-neutral-800", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white">
          {/* Logo Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-white dark:text-black"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" x2="3" y1="12" y2="12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleLogin} className="grid gap-4" {...props}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10"
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
          Sign up
        </Link>
      </div>
    </div>
  );
}