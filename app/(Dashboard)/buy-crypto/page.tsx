"use client";

import React, { useState } from 'react';
import { initializePayment } from '../../utils/paystack';
export default function PaystackButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [crypto, setCrypto] = useState('BTC');

    const handlePay = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await initializePayment(email, amount);
            // Redirect user to Paystack authorization URL
            window.location.href = result.data.authorization_url;
alert(`Initiating purchase of ${crypto} for ${amount}`);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
        setLoading(false);
    };

    

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Buy Crypto</h1>
                    <p className="text-gray-600 mt-2">Securely purchase cryptocurrency with fiat.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Buy Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Buy</h2>
                        <form onSubmit={handlePay} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-black"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount (Fiat)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="block w-full pl-7 pr-12 py-3 border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 sm:text-sm border text-black"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <label htmlFor="currency" className="sr-only">Currency</label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            className="focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                        >
                                            <option>USD</option>
                                            <option>NGN</option>
                                            <option>EUR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="crypto" className="block text-sm font-medium text-gray-700 mb-2">
                                    Receive
                                </label>
                                <div className="relative">
                                    <select
                                        id="crypto"
                                        name="crypto"
                                        className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-lg border text-black"
                                        value={crypto}
                                        onChange={(e) => setCrypto(e.target.value)}
                                    >
                                        <option value="BTC">Bitcoin (BTC)</option>
                                        <option value="ETH">Ethereum (ETH)</option>
                                        <option value="USDT">Tether (USDT)</option>
                                        <option value="SOL">Solana (SOL)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Estimated Rate</span>
                                    <span className="font-medium">1 {crypto} ≈ $45,000.00</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Fees</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
                            >
                                {loading ? 'Processing...' : `Buy ${crypto}`}
                            </button>
                        </form>
                    </div>
                  

                    {/* Info / Market Card */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-2">Why Buy Here?</h3>
                            <ul className="space-y-3 mt-4">
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Instant transactions
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Secure payments via Paystack
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Low fees
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Trends</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mr-3">₿</div>
                                        <div>
                                            <p className="font-medium text-gray-900">Bitcoin</p>
                                            <p className="text-xs text-gray-500">BTC</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">$45,230.00</p>
                                        <p className="text-xs text-green-500">+1.2%</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mr-3">Ξ</div>
                                        <div>
                                            <p className="font-medium text-gray-900">Ethereum</p>
                                            <p className="text-xs text-gray-500">ETH</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">$2,890.00</p>
                                        <p className="text-xs text-green-500">+2.4%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
