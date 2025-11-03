"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What is included in the CB Trading subscription?",
    answer:
      "Your subscription includes access to:\n\n• Real-time crypto and forex trading signals with entry/exit points\n• 24/7 access to our exclusive Discord community\n• Live trading sessions with professional traders\n• Comprehensive trading education (beginner to advanced)\n• Technical analysis tools and market insights\n• Dedicated support from our expert team\n• Weekly market analysis and reports\n• Access to our trading bot recommendations\n\nYou'll have everything you need to start trading confidently and grow your portfolio with guidance from experienced professionals.",
  },
  {
    question: "How accurate are your trading signals?",
    answer:
      "Our trading signals are provided by a team of professional traders with proven track records:\n\n• Average win rate of 70-80% across all signals\n• Each signal includes detailed entry points, stop-loss, and take-profit levels\n• Based on comprehensive technical and fundamental analysis\n• Real-time updates and adjustments as market conditions change\n• Historical performance tracking available in our Discord\n\nWe provide transparent statistics and never guarantee profits, but our track record speaks for itself. Risk management is always emphasized with every signal.",
  },
  {
    question: "Can beginners join CB Trading?",
    answer:
      "Absolutely! CB Trading is designed for traders of all levels:\n\n🎓 For Beginners:\n• Step-by-step trading guides and tutorials\n• Beginner-friendly signal explanations\n• Dedicated beginner support channel\n• Basic trading terminology glossary\n• Paper trading recommendations before going live\n\n📈 For Advanced Traders:\n• Advanced technical analysis strategies\n• Market maker insights\n• Custom indicator setups\n• Scalping and day trading techniques\n\nOur community is very supportive, and you'll have mentors available 24/7 to answer questions and help you learn at your own pace.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "We make cancellation simple and transparent:\n\n• Cancel anytime directly from your Whop account dashboard\n• No cancellation fees or hidden charges\n• No long-term contracts or commitments\n• Access remains active until the end of your billing period\n• Re-subscribe anytime if you change your mind\n\nWe believe in earning your membership every month. If you're not satisfied, you can leave hassle-free. Most members stay because of the value and community, not because they're locked in!",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods through Whop:\n\n💳 Credit/Debit Cards:\n• Visa, Mastercard, American Express\n• Secure payment processing\n\n🪙 Cryptocurrency:\n• Bitcoin (BTC)\n• Ethereum (ETH)\n• USDC and other major cryptos\n\n🌍 Other Methods:\n• PayPal\n• Apple Pay\n• Google Pay\n\nAll payments are processed securely through Whop's encrypted payment system. Your financial information is never stored on our servers.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day satisfaction guarantee:\n\n✅ Full refund within first 7 days if:\n• You're not satisfied with the service\n• The signals don't meet your expectations\n• You find the community isn't the right fit\n\n📋 Refund Process:\n• Contact support through Discord or email\n• Simple refund request (no questions asked)\n• Processed within 3-5 business days\n\nAfter 7 days, no refunds are available, but you can cancel anytime to stop future charges. We're confident you'll love CB Trading!",
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
  const isOpen = openIndex === index;

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-primary-800/50 to-primary-900/50 backdrop-blur-sm border rounded-xl transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      } ${
        isOpen
          ? "border-purple-500/60 shadow-lg shadow-purple-500/20"
          : "border-purple-500/20"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200 relative z-10"
        style={{ pointerEvents: "auto", cursor: "pointer" }}
      >
        <span
          className={`font-semibold pr-4 transition-colors duration-300 ${
            isOpen ? "text-purple-300" : "text-white"
          }`}
        >
          {faq.question}
        </span>
        <ChevronDown
          className={`flex-shrink-0 transition-all duration-300 ${
            isOpen ? "rotate-180 text-purple-400" : "text-gray-400"
          }`}
          size={20}
        />
      </button>

      {/* Answer Section with Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out relative z-10 ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-4" />
          <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
            {faq.answer}
          </div>
        </div>
      </div>
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
