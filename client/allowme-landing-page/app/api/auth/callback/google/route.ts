import { NextResponse } from "next/server"
import storage from "@/lib/storage"

export async function GET(request: Request) {
  console.log("Google OAuth Callback initiated")
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  console.log("Received code:", code)
  console.log("Received error:", error)

  if (error) {
    console.error("Error during Google OAuth:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=${error}`)
  }

  if (!code) {
    console.error("No authorization code received")
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=NoAuthorizationCode`)
  }

  try {
    console.log("Attempting to exchange code for token")
    console.log("NEXT_PUBLIC_GOOGLE_CLIENT_ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
    console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set")
    console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL)

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    })

    const tokenData = await tokenResponse.json()
    console.log("Token response:", tokenData)

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error || "Failed to fetch access token")
    }

    console.log("Successfully obtained access token")

    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    const userData = await userInfoResponse.json()
    console.log("User data:", userData)

    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user data")
    }

    console.log("Successfully fetched user data")

    // Store or update user information in the in-memory storage
    let user = await storage.getUserByEmail(userData.email)
    if (!user) {
      user = await storage.createUser({
        name: userData.name,
        email: userData.email,
        image: userData.picture,
        emailVerified: new Date(),
      })
    }

    console.log("User stored in storage:", user)

    // Check if the user has a completed profile
    const profile = await storage.getProfileByUserId(user.id)
    if (profile && profile.isCompleted) {
      // Update .env file with profile data
      try {
        if (profile.openaiKey || profile.telegramToken || profile.evmKey || profile.walletRpc) {
          const envVarsToUpdate: Record<string, string> = {};
          
          if (profile.openaiKey) {
            envVarsToUpdate["OPENAI_API_KEY"] = profile.openaiKey;
          }
          
          if (profile.telegramToken) {
            envVarsToUpdate["TELEGRAM_BOT_TOKEN"] = profile.telegramToken;
          }
          
          if (profile.evmKey) {
            envVarsToUpdate["EVM_PRIVATE_KEY"] = profile.evmKey;
          }
          
          if (profile.walletRpc) {
            envVarsToUpdate["EVM_PROVIDER_URL"] = profile.walletRpc;
          }
          
          if (Object.keys(envVarsToUpdate).length > 0) {
            console.log("Updating .env file with user profile data");
            const { updateEnvFile } = await import('@/lib/update-env');
            await updateEnvFile(envVarsToUpdate);
          }
        }
      } catch (error) {
        console.error("Error updating .env file during sign-in:", error);
        // Continue with sign-in despite error
      }
      
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/parent-dashboard?user=${encodeURIComponent(JSON.stringify(user))}`,
      )
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/create-profile?user=${encodeURIComponent(JSON.stringify(user))}`,
      )
    }
  } catch (error) {
    console.error("Error in Google OAuth flow:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/?error=AuthenticationFailed`)
  }
}

