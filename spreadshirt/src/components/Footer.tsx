"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md">
            <h3 className="font-semibold text-lg mb-4">Subscribe to our newsletter!</h3>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your e-mail address" />
              <Button>Subscribe</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Service</h3>
            <ul className="space-y-2">
              <li><Link href="#">Your Orders</Link></li>
              <li><Link href="#">Help</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">The Company</h3>
            <ul className="space-y-2">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Sustainability</Link></li>
              <li><Link href="#">Press</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl mb-2">🔒</span>
            <h4 className="font-semibold mb-1">All secure payment methods</h4>
            <p className="text-sm">Visa, Mastercard, PayPal & more</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl mb-2">😊</span>
            <h4 className="font-semibold mb-1">Satisfaction guaranteed</h4>
            <p className="text-sm">Easy returns within 90 days, no questions asked!</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="text-3xl mb-2">🚚</span>
            <h4 className="font-semibold mb-1">Worldwide delivery</h4>
            <p className="text-sm">Fast shipping to anywhere in the world</p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} TeeDesigner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
