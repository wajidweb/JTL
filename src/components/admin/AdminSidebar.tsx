"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaChartPie,
  FaImages,
  FaVideo,
  FaUserDoctor,
  FaArrowRightFromBracket,
  FaXmark,
} from "react-icons/fa6";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Prevent background scroll on mobile when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: FaChartPie },
    { label: "Team Members", href: "/admin/team", icon: FaUserDoctor },
    { label: "Gallery", href: "/admin/gallery", icon: FaImages },
    { label: "Videos", href: "/admin/videos", icon: FaVideo },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-brand" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", flexShrink: 0 }}>
              <Image
                src="/assets/img/logo.png"
                alt="JTL Logo"
                width={42}
                height={42}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className="admin-brand-text">
              <h3 style={{ color: "#ffffff" }}>JTL Centre</h3>
              <span style={{ color: "var(--admin-gold)" }}>Admin Portal</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="admin-mobile-close"
            aria-label="Close sidebar menu"
          >
            <FaXmark />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="admin-sidebar-nav admin-scroll">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                style={{ color: isActive ? "var(--admin-gold)" : "#ffffff" }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile & Logout Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-profile">
            <div className="admin-avatar">AK</div>
            <div>
              <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff" }}>
                Adil Khan
              </div>
              <div style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.7)" }}>
                Super Admin
              </div>
            </div>
          </div>

          <button
            type="button"
            title="Log Out"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("jtl_admin_token");
                localStorage.removeItem("jtl_admin_user");
              }
              router.replace("/admin/login");
            }}
            style={{
              color: "#ffffff",
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "6px",
              opacity: 0.8,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
          >
            <FaArrowRightFromBracket />
          </button>
        </div>
      </aside>
    </>
  );
}
