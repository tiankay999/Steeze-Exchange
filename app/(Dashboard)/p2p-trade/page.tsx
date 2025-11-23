"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    ArrowRightLeft,
    DollarSign,
    CreditCard,
    Check,
    X,
    User,
} from "lucide-react";

// ---------- TYPES ----------

interface Ad {
    id: string;
    advertiser: string;
    type: "Buy" | "Sell";
    asset: string;
    fiat: string;
    price: number;
    available: number;
    limitMin: number;
    limitMax: number;
    paymentMethods: string[];
    remarks?: string;
}

// ---------- MOCK DATA ----------

const initialAds: Ad[] = [
    {
        id: "1",
        advertiser: "FastTrader_99",
        type: "Sell",
        asset: "USDT",
        fiat: "USD",
        price: 1.01,
        available: 5000,
        limitMin: 100,
        limitMax: 2000,
        paymentMethods: ["Bank Transfer", "Wise"],
    },
    {
        id: "2",
        advertiser: "CryptoKing",
        type: "Sell",
        asset: "BTC",
        fiat: "USD",
        price: 69500,
        available: 0.5,
        limitMin: 500,
        limitMax: 10000,
        paymentMethods: ["Bank Transfer"],
    },
    {
        id: "3",
        advertiser: "SecureDeal",
        type: "Buy",
        asset: "USDT",
        fiat: "USD",
        price: 0.99,
        available: 10000,
        limitMin: 200,
        limitMax: 5000,
        paymentMethods: ["PayPal", "Wise"],
    },
    {
        id: "4",
        advertiser: "MoonWalker",
        type: "Sell",
        asset: "ETH",
        fiat: "EUR",
        price: 3650,
        available: 10,
        limitMin: 100,
        limitMax: 5000,
        paymentMethods: ["SEPA", "Revolut"],
    },
];

// ---------- COMPONENTS ----------

