"use client"

import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function MenuPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu_icon-xfAZBduF0Jq0eQ0KmFiYlW2qY7tNG0.png"
            alt="Menu"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[410px] h-[513px] bg-[#F2FDFF] border-[#DFEEF1] p-0">
        <div className="relative flex flex-col h-full">
          {/* Close button */}
          <div className="absolute right-4 top-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/close_icon-a0jzO0MFQm5tqVw3n2YTMSCbRc7Exv.png"
              alt="Close"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-4xl font-light">
            <Link href="/about" className="hover:opacity-80">
              About Us
            </Link>
            <Link href="/faqs" className="hover:opacity-80">
              FAQs
            </Link>
            <Link href="/contact" className="hover:opacity-80">
              Contact Us
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-8 mb-12">
            <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/telegram_icon-wqY0x3wLfyiPHjfOPFQmUuagixgVTc.png"
                alt="Telegram"
                width={48}
                height={48}
                className="w-12 h-12 hover:opacity-80"
              />
            </Link>
            <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/discord_icon-PcMyFh2Kr7KNSbLJJkR8EFqEqXgfGp.png"
                alt="Discord"
                width={48}
                height={48}
                className="w-12 h-12 hover:opacity-80"
              />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instagram_icon-lxXvfm3HY4KXaGjBTqQJzvdKy86dTu.png"
                alt="Instagram"
                width={48}
                height={48}
                className="w-12 h-12 hover:opacity-80"
              />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

