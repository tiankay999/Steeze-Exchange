"use client";

import dynamic from "next/dynamic";
import React from "react";

const BuyCryptoContent = dynamic(() => import("./BuyCryptoContent"), {
    ssr: false,
    loading: () => <div className="p-8 text-center">Loading payment interface...</div>,
});

export default function BuyCryptoPage() {
    return <BuyCryptoContent />;
}
