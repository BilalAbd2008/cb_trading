"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const pricingData = {
  monthly: [
    {
      name: "Premium",
      price: "$99.99",
      period: "/month",
      whopUrl:
        "https://whop.com/cb-trading-investing-academy/cb-trading-investing-academy/?utm_source=store_page&funnelId=product_0d2d39f9-0c58-418b-af46-c2684a15aca2",
      features: [
        "Daily Trading Setups & Hints.",
        "Specialised & Community Advice.",
        '"Low Mcap" Crypto Gem Hints.',
        "Educational Guides.",
        'Access to "The Classroom".',
        "24/7 Support & Advice.",
      ],
    },
    {
      name: "Premium (33% off)",
      price: "$199",
      period: "/3 month",
      whopUrl:
        "https://whop.com/cb-trading-investing-academy/cb-trading-investing-academy/?utm_source=store_page&funnelId=product_0d2d39f9-0c58-418b-af46-c2684a15aca2",
      features: [
        "Daily Trading Setups & Hints.",
        "Specialised & Community Advice.",
        '"Low Mcap" Crypto Gem Hints.',
        "Educational Guides.",
        'Access to "The Classroom".',
        "24/7 Support & Advice.",
      ],
    },
    {
      name: "Premium (50% off)",
      price: "$299",
      period: "/6 month",
      whopUrl:
        "https://whop.com/cb-trading-investing-academy/cb-trading-investing-academy/?utm_source=store_page&funnelId=product_0d2d39f9-0c58-418b-af46-c2684a15aca2",
      features: [
        "Daily Trading Setups & Hints.",
        "Specialised & Community Advice.",
        '"Low Mcap" Crypto Gem Hints.',
        "Educational Guides.",
        'Access to "The Classroom".',
        "24/7 Support & Advice.",
      ],
    },
  ],
  yearly: [
    {
      name: "Premium (66% off)",
      price: "$399",
      period: "/year",
      whopUrl:
        "https://whop.com/cb-trading-investing-academy/cb-trading-investing-academy/?utm_source=store_page&funnelId=product_0d2d39f9-0c58-418b-af46-c2684a15aca2",
      features: [
        "Daily Trading Setups & Hints.",
        "Specialised & Community Advice.",
        '"Low Mcap" Crypto Gem Hints.',
        "Educational Guides.",
        'Access to "The Classroom".',
        "24/7 Support & Advice.",
      ],
    },
  ],
  lifetime: [
    {
      name: "Premium (one-time purchase)",
      price: "$999",
      period: "",
      whopUrl:
        "https://whop.com/cb-trading-investing-academy/cb-trading-investing-academy/?utm_source=store_page&funnelId=product_0d2d39f9-0c58-418b-af46-c2684a15aca2",
      features: [
        "Daily Trading Setups & Hints.",
        "Specialised & Community Advice.",
        '"Low Mcap" Crypto Gem Hints.',
        "Educational Guides.",
        'Access to "The Classroom".',
        "24/7 Support & Advice.",
      ],
    },
  ],
};

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly" | "lifetime">(
    "monthly"
  );
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: tabRef, isVisible: tabVisible } = useScrollAnimation();

  return (
    <section
      id="pricing"
      className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={titleRef}
          className={`transform transition-all duration-700 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Choose Your Plan. Start Winning.
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Choose from our flexible subscription pricing plans tailored to your
            needs,
            <br className="hidden md:block" />
            ensuring cost-effective access to our community
          </p>
        </div>

        {/* Tab Slider */}
        <div
          ref={tabRef}
          className={`flex justify-center mb-12 transform transition-all duration-700 ease-out delay-200 ${
            tabVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="inline-flex bg-purple-900/30 rounded-lg p-1 backdrop-blur-sm border border-purple-500/20">
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-8 py-2.5 rounded-md font-semibold transition-all duration-300 ${
                activeTab === "monthly"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("yearly")}
              className={`px-8 py-2.5 rounded-md font-semibold transition-all duration-300 ${
                activeTab === "yearly"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => setActiveTab("lifetime")}
              className={`px-8 py-2.5 rounded-md font-semibold transition-all duration-300 ${
                activeTab === "lifetime"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Lifetime
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={`grid gap-6 max-w-6xl mx-auto ${
            activeTab === "monthly"
              ? "md:grid-cols-3"
              : "md:grid-cols-1 max-w-md mx-auto"
          }`}
        >
          {pricingData[activeTab].map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, index }: { plan: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl p-8 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${(index + 2) * 150}ms` }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-white">{plan.price}</span>
          {plan.period && (
            <span className="text-gray-400 text-lg">{plan.period}</span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-300 mb-4">
          What&apos;s Included
        </p>
        <ul className="space-y-3">
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-0.5">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={plan.whopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 text-center"
      >
        Subscribe Now
      </a>
    </div>
  );
}
