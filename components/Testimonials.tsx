"use client";

import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Alex M.",
    role: "Day Trader",
    rating: 5,
    text: "CB Trading transformed my trading journey. The signals are incredibly accurate and the community support is outstanding. I've seen consistent profits since joining!",
    image: "👨‍💼",
  },
  {
    name: "Sarah K.",
    role: "Crypto Investor",
    rating: 5,
    text: "Best investment I've made! The educational resources and live signals helped me understand the market better. Highly recommend to anyone serious about trading.",
    image: "👩‍💼",
  },
  {
    name: "Michael R.",
    role: "Forex Trader",
    rating: 5,
    text: "The analysis and insights provided are top-notch. I appreciate the transparency and the detailed explanations for each signal. Worth every penny!",
    image: "👨‍💻",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-primary-800/50 to-primary-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl">{testimonial.image}</div>
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="text-gray-300 text-sm leading-relaxed">
        {testimonial.text}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="testimonials" className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className={`text-4xl font-bold text-center mb-12 transform transition-all duration-700 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          What Our Members Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
