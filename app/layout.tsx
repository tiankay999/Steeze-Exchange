// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STEEZE EXCHANGE",
  description: "Trade crypto with ease on Steeze Exchange. Access live market prices, secure wallets, instant deposits & withdrawals, and a modern dashboard built for effortless digital asset management. Start trading Bitcoin, Ethereum, USDT, and more on Steeze",
  openGraph: {
    images: "/steeze-exchange.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
