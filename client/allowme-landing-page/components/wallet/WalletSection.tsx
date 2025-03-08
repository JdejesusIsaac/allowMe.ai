"use client";

import { useAuth, useWallet } from "@crossmint/client-sdk-react-ui";
import { WalletSignInButton } from "./WalletSignInButton";
import WalletCard from "./WalletCard";
import Image from "next/image";
import { useState, useEffect } from "react";

export function WalletSection() {
  const { jwt, logout } = useAuth();
  const { wallet, status: walletStatus } = useWallet();
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if authenticated
  const isAuthenticated = jwt != null;

  // Add debugging for component mount and auth state
  useEffect(() => {
    console.log("WalletSection mounted");
    console.log("Authentication status:", isAuthenticated ? "Authenticated" : "Not authenticated");
    console.log("Wallet status:", walletStatus);
    console.log("Wallet address:", wallet?.address);
  }, [isAuthenticated, walletStatus, wallet]);

  useEffect(() => {
    // Check if API key is properly configured
    const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY;
    const hasValidApiKey = apiKey && apiKey.length > 10;
    setIsApiConfigured(!!hasValidApiKey);
    
    if (!hasValidApiKey) {
      console.error('Crossmint API key missing or invalid. Check your .env.local file.');
      setError('Wallet configuration error. Please check the console for details.');
    }
  }, []);

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // If API key not configured, show a message to the admin
  if (!isApiConfigured) {
    return (
      <div className="w-full max-w-[1344px] px-12 mt-16 py-16 bg-blue-light rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Smart Wallet Integration</h2>
          <p className="text-lg text-body-text max-w-2xl mx-auto">
            allowMe uses Web3 technology to seamlessly manage your child's rewards.
            Create a wallet in seconds with just your Google account - no complicated setups required.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-xl">
          <h3 className="text-xl font-semibold text-red-500 mb-2">⚠️ Configuration Required</h3>
          <p className="text-gray-700 mb-4">
            Please configure your Crossmint API key in the <code>.env.local</code> file to enable wallet functionality.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-16 py-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-100">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 7h-1V6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1H3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM6 6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1H6V6zm14 12H4v-6h16v6zm0-8H4V9h16v1z"/>
          </svg>
          <h2 className="text-3xl font-bold text-indigo-900">Smart Wallet</h2>
        </div>
        <p className="text-indigo-700 max-w-2xl mx-auto">
          Securely manage digital assets with blockchain technology.
          No seed phrases, gas fees, or complicated setup required.
        </p>
        
        {error && (
          <div className="mt-4 mx-auto max-w-md bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            <div className="font-semibold mb-1">Error:</div>
            <div>{error}</div>
            <div className="mt-3 text-xs text-red-600">
              If you're a developer, check the browser console for detailed logs.
              <br />
              Make sure the Crossmint API key is properly configured in .env.local
            </div>
          </div>
        )}
      </div>

      {isAuthenticated ? (
        <>
          <WalletCard />
          
          {/* Developer note - only visible in development mode */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-2xl mx-auto">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Developer Notes</h4>
              <p className="text-xs text-gray-600">
                Wallet information:
              </p>
              <ul className="text-xs text-gray-600 list-disc pl-5 mt-1">
                <li>Wallet status: {walletStatus}</li>
                <li>Wallet exists: {wallet ? 'Yes' : 'No'}</li>
                <li>Wallet address: {wallet?.address || 'Not available'}</li>
                <li>JWT exists: {jwt ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white backdrop-blur-sm bg-opacity-80 p-8 rounded-xl shadow-lg mx-auto max-w-2xl border border-indigo-100">
          <div className="text-center mb-8">
            <div className="bg-indigo-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Connect Your Smart Wallet</h3>
            <p className="text-indigo-700 mb-6 max-w-md mx-auto">
              Sign in with your Google account to create a secure non-custodial smart wallet in seconds.
            </p>
          </div>

          <WalletSignInButton />

          <div className="mt-8 border-t border-indigo-100 pt-6">
            <h4 className="text-sm font-semibold text-indigo-800 mb-2">Key Benefits</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span className="text-gray-700">No seed phrases to remember</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span className="text-gray-700">No gas fees to pay</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span className="text-gray-700">Secure management of rewards</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span className="text-gray-700">Bank-grade security standards</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 
