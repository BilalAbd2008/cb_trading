"use client";

import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  label: string;
  value: string;
  sublabel: string;
  targetNumber?: number;
}

function StatItem({
  children,
  index,
  alignLeft = false,
}: {
  children: React.ReactNode;
  index: number;
  alignLeft?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        alignLeft ? "text-left" : "text-center"
      } transform transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1"
    >
      {count}
      {suffix}
    </div>
  );
}

export default function Stats() {
  const stats = [
    {
      label: "Trusted by",
      value: "Thousands",
      sublabel: "of Traders Worldwide",
      isText: true,
    },
    {
      label: "Total Signals",
      value: "5500+",
      sublabel: "PNL Success Stories",
      targetNumber: 5500,
      suffix: "+",
    },
    {
      label: "Win Rate",
      value: "2300+",
      sublabel: "Subscribed Members",
      targetNumber: 2300,
      suffix: "+",
    },
    {
      label: "Success Rate",
      value: "3 to 10",
      sublabel: "Daily Trade Setups",
      isRange: true,
      targetStart: 3,
      targetEnd: 10,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} index={index} alignLeft={index === 0}>
              <div className="text-sm text-purple-400 mb-2">{stat.label}</div>

              {stat.isText ? (
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
              ) : stat.isRange ? (
                <RangeCounter start={stat.targetStart!} end={stat.targetEnd!} />
              ) : (
                <AnimatedCounter
                  target={stat.targetNumber!}
                  suffix={stat.suffix || ""}
                />
              )}

              {stat.sublabel && (
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              )}
            </StatItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function RangeCounter({ start, end }: { start: number; end: number }) {
  const [countStart, setCountStart] = useState(0);
  const [countEnd, setCountEnd] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCountStart(Math.floor(easeOutQuart * start));
      setCountEnd(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, start, end]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1"
    >
      {countStart} to {countEnd}
    </div>
  );
}
