"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Download, Trash2, Search, RefreshCw } from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Subscriber {
  id: string;
  email: string;
  agreed_to_terms: boolean;
  subscribed_at: string;
}

function AdminSubscribersPageContent() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch subscribers from Supabase
  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (error) {
      console.error("Error fetching subscribers:", error);
      alert("Error fetching subscribers: " + error.message);
    } else {
      setSubscribers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete subscriber
  const deleteSubscriber = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete subscriber "${email}"?`))
      return;

    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) {
      console.error("Error deleting subscriber:", error);
      alert("Error deleting subscriber: " + error.message);
    } else {
      alert("Subscriber deleted successfully!");
      fetchSubscribers();
    }
  };

  // Export subscribers to CSV
  const exportToCSV = () => {
    const csv = [
      ["Email", "Subscribed At", "Agreed to Terms"],
      ...subscribers.map((sub) => [
        sub.email,
        new Date(sub.subscribed_at).toLocaleString(),
        sub.agreed_to_terms ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter subscribers based on search
  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
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
          <h1 className="text-2xl font-bold text-purple-400">
            Newsletter Subscribers
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
        {/* Stats & Actions */}
        <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Mail size={32} className="text-purple-400" />
              <div>
                <div className="text-3xl font-bold text-white">
                  {subscribers.length}
                </div>
                <div className="text-gray-400 text-sm">Total Subscribers</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchSubscribers}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-400 rounded-lg transition-all duration-300"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              disabled={subscribers.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-400 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email..."
              className="w-full pl-12 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-white"
            />
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-gradient-to-br from-primary-900/50 to-primary-800/50 border border-purple-500/30 rounded-xl overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              Loading subscribers...
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {searchTerm
                ? "No subscribers found matching your search."
                : "No subscribers yet. Start collecting emails!"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/50 border-b border-purple-500/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Subscribed At
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Terms
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {filteredSubscribers.map((subscriber, index) => (
                    <tr
                      key={subscriber.id}
                      className="hover:bg-purple-900/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-purple-400" />
                          <span className="text-white font-medium">
                            {subscriber.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {formatDate(subscriber.subscribed_at)}
                      </td>
                      <td className="px-6 py-4">
                        {subscriber.agreed_to_terms ? (
                          <span className="px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold">
                            Agreed
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-600/20 border border-gray-500/30 rounded-full text-gray-400 text-xs font-semibold">
                            N/A
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              deleteSubscriber(subscriber.id, subscriber.email)
                            }
                            className="p-2 bg-red-600/80 hover:bg-red-600 border border-red-500/30 hover:border-red-400 rounded-lg transition-all duration-300"
                            title="Delete subscriber"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredSubscribers.length > 0 && (
          <div className="mt-6 text-center text-gray-400 text-sm">
            Showing {filteredSubscribers.length} of {subscribers.length}{" "}
            subscribers
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminSubscribersPage() {
  return (
    <ProtectedRoute>
      <AdminSubscribersPageContent />
    </ProtectedRoute>
  );
}
