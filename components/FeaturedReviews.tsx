"use client";

import { Star, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const featuredReviews = [
  {
    name: "Lucid",
    role: "Active Trader",
    rating: 5,
    review:
      "Honestly the best discord out there. I'm learning how to trade from pro traders every single day. There's live streams, videos and 24/7 help.",
    verified: true,
    memberSince: "8 months ago",
  },
  {
    name: "Matthew Dutton",
    role: "Beginner Trader",
    rating: 5,
    review:
      "Started as a beginner a year ago, learned so much through the year, everyone's helpful 24/7, don't miss the opportunity if it arises.",
    verified: true,
    memberSince: "1 year ago",
  },
  {
    name: "James Stenton",
    role: "New Member",
    rating: 5,
    review:
      "I'm the most beginner there is. I've only been in 2 days and already learning the basics and much more. So much content and help.",
    verified: true,
    memberSince: "2 days ago",
  },
];

export default function FeaturedReviews() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header with Rating */}
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-3xl font-bold text-white">4.9/5</span>
          </div>
          <p className="text-gray-400 text-lg">
            Based on <span className="text-purple-400 font-semibold">200+</span>{" "}
            verified reviews
          </p>
        </div>

        {/* Featured Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuredReviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* CTA Below Reviews */}
        <div className="text-center mt-12">
          <a
            href="https://whop.com/cb-trading-investing-academy/cb-trading-investing-academy/?utm_source=store_page&funnelId=product_0d2d39f9-0c58-418b-af46-c2684a15aca2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            Join 500+ Active Traders
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  index,
}: {
  review: (typeof featuredReviews)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-lg text-white">{review.name}</h4>
          <p className="text-sm text-gray-400">{review.role}</p>
        </div>
        {review.verified && (
          <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
            <CheckCircle size={12} />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        "{review.review}"
      </p>

      {/* Footer */}
      <p className="text-xs text-gray-500">Member since {review.memberSince}</p>
    </div>
  );
}
