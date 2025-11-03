"use client";

import { TrendingUp, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function MarketCoverage() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className={`text-4xl font-bold text-center mb-12 transform transition-all duration-700 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          Market Coverage
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Crypto Signals */}
          <div
            ref={leftRef}
            className={`bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:scale-105 transition-all duration-700 ease-out ${
              leftVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-600 p-3 rounded-xl">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-bold">Crypto Signals</h3>
            </div>
            <p className="text-gray-300">
              Get real-time cryptocurrency trading signals with detailed entry,
              stop-loss, and take-profit levels. Cover major coins like BTC,
              ETH, and emerging altcoins.
            </p>
          </div>

          {/* Forex Signals */}
          <div
            ref={rightRef}
            className={`bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 hover:scale-105 transition-all duration-700 ease-out delay-200 ${
              rightVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 p-3 rounded-xl">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-2xl font-bold">Forex Signals</h3>
            </div>
            <p className="text-gray-300">
              Professional forex trading signals for major currency pairs.
              Technical and fundamental analysis to help you navigate the forex
              market with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
