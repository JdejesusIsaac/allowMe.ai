"use client"

import type React from "react"
import { useRouter } from "next/navigation"

interface GoogleSignInProps {
  onSuccess: (response: any) => void
  onFailure: (error: Error) => void
  children?: React.ReactNode
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSuccess, onFailure, children }) => {
  const router = useRouter()

  const handleSignIn = () => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth"
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`

    console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL)
    console.log("NEXT_PUBLIC_GOOGLE_CLIENT_ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      state: btoa(Math.random().toString(36)),
      prompt: "consent",
    })

    const fullUrl = `${googleAuthUrl}?${params.toString()}`
    console.log("Full Google Auth URL:", fullUrl)

    window.location.href = fullUrl
  }

  return <div onClick={handleSignIn}>{children}</div>
}

export default GoogleSignIn

