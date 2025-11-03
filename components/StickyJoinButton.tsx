"use client";

import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function StickyJoinButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    window.open(
      "https://whop.com/cb-trading-investing-academy/cb-trading-investing-academy/?utm_source=store_page&funnelId=product_0d2d39f9-0c58-418b-af46-c2684a15aca2",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`btn-glow-static fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center gap-2 group ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <span className="hidden sm:inline">Join CB Trading</span>
      <span className="sm:hidden">Join Now</span>
      <ArrowRight
        size={20}
        className="group-hover:translate-x-1 transition-transform"
      />
    </button>
  );
}
