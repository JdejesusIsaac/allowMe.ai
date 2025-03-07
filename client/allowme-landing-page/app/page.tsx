// app/page.tsx
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Montserrat, Open_Sans } from "next/font/google"
import MenuOverlay from "@/components/MenuOverlay"
import GoogleSignIn from "@/components/GoogleSignIn"
import BenefitCard from "@/components/ui/BenefitCard"
import TestimonialCard from "@/components/ui/TestimonialCard"
import FAQAccordion from "@/components/ui/FAQAccordion"
import HowItWorksStep from "@/components/ui/HowItWorksStep"

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
      className={`flex min-h-screen flex-col items-center bg-white ${openSans.variable} ${montserrat.variable} font-sans ${openSans.className} font-light pt-4`}
    >
      {/* Header */}
      <header className={`w-full max-w-[1440px] flex items-center justify-between px-12 py-4 transition-all duration-300 ${isHeaderVisible ? 'opacity-100' : 'opacity-0 -translate-y-10'} sticky top-0 z-50 bg-white`}>
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-200 mr-4">
            <Image
              src="/placeholder-logo.png"
              alt="allowMe Logo"
              width={80}
              height={80}
              className="w-full h-full object-cover"
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
                src="/placeholder.svg"
                alt="Expand"
                width={24}
                height={24}
                className="ml-2"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <button className="bg-[#4F46E5] text-white rounded-md px-6 py-3 mr-4 font-medium hover:bg-[#4338CA] transition-colors">
                Get allowMe
              </button>
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
      <div className="w-full max-w-[1344px] h-[478px] my-8 relative overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        <Image
          src="/placeholder.jpg"
          alt="Children with backpacks"
          width={1344}
          height={478}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-5xl font-bold mb-4 text-center">Empower Your Child's Learning Journey</h2>
          <p className="text-xl max-w-2xl text-center mb-8">Automate allowance distribution based on verified educational and personal development achievements</p>
          <button className="bg-[#4F46E5] text-white rounded-md px-8 py-4 font-semibold hover:bg-[#4338CA] transition-colors text-lg">
            Get Started Today
          </button>
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
      <div className="w-full max-w-[1344px] px-12 mt-16">
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
      <footer className="w-full max-w-[1440px] px-12 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 bg-gray-200 mr-2">
            <Image
              src="/placeholder-logo.png"
              alt="allowMe Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold">allowMe</span>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-[#4F46E5]">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-[#4F46E5]">Terms</a>
          <a href="#" className="text-gray-600 hover:text-[#4F46E5]">Contact</a>
        </div>
        <div className="mt-4 md:mt-0 text-gray-500 text-sm">
          © 2023 allowMe. All rights reserved.
        </div>
      </footer>
    </main>
  )
}










