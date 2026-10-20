"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaImages,
  FaPlus,
  FaPenToSquare,
  FaTrash,
  FaMagnifyingGlass,
  FaXmark,
  FaUpload,
  FaCheck,
  FaCircleExclamation,
  FaArrowRotateRight,
} from "react-icons/fa6";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category?: string;
  created_at?: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Add Form State
  const [newTitle, setNewTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit Form State
  const [editTitle, setEditTitle] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  const BACKEND_URL = API_BASE.replace(/\/api$/, "");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch Gallery Items
  const fetchGallery = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch(`${API_BASE}/gallery`);
      const result = await res.json();
      if (res.ok && result.success) {
        setItems(result.data || []);
      } else {
        setErrorMessage(result.message || "Failed to load gallery photos.");
      }
    } catch (err: unknown) {
      console.error("Fetch gallery error:", err);
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
        const res = await fetch(`${API_BASE}/gallery`);
        const result = await res.json();
        if (!ignore) {
          if (res.ok && result.success) {
            setItems(result.data || []);
          } else {
            setErrorMessage(result.message || "Failed to load gallery photos.");
          }
        }
      } catch (err: unknown) {
        if (!ignore) {
          console.error("Fetch gallery error:", err);
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
    setNewTitle("");
    setSelectedFile(null);
    setImagePreview(null);
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setIsEditModalOpen(true);
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit New Image
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file to upload.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("image", selectedFile);

      const res = await fetch(`${API_BASE}/gallery`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Failed to upload image.");
        setIsSubmitting(false);
        return;
      }

      showToast(`Image "${newTitle}" uploaded successfully!`);
      setIsAddModalOpen(false);
      fetchGallery();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Edit Title
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", editTitle);

      const res = await fetch(`${API_BASE}/gallery/${editingItem.id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Failed to update image title.");
        setIsSubmitting(false);
        return;
      }

      showToast("Image title updated successfully!");
      setIsEditModalOpen(false);
      setEditingItem(null);
      fetchGallery();
    } catch (err) {
      console.error("Edit title error:", err);
      alert("Error updating title. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Image
  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setItems(items.filter((item) => item.id !== id));
        showToast(`Image "${title}" deleted.`);
      } else {
        alert(result.message || "Failed to delete image.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network error occurred while deleting image.");
    }
  };

  // Filter Items
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h2 className="admin-panel-title">Gallery Photos Management</h2>
            <p className="admin-panel-desc">
              View existing photos, upload new therapy and facility images, and edit titles
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={fetchGallery}
              className="admin-action-btn"
              title="Refresh Gallery List"
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
              <span>Add New Image</span>
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div style={{ marginBottom: "22px", width: "100%", maxWidth: "460px" }}>
          <div className="admin-input-wrapper">
            <FaMagnifyingGlass className="admin-input-icon" />
            <input
              type="text"
              className="admin-input"
              style={{ height: "42px" }}
              placeholder="Search images by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
              Loading gallery from database...
            </span>
          </div>
        ) : filteredItems.length === 0 ? (
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
              <FaImages />
            </div>
            <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
              {searchQuery ? "No matching photos found" : "No Gallery Photos Uploaded Yet"}
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
                ? "Try searching for a different image title."
                : "Upload high-quality therapy and facility photos with titles to showcase on the website."}
            </p>
            {!searchQuery && (
              <button
                onClick={handleOpenAdd}
                className="admin-btn-primary"
                style={{ width: "auto", padding: "0 22px", display: "inline-flex" }}
              >
                <FaPlus size={13} />
                <span>Upload First Photo</span>
              </button>
            )}
          </div>
        ) : (
          /* Gallery Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredItems.map((item) => {
              const fullImageUrl = item.image_url.startsWith("http")
                ? item.image_url
                : `${BACKEND_URL}${item.image_url}`;

              return (
                <div
                  key={item.id}
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
                  {/* Image Frame */}
                  <div
                    style={{
                      width: "100%",
                      height: "190px",
                      position: "relative",
                      background: "#070726",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={fullImageUrl}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Card Content & Action Bar */}
                  <div style={{ padding: "16px" }}>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "6px",
                        lineHeight: "1.4",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.title}
                    </h3>

                    {item.created_at && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(255, 255, 255, 0.5)",
                          display: "block",
                          marginBottom: "14px",
                        }}
                      >
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    )}

                    {/* Action Buttons */}
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
                        onClick={() => handleOpenEdit(item)}
                        className="admin-btn-outline"
                        style={{
                          height: "34px",
                          padding: "0 12px",
                          fontSize: "12.5px",
                          gap: "6px",
                        }}
                      >
                        <FaPenToSquare size={12} />
                        <span>Edit Title</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="admin-action-btn delete"
                        title="Delete Image"
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

      {/* Modal: Upload New Photo */}
      {isAddModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div
            className="admin-modal-content"
            style={{ maxWidth: "560px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                Upload New Gallery Photo
              </h3>
              <button className="admin-modal-close" onClick={() => setIsAddModalOpen(false)}>
                <FaXmark size={14} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              {/* Image Upload Box */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
                  Select Image File *
                </label>
                <div
                  className="admin-modal-upload-box"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: "2px dashed var(--admin-border-gold)",
                    borderRadius: "14px",
                    padding: "20px",
                    background: "rgba(230, 158, 1, 0.04)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                  }}
                >
                  {imagePreview ? (
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "2px solid var(--admin-gold)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--admin-gold)",
                        flexShrink: 0,
                      }}
                    >
                      <FaUpload size={20} />
                    </div>
                  )}

                  <div className="admin-modal-upload-text" style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                      {imagePreview ? "Click to change photo" : "Select or drag photo file"}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", marginTop: "2px" }}>
                      JPG, PNG, or WEBP up to 100MB (processed by Multer)
                    </div>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  required
                />
              </div>

              {/* Title Field */}
              <div className="admin-input-group" style={{ marginBottom: "26px" }}>
                <label>Image Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  style={{ paddingLeft: "16px" }}
                  placeholder="e.g. Speech Therapy Articulation Room"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              {/* Actions */}
              <div className="admin-modal-actions" style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="admin-btn-outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  disabled={isSubmitting}
                  style={{ width: "auto", padding: "0 24px" }}
                >
                  {isSubmitting ? <span>Uploading...</span> : <span>Upload Photo</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Photo Title */}
      {isEditModalOpen && editingItem && (
        <div className="admin-modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div
            className="admin-modal-content"
            style={{ maxWidth: "520px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                Edit Image Title
              </h3>
              <button className="admin-modal-close" onClick={() => setIsEditModalOpen(false)}>
                <FaXmark size={14} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              {/* Photo Thumbnail */}
              <div
                style={{
                  width: "100%",
                  height: "170px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid var(--admin-border-gold)",
                  marginBottom: "18px",
                  background: "#070726",
                }}
              >
                <img
                  src={
                    editingItem.image_url.startsWith("http")
                      ? editingItem.image_url
                      : `${BACKEND_URL}${editingItem.image_url}`
                  }
                  alt={editingItem.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Title Field */}
              <div className="admin-input-group" style={{ marginBottom: "26px" }}>
                <label>New Image Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  style={{ paddingLeft: "16px" }}
                  placeholder="Enter updated photo title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Actions */}
              <div className="admin-modal-actions" style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="admin-btn-outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  disabled={isSubmitting}
                  style={{ width: "auto", padding: "0 24px" }}
                >
                  {isSubmitting ? <span>Saving...</span> : <span>Save Title</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
