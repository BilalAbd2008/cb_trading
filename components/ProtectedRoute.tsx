"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    if (!isAdminLoggedIn()) {
      // Redirect to login
      router.push("/admin/login");
    }
  }, [router, pathname]);

  // Show nothing while checking auth
  if (!isAdminLoggedIn()) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-primary-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
