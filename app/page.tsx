"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, BarChart2, Shield, Globe, BarChart2Icon, BarChart4Icon, LucideBarChartHorizontal, ShieldPlusIcon } from "lucide-react";
import { GlobalLayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

//my fetch API 
const fetchMarkets = async () => {
    try {

        const response = await fetch(
            "https://api.binance.com/api/v3/ticker/24hr?symbols=%5B%22BTCUSDT%22,%22ETHUSDT%22,%22SOLUSDT%22,%22BNBUSDT%22%5D"
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return []; // this one returns an empty Array incase of error//
    }
};




const previewMarkets = [
    {
        symbol: "BTCUSDT",
        name: "Bitcoin",
        price: 94750.23,
        change: 1.25,
        icon: "https://placehold.co/32x32/b89738/ffffff?text=B",
    },
    {
        symbol: "ETHUSDT",
        name: "Ethereum",
        price: 3890.78,
        change: 0.92,
        icon: "https://placehold.co/32x32/3b82f6/ffffff?text=E",
    },
    {
        symbol: "SOLUSDT",
        name: "Solana",
        price: 165.45,
        change: -0.55,
        icon: "https://placehold.co/32x32/8b5cf6/ffffff?text=S",
    },
    {
        symbol: "BNBUSDT",
        name: "BNB",
        price: 605.11,
        change: 3.1,
        icon: "https://placehold.co/32x32/f59e0b/ffffff?text=N",
    },
];

export default function LandingPage() {

    const [marketData, setMarketData] = React.useState<any[]>(previewMarkets);

    React.useEffect(() => {
        const fetchMarketsData = async () => {
            const data = await fetchMarkets();
            setMarketData(data);
        };
        fetchMarketsData();
    }, []);




    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
                                STEEZE
                            </span>
                        </div>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
                                onClick={(e) => e.preventDefault()}
                            >
                                Markets
                            </Link>
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
                                onClick={(e) => e.preventDefault()}
                            >
                                Exchange
                            </Link>
                            <Link
                                href="/signup"
                                className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
                                onClick={(e) => e.preventDefault()}
                            >
                                Learn
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                            Trade Crypto with{" "}
                            <span className="text-yellow-500">Steeze</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                            Access live market prices, secure wallets, and instant deposits.
                            Experience the modern dashboard built for effortless digital asset
                            management.
                        </p>
                        <div className="flex justify-center flex-col sm:flex-row gap-4 mb-20">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-yellow-500 hover:bg-yellow-400 md:text-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Start Trading Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 md:text-lg shadow-sm transition-all"
                            >
                                View Markets
                            </Link>
                        </div>

                        {/* Market Preview Cards  the prices and shi*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                            {marketData.map((data: any, index: number) => {
                                // Find static info (icon, name) from previewMarkets
                                const staticInfo = previewMarkets.find(p => p.symbol === data.symbol) ;

                                // Prioritize API data, fallback to static/preview data
                                const displayPrice = data.lastPrice || data.price;
                                const displayChange = data.priceChangePercent || data.change;
                                const displayName = staticInfo?.name || data.symbol;
                                const displayIcon = staticInfo?.icon || "https://placehold.co/32x32/gray/white?text=C";

                                return (
                                    <div
                                        key={data.symbol || index}
                                        className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex items-center space-x-3 mb-3">
                                            <img
                                                src={displayIcon}
                                                alt={displayName}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>
                                                <div className="font-bold text-gray-900">
                                                    {data.symbol}
                                                </div>
                                                <div className="text-xs text-gray-500">{displayName}</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="text-lg font-bold text-gray-900">
                                                ${Number(displayPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                            <div
                                                className={`text-sm font-semibold ${Number(displayChange) >= 0 ? "text-green-600" : "text-red-600"
                                                    }`}
                                            >
                                                {Number(displayChange) >= 0 ? "+" : ""}
                                                {Number(displayChange).toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-20 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                            <div className="p-6 rounded-2xl bg-gray-50">
                                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BarChart2Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    Real-Time Charts
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Real-time data and professional charting tools to help you make
                                    informed trading decisions.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldPlusIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    Secure Wallet
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Bank-grade security for your digital assets. Your funds are
                                    protected with state-of-the-art encryption.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    Global Access
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Trade from anywhere in the world with our globally distributed
                                    and compliant platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <span className="text-2xl font-bold text-yellow-500">
                                STEEZE
                            </span>
                            <p className="text-gray-400 text-sm mt-1">
                                © 2024 Steeze Exchange. All rights reserved.
                            </p>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <Link href="#" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                Support
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

