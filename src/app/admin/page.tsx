"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  FaUserDoctor,
  FaImages,
  FaVideo,
  FaPlus,
  FaWhatsapp,
  FaArrowUpRightFromSquare,
  FaCircleCheck,
  FaPlay,
  FaArrowRotateRight,
} from "react-icons/fa6";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { siteConfig } from "@/config/site";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  skills?: string;
  whatsapp_number?: string;
  profile_picture?: string;
}

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  created_at?: string;
}

interface VideoItem {
  id: number;
  category: "Session" | "Family";
  title: string;
  badge: string;
  video_type: "upload" | "link";
  video_url: string;
  thumbnail_url?: string;
  parent_name?: string;
  created_at?: string;
}

interface DashboardAnalytics {
  totals: {
    specialists: number;
    gallery: number;
    sessionVideos: number;
    familyVideos: number;
    totalVideos: number;
  };
  activityTrend: Array<{
    month: string;
    photos: number;
    sessions: number;
    testimonials: number;
  }>;
  distribution: Array<{
    name: string;
    value: number;
  }>;
  recentSpecialists: TeamMember[];
  recentVideos: VideoItem[];
  recentGallery: GalleryItem[];
}

const DONUT_COLORS = ["#e69e01", "#38bdf8", "#22c55e", "#a855f7"];

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Client hydration check without triggering cascading setState in effects
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const API_BASE = siteConfig.apiUrl;
  const BACKEND_URL = API_BASE.replace(/\/api$/, "");

  // Real Dynamic Analytics Fetch from MySQL Backend
  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/analytics/dashboard`);
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setAnalytics(json.data);
      }
    } catch (err) {
      console.error("Dashboard analytics load error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE]);

  // Initial load
  useEffect(() => {
    let ignore = false;
    async function loadInitial() {
      try {
        const res = await fetch(`${API_BASE}/analytics/dashboard`);
        const json = await res.json();
        if (!ignore && res.ok && json.success && json.data) {
          setAnalytics(json.data);
        }
      } catch (err) {
        console.error("Initial dashboard load error:", err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    loadInitial();
    return () => {
      ignore = true;
    };
  }, [API_BASE]);

  const totals = analytics?.totals || {
    specialists: 0,
    gallery: 0,
    sessionVideos: 0,
    familyVideos: 0,
    totalVideos: 0,
  };

  const activityData = analytics?.activityTrend || [];
  const distributionData = analytics?.distribution || [];
  const recentSpecialists = analytics?.recentSpecialists || [];
  const recentVideos = analytics?.recentVideos || [];
  const hasContent = distributionData.some((d) => d.value > 0);

  return (
    <div>
      {/* 1. Welcome & Greeting Banner */}
      <div
        className="admin-panel-card"
        style={{
          background: "linear-gradient(135deg, #0e1144 0%, #151854 100%)",
          borderColor: "var(--admin-border-gold)",
          marginBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "18px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color: "var(--admin-gold)",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Management Portal
          </span>
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 6px",
            }}
          >
            Welcome, Administrator 👋
          </h2>
          <p
            style={{
              fontSize: "13.5px",
              color: "rgba(255, 255, 255, 0.75)",
              margin: 0,
              maxWidth: "600px",
            }}
          >
            Monitor live centre operations, track published therapy media, and manage clinical staff in Mingora, Swat.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={loadDashboardData}
            className="admin-action-btn"
            title="Refresh All Statistics"
            style={{ width: "42px", height: "42px", borderRadius: "10px" }}
          >
            <FaArrowRotateRight />
          </button>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-outline"
            style={{ height: "42px", color: "#ffffff" }}
          >
            <span>Live Website</span>
            <FaArrowUpRightFromSquare size={12} />
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid (3 Distinct Resource Cards) */}
      <div className="admin-stats-grid">
        {/* Metric 1: Team Members */}
        <Link
          href="/admin/team"
          className="admin-stat-card"
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <div className="admin-stat-info">
            <span>Clinical Specialists</span>
            <h2>{isLoading ? "..." : totals.specialists}</h2>
            <div style={{ fontSize: "12px", color: "var(--admin-green)", marginTop: "6px", fontWeight: 600 }}>
              Active Practitioners →
            </div>
          </div>
          <div
            className="admin-stat-icon-wrap"
            style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}
          >
            <FaUserDoctor />
          </div>
        </Link>

        {/* Metric 2: Gallery Photos */}
        <Link
          href="/admin/gallery"
          className="admin-stat-card"
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <div className="admin-stat-info">
            <span>Gallery Moments</span>
            <h2>{isLoading ? "..." : totals.gallery}</h2>
            <div style={{ fontSize: "12px", color: "var(--admin-gold)", marginTop: "6px", fontWeight: 600 }}>
              Facility &amp; Therapy Photos →
            </div>
          </div>
          <div
            className="admin-stat-icon-wrap"
            style={{ background: "rgba(230, 158, 1, 0.15)", color: "var(--admin-gold)" }}
          >
            <FaImages />
          </div>
        </Link>

        {/* Metric 3: Video Content */}
        <Link
          href="/admin/videos"
          className="admin-stat-card"
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <div className="admin-stat-info">
            <span>Video Content</span>
            <h2>{isLoading ? "..." : totals.totalVideos}</h2>
            <div style={{ fontSize: "11.5px", color: "#38bdf8", marginTop: "6px", fontWeight: 600 }}>
              {totals.sessionVideos} Sessions · {totals.familyVideos} Family Stories →
            </div>
          </div>
          <div
            className="admin-stat-icon-wrap"
            style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}
          >
            <FaVideo />
          </div>
        </Link>
      </div>

      {/* 3. Real Dynamic Analytics & Charts Row */}
      {isMounted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1.1fr",
            gap: "24px",
            marginBottom: "32px",
          }}
          className="admin-charts-row"
        >
          {/* Chart 1: Real Activity Area Trend from MySQL */}
          <div className="admin-panel-card" style={{ marginBottom: 0 }}>
            <div className="admin-panel-header">
              <div>
                <h3 className="admin-panel-title">Publishing &amp; Content Trends</h3>
                <p className="admin-panel-desc">Real monthly uploads across gallery photos, sessions, and family stories</p>
              </div>
            </div>

            <div style={{ width: "100%", height: "290px", marginTop: "10px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e69e01" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#e69e01" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="cyanAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.45)" fontSize={12} />
                  <YAxis stroke="rgba(255, 255, 255, 0.45)" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#08082e",
                      borderColor: "rgba(230, 158, 1, 0.4)",
                      borderRadius: "10px",
                      color: "#ffffff",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Area
                    type="monotone"
                    dataKey="photos"
                    name="Gallery Photos"
                    stroke="#e69e01"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#goldAreaGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    name="Therapy Sessions"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#cyanAreaGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Real Content Breakdown Donut */}
          <div className="admin-panel-card" style={{ marginBottom: 0 }}>
            <div className="admin-panel-header">
              <div>
                <h3 className="admin-panel-title">Content Distribution</h3>
                <p className="admin-panel-desc">Real database portfolio share</p>
              </div>
            </div>

            <div style={{ width: "100%", height: "290px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {!hasContent ? (
                <div style={{ textAlign: "center", color: "var(--admin-text-dim)", padding: "20px" }}>
                  <p style={{ margin: "0 0 10px", fontSize: "13px" }}>No content added yet.</p>
                  <span style={{ fontSize: "12px" }}>Upload photos, videos, or specialists to view distribution.</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="45%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                          stroke="#0e1144"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#08082e",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "10px",
                        color: "#ffffff",
                        fontSize: "12px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "11.5px", paddingTop: "6px" }}
                      iconSize={10}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. Live Data Feed Row: Recent Specialists & Recent Media from MySQL */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "30px",
        }}
        className="admin-activity-row"
      >
        {/* Section 1: Active Specialists */}
        <div className="admin-panel-card" style={{ marginBottom: 0 }}>
          <div className="admin-panel-header">
            <div>
              <h3 className="admin-panel-title">Active Clinical Specialists</h3>
              <p className="admin-panel-desc">Staff supporting therapy in Mingora</p>
            </div>
            <Link
              href="/admin/team"
              className="admin-btn-outline"
              style={{ height: "32px", fontSize: "12px" }}
            >
              <span>Manage Team ({totals.specialists})</span>
            </Link>
          </div>

          {recentSpecialists.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 10px", color: "var(--admin-text-dim)" }}>
              <p style={{ margin: "0 0 14px", fontSize: "13px" }}>No specialists registered yet.</p>
              <Link href="/admin/team" className="admin-btn-primary" style={{ display: "inline-flex", width: "auto", padding: "0 18px", height: "36px", fontSize: "12.5px" }}>
                <FaPlus size={12} />
                <span>Add First Specialist</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentSpecialists.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {m.profile_picture ? (
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          border: "2px solid var(--admin-gold)",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={
                            m.profile_picture.startsWith("http")
                              ? m.profile_picture
                              : `${BACKEND_URL}${m.profile_picture}`
                          }
                          alt={m.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #1d6c80 0%, #08082e 100%)",
                          border: "2px solid var(--admin-gold)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff",
                          fontWeight: 800,
                          fontSize: "14px",
                          flexShrink: 0,
                        }}
                      >
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "14px" }}>
                        {m.name}
                      </div>
                      <div style={{ color: "var(--admin-gold)", fontSize: "11.5px", fontWeight: 600 }}>
                        {m.role}
                      </div>
                    </div>
                  </div>

                  {m.whatsapp_number && (
                    <a
                      href={`https://wa.me/${m.whatsapp_number.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--admin-green)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        textDecoration: "none",
                        background: "rgba(34, 197, 94, 0.1)",
                        padding: "5px 10px",
                        borderRadius: "8px",
                      }}
                    >
                      <FaWhatsapp size={13} />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Recent Videos & Media Snapshot */}
        <div className="admin-panel-card" style={{ marginBottom: 0 }}>
          <div className="admin-panel-header">
            <div>
              <h3 className="admin-panel-title">Published Videos &amp; Stories</h3>
              <p className="admin-panel-desc">Recent uploads available on the live website</p>
            </div>
            <Link
              href="/admin/videos"
              className="admin-btn-outline"
              style={{ height: "32px", fontSize: "12px" }}
            >
              <span>Manage Videos ({totals.totalVideos})</span>
            </Link>
          </div>

          {recentVideos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 10px", color: "var(--admin-text-dim)" }}>
              <p style={{ margin: "0 0 14px", fontSize: "13px" }}>No videos published yet.</p>
              <Link href="/admin/videos" className="admin-btn-primary" style={{ display: "inline-flex", width: "auto", padding: "0 18px", height: "36px", fontSize: "12.5px" }}>
                <FaPlus size={12} />
                <span>Publish First Video</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentVideos.map((v) => {
                const thumb = v.thumbnail_url
                  ? v.thumbnail_url.startsWith("http")
                    ? v.thumbnail_url
                    : `${BACKEND_URL}${v.thumbnail_url}`
                  : null;

                return (
                  <div
                    key={v.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                      <div
                        style={{
                          width: "48px",
                          height: "34px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          background: "#070726",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          position: "relative",
                        }}
                      >
                        {thumb ? (
                          <img src={thumb} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <FaPlay size={12} style={{ color: "var(--admin-gold)" }} />
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "13.5px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "240px",
                          }}
                          title={v.title}
                        >
                          {v.title}
                        </div>
                        <span
                          className={`admin-badge ${
                            v.category === "Family" ? "admin-badge-cyan" : "admin-badge-gold"
                          }`}
                          style={{ fontSize: "10px", marginTop: "2px" }}
                        >
                          {v.badge}
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/admin/videos"
                      style={{
                        color: "var(--admin-text-muted)",
                        fontSize: "12px",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      View →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 5. Quick Shortcut Footer Actions */}
      <div
        className="admin-panel-card"
        style={{
          marginBottom: 0,
          background: "rgba(255, 255, 255, 0.02)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCircleCheck style={{ color: "var(--admin-gold)" }} />
          <span style={{ fontSize: "13px", color: "var(--admin-text-muted)" }}>
            Need to publish new updates? Jump directly to management modules:
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link
            href="/admin/team"
            className="admin-btn-outline"
            style={{ fontSize: "12.5px", height: "36px" }}
          >
            <FaUserDoctor size={12} />
            <span>Add Specialist</span>
          </Link>

          <Link
            href="/admin/gallery"
            className="admin-btn-outline"
            style={{ fontSize: "12.5px", height: "36px" }}
          >
            <FaImages size={12} />
            <span>Upload Photo</span>
          </Link>

          <Link
            href="/admin/videos"
            className="admin-btn-outline"
            style={{ fontSize: "12.5px", height: "36px" }}
          >
            <FaVideo size={12} />
            <span>Add Video</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
