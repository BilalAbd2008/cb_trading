"use client";

import {
  Download,
  CheckCircle,
  BookOpen,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function LeadMagnet() {
  const { ref, isVisible } = useScrollAnimation();

  const whatYouGet = [
    {
      icon: TrendingUp,
      title: "Market Analysis Framework",
      desc: "Step-by-step guide to analyzing crypto & forex markets",
    },
    {
      icon: BookOpen,
      title: "Risk Management Strategies",
      desc: "Protect your capital with proven techniques",
    },
    {
      icon: Shield,
      title: "Entry & Exit Signals",
      desc: "Learn when to buy and sell like a pro",
    },
    {
      icon: Users,
      title: "Community Access",
      desc: "Join exclusive Discord for ongoing support",
    },
  ];

  const scrollToNewsletter = () => {
    const newsletter = document.getElementById("newsletter");
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-4 bg-primary-900">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-6 py-2 mb-6">
              <Download size={20} className="text-purple-400" />
              <span className="text-purple-400 font-semibold">
                FREE DOWNLOAD
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Complete{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beginner's Trading Guide
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to start trading crypto & forex with
              confidence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl p-8 shadow-2xl">
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6 mb-6">
                  <BookOpen size={64} className="text-purple-400 mx-auto" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className="text-green-400 flex-shrink-0"
                      size={24}
                    />
                    <span className="text-lg">30+ Pages of Trading Wisdom</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className="text-green-400 flex-shrink-0"
                      size={24}
                    />
                    <span className="text-lg">Instant PDF Download</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className="text-green-400 flex-shrink-0"
                      size={24}
                    />
                    <span className="text-lg">Beginner-Friendly Format</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className="text-green-400 flex-shrink-0"
                      size={24}
                    />
                    <span className="text-lg">Used by 2,000+ Traders</span>
                  </div>
                </div>
              </div>
              {/* Decorative Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-3 shadow-lg">
                <p className="text-white font-bold">100% FREE</p>
              </div>
            </div>

            {/* Right: What You'll Get */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">
                What You'll Get Inside:
              </h3>
              {whatYouGet.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 bg-white/5 border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg flex-shrink-0 h-fit">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}

              {/* CTA Button */}
              <button
                onClick={scrollToNewsletter}
                className="btn-glow-static w-full mt-8 px-8 py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Download size={24} className="group-hover:animate-bounce" />
                Download Free Guide Now
              </button>
              <p className="text-center text-sm text-gray-400">
                No credit card required • Instant access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
