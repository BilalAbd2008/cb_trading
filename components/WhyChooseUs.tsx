"use client";

import { Target, TrendingUp, Shield, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Target,
    title: "Accurate Signal Analysis",
    description:
      "Our expert team provides high-accuracy trading signals backed by technical and fundamental analysis.",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Market Updates",
    description:
      "Stay ahead with instant notifications on market movements and trading opportunities.",
  },
  {
    icon: Shield,
    title: "Comprehensive Mentoring & Local Support",
    description:
      "Get personalized guidance from experienced traders and join our supportive community.",
  },
  {
    icon: Users,
    title: "Live Trading Sessions",
    description:
      "Watch and learn from live trading sessions with professional traders sharing their strategies.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`card-highlight bg-gradient-to-br from-purple-900/30 to-primary-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-700 ease-out group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="bg-purple-600/20 group-hover:bg-purple-600/40 w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
        <Icon
          size={32}
          className="text-purple-400 group-hover:text-purple-300"
        />
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors">
        {feature.title}
      </h3>
      <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
        {feature.description}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section
      id="features"
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
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Traders Choose CB Trading
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Everything you need to succeed in trading
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
