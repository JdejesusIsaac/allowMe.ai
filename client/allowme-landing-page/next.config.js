const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
  },
  env: {
    // Map React-style env vars to Next.js env vars
    REACT_APP_CROSSMINT_API_KEY_STG: process.env.REACT_APP_CROSSMINT_API_KEY_STG,
    REACT_APP_CROSSMINT_API_KEY_PROD: process.env.REACT_APP_CROSSMINT_API_KEY_PROD,
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
  },
}

module.exports = nextConfig

