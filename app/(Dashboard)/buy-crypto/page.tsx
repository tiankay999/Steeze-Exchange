"use client";

import React, { useState } from "react";
// @ts-ignore
import { usePaystackPayment } from "react-paystack";
import { CreditCard, Shield, Zap, TrendingUp, AlertCircle } from "lucide-react";

export default function BuyCryptoPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [crypto, setCrypto] = useState("BTC");
    const [currency, setCurrency] = useState("USD");

    // Paystack Config
    const config = {
        reference: new Date().getTime().toString(),
        email: email,
        //maystack
        amount: amount ? Math.round(parseFloat(amount) * 100) : 0,

        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        currency: currency,
    };

    // Initialize the hook
    const initializePayment = usePaystackPayment(config);

    const onSuccess = (reference: any) => {
        // Implementation for what happens after a successful transaction
        console.log("Payment successful:", reference);
        alert(`Payment Successful! Transaction Reference: ${reference.reference}`);
        setLoading(false);
    };

    const onClose = () => {
        // Implementation for what happens when the user closes the popup
        console.log("Payment closed");
        setLoading(false);
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !amount) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            // @ts-ignore
            initializePayment(onSuccess, onClose);
        } catch (err: any) {
            console.error(err);
            setError("Failed to initialize payment.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <CreditCard className="w-8 h-8 mr-3 text-yellow-600" />
                        Buy Crypto
                    </h1>
                    <p className="text-gray-600 mt-2 ml-11">
                        Securely purchase cryptocurrency with fiat using Paystack.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Buy Form Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Buy</h2>

                            <form onSubmit={handlePay} className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Amount Input */}
                                <div>
                                    <label
                                        htmlFor="amount"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Amount to Spend
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-medium">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            id="amount"
                                            className="block w-full pl-8 pr-20 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <select
                                                value={currency}
                                                onChange={(e) => setCurrency(e.target.value)}
                                                className="h-full py-0 pl-2 pr-4 border-l border-gray-300 bg-gray-50 text-gray-600 text-sm rounded-r-lg focus:ring-yellow-500 focus:border-yellow-500"
                                            >
                                                <option value="USD">USD</option>
                                                <option value="NGN">NGN</option>
                                                <option value="GHS">GHS</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Crypto Selection */}
                                <div>
                                    <label
                                        htmlFor="crypto"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Receive
                                    </label>
                                    <select
                                        id="crypto"
                                        value={crypto}
                                        onChange={(e) => setCrypto(e.target.value)}
                                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                                    >
                                        <option value="BTC">Bitcoin (BTC)</option>
                                        <option value="ETH">Ethereum (ETH)</option>
                                        <option value="USDT">Tether (USDT)</option>
                                        <option value="SOL">Solana (SOL)</option>
                                    </select>
                                </div>

                                {/* Summary Box */}
                                <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-100">
                                    <div className="flex justify-between text-sm text-gray-800 mb-2">
                                        <span>Estimated Rate</span>
                                        <span className="font-medium">1 {crypto} ≈ $45,000.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-800">
                                        <span>Platform Fee</span>
                                        <span className="font-medium">0.00%</span>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="flex items-center p-4 text-sm text-red-800 border border-red-200 rounded-lg bg-red-50">
                                        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        `Buy ${crypto} Now`
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Info Card Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Value Props */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 text-white border border-gray-700">
                            <h3 className="text-xl font-bold mb-4">Why Buy on Steeze?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <Zap className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-300">
                                        Instant delivery directly to your wallet.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Shield className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-300">
                                        Bank-grade security via Paystack integration.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <TrendingUp className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-300">
                                        Best market rates with zero hidden fees.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Support Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Need Help?
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Our support team is available 24/7 to assist you with any issues
                                related to your purchase.
                            </p>
                            <button className="text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline">
                                Contact Support &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
