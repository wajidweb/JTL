"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaVideo,
  FaPlus,
  FaPenToSquare,
  FaTrash,
  FaMagnifyingGlass,
  FaXmark,
  FaUpload,
  FaCheck,
  FaCircleExclamation,
  FaArrowRotateRight,
  FaPlay,
  FaLink,
  FaFileVideo,
  FaUser,
  FaImages,
} from "react-icons/fa6";

interface VideoItem {
  id: number;
  category: "Session" | "Family";
  title: string;
  badge: string;
  description: string;
  parent_name?: string;
  video_type: "upload" | "link";
  video_url: string;
  thumbnail_url?: string;
  display_order?: number;
  created_at?: string;
}

/**
 * Automatically captures a high-resolution frame from an uploaded video file
 * using an off-screen HTML5 video and canvas without needing server ffmpeg binaries
 */
function captureVideoFrame(file: File, seekTime = 0.5): Promise<File> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(seekTime, video.duration > 0.5 ? 0.5 : 0);
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              URL.revokeObjectURL(video.src);
              if (blob) {
                const cleanName = file.name.replace(/\.[^/.]+$/, "");
                const thumbFile = new File([blob], `thumb-${cleanName}.jpg`, {
                  type: "image/jpeg",
                });
                resolve(thumbFile);
              } else {
                reject(new Error("Could not extract video frame"));
              }
            },
            "image/jpeg",
            0.9
          );
        } else {
          URL.revokeObjectURL(video.src);
          reject(new Error("Canvas context unavailable"));
        }
      } catch (err) {
        URL.revokeObjectURL(video.src);
        reject(err);
      }
    };

    video.onerror = (e) => {
      URL.revokeObjectURL(video.src);
      reject(e);
    };
  });
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"ALL" | "Session" | "Family">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  // Form Fields
  const [category, setCategory] = useState<"Session" | "Family">("Session");
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState("Clinical Session");
  const [description, setDescription] = useState("");
  const [parentName, setParentName] = useState("");
  const [videoSourceType, setVideoSourceType] = useState<"link" | "upload">("link");
  const [videoLink, setVideoLink] = useState("");
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedThumbFile, setSelectedThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [isCapturingThumb, setIsCapturingThumb] = useState(false);

  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect YouTube thumbnail when link changes in user event
  const handleVideoLinkChange = (val: string) => {
    setVideoLink(val);
    const match = val.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    );
    if (match && match[1]) {
      setThumbPreview(`https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`);
    } else if (val.trim() === "") {
      setThumbPreview(null);
    }
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  const BACKEND_URL = API_BASE.replace(/\/api$/, "");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch Videos from Backend API
  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`${API_BASE}/videos`);
      const result = await res.json();
      if (res.ok && result.success) {
        setVideos(result.data || []);
      } else {
        setErrorMessage(result.message || "Failed to load videos.");
      }
    } catch (err: unknown) {
      console.error("Fetch videos error:", err);
      setErrorMessage("Could not reach backend API server at " + API_BASE);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE]);

  // Initial load
  useEffect(() => {
    let ignore = false;

    async function loadInitial() {
      try {
        const res = await fetch(`${API_BASE}/videos`);
        const result = await res.json();
        if (!ignore) {
          if (res.ok && result.success) {
            setVideos(result.data || []);
          } else {
            setErrorMessage(result.message || "Failed to load videos.");
          }
        }
      } catch (err: unknown) {
        if (!ignore) {
          console.error("Fetch videos error:", err);
          setErrorMessage("Could not reach backend API server at " + API_BASE);
        }
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

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingVideo(null);
    setCategory("Session");
    setTitle("");
    setBadge("Clinical Session");
    setDescription("");
    setParentName("");
    setVideoSourceType("link");
    setVideoLink("");
    setSelectedVideoFile(null);
    setSelectedThumbFile(null);
    setThumbPreview(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (v: VideoItem) => {
    setEditingVideo(v);
    setCategory(v.category);
    setTitle(v.title);
    setBadge(v.badge || (v.category === "Family" ? "Family Story" : "Clinical Session"));
    setDescription(v.description || "");
    setParentName(v.parent_name || "");
    setVideoSourceType(v.video_type);
    setVideoLink(v.video_type === "link" ? v.video_url : "");
    setSelectedVideoFile(null);
    setSelectedThumbFile(null);
    setThumbPreview(
      v.thumbnail_url
        ? v.thumbnail_url.startsWith("http")
          ? v.thumbnail_url
          : `${BACKEND_URL}${v.thumbnail_url}`
        : null
    );
    setIsModalOpen(true);
  };

  // File Change Handlers
  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedVideoFile(file);
      setIsCapturingThumb(true);

      try {
        // Automatically capture high-res frame at 0.5s from video
        const autoThumb = await captureVideoFrame(file, 0.5);
        setSelectedThumbFile(autoThumb);
        setThumbPreview(URL.createObjectURL(autoThumb));
      } catch (err) {
        console.warn("Auto thumbnail capture notice:", err);
      } finally {
        setIsCapturingThumb(false);
      }
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", title);
      formData.append("badge", badge);
      formData.append("description", description);
      formData.append("video_type", videoSourceType);

      if (category === "Family") {
        formData.append("parent_name", parentName);
      }

      if (videoSourceType === "link") {
        formData.append("video_link", videoLink);
        if (thumbPreview && !selectedThumbFile) {
          formData.append("thumbnail_url", thumbPreview);
        }
      } else if (selectedVideoFile) {
        formData.append("video_file", selectedVideoFile);
      }

      if (selectedThumbFile) {
        formData.append("thumbnail_image", selectedThumbFile);
      }

      const url = editingVideo
        ? `${API_BASE}/videos/${editingVideo.id}`
        : `${API_BASE}/videos`;

      const method = editingVideo ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Failed to save video.");
        setIsSubmitting(false);
        return;
      }

      showToast(
        editingVideo
          ? `Video "${title}" updated successfully!`
          : `New video "${title}" published!`
      );

      setIsModalOpen(false);
      fetchVideos();
    } catch (err: unknown) {
      console.error("Save video error:", err);
      alert("Error saving video. Please verify server connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Video
  const handleDelete = async (id: number, videoTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${videoTitle}"?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/videos/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setVideos(videos.filter((v) => v.id !== id));
        showToast(`Video "${videoTitle}" deleted.`);
      } else {
        alert(result.message || "Failed to delete video.");
      }
    } catch (err) {
      console.error("Delete video error:", err);
      alert("Network error occurred while deleting video.");
    }
  };

  // Filter Videos
  const filteredVideos = videos.filter((v) => {
    const matchesCategory =
      activeCategoryFilter === "ALL" || v.category === activeCategoryFilter;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.parent_name && v.parent_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.description && v.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <FaCheck style={{ color: "var(--admin-gold)" }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Panel Card */}
      <div className="admin-panel-card">
        {/* Header Actions */}
        <div className="admin-panel-header">
          <div>
            <h2 className="admin-panel-title">Videos Management</h2>
            <p className="admin-panel-desc">
              Manage therapy session demonstrations and inspiring family progress testimonials
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={fetchVideos}
              className="admin-action-btn"
              title="Refresh Video List"
              style={{ width: "42px", height: "42px", borderRadius: "12px", margin: 0 }}
            >
              <FaArrowRotateRight />
            </button>

            <button
              onClick={handleOpenAdd}
              className="admin-btn-primary"
              style={{ width: "auto", padding: "0 22px", height: "42px", fontSize: "14px" }}
            >
              <FaPlus size={13} />
              <span>Add New Video</span>
            </button>
          </div>
        </div>

        {/* Category Tabs & Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setActiveCategoryFilter("ALL")}
              style={{
                padding: "8px 16px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid var(--admin-border)",
                background: activeCategoryFilter === "ALL" ? "var(--admin-gold)" : "rgba(255, 255, 255, 0.05)",
                color: activeCategoryFilter === "ALL" ? "#08082e" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              All Videos ({videos.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveCategoryFilter("Session")}
              style={{
                padding: "8px 16px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid var(--admin-border)",
                background: activeCategoryFilter === "Session" ? "var(--admin-gold)" : "rgba(255, 255, 255, 0.05)",
                color: activeCategoryFilter === "Session" ? "#08082e" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Watch Our Sessions ({videos.filter((v) => v.category === "Session").length})
            </button>

            <button
              type="button"
              onClick={() => setActiveCategoryFilter("Family")}
              style={{
                padding: "8px 16px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid var(--admin-border)",
                background: activeCategoryFilter === "Family" ? "#38bdf8" : "rgba(255, 255, 255, 0.05)",
                color: activeCategoryFilter === "Family" ? "#08082e" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Hear It From Our Families ({videos.filter((v) => v.category === "Family").length})
            </button>
          </div>

          {/* Search Input */}
          <div style={{ width: "100%", maxWidth: "340px" }}>
            <div className="admin-input-wrapper">
              <FaMagnifyingGlass className="admin-input-icon" />
              <input
                type="text"
                className="admin-input"
                style={{ height: "40px" }}
                placeholder="Search videos by title or parent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#ffffff",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "13.5px",
            }}
          >
            <FaCircleExclamation style={{ color: "#f87171", fontSize: "18px", flexShrink: 0 }} />
            <div>
              <strong>Connection Notice:</strong> {errorMessage}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading ? (
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <div className="admin-spinner" />
            <span style={{ color: "#ffffff", opacity: 0.8, fontSize: "14px" }}>
              Loading videos from database...
            </span>
          </div>
        ) : filteredVideos.length === 0 ? (
          /* Empty State */
          <div
            style={{
              padding: "50px 20px",
              textAlign: "center",
              background: "rgba(0, 0, 0, 0.15)",
              borderRadius: "16px",
              border: "1px dashed rgba(255, 255, 255, 0.15)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(230, 158, 1, 0.15)",
                color: "var(--admin-gold)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                marginBottom: "14px",
              }}
            >
              <FaVideo />
            </div>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
              {searchQuery ? "No matching videos found" : "No Videos Published Yet"}
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "13.5px",
                maxWidth: "400px",
                margin: "0 auto 20px",
                lineHeight: "1.5",
              }}
            >
              {searchQuery
                ? "Try searching with a different keyword or name."
                : "Add therapy session demos or heartfelt family testimonials with video links or direct MP4 uploads."}
            </p>
            {!searchQuery && (
              <button
                onClick={handleOpenAdd}
                className="admin-btn-primary"
                style={{ width: "auto", padding: "0 22px", display: "inline-flex" }}
              >
                <FaPlus size={13} />
                <span>Publish First Video</span>
              </button>
            )}
          </div>
        ) : (
          /* Videos Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
              gap: "22px",
            }}
          >
            {filteredVideos.map((video) => {
              const fullThumbUrl = video.thumbnail_url
                ? video.thumbnail_url.startsWith("http")
                  ? video.thumbnail_url
                  : `${BACKEND_URL}${video.thumbnail_url}`
                : null;

              return (
                <div
                  key={video.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--admin-border-gold)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--admin-border)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Thumbnail Banner with Play Overlay */}
                  <div
                    style={{
                      width: "100%",
                      height: "185px",
                      position: "relative",
                      background: "#070726",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {fullThumbUrl ? (
                      <img
                        src={fullThumbUrl}
                        alt={video.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          color: "rgba(255, 255, 255, 0.3)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <FaVideo size={32} />
                        <span style={{ fontSize: "12px" }}>Video Media</span>
                      </div>
                    )}

                    {/* Play Badge */}
                    <div
                      style={{
                        position: "absolute",
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(230, 158, 1, 0.9)",
                        color: "#08082e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: "3px",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      <FaPlay size={16} />
                    </div>

                    {/* Source Tag (Link vs Upload) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "rgba(8, 8, 46, 0.85)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "6px",
                        padding: "3px 8px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {video.video_type === "upload" ? (
                        <>
                          <FaFileVideo style={{ color: "var(--admin-gold)" }} />
                          <span>Uploaded MP4</span>
                        </>
                      ) : (
                        <>
                          <FaLink style={{ color: "var(--admin-cyan)" }} />
                          <span>Video Link</span>
                        </>
                      )}
                    </div>

                    {/* Category Tag */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      <span
                        className={`admin-badge ${
                          video.category === "Family" ? "admin-badge-cyan" : "admin-badge-gold"
                        }`}
                        style={{ fontSize: "10.5px" }}
                      >
                        {video.category === "Family" ? "Family Testimonial" : "Session Video"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "18px" }}>
                    <div style={{ marginBottom: "8px" }}>
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "var(--admin-gold)",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {video.badge}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "6px",
                        lineHeight: "1.35",
                      }}
                    >
                      {video.title}
                    </h3>

                    {/* Parent Name (if Family category) */}
                    {video.category === "Family" && video.parent_name && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#38bdf8",
                          fontSize: "12.5px",
                          fontWeight: 600,
                          marginBottom: "8px",
                        }}
                      >
                        <FaUser size={11} />
                        <span>{video.parent_name}</span>
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.72)",
                        margin: "0 0 16px",
                        lineHeight: "1.5",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      title={video.description}
                    >
                      {video.description}
                    </p>

                    {/* Actions */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <button
                        onClick={() => handleOpenEdit(video)}
                        className="admin-btn-outline"
                        style={{
                          height: "34px",
                          padding: "0 12px",
                          fontSize: "12.5px",
                          gap: "6px",
                        }}
                      >
                        <FaPenToSquare size={12} />
                        <span>Edit Video</span>
                      </button>

                      <button
                        onClick={() => handleDelete(video.id, video.title)}
                        className="admin-action-btn delete"
                        title="Delete Video"
                        style={{ margin: 0, width: "34px", height: "34px" }}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Add / Edit Video */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="admin-modal-content"
            style={{ maxWidth: "860px", padding: "clamp(20px, 3vw, 34px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="admin-modal-header" style={{ marginBottom: "22px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                  {editingVideo ? `Edit Video: ${editingVideo.title}` : "Add New Video"}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--admin-text-dim)", margin: "4px 0 0" }}>
                  Configure video category, media source (upload or link), and session details
                </p>
              </div>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <FaXmark size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Category Selection Cards */}
              <div style={{ marginBottom: "22px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
                  1. Video Category *
                </label>
                <div className="admin-video-category-grid">
                  {/* Category 1: Sessions */}
                  <div
                    onClick={() => {
                      setCategory("Session");
                      if (!badge || badge === "Family Story") setBadge("Clinical Session");
                    }}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "14px",
                      border: "2px solid",
                      borderColor: category === "Session" ? "var(--admin-gold)" : "rgba(255, 255, 255, 0.12)",
                      background: category === "Session" ? "rgba(230, 158, 1, 0.12)" : "rgba(0, 0, 0, 0.25)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "10px",
                        background: category === "Session" ? "var(--admin-gold)" : "rgba(255, 255, 255, 0.08)",
                        color: category === "Session" ? "#08082e" : "var(--admin-gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}
                    >
                      <FaVideo />
                    </div>
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: 800, color: category === "Session" ? "#ffffff" : "var(--admin-text-muted)" }}>
                        Watch Our Sessions
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--admin-text-dim)", marginTop: "2px" }}>
                        Therapy demos &amp; classroom activities
                      </div>
                    </div>
                  </div>

                  {/* Category 2: Families */}
                  <div
                    onClick={() => {
                      setCategory("Family");
                      if (!badge || badge === "Clinical Session") setBadge("Family Story");
                    }}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "14px",
                      border: "2px solid",
                      borderColor: category === "Family" ? "#38bdf8" : "rgba(255, 255, 255, 0.12)",
                      background: category === "Family" ? "rgba(56, 189, 248, 0.12)" : "rgba(0, 0, 0, 0.25)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "10px",
                        background: category === "Family" ? "#38bdf8" : "rgba(255, 255, 255, 0.08)",
                        color: category === "Family" ? "#08082e" : "#38bdf8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}
                    >
                      <FaUser />
                    </div>
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: 800, color: category === "Family" ? "#ffffff" : "var(--admin-text-muted)" }}>
                        Hear It From Our Families
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--admin-text-dim)", marginTop: "2px" }}>
                        Parent testimonials &amp; progress stories
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Badge Row (Asymmetric 2-column) */}
              <div className="admin-video-meta-grid" style={{ marginBottom: "18px" }}>
                <div className="admin-input-group" style={{ margin: 0 }}>
                  <label>Video Title *</label>
                  <input
                    type="text"
                    className="admin-input"
                    style={{ paddingLeft: "16px" }}
                    placeholder={category === "Session" ? "e.g. Speech Therapy & Communication Session" : "e.g. A Mother's Journey Towards Independence"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-input-group" style={{ margin: 0 }}>
                  <label>Tag / Badge *</label>
                  <input
                    type="text"
                    className="admin-input"
                    style={{ paddingLeft: "16px" }}
                    placeholder="e.g. Clinical Session or Family Story"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Parent Name Row (Visible when category is 'Family') */}
              {category === "Family" && (
                <div className="admin-input-group" style={{ marginBottom: "18px" }}>
                  <label style={{ color: "#38bdf8", fontWeight: 700 }}>
                    Parent / Family Attribution *
                  </label>
                  <div className="admin-input-wrapper">
                    <FaUser className="admin-input-icon" style={{ color: "#38bdf8" }} />
                    <input
                      type="text"
                      className="admin-input"
                      style={{ paddingLeft: "42px", borderColor: "rgba(56, 189, 248, 0.45)" }}
                      placeholder="e.g. Mother of a child in Speech Therapy"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Media Configuration: Two Column Side-by-Side (Source on left, Thumbnail on right) */}
              <div
                className="admin-video-media-grid"
                style={{
                  marginBottom: "20px",
                  padding: "18px",
                  borderRadius: "16px",
                  background: "rgba(0, 0, 0, 0.2)",
                  border: "1px solid var(--admin-border)",
                }}
              >
                {/* Left: Video Source (Link vs Upload) */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      2. Video Source *
                    </label>

                    <div style={{ display: "inline-flex", background: "rgba(255, 255, 255, 0.08)", padding: "2px", borderRadius: "8px" }}>
                      <button
                        type="button"
                        onClick={() => setVideoSourceType("link")}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "none",
                          background: videoSourceType === "link" ? "var(--admin-gold)" : "transparent",
                          color: videoSourceType === "link" ? "#08082e" : "#ffffff",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <FaLink size={10} />
                        <span>Link</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setVideoSourceType("upload")}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "none",
                          background: videoSourceType === "upload" ? "var(--admin-gold)" : "transparent",
                          color: videoSourceType === "upload" ? "#08082e" : "#ffffff",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <FaUpload size={10} />
                        <span>File</span>
                      </button>
                    </div>
                  </div>

                  {videoSourceType === "link" ? (
                    <div>
                      <div className="admin-input-wrapper">
                        <FaLink className="admin-input-icon" />
                        <input
                          type="text"
                          className="admin-input"
                          style={{ height: "46px" }}
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={videoLink}
                          onChange={(e) => handleVideoLinkChange(e.target.value)}
                          required={videoSourceType === "link"}
                        />
                      </div>
                      <span style={{ fontSize: "11.5px", color: "var(--admin-text-dim)", display: "block", marginTop: "6px" }}>
                        Paste any YouTube, YouTube Shorts, or Vimeo URL.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div
                        onClick={() => videoFileInputRef.current?.click()}
                        style={{
                          border: "2px dashed var(--admin-border-gold)",
                          borderRadius: "12px",
                          padding: "16px 12px",
                          textAlign: "center",
                          background: "rgba(230, 158, 1, 0.04)",
                          cursor: "pointer",
                          minHeight: "75px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaFileVideo size={22} style={{ color: "var(--admin-gold)", marginBottom: "4px" }} />
                        <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff", wordBreak: "break-all" }}>
                          {selectedVideoFile ? selectedVideoFile.name : "Select MP4, WEBM, or MOV"}
                        </div>
                        <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.55)", marginTop: "2px" }}>
                          Supports files up to 500MB
                        </div>
                      </div>

                      <input
                        ref={videoFileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime,video/x-matroska"
                        style={{ display: "none" }}
                        onChange={handleVideoFileChange}
                        required={videoSourceType === "upload" && !editingVideo}
                      />
                    </div>
                  )}
                </div>

                {/* Right: Auto-Captured Thumbnail Preview */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      3. Video Thumbnail
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--admin-gold)", fontWeight: 700 }}>
                      {isCapturingThumb
                        ? "Capturing frame..."
                        : thumbPreview
                        ? "✓ Auto-Captured"
                        : "Auto from video"}
                    </span>
                  </div>

                  <div
                    style={{
                      border: "1px solid",
                      borderColor: thumbPreview ? "var(--admin-border-gold)" : "rgba(255, 255, 255, 0.15)",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      background: "rgba(0, 0, 0, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      minHeight: "75px",
                    }}
                  >
                    {isCapturingThumb ? (
                      <div
                        style={{
                          width: "68px",
                          height: "48px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div className="admin-spinner" style={{ width: "20px", height: "20px", margin: 0 }} />
                      </div>
                    ) : thumbPreview ? (
                      <div
                        style={{
                          width: "72px",
                          height: "48px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid var(--admin-gold)",
                          flexShrink: 0,
                          position: "relative",
                        }}
                      >
                        <img
                          src={thumbPreview}
                          alt="Video thumbnail"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--admin-gold)",
                          flexShrink: 0,
                        }}
                      >
                        <FaImages size={20} />
                      </div>
                    )}

                    <div style={{ textAlign: "left", flex: 1 }}>
                      <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff" }}>
                        {isCapturingThumb
                          ? "Extracting Opening Frame..."
                          : thumbPreview
                          ? "Video Thumbnail Ready"
                          : "Automatic Thumbnail"}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--admin-text-dim)", marginTop: "2px" }}>
                        {videoSourceType === "upload"
                          ? "Directly snapshots opening frame from your video file"
                          : "Directly derived from YouTube high-res cover"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="admin-input-group" style={{ marginBottom: "26px" }}>
                <label>4. Video Summary &amp; Description *</label>
                <textarea
                  className="admin-input"
                  style={{
                    height: "90px",
                    padding: "12px 16px",
                    resize: "vertical",
                    lineHeight: "1.5",
                  }}
                  placeholder="Summarize what parents will observe or listen to in this video session..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="admin-modal-actions" style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="admin-btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  disabled={isSubmitting}
                  style={{ width: "auto", padding: "0 28px" }}
                >
                  {isSubmitting ? <span>Publishing...</span> : <span>{editingVideo ? "Save Changes" : "Publish Video"}</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
