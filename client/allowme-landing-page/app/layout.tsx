import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { inter, poppins } from "./fonts"
import { Providers } from "@/lib/providers"

export const metadata: Metadata = {
  title: "allowMe - AI-Powered Allowance Management",
  description:
    "An AI agent that automates allowance distribution based on verified educational, personal development and health achievements.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}




