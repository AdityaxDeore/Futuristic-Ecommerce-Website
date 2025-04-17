"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="w-full">
      <div className="bg-[#f2435b] text-white p-2 text-center">
        <p>15% off everything <button className="underline font-semibold">Redeem Code Now</button></p>
      </div>
      <div className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/" className="font-bold text-2xl">TeeDesigner</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="font-medium border-b-2 border-black">Create</Link>
            <Link href="/shop" className="font-medium">Shop</Link>
            <Link href="/pro" className="font-medium">Pro</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
