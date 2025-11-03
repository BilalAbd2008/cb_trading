"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What is included in the CB Trading subscription?",
    answer:
      "Your subscription includes access to real-time crypto and forex trading signals, comprehensive trading education, community access, live trading sessions, and dedicated support from our expert team.",
  },
  {
    question: "What is included in the CB Trading subscription?",
    answer:
      "We provide detailed trading signals with entry points, stop-loss levels, and take-profit targets. Our signals are based on technical and fundamental analysis performed by experienced traders.",
  },
  {
    question: "What is included in the CB Trading subscription?",
    answer:
      "Absolutely! We offer comprehensive educational resources suitable for all levels, from beginners to advanced traders. Our community and mentorship programs are designed to help you learn and grow.",
  },
  {
    question: "What is included in the CB Trading subscription?",
    answer:
      "You can cancel your subscription at any time from your account dashboard. There are no long-term commitments or cancellation fees.",
  },
];

function FAQItem({
  faq,
  index,
  openIndex,
  setOpenIndex,
}: {
  faq: (typeof faqs)[0];
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-primary-800/50 to-primary-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition"
      >
        <span className="font-semibold pr-4">{faq.question}</span>
        <ChevronDown
          className={`flex-shrink-0 transition-transform ${
            openIndex === index ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {openIndex === index && (
        <div className="px-6 pb-4">
          <p className="text-gray-300">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-20 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <h2
          ref={titleRef}
          className={`text-4xl font-bold text-center mb-12 transform transition-all duration-700 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
