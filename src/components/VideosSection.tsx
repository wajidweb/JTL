"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlay, FaXmark, FaWhatsapp, FaArrowRight, FaUser } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

interface VideoItem {
  id: number;
  category: "Session" | "Family" | "Message";
  title: string;
  badge: string;
  description: string;
  parent_name?: string;
  video_type: "upload" | "link";
  video_url: string;
  thumbnail_url?: string;
  display_order?: number;
}

function getYouTubeEmbedUrl(url: string) {
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return url;
}

export default function VideosSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = siteConfig.apiUrl;
  const BACKEND_URL = API_BASE.replace(/\/api$/, "");

  // Load dynamic videos strictly from the backend
  useEffect(() => {
    let ignore = false;

    async function loadVideos() {
      try {
        const res = await fetch(`${API_BASE}/videos`);
        const json = await res.json();
        if (!ignore && res.ok && json.success && Array.isArray(json.data)) {
          setVideos(json.data);
        }
      } catch (err) {
        console.error("Error fetching videos from backend:", err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadVideos();

    return () => {
      ignore = true;
    };
  }, [API_BASE]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!activeVideo) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const sessionVideos = videos.filter((v) => v.category === "Session");
  const familyVideos = videos.filter((v) => v.category === "Family");
  const messageVideos = videos.filter((v) => v.category === "Message");

  return (
    <section id="videos" className="jtl-videos-section pos-rel z-1 gradient-bg radius-20 mt-30">
      <div className="container-fluid">
        {/* Header */}
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10">
            <div className="sec-title text-center mb-40">
              <span className="xb-item--subtitle">Visual Glimpses</span>
              <h2 className="xb-item--title mb-15">Videos</h2>
              <p
                className="xb-item--content"
                style={{ maxWidth: "720px", margin: "0 auto", lineHeight: "1.7" }}
              >
                Watch our therapy sessions in action and listen to inspiring progress stories shared directly by our families in Mingora, Swat.
              </p>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                border: "3px solid rgba(230, 158, 1, 0.2)",
                borderTopColor: "var(--admin-gold, #e69e01)",
                borderRadius: "50%",
                animation: "spin 0.75s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ color: "#ffffff", opacity: 0.85, fontSize: "14px" }}>
              Loading video sessions and family stories...
            </p>
          </div>
        ) : videos.length === 0 ? (
          /* Empty State */
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "18px",
              border: "1px dashed rgba(255, 255, 255, 0.15)",
              maxWidth: "600px",
              margin: "0 auto 30px",
            }}
          >
            <p style={{ color: "#ffffff", opacity: 0.85, fontSize: "15px", marginBottom: "18px" }}>
              Our clinical session videos and parent stories are being uploaded. Reach out for a live session overview.
            </p>
            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="thm-btn thm-btn--whatsapp"
              style={{ display: "inline-flex" }}
            >
              <span>Consult On WhatsApp: {siteConfig.whatsappNumber}</span>
            </Link>
          </div>
        ) : (
          <>
            {/* 1. Watch Our Sessions Subsection */}
            {sessionVideos.length > 0 && (
              <>
                <div className="jtl-video-category-header">
                  <h3 className="jtl-video-category-title">
                    <span className="cat-dot"></span>
                    Watch our sessions
                  </h3>
                </div>

                <div className="jtl-video-sessions-grid mb-40">
                  {sessionVideos.map((item) => {
                    const thumb = item.thumbnail_url
                      ? item.thumbnail_url.startsWith("http")
                        ? item.thumbnail_url
                        : `${BACKEND_URL}${item.thumbnail_url}`
                      : "/assets/img/hero/hero_img.jpeg";

                    return (
                      <div
                        key={item.id}
                        className="jtl-video-card"
                        onClick={() => setActiveVideo(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setActiveVideo(item);
                        }}
                        aria-label={`Watch ${item.title}`}
                      >
                        <div className="jtl-video-thumb-wrap">
                          <img src={thumb} alt={item.title} />
                          <div className="jtl-video-play-btn">
                            <FaPlay size={18} />
                          </div>
                        </div>
                        <div className="jtl-video-body">
                          <span className="jtl-video-badge">{item.badge}</span>
                          <h4 className="jtl-video-title">{item.title}</h4>
                          <p className="jtl-video-desc">{item.description}</p>
                          <span className="jtl-video-watch-link">
                            <span>Watch Video Session</span>
                            <FaArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* 2. Hear It From Our Families Subsection */}
            {familyVideos.length > 0 && (
              <>
                <div className="jtl-video-category-header">
                  <h3 className="jtl-video-category-title">
                    <span className="cat-dot" style={{ backgroundColor: "#2d7082" }}></span>
                    Hear it from our families
                  </h3>
                </div>

                <div className="jtl-video-testimonials-grid mb-40">
                  {familyVideos.map((item) => {
                    const thumb = item.thumbnail_url
                      ? item.thumbnail_url.startsWith("http")
                        ? item.thumbnail_url
                        : `${BACKEND_URL}${item.thumbnail_url}`
                      : "/assets/img/hero/hero_img.jpeg";

                    return (
                      <div
                        key={item.id}
                        className="jtl-video-card"
                        onClick={() => setActiveVideo(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setActiveVideo(item);
                        }}
                        aria-label={`Watch ${item.title} ${item.parent_name ? `by ${item.parent_name}` : ""}`}
                      >
                        <div className="jtl-video-thumb-wrap">
                          <img src={thumb} alt={item.title} />
                          <div className="jtl-video-play-btn">
                            <FaPlay size={18} />
                          </div>
                        </div>
                        <div className="jtl-video-body">
                          <span
                            className="jtl-video-badge"
                            style={{ color: "#38bdf8", background: "rgba(56, 189, 248, 0.12)" }}
                          >
                            {item.badge}
                          </span>
                          <h4 className="jtl-video-title">{item.title}</h4>
                          {item.parent_name && (
                            <p className="jtl-video-speaker" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                              <FaUser size={12} style={{ color: "var(--admin-gold)" }} />
                              <span>{item.parent_name}</span>
                            </p>
                          )}
                          <p className="jtl-video-desc">{item.description}</p>
                          <span className="jtl-video-watch-link" style={{ color: "#38bdf8" }}>
                            <span>Listen to Family Story</span>
                            <FaArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* 3. Messages & Announcements Subsection */}
            {messageVideos.length > 0 && (
              <>
                <div className="jtl-video-category-header">
                  <h3 className="jtl-video-category-title">
                    <span className="cat-dot" style={{ backgroundColor: "#c084fc" }}></span>
                    Messages &amp; Announcements (FYI)
                  </h3>
                </div>

                <div className="jtl-video-sessions-grid mb-40">
                  {messageVideos.map((item) => {
                    const thumb = item.thumbnail_url
                      ? item.thumbnail_url.startsWith("http")
                        ? item.thumbnail_url
                        : `${BACKEND_URL}${item.thumbnail_url}`
                      : "/assets/img/hero/hero_img.jpeg";

                    return (
                      <div
                        key={item.id}
                        className="jtl-video-card"
                        onClick={() => setActiveVideo(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setActiveVideo(item);
                        }}
                        aria-label={`Watch ${item.title}`}
                      >
                        <div className="jtl-video-thumb-wrap">
                          <img src={thumb} alt={item.title} />
                          <div className="jtl-video-play-btn">
                            <FaPlay size={18} />
                          </div>
                        </div>
                        <div className="jtl-video-body">
                          <span
                            className="jtl-video-badge"
                            style={{ color: "#c084fc", background: "rgba(168, 85, 247, 0.12)" }}
                          >
                            {item.badge}
                          </span>
                          <h4 className="jtl-video-title">{item.title}</h4>
                          <p className="jtl-video-desc">{item.description}</p>
                          <span className="jtl-video-watch-link" style={{ color: "#c084fc" }}>
                            <span>Watch Message / FYI</span>
                            <FaArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* Section Footer WhatsApp CTA */}
        <div className="text-center mt-30">
          <Link
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="thm-btn thm-btn--whatsapp"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
            }}
          >
            <FaWhatsapp size={20} />
            <span>Connect With Our Specialists On WhatsApp: {siteConfig.whatsappNumber}</span>
          </Link>
        </div>
      </div>

      {/* Video Modal Player (Positioned below navbar) */}
      {activeVideo && (
        <div
          className="jtl-video-modal-backdrop"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="jtl-video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="jtl-video-modal-player-box">
              <button
                type="button"
                className="jtl-lightbox-close"
                style={{ top: "12px", right: "12px", zIndex: 10 }}
                onClick={() => setActiveVideo(null)}
                aria-label="Close video player"
              >
                <FaXmark size={18} />
              </button>

              {activeVideo.video_type === "upload" ? (
                <video
                  src={
                    activeVideo.video_url.startsWith("http")
                      ? activeVideo.video_url
                      : `${BACKEND_URL}${activeVideo.video_url}`
                  }
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    background: "#000000",
                  }}
                />
              ) : (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.video_url)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                  }}
                />
              )}
            </div>

            <div className="jtl-video-modal-info">
              <span className="jtl-video-badge">{activeVideo.badge}</span>
              <h4 style={{ color: "#ffffff", fontSize: "19px", fontWeight: 800, marginTop: "8px", marginBottom: "4px" }}>
                {activeVideo.title}
              </h4>
              {activeVideo.parent_name && (
                <p style={{ color: "#38bdf8", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
                  {activeVideo.parent_name}
                </p>
              )}
              <p style={{ color: "#cbd5e1", fontSize: "14.5px", lineHeight: "1.6", marginBottom: "16px" }}>
                {activeVideo.description}
              </p>
              <Link
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="jtl-btn-whatsapp"
                style={{ fontSize: "14px", padding: "10px 22px" }}
              >
                <FaWhatsapp size={16} />
                <span>Inquire About This Session on WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
