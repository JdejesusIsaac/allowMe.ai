import { NextResponse } from "next/server"
import storage from "@/lib/storage"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Received profile update request:", body)

    const {
      parentName,
      studentName,
      school,
      grade,
      parentTelegram,
      studentTelegram,
      parentWallet,
      studentWallet,
      openaiKey,
      telegramToken,
      evmKey,
      parentEmail,
    } = body

    if (!parentEmail) {
      return NextResponse.json({ error: "Parent email is required" }, { status: 400 })
    }

    const user = await storage.getUserByEmail(parentEmail)

    if (!user) {
      console.error("User not found for email:", parentEmail)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const profileData = {
      userId: user.id,
      parentName,
      studentName,
      school,
      grade,
      parentTelegram,
      studentTelegram,
      parentWallet,
      studentWallet,
      openaiKey,
      telegramToken,
      evmKey,
      isCompleted: true,
    }

    let profile = await storage.getProfileByUserId(user.id)
    if (profile) {
      profile = await storage.updateProfile(user.id, profileData)
    } else {
      profile = await storage.createProfile(profileData)
    }

    if (!profile) {
      console.error("Failed to create/update profile for user:", user.id)
      return NextResponse.json({ error: "Failed to create/update profile" }, { status: 500 })
    }

    console.log("Profile updated successfully:", profile)
    return NextResponse.json({ success: true, user: { ...user, profile } })
  } catch (error) {
    console.error("Error creating/updating profile:", error)
    return NextResponse.json({ error: "Failed to create/update profile" }, { status: 500 })
  }
}

