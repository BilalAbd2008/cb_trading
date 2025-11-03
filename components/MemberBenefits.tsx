"use client";

import { BookOpen, Users, Trophy, Bell, Radio, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const benefits = [
  {
    icon: BookOpen,
    title: "Proprietary Trading Education",
    description:
      "Comprehensive trading courses and materials for all skill levels.",
  },
  {
    icon: Users,
    title: "Monitor the Foundation",
    description: "Track and learn from experienced traders in real-time.",
  },
  {
    icon: Trophy,
    title: "Early Open Trader",
    description:
      "Get early access to market opportunities and trading signals.",
  },
  {
    icon: Bell,
    title: "Community Access",
    description:
      "Join our active community of traders sharing insights and strategies.",
  },
  {
    icon: Radio,
    title: "Live Signal Alerts",
    description:
      "Receive instant notifications for high-probability trading setups.",
  },
  {
    icon: Zap,
    title: "Lifetime Access & Updates",
    description:
      "One-time payment for lifetime access to all features and updates.",
  },
];

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = benefit.icon;

  return (
    <div
      ref={ref}
      className={`card-glow bg-gradient-to-br from-primary-800/50 to-primary-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center transition-all duration-700 ease-out group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-purple-600/20 group-hover:bg-purple-600/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/50">
        <Icon
          size={28}
          className="text-purple-400 group-hover:text-purple-300 transition-colors"
        />
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-purple-300 transition-colors">
        {benefit.title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 text-sm transition-colors">
        {benefit.description}
      </p>
    </div>
  );
}

export default function MemberBenefits() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 overflow-hidden">
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
            What Member gets
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Everything to take your trading game to the next level & beyond,
            let&apos;s start with these membership
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
