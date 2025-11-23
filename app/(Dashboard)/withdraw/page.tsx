"use client";

import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    History,
    Wallet,
    AlertCircle,
    ArrowUpRight,
    Check,
    Info,
} from "lucide-react";

// ---------- TYPES ----------

interface Coin {
    symbol: string;
    name: string;
    iconUrl: string;
    balance: number;
    networks: Network[];
}

interface Network {
    id: string;
    name: string;
    fee: number;
    minWithdraw: number;
}

interface WithdrawalRecord {
    id: string;
    date: string;
    coin: string;
    amount: number;
    network: string;
    status: "Completed" | "Pending" | "Failed";
    address: string;
}

// ---------- MOCK DATA ----------

const coins: Coin[] = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        iconUrl: "https://placehold.co/32x32/b89738/ffffff?text=B",
        balance: 0.4521,
        networks: [
            {
                id: "BTC",
                name: "Bitcoin",
                fee: 0.0005,
                minWithdraw: 0.001,
            },
            {
                id: "BEP20",
                name: "BNB Smart Chain (BEP20)",
                fee: 0.00005,
                minWithdraw: 0.0001,
            },
        ],
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        iconUrl: "https://placehold.co/32x32/3b82f6/ffffff?text=E",
        balance: 12.5,
        networks: [
            {
                id: "ERC20",
                name: "Ethereum (ERC20)",
                fee: 0.005,
                minWithdraw: 0.01,
            },
            {
                id: "BEP20",
                name: "BNB Smart Chain (BEP20)",
                fee: 0.0002,
                minWithdraw: 0.001,
            },
            {
                id: "ARBITRUM",
                name: "Arbitrum One",
                fee: 0.0001,
                minWithdraw: 0.001,
            },
        ],
    },
    {
        symbol: "USDT",
        name: "Tether",
        iconUrl: "https://placehold.co/32x32/26a17b/ffffff?text=T",
        balance: 5430.25,
        networks: [
            {
                id: "TRC20",
                name: "Tron (TRC20)",
                fee: 1.0,
                minWithdraw: 10.0,
            },
            {
                id: "ERC20",
                name: "Ethereum (ERC20)",
                fee: 15.0,
                minWithdraw: 20.0,
            },
            {
                id: "BEP20",
                name: "BNB Smart Chain (BEP20)",
                fee: 0.29,
                minWithdraw: 1.0,
            },
            {
                id: "SOL",
                name: "Solana",
                fee: 1.0,
                minWithdraw: 1.0,
            },
        ],
    },
    {
        symbol: "SOL",
        name: "Solana",
        iconUrl: "https://placehold.co/32x32/8b5cf6/ffffff?text=S",
        balance: 145.8,
        networks: [
            {
                id: "SOL",
                name: "Solana",
                fee: 0.01,
                minWithdraw: 0.1,
            },
        ],
    },
];

const mockHistory: WithdrawalRecord[] = [
    {
        id: "1",
        date: "2024-05-21 10:15",
        coin: "USDT",
        amount: 200.0,
        network: "TRC20",
        status: "Pending",
        address: "TXla123...abc",
    },
    {
        id: "2",
        date: "2024-05-19 16:40",
        coin: "ETH",
        amount: 0.5,
        network: "ERC20",
        status: "Completed",
        address: "0x71C...76F",
    },
    {
        id: "3",
        date: "2024-05-10 09:20",
        coin: "BTC",
        amount: 0.01,
        network: "Bitcoin",
        status: "Completed",
        address: "1A1z...Na",
    },
];

// ---------- COMPONENTS ----------

