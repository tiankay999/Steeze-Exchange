"use client";

import React, { useState, useEffect } from "react";
import {
    Copy,
    Check,
    QrCode,
    ChevronDown,
    History,
    Wallet,
    AlertCircle,
    ArrowDownLeft,
} from "lucide-react";

// ---------- TYPES ----------

interface Coin {
    symbol: string;
    name: string;
    iconUrl: string;
    networks: Network[];
}

interface Network {
    id: string;
    name: string;
    address: string;
}

interface DepositRecord {
    id: string;
    date: string;
    coin: string;
    amount: number;
    network: string;
    status: "Completed" | "Pending" | "Failed";
    txHash: string;
}

// ---------- MOCK DATA ----------

const coins: Coin[] = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        iconUrl: "https://placehold.co/32x32/b89738/ffffff?text=B",
        networks: [
            {
                id: "BTC",
                name: "Bitcoin",
                address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
            },
            {
                id: "BEP20",
                name: "BNB Smart Chain (BEP20)",
                address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
            },
        ],
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        iconUrl: "https://placehold.co/32x32/3b82f6/ffffff?text=E",
        networks: [
            {
                id: "ERC20",
                name: "Ethereum (ERC20)",
                address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
            },
            {
                id: "BEP20",
                name: "BNB Smart Chain (BEP20)",
                address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
            },
            {
                id: "ARBITRUM",
                name: "Arbitrum One",
                address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
            },
        ],
    },
    {
        symbol: "USDT",
        name: "Tether",
        iconUrl: "https://placehold.co/32x32/26a17b/ffffff?text=T",
        networks: [
            {
                id: "TRC20",
                name: "Tron (TRC20)",
                address: "TXla1234567890abcdef1234567890abcde",
            },
            {
                id: "ERC20",
                name: "Ethereum (ERC20)",
                address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
            },
            {
                id: "BEP20",
                name: "BNB Smart Chain (BEP20)",
                address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
            },
            {
                id: "SOL",
                name: "Solana",
                address: "SolanaAddress1234567890abcdef1234567890",
            },
        ],
    },
    {
        symbol: "SOL",
        name: "Solana",
        iconUrl: "https://placehold.co/32x32/8b5cf6/ffffff?text=S",
        networks: [
            {
                id: "SOL",
                name: "Solana",
                address: "SolanaAddress1234567890abcdef1234567890",
            },
        ],
    },
];

const mockHistory: DepositRecord[] = [
    {
        id: "1",
        date: "2024-05-20 14:30",
        coin: "USDT",
        amount: 500.0,
        network: "TRC20",
        status: "Completed",
        txHash: "0x123...abc",
    },
    {
        id: "2",
        date: "2024-05-18 09:15",
        coin: "BTC",
        amount: 0.025,
        network: "Bitcoin",
        status: "Completed",
        txHash: "0x456...def",
    },
    {
        id: "3",
        date: "2024-05-15 18:45",
        coin: "ETH",
        amount: 1.5,
        network: "ERC20",
        status: "Pending",
        txHash: "0x789...ghi",
    },
];

// ---------- COMPONENTS ----------

