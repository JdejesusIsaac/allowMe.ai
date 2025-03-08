"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import { CrossmintAuthProvider, CrossmintProvider } from "@crossmint/client-sdk-react-ui";

export function Providers({ children }: { children: ReactNode }) {
    // Create a stable QueryClient instance
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
                staleTime: 1000 * 60 * 5, // 5 minutes
            },
        },
    }));
    
    // For debugging: log the API key status (but not the actual key)
    const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? "";
    const isServerKey = apiKey.startsWith("sk_");
    
    // Log API key info for debugging
    useEffect(() => {
        console.log("Crossmint API key configured:", !!apiKey && apiKey.length > 10);
        console.log("Crossmint API key type:", isServerKey ? "Server key" : "Client key");
        console.log("Crossmint API key environment:", apiKey.includes("staging") ? "Staging" : "Production");
        
        // For Amoy testnet, it's recommended to use a staging key
        if (!apiKey.includes("staging") && !isServerKey) {
            console.warn("Warning: Using Polygon Amoy testnet typically requires a staging API key");
        }
    }, [apiKey, isServerKey]);

    return (
        <QueryClientProvider client={queryClient}>
            <CrossmintProvider apiKey={apiKey}>
                <CrossmintAuthProvider
                    embeddedWallets={{
                        createOnLogin: "all-users",
                        type: "evm-smart-wallet",
                        defaultChain: "polygon-amoy", // Ensure this matches exactly
                    }}
                    appearance={{
                        borderRadius: "16px",
                        colors: {
                            inputBackground: "#FAF5EC",
                            buttonBackground: "#E9E3D8",
                            border: "#835911",
                            background: "#FAF5EC",
                            textPrimary: "#704130",
                            textSecondary: "#835911",
                            danger: "#ff3333",
                            accent: "#602C1B",
                        },
                    }}
                    loginMethods={["google", "email"]}
                >
                    {children}
                </CrossmintAuthProvider>
            </CrossmintProvider>
        </QueryClientProvider>
    );
}