export default function WithdrawPage() {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(coins[0]);
    const [selectedNetwork, setSelectedNetwork] = useState<Network>(
        coins[0].networks[0]
    );
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [isCoinOpen, setIsCoinOpen] = useState(false);
    const [isNetworkOpen, setIsNetworkOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset network and inputs when coin changes
    useEffect(() => {
        setSelectedNetwork(selectedCoin.networks[0]);
        setAmount("");
        setAddress("");
    }, [selectedCoin]);

    const handleMax = () => {
        // Simple max calculation: balance - fee (if balance > fee)
        const maxAmount = Math.max(
            0,
            selectedCoin.balance - selectedNetwork.fee
        );
        setAmount(maxAmount.toString());
    };

    const handleSubmit = () => {
        if (!address || !amount) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert(`Withdrawal of ${amount} ${selectedCoin.symbol} initiated!`);
            setAmount("");
            setAddress("");
        }, 1500);
    };

    const numericAmount = parseFloat(amount) || 0;
    const totalReceive = Math.max(0, numericAmount - selectedNetwork.fee);
    const isAmountValid =
        numericAmount >= selectedNetwork.minWithdraw &&
        numericAmount <= selectedCoin.balance;

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                    <Wallet className="w-8 h-8 mr-3 text-yellow-600" />
                    Withdraw Assets
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: WITHDRAWAL FORM */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            {/* 1. Select Coin */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Coin
                                </label>
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
                                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Network
                                </label>
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
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">
                                                            {network.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            Fee: {network.fee} {selectedCoin.symbol}
                                                        </span>
                                                    </div>
                                                    {selectedNetwork.id === network.id && (
                                                        <Check className="w-4 h-4 text-yellow-600 ml-auto" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 3. Address & Amount */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Withdrawal Address
                                    </label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder={`Enter ${selectedCoin.symbol} Address`}
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-3"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Amount
                                        </label>
                                        <div className="text-xs text-gray-500">
                                            Available:{" "}
                                            <span className="font-medium text-gray-900">
                                                {selectedCoin.balance} {selectedCoin.symbol}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder={`Min ${selectedNetwork.minWithdraw}`}
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-3 pr-20"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span className="text-gray-500 text-sm mr-2">
                                                {selectedCoin.symbol}
                                            </span>
                                            <button
                                                onClick={handleMax}
                                                className="text-xs font-bold text-yellow-600 hover:text-yellow-700 uppercase"
                                            >
                                                Max
                                            </button>
                                        </div>
                                    </div>
                                    {amount && !isAmountValid && (
                                        <p className="mt-1 text-xs text-red-600">
                                            Amount must be between {selectedNetwork.minWithdraw}{" "}
                                            and {selectedCoin.balance}
                                        </p>
                                    )}
                                </div>

                                {/* Summary */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Network Fee</span>
                                        <span>
                                            {selectedNetwork.fee} {selectedCoin.symbol}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200">
                                        <span>Receive Amount</span>
                                        <span className="text-lg">
                                            {totalReceive.toFixed(6)} {selectedCoin.symbol}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!isAmountValid || !address || isSubmitting}
                                    className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${!isAmountValid || !address || isSubmitting
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-yellow-600 hover:bg-yellow-700 shadow-md"
                                        }`}
                                >
                                    {isSubmitting ? "Processing..." : "Withdraw"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: RECENT WITHDRAWALS & INFO */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Info Box */}
                        <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
                            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                                <Info className="w-5 h-5 mr-2" />
                                Important Info
                            </h3>
                            <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
                                <li>
                                    Do not withdraw directly to a crowdfund or ICO address.
                                </li>
                                <li>
                                    Ensure the network matches the receiving address network.
                                </li>
                                <li>
                                    Transactions cannot be cancelled once submitted.
                                </li>
                            </ul>
                        </div>

                        {/* Recent History */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <History className="w-5 h-5 mr-2 text-gray-500" />
                                    Recent Withdrawals
                                </h2>
                                <a
                                    href="#"
                                    className="text-sm text-yellow-600 hover:underline"
                                >
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
                                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 text-red-600">
                                                <ArrowUpRight className="w-4 h-4" />
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
                                                -{record.amount}
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
                                        No recent withdrawals found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
