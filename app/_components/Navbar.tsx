"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [status])

  if (status === "loading") {
    return null
  }

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full z-50 bg-white text-sm py-3 fixed top-0 h-[10vh] shadow-sm">
      <nav className="max-w-7xl w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
        <Link className="sm:order-1 flex-none text-3xl font-semibold focus:outline-hidden focus:opacity-80" href="/">
          CryptoPay
        </Link>

        <div className="sm:order-3 flex items-center gap-x-2">
          {/* Mobile toggle button here */}
          {isLoggedIn ? (
            <Button type="button">
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button type="button" className="w-20">
                <Link href={"/register"}>Register</Link>
              </Button>
              <Button type="button" className="w-20">
                <Link href={"/login"}>Login</Link>
              </Button>
            </div>
          )}
        </div>

        <div
          id="hs-navbar-alignment"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
          aria-labelledby="hs-navbar-alignment-collapse"
        >
          <div className="flex flex-col gap-8 mt-5 sm:flex-row sm:items-center sm:mt-0">
            <Link
              className="font-xl text-base text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400"
              href="/docs"
            >
              Docs
            </Link>
            <Link
              className="font-xl text-base text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400"
              href="https://github.com/Naman8042/My-Gateway-sdk"
            >
              Github
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
