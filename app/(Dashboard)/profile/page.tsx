"use client";
import { API_BASE_URL } from "../../utils/api";
import React, { useEffect, useState } from "react";
import { User, Mail, AtSign, Shield } from "lucide-react";
import ProfileUpload from "../../components/profileimageupload";

export default function ProfilePage() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/user`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                });

                if (!res.ok) {
                    console.error("Failed to fetch profile:", res.status, res.statusText);
                    return;
                }

                const data = await res.json();
                console.log("Profile data received:", data);
                setUsername(data?.username ?? "");
                setName(data?.name ?? "");
                setEmail(data?.email ?? "");

            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

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
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden">
                                <ProfileUpload />
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded border border-yellow-200">
                                Trader
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {name || "Guest User"}
                                </h2>
                                <p className="text-gray-500">{username || "@guest"}</p>
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
                                            {name || "Not available"}
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
                                            {username || "Not available"}
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
                                            {email || "Not available"}
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
                                            Trader
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
