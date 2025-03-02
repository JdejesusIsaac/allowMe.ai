"use client"

import Image from "next/image"
import { Montserrat, Open_Sans } from "next/font/google"
import MenuOverlay from "@/components/MenuOverlay"
import GoogleSignIn from "@/components/GoogleSignIn"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Font setup
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-open-sans",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
})

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [signInError, setSignInError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userParam = params.get("user")
    if (userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam))
        setUser(userData)
      } catch (error) {
        console.error("Error parsing user data:", error)
        setSignInError("Failed to load user data")
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      // In a real application, you'd check if the user has completed their profile
      const hasCompletedProfile = false // This should come from your backend
      if (!hasCompletedProfile) {
        router.push("/create-profile")
      }
    }
  }, [user, router])

  const handleGoogleSignInSuccess = (response: any) => {
    console.log("Google Sign-In successful", response)
    setUser({ name: response.name, email: response.email })
    setSignInError(null)
  }

  const handleGoogleSignInFailure = (error: Error) => {
    console.error("Google Sign-In failed", error)
    setSignInError(error.message)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-white ${openSans.variable} ${montserrat.variable} font-sans ${openSans.className} font-light pt-4`}
    >
      {/* Header */}
      <header className="w-full max-w-[1440px] flex items-end justify-between px-12 pb-4">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-200 mr-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/allowMe_logo-AabigLbmDhtrQw5jewuOLsOuwB6RBa.png"
              alt="allowMe Logo"
              width={80}
              height={80}
              className="w-full h-full"
            />
          </div>
          <h1
            className="text-[80px] font-extrabold leading-none"
            style={{ fontFamily: "var(--font-open-sans)", fontWeight: 800 }}
          >
            allowMe
          </h1>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center mr-4 px-4 py-2 bg-white border border-black">
              <span className="text-base">{user.email}</span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expand-9LaWIB5LOatuvlQXOrrTDjoPICxjA4.png"
                alt="Expand"
                width={24}
                height={24}
                className="ml-2"
              />
            </div>
          ) : (
            <GoogleSignIn onSuccess={handleGoogleSignInSuccess} onFailure={handleGoogleSignInFailure}>
              <button className="flex items-center border border-gray-300 rounded-md px-4 py-2 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </GoogleSignIn>
          )}
          <MenuOverlay />
        </div>
      </header>

      {/* Display sign-in error if any */}
      {signInError && (
        <div
          className="w-full max-w-[1440px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{signInError}</span>
        </div>
      )}

      {/* Horizontal Line */}
      <div className="w-full max-w-[1440px] -mt-1">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line-TGK23gwyzHIx6ygx2UalwYMSbLcURq.png"
          alt="Horizontal Line"
          width={1440}
          height={2}
          className="w-full h-auto"
        />
      </div>

      {/* Banner */}
      <div className="w-full max-w-[1344px] h-[478px] my-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-tLYUaPMHi6N0lTK7iqEkX4va2TkemW.png"
          alt="Children with backpacks"
          width={1344}
          height={478}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Introduction */}
      <div className="w-full max-w-[1344px] px-12 mt-8">
        <p className="text-[32px]">
          <span className="font-extrabold" style={{ fontFamily: "var(--font-open-sans)", fontWeight: 800 }}>
            allowMe
          </span>
          , an AI agent that automates allowance distribution based on verified educational, personal development and
          health achievements.
        </p>
      </div>

      {/* What do we do? */}
      <div className="w-full max-w-[1344px] px-12 mt-12">
        <h2 className="text-[32px] mb-2">What do we do?</h2>
        <p className="text-[24px]">
          We integrate the ElizaOS agent framework with GOAT (Great Onchain Agent Toolkit) to create an incentive-driven
          learning ecosystem.
        </p>
      </div>

      {/* Our platform provides */}
      <div className="w-full max-w-[1344px] px-12 mt-12">
        <h2 className="text-[32px] mb-2">Our platform provides:</h2>
        <ul className="text-[24px] list-disc pl-8">
          <li className="mb-2">An agentic AI tutor to help your child fill knowledge gaps.</li>
          <li className="mb-2">
            A way to have AI agent create custom quizzes, learning activities or fitness based tasks for your child and
            assign a reward.
          </li>
          <li className="mb-2">A tutor agent that automatically verifies achievements and distributes funds.</li>
          <li className="mb-2">
            Full oversight while allowing your child financial autonomy in everyday transactions.
          </li>
        </ul>
      </div>

      {/* How does it work? */}
      <div className="w-full max-w-[1344px] px-12 mt-8">
        <h2 className="text-[32px] mb-2">How does it work?</h2>

        {/* Flowchart */}
        <div className="w-full max-w-[1186px] mx-auto">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/full%20flowchart-pu2A6fjDGp7LggIvyIuutEvSeIE7RO.png"
            alt="Flowchart showing the process"
            width={1186}
            height={1114}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Why use allowMe? */}
      <div className="w-full max-w-[1344px] px-12 mt-8">
        <h2 className="text-[32px] mb-2">
          Why use{" "}
          <span className="font-extrabold" style={{ fontFamily: "var(--font-open-sans)", fontWeight: 800 }}>
            allowMe
          </span>
          ?
        </h2>
        <ul className="text-[24px] list-disc pl-8">
          <li className="mb-2">Motivate children to develop valuable skills.</li>
          <li className="mb-2">Control child's digital spending (Robux, gaming, impulse purchases).</li>
          <li className="mb-2">Verify actual educational achievements.</li>
          <li className="mb-2">Balance rewards between learning and personal development.</li>
          <li className="mb-2">Implement consistent, effective reward systems.</li>
          <li className="mb-2">Track progress objectively and ensuring long-term growth.</li>
        </ul>
      </div>

      {/* Benefits of allowMe */}
      <div className="w-full max-w-[1344px] px-12 mt-12 mb-16">
        <h2 className="text-[32px] mb-2">
          Benefits of{" "}
          <span className="font-extrabold" style={{ fontFamily: "var(--font-open-sans)", fontWeight: 800 }}>
            allowMe
          </span>
          :
        </h2>

        <h3 className="text-[24px] mt-4">Tutor Agent – AI-Powered Learning & Assessment</h3>
        <ul className="text-[24px] list-disc pl-8">
          <li className="mb-2">Generates custom quizzes tailored to student needs.</li>
          <li className="mb-2">Identifies learning gaps through smart AI assessment.</li>
          <li className="mb-2">Provides personalized study recommendations.</li>
        </ul>

        <h3 className="text-[24px] mt-4">Parental-Controlled Smart Wallet</h3>
        <ul className="text-[24px] list-disc pl-8">
          <li className="mb-2">
            Unlocks funds only upon task completion (e.g., "Complete a quiz," "Walk 2,000 steps").
          </li>
          <li className="mb-2">Day-to-day financial autonomy for kids while parents monitor larger transactions.</li>
          <li className="mb-2">Blockchain transparency ensures safe and traceable allowance management.</li>
        </ul>
      </div>

      {/* Horizontal Line at the bottom */}
      <div className="w-full max-w-[1440px] mt-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line-TGK23gwyzHIx6ygx2UalwYMSbLcURq.png"
          alt="Horizontal Line"
          width={1440}
          height={2}
          className="w-full h-auto"
        />
      </div>

      {/* Bottom Spacer */}
      <div className="h-4"></div>
    </main>
  )
}

