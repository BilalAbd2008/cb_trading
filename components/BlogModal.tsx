"use client";

import { X, Calendar, User, Share2 } from "lucide-react";
import { useEffect } from "react";

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

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `${window.location.origin}/blog/${post.slug}`,
      });
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/blog/${post.slug}`
      );
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Backdrop with smooth fade */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal with slide up animation */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8 flex items-start justify-center">
          <div
            className={`relative bg-gradient-to-b from-primary-900 to-black border-2 border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 max-w-4xl w-full transition-all duration-300 ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 border border-purple-500/30 hover:border-purple-400/50 rounded-full transition-all duration-300 group"
            >
              <X
                size={24}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </button>

            {/* Featured Image */}
            {post.thumbnail_url && (
              <div className="relative h-[300px] md:h-[400px] rounded-t-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-emerald-700/40 to-transparent z-10" />
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-emerald-400">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>{post.author || "CB Trading Team"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <button
                    onClick={sharePost}
                    className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                </div>

                {post.excerpt && (
                  <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-emerald-500 pl-6 py-2">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {/* Article Content */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:text-gray-300 prose-ul:my-4
                  prose-li:my-1
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400
                  prose-code:text-purple-400 prose-code:bg-primary-900/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-primary-900/50 prose-pre:border prose-pre:border-purple-500/20"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Footer Actions */}
            <div className="px-8 md:px-12 pb-8 pt-6 border-t border-purple-500/20">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <button
                  onClick={sharePost}
                  className="flex items-center gap-2 bg-primary-900/80 hover:bg-primary-800 border-2 border-purple-500/40 hover:border-purple-400/70 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  <Share2 size={20} />
                  Share Article
                </button>

                <button
                  onClick={onClose}
                  className="flex items-center gap-2 bg-red-600/90 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                >
                  <X size={20} />
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </>
  );
}
