"use client";
import { API_BASE_URL } from "../utils/api";
import React, { useState, useEffect } from "react";
import {
    Eye,
    EyeOff,
    Wallet,
    Bell,
    ChevronDown,
    ArrowDownLeft,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function Header() {
    // 1. SEPARATE THE STATE
    const [balance, setBalance] = useState<string | number>("0.00"); // Stores the money
    const [isVisible, setIsVisible] = useState(true); // Stores the toggle state (true/false)
    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const FetchBalance = async () => {
            setLoading(true);
            setError(null);

            try {
                // 2. CHECK TOKEN BEFORE FETCHING
                const token = localStorage.getItem("token");
                
                if (!token) {
                    console.warn("No token found in localStorage");
                    // Optional: Redirect to login here if strict
                    setLoading(false);
                    return; 
                }

                const res = await fetch(`${API_BASE_URL}/check-balance`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // Ensure token format is correct
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
                    throw new Error(errorData.message || `Error: ${res.status}`);
                }

                const data = await res.json();
                console.log("Balance data:", data);

                // 3. SET BALANCE CORRECTLY
                if (data.balance !== undefined) {
                    setBalance(data.balance);
                } else {
                   // Fallback if API structure is different
                   console.warn("API did not return a 'balance' field", data);
                }

            } catch (e) {
                console.error("Fetch error:", e);
                setError(e instanceof Error ? e.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        FetchBalance();
    }, []);

    // Helper to render the balance based on visibility
    const renderBalance = () => {
        if (loading) return "Loading...";
        if (isVisible) return balance;
        return "****";
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 relative">
                {/* Left: Logo */}
                <div className="flex items-center space-x-2">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-900 italic">
                        Steeze<span className="text-yellow-600">.</span>
                    </h1>
                </div>

                {/* Center: Balance Display */}
                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                        <Wallet className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500 font-medium">
                                Estimated Balance
                            </p>
                            <div className="flex items-center space-x-2">
                                <p className="text-lg font-bold text-gray-900">
                                    {/* 4. USE THE HELPER FUNCTION */}
                                    {renderBalance()}
                                </p>
                                <span className="text-xs text-gray-500">USDT</span>
                                <button
                                    onClick={() => setIsVisible(!isVisible)}
                                    className="text-gray-400 hover:text-gray-600 ml-2"
                                >
                                    {isVisible ? (
                                        <Eye className="w-4 h-4" />
                                    ) : (
                                        <EyeOff className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="hidden lg:flex items-center space-x-2">
                        <Link href="/deposit" className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors">
                            <ArrowDownLeft className="w-4 h-4" />
                            <span>Deposit</span>
                        </Link>
                        <Link href="/withdraw" className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Withdraw</span>
                        </Link>
                        <Link href="/wallets" className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition-colors">
                            <Wallet className="w-4 h-4" />
                            <span>Wallets</span>
                        </Link>
                    </div>
                </div>

                {/* Error Message Display */}
                {error && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg">
                        <p className="font-bold text-sm">Connection Error:</p>
                        <p className="text-sm">{error}</p>
                        <button onClick={() => window.location.reload()} className="text-xs underline mt-1">Reload Page</button>
                    </div>
                )}

                {/* Right: User Menu */}
                <div className="flex items-center space-x-3">
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <Link href="/profile" className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold text-sm">
                            EP
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 hidden md:block" />
                    </Link>
                </div>
            </div>

            {/* Mobile Balance Display */}
            <div className="md:hidden px-4 pb-3">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <div className="flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-gray-500" />
                        <div>
                            <p className="text-xs text-gray-500">Balance</p>
                            <p className="text-sm font-bold text-gray-900">
                                {renderBalance()}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </header>
    );
}