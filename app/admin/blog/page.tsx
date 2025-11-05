"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

function AdminBlogPageContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    thumbnail_url: "",
    author: "CB Trading Team",
    published: true,
  });

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && { slug: generateSlug(value) }),
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      published: e.target.checked,
    }));
  };

  // Create new post
  const createPost = async () => {
    if (!formData.title || !formData.content) {
      alert("Title and content are required!");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error creating post:", error);
      alert("Error creating post: " + error.message);
    } else {
      alert("Post created successfully!");
      resetForm();
      fetchPosts();
    }
  };

  // Update existing post
  const updatePost = async () => {
    if (!editingPost) return;

    const { error } = await supabase
      .from("posts")
      .update({
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editingPost.id);

    if (error) {
      console.error("Error updating post:", error);
      alert("Error updating post: " + error.message);
    } else {
      alert("Post updated successfully!");
      resetForm();
      fetchPosts();
    }
  };

  // Delete post
  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post: " + error.message);
    } else {
      alert("Post deleted successfully!");
      fetchPosts();
    }
  };

  // Toggle publish status
  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from("posts")
      .update({
        published: !post.published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (error) {
      console.error("Error toggling publish status:", error);
      alert("Error updating publish status: " + error.message);
    } else {
      fetchPosts();
    }
  };

  // Start editing
  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      thumbnail_url: post.thumbnail_url,
      author: post.author,
      published: post.published,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      thumbnail_url: "",
      author: "CB Trading Team",
      published: true,
    });
    setEditingPost(null);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-primary-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-emerald-400">
            CB Trading - Blog Admin
          </h1>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Editor Form */}
        <div className="mb-12 bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-400">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
            {isEditing && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                placeholder="Enter post title..."
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Slug (auto-generated)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-400"
                placeholder="post-slug"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                placeholder="Author name..."
              />
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnail_url"
                value={formData.thumbnail_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white resize-none"
                placeholder="Short description of the post..."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Content (HTML supported) *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white resize-none font-mono text-sm"
                placeholder="<p>Your content here... HTML is supported</p>"
              />
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="w-4 h-4 accent-emerald-500"
              />
              <label
                htmlFor="published"
                className="text-gray-300 font-semibold"
              >
                Published
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={editingPost ? updatePost : createPost}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              <Save size={20} />
              {editingPost ? "Update Post" : "Create Post"}
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-emerald-400">
            All Posts ({posts.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 text-gray-400">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No posts yet. Create your first post!
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail */}
                    {post.thumbnail_url && (
                      <div className="w-full md:w-48 h-32 flex-shrink-0">
                        <img
                          src={post.thumbnail_url}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {post.published ? (
                            <span className="flex items-center gap-1 px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold">
                              <Eye size={14} />
                              Published
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-3 py-1 bg-gray-600/20 border border-gray-500/30 rounded-full text-gray-400 text-xs font-semibold">
                              <EyeOff size={14} />
                              Draft
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>Created: {formatDate(post.created_at)}</span>
                        <span>•</span>
                        <span>Updated: {formatDate(post.updated_at)}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => startEdit(post)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 rounded-lg transition-all duration-300 text-sm font-semibold"
                        >
                          <Edit size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => togglePublish(post)}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-400 rounded-lg transition-all duration-300 text-sm font-semibold"
                        >
                          {post.published ? (
                            <>
                              <EyeOff size={16} />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye size={16} />
                              Publish
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => deletePost(post.id, post.title)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 border border-red-500/30 hover:border-red-400 rounded-lg transition-all duration-300 text-sm font-semibold"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <ProtectedRoute>
      <AdminBlogPageContent />
    </ProtectedRoute>
  );
}