export default function DepositPage() {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(coins[0]);
    const [selectedNetwork, setSelectedNetwork] = useState<Network>(
        coins[0].networks[0]
    );
    const [copied, setCopied] = useState(false);
    const [isCoinOpen, setIsCoinOpen] = useState(false);
    const [isNetworkOpen, setIsNetworkOpen] = useState(false);

    // Reset network when coin changes
    useEffect(() => {
        setSelectedNetwork(selectedCoin.networks[0]);
    }, [selectedCoin]);

    const handleCopy = () => {
        navigator.clipboard.writeText(selectedNetwork.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                    <Wallet className="w-8 h-8 mr-3 text-yellow-600" />
                    Deposit Assets
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: SELECTION & ADDRESS */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 1. Select Coin */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                1. Select Coin
                            </h2>
                            <div className="relative">
                                <button
                                    onClick={() => setIsCoinOpen(!isCoinOpen)}
                                    className="w-full flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-3 transition-colors hover:bg-gray-100"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src={selectedCoin.iconUrl}
                                            alt={selectedCoin.name}
                                            className="w-6 h-6 rounded-full mr-3"
                                        />
                                        <span className="font-medium">
                                            {selectedCoin.symbol}
                                        </span>
                                        <span className="text-gray-500 ml-2">
                                            - {selectedCoin.name}
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 transition-transform ${isCoinOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isCoinOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {coins.map((coin) => (
                                            <div
                                                key={coin.symbol}
                                                className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                                onClick={() => {
                                                    setSelectedCoin(coin);
                                                    setIsCoinOpen(false);
                                                }}
                                            >
                                                <img
                                                    src={coin.iconUrl}
                                                    alt={coin.name}
                                                    className="w-6 h-6 rounded-full mr-3"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">
                                                        {coin.symbol}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {coin.name}
                                                    </span>
                                                </div>
                                                {selectedCoin.symbol === coin.symbol && (
                                                    <Check className="w-4 h-4 text-yellow-600 ml-auto" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Select Network */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                2. Select Network
                            </h2>
                            <div className="relative">
                                <button
                                    onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                                    className="w-full flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-3 transition-colors hover:bg-gray-100"
                                >
                                    <span className="font-medium">
                                        {selectedNetwork.name}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 transition-transform ${isNetworkOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isNetworkOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {selectedCoin.networks.map((network) => (
                                            <div
                                                key={network.id}
                                                className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                                                onClick={() => {
                                                    setSelectedNetwork(network);
                                                    setIsNetworkOpen(false);
                                                }}
                                            >
                                                <span className="font-medium text-gray-900">
                                                    {network.name}
                                                </span>
                                                {selectedNetwork.id === network.id && (
                                                    <Check className="w-4 h-4 text-yellow-600 ml-auto" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 flex items-start p-3 text-sm text-yellow-800 bg-yellow-50 rounded-lg border border-yellow-200">
                                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                <p>
                                    Ensure the network you choose matches the withdrawal
                                    network on the other platform, or assets may be lost.
                                </p>
                            </div>
                        </div>

                        {/* 3. Deposit Address */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                3. Deposit Address
                            </h2>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                {/* QR Code */}
                                <div className="flex-shrink-0 bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded overflow-hidden relative">
                                        {/* Mock QR Code Pattern */}
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:8px_8px]"></div>
                                        <QrCode className="w-16 h-16 text-gray-800 relative z-10" />
                                    </div>
                                    <p className="text-center text-xs text-gray-500 mt-2">
                                        Scan to Deposit
                                    </p>
                                </div>

                                {/* Address Details */}
                                <div className="flex-1 w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <div className="flex items-center">
                                        <div className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg p-3 font-mono break-all">
                                            {selectedNetwork.address}
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-r-lg transition-colors flex items-center justify-center min-w-[100px]"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4 mr-2" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4 mr-2" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-start text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                            <p>
                                                Send only{" "}
                                                <span className="font-bold text-gray-900">
                                                    {selectedCoin.symbol}
                                                </span>{" "}
                                                to this address. Sending any other coin may result
                                                in permanent loss.
                                            </p>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                            <p>
                                                Ensure the network is{" "}
                                                <span className="font-bold text-gray-900">
                                                    {selectedNetwork.name}
                                                </span>
                                                .
                                            </p>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                            <p>
                                                15 network confirmations required.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: RECENT DEPOSITS */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <History className="w-5 h-5 mr-2 text-gray-500" />
                                    Recent Deposits
                                </h2>
                                <a href="#" className="text-sm text-yellow-600 hover:underline">
                                    View All
                                </a>
                            </div>

                            <div className="space-y-4">
                                {mockHistory.map((record) => (
                                    <div
                                        key={record.id}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600">
                                                <ArrowDownLeft className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {record.coin}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {record.date}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-gray-900">
                                                +{record.amount}
                                            </div>
                                            <div
                                                className={`text-xs font-medium ${record.status === "Completed"
                                                        ? "text-green-600"
                                                        : record.status === "Pending"
                                                            ? "text-yellow-600"
                                                            : "text-red-600"
                                                    }`}
                                            >
                                                {record.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {mockHistory.length === 0 && (
                                    <div className="text-center py-8 text-gray-500 text-sm">
                                        No recent deposits found.
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                                    Need Help?
                                </h3>
                                <p className="text-xs text-blue-800 mb-3">
                                    If you deposited assets but they haven't arrived after network confirmations, please contact support.
                                </p>
                                <button className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
