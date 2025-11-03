"use client";

import { useEffect, useState } from "react";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function Ticker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [position, setPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data from CoinGecko API
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
        );
        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    fetchCryptoData();
    // Refresh data every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Animation for scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev - 1) % 2000);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  if (loading || cryptoData.length === 0) {
    return (
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-md border-t border-purple-500/20 py-4">
        <div className="text-center text-gray-400">Loading crypto data...</div>
      </div>
    );
  }

  // Duplicate data for seamless loop
  const displayData = [...cryptoData, ...cryptoData, ...cryptoData];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-md border-t border-purple-500/20 py-4 overflow-hidden">
      <div
        className="flex gap-6 whitespace-nowrap"
        style={{ transform: `translateX(${position}px)` }}
      >
        {displayData.map((item, index) => {
          const isPositive = item.price_change_percentage_24h > 0;

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-3 px-4 py-2 bg-purple-950/40 rounded-lg border border-purple-500/20 min-w-fit"
            >
              {/* Coin Logo */}
              <img
                src={item.image}
                alt={item.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Coin name */}
              <span className="text-gray-300 text-sm font-medium">
                {item.name}
              </span>

              {/* Price */}
              <span className="text-white font-bold text-base">
                $
                {item.current_price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>

              {/* Change percentage with arrow */}
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <svg
                    className="w-3 h-3 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 3l7 7h-4v7H7v-7H3l7-7z" />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 17l-7-7h4V3h6v7h4l-7 7z" />
                  </svg>
                )}
                <span
                  className={`text-sm font-semibold ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
