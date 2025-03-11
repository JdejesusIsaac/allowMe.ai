"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Open_Sans } from "next/font/google"
import MenuOverlay from "@/components/MenuOverlay"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-open-sans",
})

export default function ParentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userParam = params.get("user")
    if (userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam))
        setUser(userData)
        
        // Sync environment variables with user profile
        syncEnvironmentVariables(userData.id);
      } catch (error) {
        console.error("Error parsing user data:", error)
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [router])

  // Function to sync environment variables
  const syncEnvironmentVariables = async (userId: string) => {
    try {
      const response = await fetch('/api/sync-env', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      const data = await response.json();
      if (!data.success) {
        console.error('Failed to sync environment variables:', data.error);
      } else {
        console.log('Successfully synced environment variables');
      }
    } catch (error) {
      console.error('Error syncing environment variables:', error);
    }
  };

  const handleLogout = () => {
    router.push("/")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLogoutOverlay && event.target && !(event.target as Element).closest(".logout-container")) {
        setShowLogoutOverlay(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLogoutOverlay])

  if (!user) {
    return null // or loading state
  }

  return (
    <main className={`min-h-[1300px] w-[1400px] mx-auto bg-white pt-4 ${openSans.className}`}>
      {/* Header */}
      <header className="w-full max-w-[1400px] flex items-end justify-between px-12 pb-4">
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
          <div className="flex items-center mr-4 relative logout-container">
            <div
              className="flex items-center px-4 py-2 bg-white border border-black cursor-pointer"
              onClick={() => setShowLogoutOverlay(!showLogoutOverlay)}
            >
              <span className="text-base font-light" style={{ fontFamily: "var(--font-open-sans)", fontSize: "16px" }}>
                {user.email}
              </span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/expand-9LaWIB5LOatuvlQXOrrTDjoPICxjA4.png"
                alt="Expand"
                width={24}
                height={24}
                className="ml-2"
              />
            </div>
            {showLogoutOverlay && (
              <div className="absolute top-full left-0 w-full bg-[#F2FDFF] border border-[#DFEEF1] flex flex-col">
                <span
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    router.push(`/update-profile?user=${encodeURIComponent(JSON.stringify(user))}`)
                  }}
                  style={{ fontFamily: "var(--font-open-sans)", fontSize: "20px", fontWeight: 400 }}
                >
                  Update Profile
                </span>
                <span
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={handleLogout}
                  style={{ fontFamily: "var(--font-open-sans)", fontSize: "20px", fontWeight: 400 }}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
          <MenuOverlay />
        </div>
      </header>

      {/* Horizontal Line */}
      <div className="w-full max-w-[1400px] -mt-1">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line-TGK23gwyzHIx6ygx2UalwYMSbLcURq.png"
          alt="Horizontal Line"
          width={1400}
          height={2}
          className="w-full h-auto"
        />
      </div>

      {/* Dashboard Content */}
      <div className="px-12 py-8">
        <div>
          <h2 className="text-[32px] font-light mb-2">Parent Dashboard</h2>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/half_line-Fawi51GfjuHp0RojouBrumvsleH9An.png"
            alt="Separator"
            width={375}
            height={2}
            className="mb-6"
          />
          <div className="text-[24px] font-light">
            <p>Launch the AI tutor agent, Angelica, to create an assessment</p>
            <a
              href="https://t.me/angelica_tutor_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[24px] font-light text-black hover:underline"
            >
              https://t.me/angelica_tutor_bot
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

