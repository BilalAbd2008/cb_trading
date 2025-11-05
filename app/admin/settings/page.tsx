"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, Save, Eye, EyeOff, LogOut } from "lucide-react";
import {
  getAdminCredentials,
  updateAdminCredentials,
  logout,
} from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

function AdminSettingsContent() {
  const router = useRouter();
  const currentAdmin = getAdminCredentials();

  const [formData, setFormData] = useState({
    name: currentAdmin.name,
    email: currentAdmin.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    // Verify current password
    if (formData.currentPassword !== currentAdmin.password) {
      setStatus("error");
      setMessage("Current password is incorrect");
      return;
    }

    // If changing password, validate new password
    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        setStatus("error");
        setMessage("New password must be at least 8 characters");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setStatus("error");
        setMessage("New passwords do not match");
        return;
      }
    }

    // Update credentials
    const passwordToSave = formData.newPassword || currentAdmin.password;
    const success = updateAdminCredentials(
      formData.email,
      passwordToSave,
      formData.name
    );

    if (success) {
      setStatus("success");
      setMessage("Settings updated successfully!");

      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // If password was changed, logout and redirect to login
      if (formData.newPassword) {
        setTimeout(() => {
          logout();
          router.push("/admin/login");
        }, 2000);
      }
    } else {
      setStatus("error");
      setMessage("Failed to update settings");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-primary-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-purple-400">Admin Settings</h1>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Dashboard
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
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Current Admin Info */}
        <div className="mb-8 bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-400">
            Current Account
          </h2>
          <div className="space-y-2 text-gray-300">
            <p>
              <span className="text-gray-400">Name:</span>{" "}
              <span className="font-semibold">{currentAdmin.name}</span>
            </p>
            <p>
              <span className="text-gray-400">Email:</span>{" "}
              <span className="font-semibold">{currentAdmin.email}</span>
            </p>
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-emerald-400">
            Update Account Settings
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Admin Name
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                  required
                />
              </div>
            </div>

            <div className="border-t border-purple-500/20 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                Change Password (Optional)
              </h3>

              {/* Current Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Current Password *
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                    required
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  New Password (leave blank to keep current)
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                    placeholder="Enter new password (min 8 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              {formData.newPassword && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Status Message */}
            {status === "success" && (
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 text-emerald-400">
                ✅ {message}
                {formData.newPassword && (
                  <p className="text-sm mt-2">Redirecting to login page...</p>
                )}
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
                ❌ {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              <Save size={20} />
              Save Changes
            </button>
          </form>

          {/* Warning */}
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400 text-sm">
              ⚠️ <strong>Important:</strong> If you change your password, you
              will be logged out and need to login again with the new password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettings() {
  return (
    <ProtectedRoute>
      <AdminSettingsContent />
    </ProtectedRoute>
  );
}
