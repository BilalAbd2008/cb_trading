"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            ref={leftRef}
            className={`transform transition-all duration-700 ease-out ${
              leftVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s talk about
              <br />
              your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                crypto future.
              </span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We are on a mission to bring professional trading insights to
              everyone. Whether you&apos;re just starting or a seasoned trader,
              our community and expert signals help you make informed decisions
              in the crypto and forex markets.
            </p>
            <button className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-semibold transition">
              Learn More
            </button>
          </div>

          <div
            ref={rightRef}
            className={`transform transition-all duration-700 ease-out delay-200 ${
              rightVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-32 h-32 mx-auto mb-4 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">Trading Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
