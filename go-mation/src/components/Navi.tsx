"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import AuthModal from "./AuthModal"

const navItems = ["Home", "About", "Contact"]

const nav = () => {
  const pathname = usePathname()
  const [authOpen, setAuthOpen] = useState(false)
  
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] z-50 py-3"
    >
      <div className="flex items-center justify-between px-4 md:px-8 mx-auto max-w-7xl">
        <div className="rounded-full overflow-hidden">
          <Image src="/logo.png" alt="GoMation" width={44} height={44} priority />
        </div>
        <div className="flex items-center gap-4">
          {navItems.map((item, index) => {
            let href
            if (item === "Home") {
              href = "/"
            } else {
              href = `/${item.toLowerCase()}`
            }
            const isActive = pathname === href
            return (
              <Link
                key={index}
                href={href}
                className={`text-sm font-medium transition-colors ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {item}
              </Link>
            )
          })}
        </div>
        <button className="bg-white text-black text-sm px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => setAuthOpen(true)}>
          Login
        </button>
      </div>
      
    </motion.div>
    <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}

export default nav