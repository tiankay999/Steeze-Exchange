"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  ChevronDown,
  Clock,
  BarChart4,
} from "lucide-react";

// ---------- TYPES ----------

interface Market {
  symbol: string;
  name: string;
  iconUrl: string;
  price: number;
  change24h: number;
  volume: string;
  high: number;
  low: number;
}

interface Order {
  price: number;
  amount: number;
  total: number;
  depth: number;
}

interface TooltipData {
  name: string;
  price: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

// ---------- MOCK DATA ----------
const username = "Christian Asante";
const initialMarkets: Market[] = [
  {
    symbol: "BTC/USDT",
    name: "Bitcoin",
    iconUrl:
      "https://placehold.co/32x32/b89738/ffffff?text=B",
    price: 94750.23,
    change24h: 1.25,
    volume: "2.5M",
    high: 69120,
    low: 67500,
  },
  {
    symbol: "ETH/USDT",
    name: "Ethereum",
    iconUrl:
      "https://placehold.co/32x32/3b82f6/ffffff?text=E",
    price: 3890.78,
    change24h: 0.92,
    volume: "1.8M",
    high: 3910,
    low: 3820,
  },
  {
    symbol: "SOL/USDT",
    name: "Solana",
    iconUrl:
      "https://placehold.co/32x32/8b5cf6/ffffff?text=S",
    price: 165.45,
    change24h: -0.55,
    volume: "500K",
    high: 168,
    low: 164,
  },
  {
    symbol: "BNB/USDT",
    name: "BNB",
    iconUrl:
      "https://placehold.co/32x32/f59e0b/ffffff?text=N",
    price: 605.11,
    change24h: 3.1,
    volume: "350K",
    high: 610,
    low: 580,
  },
  {
    symbol: "XRP/USDT",
    name: "Ripple",
    iconUrl:
      "https://placehold.co/32x32/4b5563/ffffff?text=X",
    price: 0.5212,
    change24h: -1.22,
    volume: "1.2M",
    high: 0.53,
    low: 0.51,
  },
  {
    symbol: "ADA/USDT",
    name: "Cardano",
    iconUrl:
      "https://placehold.co/32x32/059669/ffffff?text=A",
    price: 0.4578,
    change24h: 2.15,
    volume: "800K",
    high: 0.46,
    low: 0.44,
  },
  {
    symbol: "DOGE/USDT",
    name: "Dogecoin",
    iconUrl:
      "https://placehold.co/32x32/ca8a04/ffffff?text=D",
    price: 0.155,
    change24h: -0.1,
    volume: "4.1M",
    high: 0.16,
    low: 0.15,
  },
  {
    symbol: "AVAX/USDT",
    name: "Avalanche",
    iconUrl:
      "https://placehold.co/32x32/dc2626/ffffff?text=V",
    price: 32.7,
    change24h: 1.5,
    volume: "250K",
    high: 33,
    low: 32.1,
  },
  {
    symbol: "DOT/USDT",
    name: "Polkadot",
    iconUrl:
      "https://placehold.co/32x32/9333ea/ffffff?text=T",
    price: 7.2,
    change24h: 0.75,
    volume: "300K",
    high: 7.3,
    low: 7.1,
  },
];

const mockChartData: TooltipData[] = [
  { name: "10:00", price: 67000 },
  { name: "11:00", price: 67500 },
  { name: "12:00", price: 68100 },
  { name: "13:00", price: 68500 },
  { name: "14:00", price: 68750 },
  { name: "15:00", price: 68600 },
  { name: "16:00", price: 68850 },
];

// ---------- MARKET LIST ----------

interface MarketListProps {
  markets: Market[];
  onSelectMarket: (m: Market) => void;
  activeMarket: Market;
}

const MarketList: React.FC<MarketListProps> = ({
  markets,
  onSelectMarket,
  activeMarket,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMarkets = markets.filter(
    (m) =>
      m.symbol
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search coin..."
            className="w-full bg-gray-100 text-gray-900 text-sm rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="text-xs text-gray-600 grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-2 border-b border-gray-200">
        <span>Pair</span>
        <span className="text-right">Price (USDT)</span>
        <span className="text-right w-14">24h %</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar-light">
        {filteredMarkets.map((market) => (
          <div
            key={market.symbol}
            className={`grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-2 cursor-pointer items-center transition-colors duration-200 ${market.symbol === activeMarket.symbol
              ? "bg-yellow-100"
              : "hover:bg-gray-100"
              }`}
            onClick={() => onSelectMarket(market)}
          >
            {/* pair */}
            <span className="flex items-center space-x-2">
              <img
                src={market.iconUrl}
                alt={`${market.name} icon`}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src =
                    "https://placehold.co/32x32/374151/ffffff?text=?";
                }}
              />
              <div className="flex flex-col">
                <span className="text-gray-900 font-medium text-sm leading-none">
                  {market.symbol.split("/")[0]}
                </span>
                <span className="text-gray-500 text-xs leading-none">
                  {market.name}
                </span>
              </div>
            </span>

            {/* price */}
            <span
              className={`text-right text-sm ${market.change24h >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {market.price.toFixed(
                market.price > 100 ? 2 : 4
              )}
            </span>

            {/* 24h % */}
            <span
              className={`text-right text-sm font-semibold w-14 ${market.change24h >= 0
                ? "text-green-600"
                : "text-red-600"
                }`}
            >
              {market.change24h >= 0 ? "+" : ""}
              {market.change24h.toFixed(2)}%
            </span>
          </div>
        ))}
        {filteredMarkets.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No markets found.
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- CHART HEADER ----------

const ChartHeader: React.FC<{ market: Market }> = ({
  market,
}) => (
  <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
    <div className="flex items-center mb-2 md:mb-0">
      <img
        src={market.iconUrl}
        alt={`${market.name} icon`}
        className="w-8 h-8 rounded-full mr-3"
        onError={(e) => {
          const img = e.currentTarget;
          img.onerror = null;
          img.src =
            "https://placehold.co/32x32/374151/ffffff?text=?";
        }}
      />
      <div className="flex items-end">
        <div className="text-2xl font-bold text-gray-900 mr-2 leading-none">
          {market.symbol}
        </div>
        <div className="text-sm text-gray-600 leading-none mb-0.5">
          / {market.name}
        </div>
      </div>
      <div
        className={`text-xl font-bold ml-4 ${market.change24h >= 0
          ? "text-green-600"
          : "text-red-600"
          }`}
      >
        {market.price.toFixed(2)}
      </div>
    </div>

    <div className="flex flex-wrap text-sm text-gray-600">
      <div className="mr-4">
        <span className="font-semibold text-gray-900">
          24h Change:{" "}
        </span>
        <span
          className={`font-semibold ${market.change24h >= 0
            ? "text-green-600"
            : "text-red-600"
            }`}
        >
          {market.change24h >= 0 ? "+" : ""}
          {market.change24h.toFixed(2)}%
        </span>
      </div>
      <div className="mr-4">
        <span className="font-semibold text-gray-900">
          24h High:{" "}
        </span>
        <span className="text-green-600">
          {market.high.toFixed(2)}
        </span>
      </div>
      <div className="mr-4">
        <span className="font-semibold text-gray-900">
          24h Low:{" "}
        </span>
        <span className="text-red-600">
          {market.low.toFixed(2)}
        </span>
      </div>
      <div>
        <span className="font-semibold text-gray-900">
          24h Volume:{" "}
        </span>
        <span>{market.volume}</span>
      </div>
    </div>
  </div>
);

// ---------- CHART AREA ----------

const ChartArea: React.FC = () => {
  const timeframes = [
    "1m",
    "5m",
    "15m",
    "1h",
    "4h",
    "1D",
    "1W",
  ];
  const [activeTimeframe, setActiveTimeframe] =
    useState("1h");

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-lg text-xs text-gray-900">
          <p className="font-bold">
            {`Time: ${label}`}
          </p>
          <p>{`Price: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 flex items-center space-x-2 overflow-x-auto">
        {timeframes.map((tf) => (
          <button
            key={tf}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeTimeframe === tf
              ? "bg-yellow-600 text-white font-bold"
              : "text-gray-600 hover:bg-gray-100"
              }`}
            onClick={() => setActiveTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
        <button className="text-gray-500 hover:text-gray-900 p-1 rounded">
          <BarChart4 className="w-4 h-4" />
        </button>
        <button className="text-gray-500 hover:text-gray-900 p-1 rounded">
          <Clock className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 min-h-[16rem] p-2">
        <ResponsiveContainer width={`100%`} height={`100%`}>
          <LineChart
            data={mockChartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="name"
              stroke="#4b5563"
              tickLine={false}
            />
            <YAxis
              stroke="#4b5563"
              domain={[
                "dataMin - 1000",
                "dataMax + 1000",
              ]}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                `$${(value / 1000).toFixed(1)}k`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#f6e05e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-center text-xs text-gray-500 p-2">
        Note: This is a static, mock chart using
        Recharts. In a real app, this would load a
        dynamic chart library.
      </p>
    </div>
  );
};

// ---------- ORDER BOOK ----------

const OrderBook: React.FC = () => {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const currentPrice = 68735.5;

  useEffect(() => {
    const generateOrders = (isBuy: boolean): Order[] =>
      Array.from({ length: 15 })
        .map((_, i) => {
          const priceBase = isBuy
            ? 68700 - i * 5
            : 68750 + i * 5;
          const price = parseFloat(priceBase.toFixed(2));
          const amount = parseFloat(
            (Math.random() * 0.05 + 0.01).toFixed(4)
          );
          const total = parseFloat(
            (price * amount).toFixed(2)
          );
          const depth = Math.min(100, (i + 1) * 6);
          return { price, amount, total, depth };
        })
        .sort((a, b) =>
          isBuy ? b.price - a.price : a.price - b.price
        );

    setBids(generateOrders(true));
    setAsks(generateOrders(false));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-xl p-3 h-full flex flex-col">
      <h3 className="text-gray-900 text-lg font-semibold mb-3">
        Order Book
      </h3>
      <div className="flex justify-between text-xs text-gray-600 border-b border-gray-200 pb-1 mb-1">
        <span>Price (USDT)</span>
        <span>Amount (BTC)</span>
        <span>Total</span>
      </div>

      {/* asks */}
      <div className="flex-1 overflow-hidden">
        {asks.map((order, index) => (
          <div
            key={`ask-${index}`}
            className="relative text-xs py-0.5 text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer"
          >
            <div
              className="absolute right-0 top-0 h-full bg-red-200/40"
              style={{ width: `${order.depth}%` }}
            />
            <div className="relative grid grid-cols-3">
              <span>
                {order.price.toFixed(2)}
              </span>
              <span className="text-right">
                {order.amount.toFixed(4)}
              </span>
              <span className="text-right">
                {order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="my-2 py-1 text-center font-bold text-lg text-yellow-600 border-y border-gray-300">
        {currentPrice.toFixed(2)}
      </div>

      {/* bids */}
      <div className="flex-1 overflow-hidden">
        {bids.map((order, index) => (
          <div
            key={`bid-${index}`}
            className="relative text-xs py-0.5 text-green-600 hover:bg-green-50/50 transition-colors cursor-pointer"
          >
            <div
              className="absolute right-0 top-0 h-full bg-green-200/40"
              style={{ width: `${order.depth}%` }}
            />
            <div className="relative grid grid-cols-3">
              <span>
                {order.price.toFixed(2)}
              </span>
              <span className="text-right">
                {order.amount.toFixed(4)}
              </span>
              <span className="text-right">
                {order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center text-sm text-gray-500 flex justify-center items-center">
        <span className="mr-2">Group:</span>
        <button className="flex items-center text-gray-900 bg-gray-100 hover:bg-gray-200 rounded px-2 py-1 text-xs">
          0.01
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

// ---------- TRADE PANEL ----------

const TradePanel: React.FC = () => {
  const [tab, setTab] = useState<"Limit" | "Market" | "Stop-Limit">(
    "Limit"
  );
  const [side, setSide] = useState<"Buy" | "Sell">("Buy");
  const [price, setPrice] = useState<number>(68750.23);
  const [amount, setAmount] = useState<number>(0.01);

  const TradeButton: React.FC<{
    label: string;
    currentSide: "Buy" | "Sell";
  }> = ({ label, currentSide }) => (
    <button
      className={`flex-1 py-2 font-semibold transition-colors duration-200 ${currentSide === "Buy"
        ? "bg-green-600 hover:bg-green-500"
        : "bg-red-600 hover:bg-red-500"
        } rounded-lg shadow-md text-white`}
      onClick={() =>
        console.log(
          `${label} ${amount} BTC at ${price} USDT`
        )
      }
    >
      {label} BTC
    </button>
  );

  const TabButton: React.FC<{ name: "Limit" | "Market" | "Stop-Limit" }> =
    ({ name }) => (
      <button
        className={`flex-1 text-sm py-2 px-4 transition-colors duration-200 ${tab === name
          ? "border-b-2 border-yellow-600 text-gray-900"
          : "text-gray-500 hover:text-gray-900"
          }`}
        onClick={() => setTab(name)}
      >
        {name}
      </button>
    );

  const InputField: React.FC<{
    label: string;
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    unit: string;
  }> = ({ label, value, onChange, placeholder, unit }) => (
    <div className="mb-4">
      <label className="block text-xs text-gray-600 mb-1">
        {label}
      </label>
      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-gray-900 p-3 focus:outline-none"
          step={unit === "USDT" ? 0.01 : 0.0001}
        />
        <span className="px-3 text-gray-600">
          {unit}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 h-full flex flex-col">
      {/* buy / sell */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${side === "Buy"
            ? "bg-green-600/20 text-green-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          onClick={() => setSide("Buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${side === "Sell"
            ? "bg-red-600/20 text-red-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          onClick={() => setSide("Sell")}
        >
          Sell
        </button>
      </div>

      {/* tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <TabButton name="Limit" />
        <TabButton name="Market" />
        <TabButton name="Stop-Limit" />
      </div>

      {/* form */}
      <div className="flex-1">
        <InputField
          label="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          placeholder="Enter price"
          unit="USDT"
        />
        <InputField
          label="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(parseFloat(e.target.value))
          }
          placeholder="Enter amount"
          unit="BTC"
        />

        <div className="flex justify-between mb-4 text-xs text-gray-600">
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              className="w-1/5 py-1 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors"
            >
              {percent}%
            </button>
          ))}
        </div>

        <div className="bg-gray-100 p-3 rounded-lg text-sm mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Available USDT</span>
            <span className="text-gray-900">
              10,000.00
            </span>
          </div>
          <div className="flex justify-between text-gray-600 mt-1">
            <span>Total (Est)</span>
            <span className="text-gray-900">
              {(price * amount).toFixed(2)} USDT
            </span>
          </div>
        </div>

        <TradeButton label={side} currentSide={side} />

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Requires login to trade.</p>
        </div>
      </div>
    </div>
  );
};

// ---------- MAIN PAGE COMPONENT ----------

export default function Page() {
  const [activeMarket, setActiveMarket] = useState<Market>(
    initialMarkets[0]
  );
  const [markets, setMarkets] =
    useState<Market[]>(initialMarkets);
  const [recentTrades, setRecentTrades] = useState<
    { price: string; amount: string; isBuy: boolean; time: string }[]
  >([]);

  useEffect(() => {
    // Generate recent trades on client side only
    const trades = Array.from({ length: 20 }).map(() => {
      const price = (93700 + Math.random() * 100).toFixed(2);
      const amount = (Math.random() * 0.005 + 0.001).toFixed(4);
      const isBuy = Math.random() > 0.5;
      const time = `${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, "0")}:${Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`;
      return { price, amount, isBuy, time };
    });
    setRecentTrades(trades);

    const interval = setInterval(() => {
      setMarkets((prevMarkets) =>
        prevMarkets.map((market) => {
          const volatility = market.price * 0.0005;
          const change =
            (Math.random() * 2 - 1) * volatility;
          const newPrice = market.price + change;
          const newChange24h =
            ((newPrice - market.low) / market.low) *
            100 *
            (Math.random() > 0.5 ? 1 : -1);

          const updated: Market = {
            ...market,
            price: newPrice,
            change24h: newChange24h,
          };

          return updated;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSelectMarket = useCallback(
    (market: Market) => {
      setActiveMarket(market);
    },
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
      <style>{`
        .custom-scrollbar-light::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b border-yellow-600/50 pb-2">
        Welcome {username} to Steeze Exchange
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
        <div className="lg:col-span-3 h-full">
          <MarketList
            markets={markets}
            onSelectMarket={handleSelectMarket}
            activeMarket={activeMarket}
          />
        </div>

        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="bg-white rounded-lg shadow-xl h-2/3 min-h-[400px]">
            <ChartHeader market={activeMarket} />
            <ChartArea />
          </div>

          <div className="bg-white rounded-lg shadow-xl h-1/3 p-4">
            <h3 className="text-gray-900 text-lg font-semibold mb-3">
              Recent Trades
            </h3>
            <div className="h-full overflow-y-auto custom-scrollbar-light text-xs text-gray-700">
              {recentTrades.map((trade, i) => (
                <div
                  key={i}
                  className="flex justify-between py-1 border-b border-gray-200 last:border-b-0"
                >
                  <span className={trade.isBuy ? "text-green-600" : "text-red-600"}>
                    {trade.price}
                  </span>
                  <span>{trade.amount}</span>
                  <span className="text-gray-500">
                    {trade.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col space-y-6">
          <div className="h-1/2 min-h-[300px]">
            <OrderBook />
          </div>
          <div className="h-1/2 min-h-[300px]">
            <TradePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