export default function P2PPage() {
    const [activeTab, setActiveTab] = useState<"Buy" | "Sell" | "My Ads">("Buy");
    const [ads, setAds] = useState<Ad[]>(initialAds);
    const [isCreatingAd, setIsCreatingAd] = useState(false);

    // Filters
    const [selectedAsset, setSelectedAsset] = useState("USDT");
    const [amountFilter, setAmountFilter] = useState("");
    const [selectedFiat, setSelectedFiat] = useState("USD");

    // Create Ad Form State
    const [newAd, setNewAd] = useState<Partial<Ad>>({
        type: "Sell",
        asset: "USDT",
        fiat: "USD",
        paymentMethods: [],
    });

    const filteredAds = ads.filter((ad) => {
        if (activeTab === "My Ads") {
            // In a real app, filter by current user ID
            // For demo, we'll just show ads created in this session or specific mock user ads
            return ad.advertiser === "Me";
        }
        return (
            ad.type === (activeTab === "Buy" ? "Sell" : "Buy") && // If I want to Buy, I look for Sell ads
            ad.asset === selectedAsset &&
            ad.fiat === selectedFiat &&
            (amountFilter
                ? ad.limitMin <= parseFloat(amountFilter) &&
                ad.limitMax >= parseFloat(amountFilter)
                : true)
        );
    });

    const handleCreateAd = () => {
        if (
            !newAd.price ||
            !newAd.available ||
            !newAd.limitMin ||
            !newAd.limitMax
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        const ad: Ad = {
            id: Math.random().toString(36).substr(2, 9),
            advertiser: "Me",
            type: newAd.type as "Buy" | "Sell",
            asset: newAd.asset as string,
            fiat: newAd.fiat as string,
            price: Number(newAd.price),
            available: Number(newAd.available),
            limitMin: Number(newAd.limitMin),
            limitMax: Number(newAd.limitMax),
            paymentMethods: newAd.paymentMethods || ["Bank Transfer"],
            remarks: newAd.remarks,
        };

        setAds([ad, ...ads]);
        setIsCreatingAd(false);
        setActiveTab("My Ads");
        // Reset form
        setNewAd({
            type: "Sell",
            asset: "USDT",
            fiat: "USD",
            paymentMethods: [],
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                            <ArrowRightLeft className="w-8 h-8 mr-3 text-yellow-600" />
                            P2P Trading
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Buy and sell crypto directly with other users.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreatingAd(true)}
                        className="flex items-center justify-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg shadow-sm transition-colors font-semibold"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Create Ad
                    </button>
                </div>

                {/* Create Ad Modal */}
                {isCreatingAd && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Create New Ad
                                </h2>
                                <button
                                    onClick={() => setIsCreatingAd(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            I want to
                                        </label>
                                        <div className="flex rounded-lg bg-gray-100 p-1">
                                            <button
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${newAd.type === "Buy"
                                                        ? "bg-white text-gray-900 shadow-sm"
                                                        : "text-gray-500 hover:text-gray-900"
                                                    }`}
                                                onClick={() => setNewAd({ ...newAd, type: "Buy" })}
                                            >
                                                Buy
                                            </button>
                                            <button
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${newAd.type === "Sell"
                                                        ? "bg-white text-gray-900 shadow-sm"
                                                        : "text-gray-500 hover:text-gray-900"
                                                    }`}
                                                onClick={() => setNewAd({ ...newAd, type: "Sell" })}
                                            >
                                                Sell
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Asset
                                        </label>
                                        <select
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-2.5"
                                            value={newAd.asset}
                                            onChange={(e) =>
                                                setNewAd({ ...newAd, asset: e.target.value })
                                            }
                                        >
                                            <option value="USDT">USDT</option>
                                            <option value="BTC">BTC</option>
                                            <option value="ETH">ETH</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Fiat Currency
                                        </label>
                                        <select
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-2.5"
                                            value={newAd.fiat}
                                            onChange={(e) =>
                                                setNewAd({ ...newAd, fiat: e.target.value })
                                            }
                                        >
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                            <option value="GHS">GHS</option>
                                            <option value="NGN">NGN</option>
                                            <option value="CFA">CFA</option>
                                            <option value="XAF">XAF</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <DollarSign className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <input
                                                type="number"
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 pl-10 p-2.5"
                                                placeholder="0.00"
                                                value={newAd.price || ""}
                                                onChange={(e) =>
                                                    setNewAd({ ...newAd, price: Number(e.target.value) })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Total Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-2.5"
                                            placeholder={`Amount in ${newAd.asset}`}
                                            value={newAd.available || ""}
                                            onChange={(e) =>
                                                setNewAd({
                                                    ...newAd,
                                                    available: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Min Limit
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-2.5"
                                                placeholder="Min"
                                                value={newAd.limitMin || ""}
                                                onChange={(e) =>
                                                    setNewAd({
                                                        ...newAd,
                                                        limitMin: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Max Limit
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-2.5"
                                                placeholder="Max"
                                                value={newAd.limitMax || ""}
                                                onChange={(e) =>
                                                    setNewAd({
                                                        ...newAd,
                                                        limitMax: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Remarks (Optional)
                                        </label>
                                        <textarea
                                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 p-2.5"
                                            rows={3}
                                            placeholder="Terms of trade..."
                                            value={newAd.remarks || ""}
                                            onChange={(e) =>
                                                setNewAd({ ...newAd, remarks: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsCreatingAd(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateAd}
                                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
                                >
                                    Post Ad
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Tabs & Filters */}
                    <div className="p-4 border-b border-gray-200 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                                {(["Buy", "Sell", "My Ads"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                                ? "bg-white text-gray-900 shadow-sm"
                                                : "text-gray-500 hover:text-gray-900"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {activeTab !== "My Ads" && (
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="relative">
                                        <select
                                            value={selectedAsset}
                                            onChange={(e) => setSelectedAsset(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 pr-8"
                                        >
                                            <option value="USDT">USDT</option>
                                            <option value="BTC">BTC</option>
                                            <option value="ETH">ETH</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={selectedFiat}
                                            onChange={(e) => setSelectedFiat(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 pr-8"
                                        >
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            value={amountFilter}
                                            onChange={(e) => setAmountFilter(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 pl-9 w-32"
                                        />
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ad List */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Advertiser
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Limit / Available
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Payment
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right">
                                        Trade
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAds.map((ad) => (
                                    <tr
                                        key={ad.id}
                                        className="bg-white border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-600 font-bold">
                                                    {ad.advertiser.charAt(0)}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {ad.advertiser}
                                                </div>
                                                {ad.advertiser !== "Me" && (
                                                    <Check className="w-4 h-4 text-blue-500 ml-1" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-lg font-bold text-gray-900">
                                                {ad.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: ad.fiat,
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-1">
                                                <div className="text-gray-900">
                                                    <span className="text-gray-500">Available: </span>
                                                    {ad.available.toLocaleString()} {ad.asset}
                                                </div>
                                                <div className="text-gray-900">
                                                    <span className="text-gray-500">Limit: </span>
                                                    {ad.limitMin.toLocaleString()} -{" "}
                                                    {ad.limitMax.toLocaleString()} {ad.fiat}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {ad.paymentMethods.map((pm, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-xs px-2 py-0.5 rounded border ${i === 0
                                                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                                : "bg-gray-50 text-gray-600 border-gray-200"
                                                            }`}
                                                    >
                                                        {pm}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {ad.advertiser === "Me" ? (
                                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                                    Edit
                                                </button>
                                            ) : (
                                                <button
                                                    className={`px-6 py-2 text-sm font-bold text-white rounded-lg transition-colors ${ad.type === "Sell"
                                                            ? "bg-green-600 hover:bg-green-700" // If ad is Sell, I am Buying
                                                            : "bg-red-600 hover:bg-red-700" // If ad is Buy, I am Selling
                                                        }`}
                                                >
                                                    {ad.type === "Sell" ? "Buy" : "Sell"} {ad.asset}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredAds.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <Search className="w-12 h-12 text-gray-300 mb-4" />
                                                <p className="text-lg font-medium text-gray-900">
                                                    No ads found
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Try adjusting your filters or create a new ad.
                                                </p>
                                            </div>
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
