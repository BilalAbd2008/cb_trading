"use client";

import { Mail, CheckCircle2, TrendingUp, BookOpen, Bell } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setStatus("error");
      setMessage("Please accept the terms and conditions");
      return;
    }

    setStatus("loading");

    try {
      // Save to localStorage
      const stored = localStorage.getItem("newsletter_subscribers");
      const subscribers = stored ? JSON.parse(stored) : [];

      // Check if email already exists
      if (subscribers.some((sub: any) => sub.email === email)) {
        setStatus("error");
        setMessage("This email is already subscribed!");
        return;
      }

      // Add new subscriber
      const newSubscriber = {
        id: Date.now().toString(),
        email: email,
        created_at: new Date().toISOString(),
      };

      subscribers.push(newSubscriber);
      localStorage.setItem(
        "newsletter_subscribers",
        JSON.stringify(subscribers)
      );

      setStatus("success");
      setMessage(
        "Successfully subscribed! Check your email for the free guide."
      );
      setEmail("");
      setAgreed(false);
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const benefits = [
    { icon: TrendingUp, text: "Weekly market analysis & insights" },
    { icon: BookOpen, text: "Exclusive trading tips & strategies" },
    { icon: Bell, text: "Early access to premium signals" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 via-blue-900/10 to-purple-900/10">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
              <Mail size={32} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Free Trading Guide
            </span>
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Join 2,000+ traders receiving weekly insights and exclusive content
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-purple-600/20 p-2 rounded-lg flex-shrink-0">
                    <Icon size={20} className="text-purple-400" />
                  </div>
                  <p className="text-sm text-gray-300">{benefit.text}</p>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-glow-static px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing..." : "Get Free Guide"}
              </button>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-purple-500/30 bg-white/10 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-400">
                I agree to receive emails and accept the{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Status Message */}
            {status === "success" && (
              <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <CheckCircle2
                  size={20}
                  className="text-green-400 flex-shrink-0"
                />
                <p className="text-green-400 text-sm">{message}</p>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <span className="text-red-400 text-sm">{message}</span>
              </div>
            )}
          </form>

          {/* Fine Print */}
          <p className="text-xs text-gray-500 text-center mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
