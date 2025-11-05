"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminEmailsPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "cbtrading2024"; // Ganti dengan password yang kamu mau

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchSubscribers();
    } else {
      alert("Wrong password!");
    }
  };

  const fetchSubscribers = () => {
    try {
      const stored = localStorage.getItem("newsletter_subscribers");
      const data = stored ? JSON.parse(stored) : [];
      setSubscribers(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["Email", "Date Subscribed"],
      ...subscribers.map((sub) => [
        sub.email,
        new Date(sub.created_at).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0a0015] to-black">
        <div className="bg-primary-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-primary-900/80 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/60 mb-4"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0015] to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Newsletter Subscribers</h1>
          <button
            onClick={exportToCSV}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Export to CSV
          </button>
        </div>

        <div className="bg-primary-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">
                    Date Subscribed
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : subscribers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No subscribers yet
                    </td>
                  </tr>
                ) : (
                  subscribers.map((subscriber, index) => (
                    <tr
                      key={subscriber.id}
                      className="border-t border-purple-500/10 hover:bg-primary-900/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(subscriber.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-primary-900/30 border-t border-purple-500/10">
            <p className="text-sm text-gray-400">
              Total Subscribers:{" "}
              <span className="text-white font-semibold">
                {subscribers.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
