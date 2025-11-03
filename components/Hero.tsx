"use client";

import Ticker from "@/components/Ticker";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-black via-[#0a0015] to-black"
    >
      {/* Animated vertical light beams */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {/* Blue and Purple vertical beams - More intense */}
          {[...Array(30)].map((_, i) => {
            const isBlue = i % 3 === 0;
            const isPurple = i % 3 === 1;
            const delay = i * 0.2;
            const duration = 2.5 + Math.random() * 1.5;
            const height = 60 + Math.random() * 40;
            const width = Math.random() > 0.5 ? "3px" : "2px";

            let gradient;
            if (isBlue) {
              gradient =
                "bg-gradient-to-t from-blue-500/60 via-blue-400/30 to-transparent";
            } else if (isPurple) {
              gradient =
                "bg-gradient-to-t from-purple-500/60 via-purple-400/30 to-transparent";
            } else {
              gradient =
                "bg-gradient-to-t from-violet-500/50 via-violet-400/25 to-transparent";
            }

            return (
              <div
                key={i}
                className={`absolute bottom-0 ${gradient}`}
                style={{
                  left: `${i * 3.33}%`,
                  width: width,
                  height: `${height}%`,
                  animation: `glow ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  filter: "blur(1px)",
                }}
              />
            );
          })}
        </div>

        {/* Gradient overlays for atmosphere - More intense */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/30 to-blue-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-white">Trade Smarter. Grow Faster.</span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent mt-2">
            Win Together.
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Join the CB Trading community — where crypto and forex traders
          connect, learn, and profit together. Access real-time analysis, daily
          signals, and exclusive mentorship from top traders.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group border-2 border-purple-500/60 hover:border-purple-400 bg-purple-600/10 hover:bg-purple-600/20 px-8 py-3 rounded-md font-semibold transition-all duration-300">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Ticker at bottom */}
      <Ticker />

      <style jsx>{`
        @keyframes glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(0.85);
          }
          50% {
            opacity: 0.9;
            transform: scaleY(1.1);
          }
        }
      `}</style>
    </section>
  );
}
