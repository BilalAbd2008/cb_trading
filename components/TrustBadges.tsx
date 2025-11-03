"use client";

import { Shield, Users, Award, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const badges = [
  {
    icon: Shield,
    label: "Verified Platform",
    value: "Trusted & Secure",
  },
  {
    icon: Users,
    label: "Active Members",
    value: "500+",
  },
  {
    icon: Award,
    label: "Success Rate",
    value: "95%",
  },
  {
    icon: TrendingUp,
    label: "Founded",
    value: "2020",
  },
];

export default function TrustBadges() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`py-12 border-y border-purple-500/20 bg-gradient-to-r from-purple-900/10 to-blue-900/10 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-purple-600/20 p-3 rounded-full mb-3">
                  <Icon size={24} className="text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {badge.value}
                </div>
                <div className="text-sm text-gray-400">{badge.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
