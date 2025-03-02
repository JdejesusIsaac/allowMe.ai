"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const MenuOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuIconRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleOverlay = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button ref={menuIconRef} onClick={toggleOverlay}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu_icon-xfAZBduF0Jq0eQ0KmFiYlW2qY7tNG0.png"
          alt="Menu"
          width={40}
          height={40}
          className="w-10 h-10"
        />
      </button>
      {isOpen && (
        <div
          ref={overlayRef}
          className="absolute top-0 right-0 w-[410px] h-[513px] bg-[#F2FDFF] border border-[#DFEEF1]"
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="flex flex-col h-full p-8">
            <button className="absolute top-0 right-0 p-2" onClick={() => setIsOpen(false)}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/close_icon-CnjCgYdkmH2IsAAm4lwOe6B78W2yR6.png"
                alt="Close"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </button>
            <nav className="flex flex-col items-end mt-16 space-y-6 flex-grow">
              <a href="#" className="text-[40px] font-normal">
                About Us
              </a>
              <a href="#" className="text-[40px] font-normal">
                FAQs
              </a>
              <a href="#" className="text-[40px] font-normal">
                Contact Us
              </a>
            </nav>
            <div className="flex justify-end space-x-4 mt-auto">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/telegram_icon-lMwCJfxEOaLiDR7UDAjWcZKSffN6xi.png"
                  alt="Telegram"
                  width={48}
                  height={48}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/discord_icon-JyymgFqCFqKm4XJa9mhuBRHeI7BZsa.png"
                  alt="Discord"
                  width={48}
                  height={48}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instagram_icon-la5c3F6vm4jBJidaQUA647wzwMBjQU.png"
                  alt="Instagram"
                  width={48}
                  height={48}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuOverlay

