"use client";

import { useAuth, useWallet } from "@crossmint/client-sdk-react-ui";
import { useState, useEffect } from "react";

export function WalletSignInButton() {
  const { login, jwt } = useAuth();
  const { status, wallet } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [stuckProcessing, setStuckProcessing] = useState(false);
  
  const isLoading = status === "in-progress";
  const isAuthenticated = jwt != null;

  // Add debug logging on component mount and changes
  useEffect(() => {
    console.log("WalletSignInButton - Status:", status);
    console.log("WalletSignInButton - JWT exists:", !!jwt);
    console.log("WalletSignInButton - Wallet exists:", !!wallet);
    console.log("WalletSignInButton - Wallet address:", wallet?.address);
  }, [status, jwt, wallet]);

  // Handle stuck processing state
  useEffect(() => {
    let stuckTimer: NodeJS.Timeout | null = null;
    
    if (isLoading && buttonClicked) {
      // Set a timer to detect if processing gets stuck
      stuckTimer = setTimeout(() => {
        console.warn("Wallet login appears to be stuck in processing state");
        setStuckProcessing(true);
      }, 15000); // 15 seconds timeout
    } else {
      setStuckProcessing(false);
    }
    
    return () => {
      if (stuckTimer) clearTimeout(stuckTimer);
    };
  }, [isLoading, buttonClicked]);

  const handleLogin = async () => {
    try {
      setError(null);
      setButtonClicked(true);
      setStuckProcessing(false);
      console.log("Starting Crossmint login process");
      
      await login();
      console.log("Login function completed");
    } catch (err) {
      console.error("Crossmint login error:", err);
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  };

  const handleCancel = () => {
    setButtonClicked(false);
    setStuckProcessing(false);
    window.location.reload();
  };

  // Already authenticated, don't show the button
  if (isAuthenticated) {
    return null;
  }

  // Showing loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <button 
          className="w-full bg-gray-200 text-gray-500 rounded-md px-4 py-3 font-medium flex items-center justify-center"
          disabled
        >
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating wallet...
        </button>
        
        {stuckProcessing && (
          <div className="mt-4 text-center">
            <p className="text-amber-700 text-sm mb-2">
              This is taking longer than expected. The login popup may be blocked or there might be a connection issue.
            </p>
            <button 
              onClick={handleCancel}
              className="text-red-600 text-sm font-medium hover:text-red-800"
            >
              Cancel and try again
            </button>
          </div>
        )}
      </div>
    );
  }

  // Normal button state
  return (
    <div className="w-full">
      <button 
        onClick={handleLogin}
        className="w-full bg-[#2563eb] text-white rounded-md px-4 py-3 font-medium hover:bg-[#1d4ed8] transition-colors flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2" fill="#FFFFFF">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Create Wallet with Google
      </button>
      
      {error && (
        <div className="mt-3 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Add troubleshooting info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Having trouble signing in?</h4>
        <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
          <li>Make sure pop-ups are allowed in your browser</li>
          <li>Try using Chrome or Firefox if you're on a different browser</li>
          <li>Check that you're not blocking third-party cookies</li>
          <li>Ensure you have a stable internet connection</li>
          <li>If problems persist, try clearing your browser cache</li>
        </ul>
      </div>
    </div>
  );
} 