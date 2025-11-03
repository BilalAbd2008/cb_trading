"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const team = [
  {
    name: "LLC",
    role: "Trading Analyst",
    image: "/assets/team/llc.jpg",
  },
  {
    name: "Sherlock",
    role: "Trading Analyst",
    image: "/assets/team/sherlock.jpg",
  },
  {
    name: "Grasady",
    role: "Trading Analyst",
    image: "/assets/team/grasady.jpg",
  },
  {
    name: "TBA",
    role: "Trading Analyst",
    image: "/assets/team/tba.jpg",
  },
];

function TeamMember({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border-2 border-purple-500/40 rounded-2xl overflow-hidden hover:border-purple-400/60 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-purple-500/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info Container */}
      <div className="p-4 bg-gradient-to-b from-purple-900/60 to-blue-900/60 backdrop-blur-sm">
        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
        <p className="text-sm text-purple-300">{member.role}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent overflow-hidden">
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
            Led by Top Traders. Proven Results.
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Meet our expert team of professional traders
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <TeamMember key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
