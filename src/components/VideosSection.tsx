"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlay, FaXmark, FaWhatsapp, FaArrowRight } from "react-icons/fa6";

export default function VideosSection() {
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    speaker?: string;
    role?: string;
    badge: string;
    desc: string;
    youtubeId: string;
  } | null>(null);

  const sessionVideos = [
    {
      id: 1,
      title: "Speech Therapy Session",
      badge: "Clinical Session",
      youtubeId: "2Tcb_thFmsk",
      image: "https://img.youtube.com/vi/2Tcb_thFmsk/hqdefault.jpg",
      desc: "Inside a one to one speech therapy session focusing on sound articulation, vocabulary expansion, and social communication.",
    },
    {
      id: 2,
      title: "Occupational Therapy Session",
      badge: "Clinical Session",
      youtubeId: "opo5-drYiG0",
      image: "https://img.youtube.com/vi/opo5-drYiG0/hqdefault.jpg",
      desc: "Observing motor play, hand eye coordination exercises, and sensory calming strategies tailored for everyday routines.",
    },
    {
      id: 3,
      title: "Special Education Class",
      badge: "Classroom Learning",
      youtubeId: "PZToq5MSP9k",
      image: "https://img.youtube.com/vi/PZToq5MSP9k/hqdefault.jpg",
      desc: "A supportive classroom setting highlighting adaptive teaching tools, individualized education plans, and peer engagement.",
    },
  ];

  const familyVideos = [
    {
      id: 4,
      title: "Parent Testimonial",
      speaker: "[PARENT NAME]",
      role: "Mother of a child in Speech Therapy",
      badge: "Family Story",
      youtubeId: "XdaiHxplAyE",
      image: "https://img.youtube.com/vi/XdaiHxplAyE/hqdefault.jpg",
      desc: "Sharing her family journey, discovering early support at Journey Towards Life, and witnessing her child communicate with newfound confidence.",
    },
    {
      id: 5,
      title: "Parent Testimonial",
      speaker: "[PARENT NAME]",
      role: "Father of a child in Behavioural Therapy",
      badge: "Family Story",
      youtubeId: "bu8RS_aJ_Pk",
      image: "https://img.youtube.com/vi/bu8RS_aJ_Pk/hqdefault.jpg",
      desc: "Reflecting on positive behavioural guidance, practical home coaching, and the transformation in his child daily life routines.",
    },
  ];

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

        {/* 1. Watch Our Sessions Subsection */}
        <div className="jtl-video-category-header">
          <h3 className="jtl-video-category-title">
            <span className="cat-dot"></span>
            Watch our sessions
          </h3>
        </div>

        <div className="jtl-video-sessions-grid">
          {sessionVideos.map((item) => (
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
                <img src={item.image} alt={item.title} />
                <div className="jtl-video-play-btn">
                  <FaPlay size={18} />
                </div>
              </div>
              <div className="jtl-video-body">
                <span className="jtl-video-badge">{item.badge}</span>
                <h4 className="jtl-video-title">{item.title}</h4>
                <p className="jtl-video-desc">{item.desc}</p>
                <span className="jtl-video-watch-link">
                  <span>Watch Video Session</span>
                  <FaArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Hear It From Our Families Subsection */}
        <div className="jtl-video-category-header">
          <h3 className="jtl-video-category-title">
            <span className="cat-dot" style={{ backgroundColor: "#2d7082" }}></span>
            Hear it from our families
          </h3>
        </div>

        <div className="jtl-video-testimonials-grid">
          {familyVideos.map((item) => (
            <div
              key={item.id}
              className="jtl-video-card"
              onClick={() => setActiveVideo(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveVideo(item);
              }}
              aria-label={`Watch ${item.title} by ${item.speaker}`}
            >
              <div className="jtl-video-thumb-wrap">
                <img src={item.image} alt={`${item.title} ${item.speaker}`} />
                <div className="jtl-video-play-btn">
                  <FaPlay size={18} />
                </div>
              </div>
              <div className="jtl-video-body">
                <span
                  className="jtl-video-badge"
                  style={{ color: "#2d7082", background: "rgba(45, 112, 130, 0.08)" }}
                >
                  {item.badge}
                </span>
                <h4 className="jtl-video-title">{item.title}</h4>
                <p className="jtl-video-speaker">
                  {item.speaker} · {item.role}
                </p>
                <p className="jtl-video-desc">{item.desc}</p>
                <span className="jtl-video-watch-link" style={{ color: "#2d7082" }}>
                  <span>Listen to Family Story</span>
                  <FaArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer WhatsApp CTA */}
        <div className="text-center mt-30">
          <Link
            href="https://wa.me/923420000201"
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
            <span>Connect With Our Specialists On WhatsApp: 0342 0000201</span>
          </Link>
        </div>
      </div>

      {/* Video Modal Player with Live YouTube Embed */}
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
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
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
            </div>
            <div className="jtl-video-modal-info">
              <span className="jtl-video-badge">{activeVideo.badge}</span>
              <h4 style={{ color: "#ffffff", fontSize: "19px", fontWeight: 800, marginTop: "8px", marginBottom: "4px" }}>
                {activeVideo.title}
              </h4>
              {activeVideo.speaker && (
                <p style={{ color: "#38bdf8", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>
                  {activeVideo.speaker} {activeVideo.role ? `· ${activeVideo.role}` : ""}
                </p>
              )}
              <p style={{ color: "#cbd5e1", fontSize: "14.5px", lineHeight: "1.6", marginBottom: "16px" }}>
                {activeVideo.desc}
              </p>
              <Link
                href="https://wa.me/923420000201"
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
