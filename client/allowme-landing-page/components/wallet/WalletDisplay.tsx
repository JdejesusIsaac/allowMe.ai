"use client";

import { useAuth, useWallet } from "@crossmint/client-sdk-react-ui";
import { useState } from "react";

export function WalletDisplay() {
  const { logout } = useAuth();
  const { wallet, status: walletStatus } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (walletStatus !== "loaded" || !wallet) {
    return null;
  }

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 rounded-md border border-gray-200 transition-colors"
      >
        <span className="font-mono text-sm">{truncateAddress(wallet.address)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
            }}
          >
            View Assets
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              logout();
              setIsMenuOpen(false);
            }}
          >
            Sign Out
          </a>
        </div>
      )}
    </div>
  );
} 