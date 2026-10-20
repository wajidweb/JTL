"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthToken() {
  return localStorage.getItem("jtl_admin_token");
}

function getServerToken() {
  return null;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Subscribe to localStorage without causing cascading setState renders
  const token = useSyncExternalStore(subscribe, getAuthToken, getServerToken);
  const isLoginPage = pathname === "/admin/login";

  // Auto-close drawer if screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Strict Authentication Guard: redirect unauthenticated users to /admin/login
  useEffect(() => {
    if (!isLoginPage && !token) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, token, router]);

  // If on login page, render children directly without dashboard shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If unauthenticated, hide dashboard completely
  if (!token) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--admin-bg, #08082e)",
          color: "#ffffff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="admin-spinner" />
          <span style={{ fontSize: "14px", opacity: 0.85 }}>
            Authenticating administrator session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout-container">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content-body">{children}</div>
      </div>
    </div>
  );
}
