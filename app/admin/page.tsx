"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Mail,
  Settings,
  BarChart3,
  LogOut,
  User,
} from "lucide-react";
import { logout, getAdminInfo } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

function AdminDashboardContent() {
  const router = useRouter();
  const adminInfo = getAdminInfo();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-primary-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-emerald-400">
                CB Trading Admin Dashboard
              </h1>
              <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                <User size={14} />
                {adminInfo.email}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/admin/settings"
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Settings size={18} />
                Settings
              </Link>
              <Link
                href="/"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Back to Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome, Admin!</h2>
          <p className="text-gray-400">
            Manage your CB Trading website from this dashboard
          </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Management */}
          <Link href="/admin/blog">
            <div className="group bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 border-2 border-emerald-500/30 hover:border-emerald-400/60 rounded-xl p-8 transition-all duration-300 hover:transform hover:translateY-[-8px] hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-600/20 rounded-lg group-hover:bg-emerald-600/30 transition-colors">
                  <FileText size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold">Blog Posts</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Create, edit, and manage blog posts. Upload images and publish
                content.
              </p>
              <div className="text-emerald-400 font-semibold group-hover:text-emerald-300">
                Manage Posts →
              </div>
            </div>
          </Link>

          {/* Newsletter Subscribers */}
          <Link href="/admin/subscribers">
            <div className="group bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-2 border-purple-500/30 hover:border-purple-400/60 rounded-xl p-8 transition-all duration-300 hover:transform hover:translateY-[-8px] hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                  <Mail size={32} className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">Subscribers</h3>
              </div>
              <p className="text-gray-400 mb-4">
                View and manage newsletter subscribers. Export email lists.
              </p>
              <div className="text-purple-400 font-semibold group-hover:text-purple-300">
                View Subscribers →
              </div>
            </div>
          </Link>

          {/* Analytics (Coming Soon) */}
          <div className="group bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-2 border-blue-500/30 rounded-xl p-8 opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <BarChart3 size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold">Analytics</h3>
            </div>
            <p className="text-gray-400 mb-4">
              View website traffic, user engagement, and performance metrics.
            </p>
            <div className="text-blue-400 font-semibold">Coming Soon</div>
          </div>

          {/* Settings (Coming Soon) */}
          <div className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-2 border-gray-500/30 rounded-xl p-8 opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-600/20 rounded-lg">
                <Settings size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold">Settings</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Configure website settings, SEO, and integrations.
            </p>
            <div className="text-gray-400 font-semibold">Coming Soon</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-1">Total Blog Posts</div>
            <div className="text-3xl font-bold text-emerald-400">
              <Link href="/admin/blog" className="hover:underline">
                View All
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-1">
              Newsletter Subscribers
            </div>
            <div className="text-3xl font-bold text-purple-400">
              <Link href="/admin/subscribers" className="hover:underline">
                View List
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-1">Last Updated</div>
            <div className="text-xl font-bold text-gray-300">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6 text-emerald-400">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 p-4 bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 hover:border-emerald-400/50 rounded-lg transition-all duration-300"
            >
              <FileText size={20} className="text-emerald-400" />
              <span className="font-semibold">Create New Blog Post</span>
            </Link>

            <Link
              href="/admin/subscribers"
              className="flex items-center gap-3 p-4 bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 hover:border-purple-400/50 rounded-lg transition-all duration-300"
            >
              <Mail size={20} className="text-purple-400" />
              <span className="font-semibold">View Subscribers</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
