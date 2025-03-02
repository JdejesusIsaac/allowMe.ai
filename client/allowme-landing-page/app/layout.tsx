import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { DialogProvider } from "@/components/ui/dialog"

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
    <html lang="en">
      <body>
        <DialogProvider>{children}</DialogProvider>
      </body>
    </html>
  )
}

