"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import BlogModal from "./BlogModal";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  author: string;
  created_at: string;
  published: boolean;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <section id="blog" className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary-900/20 to-black" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-700 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="inline-block mb-4">
            <span className="text-emerald-400 font-mono text-sm tracking-wider">
              {}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Insights, Ideas & Industry Trends
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay ahead of the market with our expert analysis and trading
            insights
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                onClick={() => openModal(post)}
              />
            ))}
          </div>
        )}

        {/* See More Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-900/80 hover:bg-primary-800 border-2 border-purple-500/40 hover:border-purple-400/70 px-8 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-105"
          >
            See More Blogs
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Blog Modal */}
      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

function BlogCard({
  post,
  index,
  onClick,
}: {
  post: BlogPost;
  index: number;
  onClick: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <article
      ref={ref}
      onClick={onClick}
      className={`group h-full bg-gradient-to-br from-primary-800/50 to-primary-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden transition-all duration-700 ease-out hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 hover:transform hover:translateY-[-8px] cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image with Green Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-emerald-700/40 to-transparent z-10" />
        {post.thumbnail_url ? (
          <img
            src={post.thumbnail_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center">
            <span className="text-6xl opacity-50">📊</span>
          </div>
        )}

        {/* Title Overlay on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <h3 className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
          <span className="text-gray-400 text-sm">Read More</span>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-gray-500 text-xs">
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
