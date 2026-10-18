"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FaWhatsapp, FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = [
    {
      src: "/assets/img/gallery/one.jpg",
      alt: "Sensory room and calming activities",
    },
    {
      src: "/assets/img/gallery/two.jpg",
      alt: "Speech and language therapy session",
    },
    {
      src: "/assets/img/gallery/three.jpg",
      alt: "Motor coordination and active play",
    },
    {
      src: "/assets/img/gallery/four.jpg",
      alt: "Adaptive learning and educational tools",
    },
    {
      src: "/assets/img/gallery/five.jpg",
      alt: "Social skills and classroom interaction",
    },
    {
      src: "/assets/img/gallery/six.jpg",
      alt: "Parent consultation and therapy guidance",
    },
  ];

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % galleryImages.length : null
      );
    },
    [galleryImages.length]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null
          ? (prev - 1 + galleryImages.length) % galleryImages.length
          : null
      );
    },
    [galleryImages.length]
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

        {/* Clean Responsive Image Grid */}
        <div className="jtl-gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
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

        {/* Action Button */}
        <div className="text-center mt-35">
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
            <span>Connect With Our Team On WhatsApp: 0342 0000201</span>
          </Link>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && (
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
            <button
              type="button"
              className="jtl-lightbox-nav jtl-lightbox-prev"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>

            {/* Image Box */}
            <div className="jtl-lightbox-img-box">
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
              />
              <div className="jtl-lightbox-caption">
                <span>{galleryImages[lightboxIndex].alt}</span>
                <span className="jtl-lightbox-counter">
                  {lightboxIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </div>

            {/* Next button */}
            <button
              type="button"
              className="jtl-lightbox-nav jtl-lightbox-next"
              onClick={nextImage}
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
