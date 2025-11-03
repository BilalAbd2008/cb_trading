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
            className={`card-highlight bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 transition-all duration-700 ease-out group ${
              leftVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-600 group-hover:bg-purple-500 p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                <TrendingUp
                  size={32}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="text-2xl font-bold group-hover:text-purple-300 transition-colors">
                Crypto Signals
              </h3>
            </div>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
              Get real-time cryptocurrency trading signals with detailed entry,
              stop-loss, and take-profit levels. Cover major coins like BTC,
              ETH, and emerging altcoins.
            </p>
          </div>

          {/* Forex Signals */}
          <div
            ref={rightRef}
            className={`card-highlight bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 transition-all duration-700 ease-out delay-200 group ${
              rightVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 group-hover:bg-blue-500 p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                <BarChart3
                  size={32}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors">
                Forex Signals
              </h3>
            </div>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
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
