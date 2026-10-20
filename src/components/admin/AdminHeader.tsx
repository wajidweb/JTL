"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const pathname = usePathname();

  // Dynamic breadcrumb label
  const getPageTitle = () => {
    if (pathname.includes("/admin/team")) return "Team Members";
    if (pathname.includes("/admin/gallery")) return "Gallery Management";
    if (pathname.includes("/admin/videos")) return "Videos Management";
    return "Dashboard Overview";
  };

  return (
    <header className="admin-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        <button
          onClick={onToggleSidebar}
          className="admin-mobile-toggle"
          aria-label="Toggle Navigation Menu"
        >
          <FaBars size={16} />
        </button>

        <h1
          className="admin-page-title"
          style={{
            color: "#ffffff",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {getPageTitle()}
        </h1>
      </div>

      <div className="admin-topbar-actions">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-outline"
          style={{ color: "#ffffff" }}
          title="View Live Website"
        >
          <span className="admin-btn-label">View Live Site</span>
          <FaArrowUpRightFromSquare size={12} />
        </Link>
      </div>
    </header>
  );
}
