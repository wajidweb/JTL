"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaWhatsapp, FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = siteConfig.apiUrl;
  const BACKEND_URL = API_BASE.replace(/\/api$/, "");

  // Load dynamic gallery images strictly from backend
  useEffect(() => {
    let ignore = false;

    async function loadGallery() {
      try {
        const res = await fetch(`${API_BASE}/gallery`);
        const json = await res.json();
        if (!ignore && res.ok && json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((item: { id: number; image_url: string; title: string }) => ({
            id: item.id,
            src: item.image_url.startsWith("http")
              ? item.image_url
              : `${BACKEND_URL}${item.image_url}`,
            alt: item.title,
          }));
          setImages(mapped);
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      ignore = true;
    };
  }, [API_BASE, BACKEND_URL]);

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : null
      );
    },
    [images.length]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + images.length) % images.length : null
      );
    },
    [images.length]
  );

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section id="gallery" className="jtl-gallery-section pos-rel z-1 gradient-bg radius-20 mt-30">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10">
            <div className="sec-title text-center mb-35">
              <span className="xb-item--subtitle">Moments and Facility</span>
              <h2 className="xb-item--title mb-15">Gallery</h2>
              <p
                className="xb-item--content"
                style={{ maxWidth: "680px", margin: "0 auto", lineHeight: "1.7" }}
              >
                Explore our therapy spaces, learning activities, and sensory environments in Mingora, Swat.
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
              Loading gallery moments...
            </p>
          </div>
        ) : images.length === 0 ? (
          /* Empty Database State */
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "18px",
              border: "1px dashed rgba(255, 255, 255, 0.15)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <p style={{ color: "#ffffff", opacity: 0.85, fontSize: "15px", marginBottom: "18px" }}>
              New facility and therapy moments are being updated. Connect with our team for centre visits and tours.
            </p>
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
              <span>Connect On WhatsApp: {siteConfig.whatsappNumber}</span>
            </Link>
          </div>
        ) : (
          /* Live Gallery Grid */
          <div className="jtl-gallery-grid">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                className="jtl-gallery-card"
                onClick={() => setLightboxIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setLightboxIndex(idx);
                  }
                }}
                aria-label={`View full image: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="text-center mt-35">
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
            <span>Connect With Our Team On WhatsApp: {siteConfig.whatsappNumber}</span>
          </Link>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal positioned cleanly below navbar */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="jtl-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="jtl-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="jtl-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              <FaXmark size={20} />
            </button>

            {/* Previous button */}
            {images.length > 1 && (
              <button
                type="button"
                className="jtl-lightbox-nav jtl-lightbox-prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <FaChevronLeft size={20} />
              </button>
            )}

            {/* Image Box */}
            <div className="jtl-lightbox-img-box">
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
              />
              <p className="jtl-lightbox-caption">
                {images[lightboxIndex].alt}
              </p>
            </div>

            {/* Next button */}
            {images.length > 1 && (
              <button
                type="button"
                className="jtl-lightbox-nav jtl-lightbox-next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <FaChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
