"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Open_Sans } from "next/font/google"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import MenuOverlay from "@/components/MenuOverlay"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-open-sans",
})

export default function CreateProfile() {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    school: "",
    grade: "",
    parentTelegram: "",
    studentTelegram: "",
    parentWallet: "",
    studentWallet: "",
    openaiKey: "",
    telegramToken: "",
    evmKey: "",
    parentEmail: "",
    walletRpc: "",
    
  })

  const [showParentWallet, setShowParentWallet] = useState(false)
  const [showStudentWallet, setShowStudentWallet] = useState(false)
  const [showOpenaiKey, setShowOpenaiKey] = useState(false)
  const [showTelegramToken, setShowTelegramToken] = useState(false)
  const [showEvmKey, setShowEvmKey] = useState(false)
  const [showWalletRpc, setShowWalletRpc] = useState(false)
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userParam = params.get("user")
    if (userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam))
        setFormData((prevData) => ({
          ...prevData,
          parentName: userData.name || "",
          parentEmail: userData.email || "",
        }))
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const inputStyle =
    "w-[375px] h-[48px] px-4 bg-white border border-[#E5E7EB] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-none"
  const inputWithEyeStyle =
    "w-[375px] h-[48px] px-4 pr-10 bg-white border border-[#E5E7EB] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-none"
  const getLinkStyle = "text-[#4F46E5] text-sm ml-4 whitespace-nowrap"

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

  const handleSubmit = useCallback(async () => {
    console.log("Submitting form data:", formData)
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          console.log("Profile created successfully:", result)
          router.push(`/parent-dashboard?user=${encodeURIComponent(JSON.stringify(result.user))}`)
        } else {
          console.error("Failed to create profile:", result.error)
          alert("Failed to create profile. Please try again.")
          setIsConfirmed(false)
        }
      } else {
        const errorData = await response.json()
        console.error("Failed to create profile:", errorData.error)
        alert("Failed to create profile. Please try again.")
        setIsConfirmed(false)
      }
    } catch (error) {
      console.error("Error creating profile:", error)
      alert("An error occurred. Please try again.")
      setIsConfirmed(false)
    }
  }, [formData, router])

  useEffect(() => {
    if (isConfirmed) {
      handleSubmit()
    }
  }, [isConfirmed, handleSubmit])

  // ... (rest of the component code remains the same)

  return (
    <main className={`min-h-[1400px] w-[1440px] mx-auto bg-white pt-4 ${openSans.className}`}>
      {/* ... (header and other UI elements remain the same) */}

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
          <div className="flex items-center mr-4 relative logout-container">
            <div
              className="flex items-center px-4 py-2 bg-white border border-black cursor-pointer"
              onClick={() => setShowLogoutOverlay(!showLogoutOverlay)}
            >
              <span className="text-base font-light" style={{ fontFamily: "var(--font-open-sans)", fontSize: "16px" }}>
                {formData.parentEmail}
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
              <div
                className="absolute top-full left-0 w-full bg-[#F2FDFF] border border-[#DFEEF1] flex items-center justify-end cursor-pointer"
                onClick={handleLogout}
              >
                <span
                  className="py-2 px-4"
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
      <div className="w-full max-w-[1440px] -mt-1">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/line-AfcdH4uMmlPvGxv8AhlvmQCBBYfq4B.png"
          alt="Horizontal Line"
          width={1440}
          height={2}
          className="w-full h-auto"
        />
      </div>

      <div className="px-12 py-8">
        <div>
          {/* Section 1: Create your profile */}
          <div className="mb-12">
            <h2 className="text-[32px] font-light mb-2">1. Update your profile</h2>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/half_line-79R9DhGkFQSBU8BXdsYJ6EXd8YiEDO.png"
              alt="Separator"
              width={375}
              height={2}
              className="mb-4"
            />
            <p className="text-[24px] font-light mb-6">Enter basic information below</p>
            <div className="flex flex-col gap-6">
              <div>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Student's name"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="grade"
                  placeholder="Grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Enter wallet information */}
          <div className="mb-12">
            <h2 className="text-[32px] font-light mb-2">2. Enter wallet information</h2>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/half_line-79R9DhGkFQSBU8BXdsYJ6EXd8YiEDO.png"
              alt="Separator"
              width={375}
              height={2}
              className="mb-4"
            />
            <p className="text-[24px] font-light mb-6">
              Enter your and your student's crypto wallet addresses to send and receive funds
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type={showParentWallet ? "text" : "password"}
                    name="parentWallet"
                    placeholder="Parent's Wallet Public Address"
                    value={formData.parentWallet}
                    onChange={handleInputChange}
                    className={inputWithEyeStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowParentWallet(!showParentWallet)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showParentWallet ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <button type="button" className={getLinkStyle}>
                  Get address
                </button>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type={showStudentWallet ? "text" : "password"}
                    name="studentWallet"
                    placeholder="Student's Wallet Public Address"
                    value={formData.studentWallet}
                    onChange={handleInputChange}
                    className={inputWithEyeStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowStudentWallet(!showStudentWallet)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showStudentWallet ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <button type="button" className={getLinkStyle}>
                  Get address
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Enter API Keys */}
          <div className="mb-12">
            <h2 className="text-[32px] font-light mb-2">3. Enter API Keys to deploy your AI tutor agent</h2>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/half_line-79R9DhGkFQSBU8BXdsYJ6EXd8YiEDO.png"
              alt="Separator"
              width={375}
              height={2}
              className="mb-4"
            />
            <p className="text-[24px] font-light mb-6">
              Enter following API keys for your agent to access ChatGPT, Claude, Telegram, Wallets and so on
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type={showOpenaiKey ? "text" : "password"}
                    name="openaiKey"
                    placeholder="OPENAI_API_KEY"
                    value={formData.openaiKey}
                    onChange={handleInputChange}
                    className={inputWithEyeStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showOpenaiKey ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <button type="button" className={getLinkStyle}>
                  Get OPENAI_API_KEY
                </button>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type={showTelegramToken ? "text" : "password"}
                    name="telegramToken"
                    placeholder="TELEGRAM_BOT_TOKEN"
                    value={formData.telegramToken}
                    onChange={handleInputChange}
                    className={inputWithEyeStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowTelegramToken(!showTelegramToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showTelegramToken ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <button type="button" className={getLinkStyle}>
                  Get TELEGRAM_BOT_TOKEN
                </button>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type={showEvmKey ? "text" : "password"}
                    name="evmKey"
                    placeholder="EVM_PRIVATE_KEY"
                    value={formData.evmKey}
                    onChange={handleInputChange}
                    className={inputWithEyeStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowEvmKey(!showEvmKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showEvmKey ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <button type="button" className={getLinkStyle}>
                  Get EVM_PRIVATE_KEY
                </button>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type={showWalletRpc ? "text" : "password"}
                    name="walletRpc"
                    placeholder="WALLET_RPC_URL"
                    value={formData.walletRpc}
                    onChange={handleInputChange}
                    className={inputWithEyeStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowWalletRpc(!showWalletRpc)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showWalletRpc ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                <button type="button" className={getLinkStyle}>
                  Get WALLET_RPC_URL
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Confirm details */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-[32px] font-light">4. Confirm your details</h2>
            <button
              type="button"
              onClick={() => {
                if (!isConfirmed) {
                  const allFieldsFilled = Object.values(formData).every((field) => field !== "")
                  if (allFieldsFilled) {
                    setIsConfirmed(true)
                  } else {
                    alert("Please fill in all fields before confirming.")
                  }
                } else {
                  setIsConfirmed(false)
                }
              }}
              className={`w-[64px] h-[32px] rounded-full p-1 transition-colors duration-200 ease-in-out ${
                isConfirmed ? "bg-[#4F46E5]" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  isConfirmed ? "translate-x-8" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

