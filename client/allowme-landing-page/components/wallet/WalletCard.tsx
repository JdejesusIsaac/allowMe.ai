// components/wallet/WalletCard.tsx
"use client";

import React, { memo, useEffect } from 'react';
import { useWalletState } from './useWalletState';
import { useWallet } from "@crossmint/client-sdk-react-ui";

/**
 * Helper function to truncate wallet addresses
 */
function truncateAddress(address: string, start = 6, end = 4): string {
  if (!address) return '';
  const truncatedStart = address.slice(0, start);
  const truncatedEnd = address.slice(-end);
  return `${truncatedStart}...${truncatedEnd}`;
}

/**
 * Component that displays wallet information in a card format
 */
const WalletCard = memo(() => {
  // Get state from our custom hook
  const { 
    isAuthenticated, 
    address, 
    balances, 
    isLoading, 
    copyToClipboard, 
    isCopied,
    logout,
    walletStatus
  } = useWalletState();
  
  // Also get the direct wallet from Crossmint SDK as a backup
  const { wallet: crossmintWallet } = useWallet();
  
  // Use the address from either our hook or directly from the SDK
  const displayAddress = address || crossmintWallet?.address || '';

  // Add detailed logging to debug the wallet address
  useEffect(() => {
    console.log('WalletCard mounted');
    console.log('Address from hook:', address);
    console.log('Address from Crossmint SDK:', crossmintWallet?.address);
    console.log('Display address:', displayAddress);
    console.log('Wallet status:', walletStatus);
    console.log('Is authenticated:', isAuthenticated);
  }, [address, crossmintWallet, displayAddress, walletStatus, isAuthenticated]);

  // If not authenticated, render nothing
  if (!isAuthenticated) {
    return null;
  }
  
  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="bg-white backdrop-blur-sm bg-opacity-80 p-6 rounded-xl shadow-lg border border-indigo-100 w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
        <p className="text-center text-indigo-600">Loading wallet information...</p>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur-sm bg-opacity-80 p-6 rounded-xl shadow-lg border border-indigo-100 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-indigo-900">Smart Wallet</h3>
            <p className="text-sm text-indigo-600">Polygon Amoy Testnet</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Disconnect
        </button>
      </div>
      
      {/* Wallet Address Section */}
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
            {displayAddress ? truncateAddress(displayAddress) : 'No address available'}
          </code>
          <button 
            onClick={() => displayAddress && copyToClipboard(displayAddress)}
            className="p-2 text-indigo-600 hover:text-indigo-800 rounded-md hover:bg-indigo-50 transition-colors"
            aria-label={isCopied ? "Copied!" : "Copy address"}
            title={isCopied ? "Copied!" : "Copy address"}
            disabled={!displayAddress}
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
        {!displayAddress && (
          <div className="mt-2 text-xs text-amber-600 text-center">
            Wallet address not available. This may be due to an initialization issue.
          </div>
        )}
        {isCopied && (
          <div className="mt-2 text-xs text-green-600 text-center">
            Address copied to clipboard!
          </div>
        )}
      </div>
      
      {/* Token Balances Section */}
      <h4 className="text-sm font-semibold text-indigo-800 mb-2">Assets</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {balances.length > 0 ? (
          balances.map((asset) => (
            <div key={asset.symbol} className="bg-white p-4 rounded-lg border border-indigo-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 mb-1">{asset.name}</p>
                  <p className="text-xl font-bold text-indigo-900">{asset.balance} {asset.symbol}</p>
                </div>
                <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-sm">{asset.symbol}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">No assets found in this wallet</p>
          </div>
        )}
      </div>
      
      {/* Wallet Features Section */}
      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
        <div className="flex items-center gap-2 text-indigo-700 mb-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="font-medium">Smart Wallet Features</p>
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
            Bank-grade security
          </li>
          <li className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Google OAuth authentication
          </li>
          <li className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Seamless reward management
          </li>
        </ul>
      </div>
    </div>
  );
});

WalletCard.displayName = 'WalletCard';

export default WalletCard;