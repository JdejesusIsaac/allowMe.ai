// app/page.tsx
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Montserrat, Open_Sans, Inter } from "next/font/google"
import MenuOverlay from "@/components/MenuOverlay"
import GoogleSignIn from "@/components/GoogleSignIn"
import BenefitCard from "@/components/ui/BenefitCard"
import TestimonialCard from "@/components/ui/TestimonialCard"
import FAQAccordion from "@/components/ui/FAQAccordion"
import HowItWorksStep from "@/components/ui/HowItWorksStep"
import { WalletSection } from "@/components/wallet/WalletSection"

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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
})

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [signInError, setSignInError] = useState<string | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      setIsHeaderVisible(false)
    } else {
      setIsHeaderVisible(true)
    }
    setLastScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleGoogleSignInSuccess = (response: any) => {
    console.log("Google Sign-In successful", response)
    setUser({ name: response.name, email: response.email })
    setSignInError(null)
  }

  const handleGoogleSignInFailure = (error: Error) => {
    console.error("Google Sign-In failed", error)
    setSignInError(error.message)
  }

  const benefits = [
    {
      title: "Smart AI Tutor",
      description: "Personalized learning assistant that identifies knowledge gaps and adapts to your child's learning style.",
      icon: "/icons/tutor-icon.svg"
    },
    {
      title: "Customized Challenges",
      description: "Age-appropriate quizzes, learning activities, and fitness tasks that make learning fun and engaging.",
      icon: "/icons/challenge-icon.svg"
    },
    {
      title: "Automatic Verification",
      description: "Secure achievement verification that ensures rewards are earned through genuine accomplishments.",
      icon: "/icons/verify-icon.svg"
    },
    {
      title: "Smart Wallet Control",
      description: "Give your child financial autonomy while maintaining oversight of larger transactions.",
      icon: "/icons/wallet-icon.svg"
    }
  ]

  const testimonials = [
    {
      quote: "My son is actually excited about math now! The reward system has transformed his attitude toward learning.",
      author: "Jessica P., Parent of 9-year-old",
      avatarUrl: "/testimonials/parent1.jpg"
    },
    {
      quote: "I love earning crypto for completing my assignments. It's like getting paid to learn!",
      author: "Ethan K., 12-year-old student",
      avatarUrl: "/testimonials/student1.jpg"
    },
    {
      quote: "As a busy parent, I appreciate how allowMe automates verification of my daughter's achievements.",
      author: "Michael T., Parent of 14-year-old",
      avatarUrl: "/testimonials/parent2.jpg"
    }
  ]

  const faqItems = [
    {
      question: "How does allowMe verify my child's educational achievements?",
      answer: "Our AI tutor creates custom assessments and quizzes based on your child's grade level and learning goals. The system automatically verifies completion and understanding through interactive challenges, eliminating the need for manual verification."
    },
    {
      question: "Is my child's data secure?",
      answer: "Yes. We use end-to-end encryption and follow strict data privacy protocols. Your child's educational data is never shared with third parties and is only used to personalize their learning experience."
    },
    {
      question: "How do the crypto payments work?",
      answer: "allowMe uses secure blockchain technology to automatically transfer small amounts of cryptocurrency to your child's wallet upon verified achievement completion. You set the reward amounts and can establish limits on spending."
    },
    {
      question: "What age range is allowMe suitable for?",
      answer: "allowMe is designed for children ages 8-17. The platform adapts content difficulty and UI based on your child's age and ability level."
    }
  ]

  const howItWorksSteps = [
    {
      number: 1,
      title: "Create Profiles",
      description: "Set up parent and student profiles with your educational goals and preferences."
    },
    {
      number: 2,
      title: "Connect Wallets",
      description: "Link secure digital wallets for both parent and student to enable rewards."
    },
    {
      number: 3,
      title: "Set Learning Goals",
      description: "Work with our AI tutor to establish personalized learning objectives."
    },
    {
      number: 4,
      title: "Complete Challenges",
      description: "Student completes AI-generated quizzes and educational activities."
    },
    {
      number: 5,
      title: "Earn Rewards",
      description: "Upon verification, rewards are automatically transferred to student wallet."
    }
  ]

  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-white ${openSans.variable} ${montserrat.variable} ${inter.variable} font-sans ${openSans.className} font-light pt-4`}
    >
      {/* Header */}
      <header className={`w-full max-w-[1440px] flex items-center justify-between px-12 py-4 transition-all duration-300 ${isHeaderVisible ? 'opacity-100' : 'opacity-0 -translate-y-10'} sticky top-0 z-50 bg-white`}>
        <div className="flex items-center">
          <div className="w-20 h-20 mr-4 flex items-center justify-center">
            <Image
              src="/images/brain-chip-logo.svg"
              alt="allowMe Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
          <h1
            className="text-[80px] font-extrabold leading-none"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 800 }}
          >
            allowMe
          </h1>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center mr-4 px-4 py-2 bg-white border border-black">
              <span className="text-base">{user.email}</span>
              <Image
                src="/placeholder.svg"
                alt="Expand"
                width={24}
                height={24}
                className="ml-2"
              />
            </div>
          ) : (
            <div className="flex items-center">
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
                  Get allowMe
                </button>
              </GoogleSignIn>
            </div>
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
        <div className="w-full h-[2px] bg-gray-200"></div>
      </div>

      {/* Hero Section */}
      <div className="w-full max-w-[1344px] h-[478px] my-8 relative overflow-hidden rounded-xl bg-soft-yellow flex items-center justify-center">
        <Image
          src="/placeholder.jpg"
          alt="Children with backpacks"
          width={1344}
          height={478}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-soft-yellow/60 flex flex-col items-center justify-center p-8">
          <h2 className="text-5xl font-bold mb-4 text-center text-gray-900">Empower Your Child's Learning Journey</h2>
          <p className="text-xl max-w-2xl text-center mb-8 text-gray-800">Automate allowance distribution based on verified educational and personal development achievements</p>
          <GoogleSignIn onSuccess={handleGoogleSignInSuccess} onFailure={handleGoogleSignInFailure}>
            <button className="bg-[#4F46E5] text-white rounded-md px-8 py-4 font-semibold hover:bg-[#4338CA] transition-colors text-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                <path
                  fill="#FFFFFF"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#FFFFFF"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FFFFFF"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#FFFFFF"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Get Started Today
            </button>
          </GoogleSignIn>
        </div>
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

      {/* Benefits Section */}
      <div className="w-full max-w-[1344px] px-12 mt-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Why Choose allowMe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard 
            title="Motivate Learning" 
            description="Encourage your child to develop valuable skills through incentivized learning" 
            icon="/placeholder-logo.svg" 
          />
          <BenefitCard 
            title="Control Digital Spending" 
            description="Manage your child's digital purchases like gaming and impulse buying" 
            icon="/placeholder-logo.svg" 
          />
          <BenefitCard 
            title="Verify Achievements" 
            description="Automatically confirm educational milestones before releasing funds" 
            icon="/placeholder-logo.svg" 
          />
          <BenefitCard 
            title="Balance Development" 
            description="Ensure rewards are distributed across learning and personal growth" 
            icon="/placeholder-logo.svg" 
          />
          <BenefitCard 
            title="Consistent Rewards" 
            description="Implement effective and fair reward systems that work consistently" 
            icon="/placeholder-logo.svg" 
          />
          <BenefitCard 
            title="Track Progress" 
            description="Monitor development objectively to ensure long-term growth" 
            icon="/placeholder-logo.svg" 
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-[1344px] px-12 mt-16 bg-gray-50 py-16 rounded-xl">
        <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
        <div className="flex flex-col space-y-8">
          <HowItWorksStep 
            number={1} 
            title="Create Parent Account" 
            description="Set up your profile and connect your payment method" 
          />
          <HowItWorksStep 
            number={2} 
            title="Set Learning Goals" 
            description="Define educational objectives and personal development milestones" 
          />
          <HowItWorksStep 
            number={3} 
            title="AI Tutor Assistance" 
            description="Our AI tutor creates custom quizzes and helps your child learn" 
          />
          <HowItWorksStep 
            number={4} 
            title="Verify Achievements" 
            description="System automatically verifies when goals are accomplished" 
          />
          <HowItWorksStep 
            number={5} 
            title="Release Allowance" 
            description="Funds are distributed to your child's wallet upon completion" 
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-[1344px] px-12 mt-16 py-16 bg-[#f3f4f6] rounded-xl">
        <h2 className="text-3xl font-bold mb-10 text-center">What Parents Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="My daughter is much more motivated to study since we started using allowMe. The verification system makes sure she's actually learning." 
            author="Sarah Johnson"
            avatarUrl="/placeholder-user.jpg" 
          />
          <TestimonialCard 
            quote="The AI tutor has been incredible at identifying my son's learning gaps and helping him improve in those areas." 
            author="Michael Chen"
            avatarUrl="/placeholder-user.jpg" 
          />
          <TestimonialCard 
            quote="I love how the app balances learning with physical activity goals. My kids are exercising more and studying better!" 
            author="Jessica Williams"
            avatarUrl="/placeholder-user.jpg" 
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-[1344px] px-12 mt-16 mb-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQAccordion 
            question="How does allowMe verify my child's learning achievements?" 
            answer="Our AI system creates custom quizzes and learning activities based on educational objectives. It then evaluates your child's performance to verify that learning goals have been met before releasing funds." 
          />
          <FAQAccordion 
            question="Is my child's data secure?" 
            answer="Yes, we take data privacy seriously. All educational data and financial information is encrypted and we never share your child's information with third parties without your explicit consent." 
          />
          <FAQAccordion 
            question="What payment methods can I use?" 
            answer="allowMe supports all major credit cards, debit cards, and digital payment services like PayPal and Apple Pay. Funds are securely transferred to your child's digital wallet." 
          />
          <FAQAccordion 
            question="Can I set different goals for different children?" 
            answer="Absolutely! Each child can have their own personalized learning plan with custom goals, rewards, and difficulty levels appropriate for their age and abilities." 
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="w-full max-w-[1344px] px-12 mt-16 py-16 bg-[#dbeafe] rounded-xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Simple, Transparent Pricing</h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">Choose the plan that's right for your family and start empowering your child's education journey today.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col h-full transform transition-transform hover:scale-105">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">Perfect for families just getting started</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>1 child account</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Basic AI tutoring</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Weekly learning activities</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Automated allowance payments</span>
              </li>
            </ul>
            <GoogleSignIn onSuccess={handleGoogleSignInSuccess} onFailure={handleGoogleSignInFailure}>
              <button className="w-full bg-[#4F46E5] text-white rounded-md px-4 py-3 font-medium hover:bg-[#4338CA] transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2">
                  <path
                    fill="#FFFFFF"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Get Started
              </button>
            </GoogleSignIn>
          </div>
          
          {/* Premium Plan - Highlighted */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full border-2 border-[#4F46E5] relative transform transition-transform hover:scale-105">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#4F46E5] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-600 mb-4">Best value for growing families</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Up to 3 child accounts</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Advanced AI tutoring</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Daily learning activities</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Personalized learning paths</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Parent dashboard with insights</span>
              </li>
            </ul>
            <GoogleSignIn onSuccess={handleGoogleSignInSuccess} onFailure={handleGoogleSignInFailure}>
              <button className="w-full bg-[#4F46E5] text-white rounded-md px-4 py-3 font-medium hover:bg-[#4338CA] transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2">
                  <path
                    fill="#FFFFFF"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Get Premium
              </button>
            </GoogleSignIn>
          </div>
          
          {/* Family Plan */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col h-full transform transition-transform hover:scale-105">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Family</h3>
              <p className="text-gray-600 mb-4">For larger families with multiple children</p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Unlimited child accounts</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Premium AI tutoring</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Unlimited learning activities</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Advanced performance analytics</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Priority support</span>
              </li>
            </ul>
            <GoogleSignIn onSuccess={handleGoogleSignInSuccess} onFailure={handleGoogleSignInFailure}>
              <button className="w-full bg-[#4F46E5] text-white rounded-md px-4 py-3 font-medium hover:bg-[#4338CA] transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2">
                  <path
                    fill="#FFFFFF"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Get Family Plan
              </button>
            </GoogleSignIn>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </div>

      {/* Wallet Section */}
      <WalletSection />

      {/* Call to Action */}
      <div className="w-full max-w-[1344px] px-12 mt-8 mb-16 bg-[#4F46E5] py-16 rounded-xl text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Child's Learning Experience?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of parents who are motivating their children through smart, verified allowance distribution.</p>
        <button className="bg-white text-[#4F46E5] rounded-md px-8 py-4 font-semibold hover:bg-gray-100 transition-colors text-lg">
          Get Started Free
        </button>
      </div>

      {/* Horizontal Line at the bottom */}
      <div className="w-full max-w-[1440px] mt-4">
        <div className="w-full h-[2px] bg-gray-200"></div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#111827] text-white py-12">
        <div className="max-w-[1440px] mx-auto px-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-8 md:mb-0">
            <div className="w-12 h-12 bg-white rounded-md mr-3 overflow-hidden p-1 flex items-center justify-center">
              <Image
                src="/images/brain-chip-logo.svg"
                alt="allowMe Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold font-inter">allowMe</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
            <div className="flex flex-col space-y-3">
              <h3 className="font-semibold text-lg mb-2">Product</h3>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            </div>
            <div className="flex flex-col space-y-3">
              <h3 className="font-semibold text-lg mb-2">Company</h3>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a>
            </div>
            <div className="flex flex-col space-y-3">
              <h3 className="font-semibold text-lg mb-2">Legal</h3>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-12 pt-8 mt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2023 allowMe. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}










