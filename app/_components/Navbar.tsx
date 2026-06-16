"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming this is your shadcn button
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // if (status === "loading") return null;

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:bg-black/80 dark:border-neutral-800"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-0">
          
          {/* --- Logo --- */}
          <Link
            href="/"
            className="flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Etharis<span className="text-blue-600">Pay</span>
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex md:items-center md:gap-x-8">
            <Link
              href="/docs"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="https://github.com/Naman8042/My-Gateway-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 transition-colors"
            >
              Github
            </Link>
             <Link
              href="/pay"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 transition-colors"
            >
              Pay
            </Link>
          </div>

          {/* --- Desktop Auth Buttons --- */}
          <div className="hidden md:flex md:items-center md:gap-x-3">
            {session ? (
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white px-6 py-20 dark:bg-black md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <Link
                href="/docs"
                onClick={toggleMenu}
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                Docs
              </Link>
              <Link
                href="https://github.com/Naman8042/My-Gateway-sdk"
                onClick={toggleMenu}
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                Github
              </Link>
              <Link
                href="/pay"
                onClick={toggleMenu}
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                Github
              </Link>
              
              <div className="mt-4 flex flex-col gap-4">
                {session ? (
                  <Button asChild onClick={toggleMenu} size="lg">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" size="lg" onClick={toggleMenu}>
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild size="lg" onClick={toggleMenu} className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;