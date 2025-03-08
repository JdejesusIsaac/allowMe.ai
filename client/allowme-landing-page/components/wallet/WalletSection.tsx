"use client";

import { useAuth, useWallet } from "@crossmint/client-sdk-react-ui";
import { WalletSignInButton } from "./WalletSignInButton";
import Image from "next/image";
import { useState, useEffect } from "react";

export function WalletSection() {
  const { jwt, logout } = useAuth();
  const { wallet, status: walletStatus } = useWallet();
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Check if API key is properly configured
    const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY;
    const hasValidApiKey = apiKey && !apiKey.includes('<YOUR_API_KEY>');
    setIsApiConfigured(!!hasValidApiKey);
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
    <div className="w-full max-w-[1344px] px-12 mt-16 py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-indigo-100">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 7h-1V6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1H3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM6 6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1H6V6zm14 12H4v-6h16v6zm0-8H4V9h16v1z"/>
          </svg>
          <h2 className="text-3xl font-bold text-indigo-900">Web3 Wallet</h2>
        </div>
        <p className="text-indigo-700 max-w-2xl mx-auto">
          Securely manage digital assets with blockchain technology.
          No seed phrases, gas fees, or complicated setup required.
        </p>
      </div>

      {jwt != null ? (
        // Connected wallet UI - Enhanced with web3 elements
        <div className="bg-white backdrop-blur-sm bg-opacity-80 p-8 rounded-xl shadow-lg mx-auto max-w-2xl border border-indigo-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900">Connected</h3>
                <p className="text-sm text-indigo-600">Polygon Amoy Testnet</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50"
            >
              Disconnect
            </button>
          </div>
          
          {walletStatus === "loaded" && wallet ? (
            <>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border border-indigo-100 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-indigo-700">Wallet Address</p>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-sm text-indigo-900 font-mono bg-white py-1.5 px-3 rounded border border-indigo-100">
                    {truncateAddress(wallet.address)}
                  </code>
                  <button 
                    onClick={() => wallet.address && copyToClipboard(wallet.address)}
                    className="p-2 text-indigo-600 hover:text-indigo-800 rounded-md hover:bg-indigo-50"
                  >
                    {isCopied ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <p className="text-sm text-indigo-600 mb-1">Balance</p>
                  <p className="text-xl font-bold text-indigo-900">0.00 USDC</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                  <p className="text-sm text-indigo-600 mb-1">Collectibles</p>
                  <p className="text-xl font-bold text-indigo-900">0 NFTs</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-700 mb-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="font-medium">Web3 Wallet Features</p>
                </div>
                <ul className="text-sm text-indigo-700 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Gasless transactions
                  </li>
                  <li className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Multi-chain support
                  </li>
                  <li className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Bank-grade security (SOC2 T-II compliant)
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex justify-center p-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}
        </div>
      ) : (
        // Not connected wallet UI - Enhanced with web3 elements
        <div className="bg-white backdrop-blur-sm bg-opacity-80 p-8 rounded-xl shadow-lg mx-auto max-w-2xl border border-indigo-100">
          <div className="text-center mb-8">
            <div className="bg-indigo-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Connect Your Web3 Wallet</h3>
            <p className="text-indigo-700 mb-6 max-w-md mx-auto">
              Sign in with your Google account to create a secure non-custodial smart wallet in seconds.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <WalletSignInButton />
            </div>
            
            <div className="flex items-center justify-center text-xs text-indigo-400 mt-4">
              <span className="px-3 py-1 rounded-full bg-indigo-50 flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Secured by Crossmint
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <p className="font-medium text-indigo-900">Web2 Login</p>
                </div>
                <p className="text-sm text-indigo-700">No seed phrases or private keys to remember</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <p className="font-medium text-indigo-900">Gasless</p>
                </div>
                <p className="text-sm text-indigo-700">No transaction fees or crypto needed to get started</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-6">
        <p className="text-xs text-indigo-400 flex items-center justify-center gap-1">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Polygon Amoy Testnet • Bank-grade security • SOC2 Type II compliant
        </p>
      </div>
    </div>
  );
} 