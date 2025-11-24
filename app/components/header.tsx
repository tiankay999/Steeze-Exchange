"use client";
import React, { useState, useEffect } from "react";
import {
    Eye,
    EyeOff,
    Wallet,
    Bell,
    User,
    ChevronDown,
    ArrowDownLeft,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function Header() {
    const [showBalance, setShowBalance] = useState(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalBalance, setTotalBalance] = useState(0);


    useEffect(() => {
        const FetchBalance = async () => {
            try {
                const res = await fetch("http://localhost:5007/balance", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch balance");
                }


                const data = await res.json();

                setShowBalance(data.showBalance);
                // Assuming the API returns a balance field
                if (data.balance !== undefined) {
                    setTotalBalance(data.balance);
                }

            } catch (e: any) {
                console.log(e);
                setError(true);
            } finally {
                setLoading(false)
            }
        }
        FetchBalance()
    }, [])









    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 md:px-6 py-3">
                {/* Left: Logo/Brand */}
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
                                    {showBalance
                                        ? `$${totalBalance.toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}`
                                        : "********"}
                                </p>
                                <span className="text-xs text-gray-500">USDT</span>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="text-gray-400 hover:text-gray-600 ml-2"
                                >
                                    {showBalance ? (
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
                        <Link
                            href="/deposit"
                            className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            <ArrowDownLeft className="w-4 h-4" />
                            <span>Deposit</span>
                        </Link>
                        <Link
                            href="/withdraw"
                            className="flex items-center space-x-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Withdraw</span>
                        </Link>
                        <Link
                            href="/wallets"
                            className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            <Wallet className="w-4 h-4" />
                            <span>Wallets</span>
                        </Link>
                    </div>
                </div>

                {/* Right: User Menu */}
                <div className="flex items-center space-x-3">
                    {/* Notifications */}
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile */}
                    <Link
                        href="/profile"
                        className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors group"
                    >
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
                                {showBalance
                                    ? `$${totalBalance.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}`
                                    : "********"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        {showBalance ? (
                            <Eye className="w-4 h-4" />
                        ) : (
                            <EyeOff className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
