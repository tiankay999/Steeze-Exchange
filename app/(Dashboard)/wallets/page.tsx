"use client";

import React from "react";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCw,
    Search,
    Eye,
    EyeOff,
} from "lucide-react";
import Link from "next/link";

// ---------- TYPES ----------

interface Asset {
    symbol: string;
    name: string;
    iconUrl: string;
    balance: number;
    price: number;
    change24h: number;
}

// ---------- MOCK DATA ----------

const assets: Asset[] = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        iconUrl: "https://placehold.co/32x32/b89738/ffffff?text=B",
        balance: 0.4521,
        price: 68750.23,
        change24h: 1.25,
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        iconUrl: "https://placehold.co/32x32/3b82f6/ffffff?text=E",
        balance: 12.5,
        price: 3890.78,
        change24h: 0.92,
    },
    {
        symbol: "USDT",
        name: "Tether",
        iconUrl: "https://placehold.co/32x32/26a17b/ffffff?text=T",
        balance: 5430.25,
        price: 1.0,
        change24h: 0.01,
    },
    {
        symbol: "SOL",
        name: "Solana",
        iconUrl: "https://placehold.co/32x32/8b5cf6/ffffff?text=S",
        balance: 145.8,
        price: 165.45,
        change24h: -0.55,
    },
    {
        symbol: "BNB",
        name: "BNB",
        iconUrl: "https://placehold.co/32x32/f59e0b/ffffff?text=N",
        balance: 5.2,
        price: 605.11,
        change24h: 3.1,
    },
    {
        symbol: "XRP",
        name: "Ripple",
        iconUrl: "https://placehold.co/32x32/4b5563/ffffff?text=X",
        balance: 1500.0,
        price: 0.5212,
        change24h: -1.22,
    },
];

export default function WalletsPage() {
    const [showBalance, setShowBalance] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");

    const totalBalanceUSDT = assets.reduce(
        (acc, asset) => acc + asset.balance * asset.price,
        0
    );

    const filteredAssets = assets.filter(
        (asset) =>
            asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header & Total Balance */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                            <Wallet className="w-8 h-8 mr-3 text-yellow-600" />
                            My Wallets
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage your assets and check your balances.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 min-w-[280px]">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500 font-medium">
                                Estimated Balance
                            </span>
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
                        <div className="text-2xl font-bold text-gray-900">
                            {showBalance
                                ? `$${totalBalanceUSDT.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}`
                                : "********"}
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                USDT
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/deposit"
                        className="flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-colors font-semibold"
                    >
                        <ArrowDownLeft className="w-5 h-5 mr-2" />
                        Deposit
                    </Link>
                    <Link
                        href="/withdraw"
                        className="flex items-center justify-center p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-colors font-semibold"
                    >
                        <ArrowUpRight className="w-5 h-5 mr-2" />
                        Withdraw
                    </Link>
                    <Link
                        href="/home"
                        className="flex items-center justify-center p-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl shadow-sm transition-colors font-semibold"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Trade
                    </Link>
                </div>

                {/* Assets List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-semibold text-gray-900">Assets</h2>
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search coin..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-3 py-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Asset
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Balance
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Value (USDT)
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssets.map((asset) => (
                                    <tr
                                        key={asset.symbol}
                                        className="bg-white border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                                            <img
                                                src={asset.iconUrl}
                                                alt={asset.name}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-bold">{asset.symbol}</span>
                                                <span className="text-xs text-gray-500 font-normal">
                                                    {asset.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-medium text-gray-900">
                                                {showBalance ? asset.balance : "****"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-medium text-gray-900">
                                                {showBalance
                                                    ? (asset.balance * asset.price).toLocaleString(
                                                        "en-US",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )
                                                    : "****"}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {asset.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link
                                                    href="/deposit"
                                                    className="text-green-600 hover:text-green-800 font-medium text-xs hover:underline"
                                                >
                                                    Deposit
                                                </Link>
                                                <span className="text-gray-300">|</span>
                                                <Link
                                                    href="/withdraw"
                                                    className="text-red-600 hover:text-red-800 font-medium text-xs hover:underline"
                                                >
                                                    Withdraw
                                                </Link>
                                                <span className="text-gray-300">|</span>
                                                <Link
                                                    href="/home"
                                                    className="text-yellow-600 hover:text-yellow-800 font-medium text-xs hover:underline"
                                                >
                                                    Trade
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAssets.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            No assets found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
