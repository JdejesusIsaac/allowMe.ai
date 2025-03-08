// lib/wallet/useWalletState.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth, useWallet } from "@crossmint/client-sdk-react-ui";

export type WalletTransaction = {
  id: string;
  date: Date;
  amount: string;
  type: 'in' | 'out';
  status: 'pending' | 'completed' | 'failed';
  description?: string;
}

export type AssetType = {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  usdValue?: number;
}

export interface WalletState {
  isAuthenticated: boolean;
  isConfigured: boolean;
  isLoading: boolean;
  error: string | null;
  address: string | null;
  balances: AssetType[];
  recentTransactions: WalletTransaction[];
  login: () => void;
  logout: () => void;
  copyToClipboard: (text: string) => void;
  isCopied: boolean;
  walletStatus: string;
}

/**
 * Custom hook to manage wallet state and actions
 */
export function useWalletState(): WalletState {
  const { login, logout, jwt } = useAuth();
  const { wallet, status: walletStatus } = useWallet();
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  
  // Debug the wallet and authentication state
  useEffect(() => {
    console.log("Auth JWT exists:", !!jwt);
    console.log("Wallet status:", walletStatus);
    console.log("Wallet exists:", !!wallet);
    if (wallet) {
      console.log("Wallet address:", wallet.address);
    }
  }, [jwt, wallet, walletStatus]);
  
  // Mock data - in real app, you'd fetch this from the API
  const balances: AssetType[] = [
    { symbol: 'USDC', name: 'USD Coin', balance: '0.00', decimals: 6 },
    { symbol: 'MATIC', name: 'Polygon', balance: '0.00', decimals: 18 }
  ];
  
  const recentTransactions: WalletTransaction[] = [];

  useEffect(() => {
    // Check if API key is properly configured
    const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY;
    // Server-side keys are valid for this use case
    const hasValidApiKey = apiKey && apiKey.length > 10;
    setIsConfigured(!!hasValidApiKey);
    
    // Log API key type for debugging (without revealing the key)
    if (apiKey) {
      console.log("API key type:", apiKey.startsWith("sk_") ? "Server key" : "Client key");
      console.log("API key environment:", apiKey.includes("staging") ? "Staging" : "Production");
    }
    
    if (!hasValidApiKey) {
      console.error('Crossmint API key missing or invalid. Check your .env.local file.');
      setError('Wallet configuration error. Please check the console for details.');
    }
  }, []);

  useEffect(() => {
    // Handle wallet status changes with more detailed logging
    console.log("Wallet status changed to:", walletStatus);
    
    if (walletStatus === 'loading-error') {
      console.error('Wallet loading error. Status:', walletStatus);
      setError('Failed to load wallet information. Please try again later.');
    } else if (walletStatus === 'loaded' && !wallet) {
      console.error('Wallet loaded but no wallet object available.');
      setError('Wallet loaded but no wallet data available.');
    } else if (walletStatus === 'loaded' && wallet) {
      console.log('Wallet successfully loaded:', wallet);
      console.log('Wallet address:', wallet.address);
      if (!wallet.address) {
        console.error('Wallet loaded but address is missing or empty.');
      }
      setError(null);
    }
  }, [walletStatus, wallet]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Failed to copy:', err);
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, []);

  const handleLogin = useCallback(() => {
    if (!isConfigured) {
      setError('Wallet functionality is not properly configured.');
      return;
    }
    console.log('Attempting login...');
    login();
  }, [isConfigured, login]);

  // For direct debugging access to wallet address
  const walletAddress = wallet?.address || null;
  if (walletAddress) {
    console.log("Current wallet address:", walletAddress);
  }

  return {
    isAuthenticated: jwt != null,
    isConfigured,
    isLoading: walletStatus === 'in-progress' || walletStatus === 'not-loaded',
    error,
    address: walletAddress,
    balances,
    recentTransactions,
    login: handleLogin,
    logout,
    copyToClipboard,
    isCopied,
    walletStatus
  };
}