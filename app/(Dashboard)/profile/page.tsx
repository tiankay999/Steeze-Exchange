"use client";

import React from "react";
import { User, Mail, AtSign, Shield } from "lucide-react";

export default function ProfilePage() {
    // Mock User Data
    const user = {
        fullName: "Eduard Pantazi",
        username: "@eduard_p",
        email: "eduard@steezecoin.com",
        role: "Administrator",
        avatarUrl:
            "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <User className="w-8 h-8 mr-3 text-yellow-600" />
                        My Profile
                    </h1>
                    <p className="text-gray-500 mt-1">
                        View and manage your personal information.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                    <div className="px-6 pb-6">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <img
                                src={user.avatarUrl}
                                alt={user.fullName}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded border border-yellow-200">
                                {user.role}
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {user.fullName}
                                </h2>
                                <p className="text-gray-500">{user.username}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-4">
                                        <User className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">
                                            Full Name
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.fullName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-4">
                                        <AtSign className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">
                                            Username
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.username}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-4">
                                        <Mail className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">
                                            Email Address
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="p-2 bg-white rounded-full shadow-sm mr-4">
                                        <Shield className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">
                                            Role
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.role}
                                        </p>
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
