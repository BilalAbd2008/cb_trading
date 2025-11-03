"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface WhopReview {
  id: string;
  user: {
    username: string;
    profile_pic_url?: string;
  };
  rating: number;
  title: string;
  body: string;
  created_at: number;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<WhopReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from Whop API
    const fetchReviews = async () => {
      try {
        // Using the company/experience ID from the Whop URL
        const response = await fetch(
          `https://api.whop.com/api/v5/companies/biz_690ae58e08f7fd/reviews?page=1&per=50`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Whop API Response:", data);

          // Check different possible data structures
          const reviewsData = data.reviews || data.data || data;

          if (Array.isArray(reviewsData) && reviewsData.length > 0) {
            setReviews(reviewsData);
          } else {
            // Use fallback testimonials
            useFallbackTestimonials();
          }
        } else {
          console.log("API response not ok, status:", response.status);
          useFallbackTestimonials();
        }
      } catch (error) {
        console.error("Error fetching Whop reviews:", error);
        useFallbackTestimonials();
      } finally {
        setLoading(false);
      }
    };

    const useFallbackTestimonials = () => {
      // Fallback testimonials based on the image
      setReviews([
        {
          id: "1",
          user: {
            username: "Lucid",
            profile_pic_url: "",
          },
          rating: 5,
          title: "Best discord out there",
          body: "Honestly the best discord out there. I'm learning how to trade from pro traders every single days. There's live streams, videos and 24/7 help. While I'm learning, the pro traders give me multiple signals/trades to put on each week too! Also I'm being told what coins to buy to make the most money thi...",
          created_at: Date.now() / 1000 - 8 * 30 * 24 * 60 * 60, // 8 months ago
        },
        {
          id: "2",
          user: {
            username: "Matthew Dutton",
            profile_pic_url: "",
          },
          rating: 5,
          title: "Started as a beginner",
          body: "Started as a beginner a year ago, learned so much through the year, everyone's helpful 24/7, don't miss the opportunity if it arises ...",
          created_at: Date.now() / 1000 - 9 * 30 * 24 * 60 * 60, // 9 months ago
        },
        {
          id: "3",
          user: {
            username: "James Stenton",
            profile_pic_url: "",
          },
          rating: 5,
          title: "Perfect for beginners",
          body: "I'm the most beginner, beginner there is. Didn't have a clue. I've only been in 2 days and already leaning the basics and much more. So much content and help. Get involved you won't regret it",
          created_at: Date.now() / 1000 - 9 * 30 * 24 * 60 * 60, // 9 months ago
        },
      ]);
    };

    fetchReviews();
  }, []);

  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  if (loading) {
    return (
      <section id="testimonials" className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Members Say
          </h2>
          <div className="flex items-center justify-center">
            <div className="text-gray-400">Loading testimonials...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 overflow-hidden">
      {/* Title with container */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-center">What Our Members Say</h2>
      </div>

      {/* Full Width Carousel - No Padding */}
      <div className="relative w-full">
        {/* Gradient Overlays - Fixed to viewport edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-primary-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-primary-900 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Reviews - Full Width */}
        <div className="overflow-hidden w-full">
          <div className="flex gap-6 animate-scroll-left">
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-[400px] bg-gradient-to-br from-primary-800/50 to-primary-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  {review.user.profile_pic_url ? (
                    <img
                      src={review.user.profile_pic_url}
                      alt={review.user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-600/30 flex items-center justify-center text-2xl">
                      {review.user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold">{review.user.username}</h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-600 text-gray-600"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {review.title && (
                  <h5 className="font-semibold text-white mb-2">
                    {review.title}
                  </h5>
                )}

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                  {review.body}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(review.created_at * 1000).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
