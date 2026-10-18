"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBars,
  FaXmark,
  FaCircleInfo,
  FaShapes,
  FaStar,
  FaImages,
  FaPlay,
  FaUserDoctor,
  FaWhatsapp,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

export default function Header() {
  // Sticky Header State
  const [isSticky, setIsSticky] = useState(false);

  // Mobile Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header id="xb-header-area" className="header-area header-style header-transparent">
      {/* Original Static Header */}
      <div className="xb-header stricky original">
        <div className="container-fluid p-0">
          <div className="header__wrap ul_li_between glass">
            <div className="xb-header-logo">
              <Link href="#hero" className="logo1" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(16px, 3.8vw, 22px)",
                    letterSpacing: "-0.5px",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-heading)",
                    lineHeight: 1.2,
                  }}
                >
                  Journey Towards Life
                </span>
              </Link>
            </div>
            <div className="main-menu__wrap navbar navbar-expand-xl p-0">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li>
                    <Link href="#about">
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#services">
                      <span>Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#why-choose">
                      <span>Why Choose Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#gallery">
                      <span>Gallery</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#videos">
                      <span>Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#team">
                      <span>Our Team</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-bar-mobile side-menu d-xl-none">
              <button
                type="button"
                className="xb-nav-mobile"
                aria-label="Open Navigation Menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FaBars size={18} />
              </button>
            </div>
            <div className="header-btn">
              <Link
                href="https://wa.me/923420000201"
                target="_blank"
                rel="noopener noreferrer"
                className="thm-btn"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Fixed Header */}
      <div className={`xb-header stricky stricked-menu ${isSticky ? "stricky-fixed" : ""}`}>
        <div className="container-fluid p-0">
          <div className="header__wrap ul_li_between glass">
            <div className="xb-header-logo">
              <Link href="#hero" className="logo1" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(16px, 3.8vw, 22px)",
                    letterSpacing: "-0.5px",
                    color: "#304049",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-heading)",
                    lineHeight: 1.2,
                  }}
                >
                  Journey Towards Life
                </span>
              </Link>
            </div>
            <div className="main-menu__wrap navbar navbar-expand-xl p-0">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li>
                    <Link href="#about">
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#services">
                      <span>Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#why-choose">
                      <span>Why Choose Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#gallery">
                      <span>Gallery</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#videos">
                      <span>Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#team">
                      <span>Our Team</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-bar-mobile side-menu d-xl-none">
              <button
                type="button"
                className="xb-nav-mobile"
                aria-label="Open Navigation Menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FaBars size={18} />
              </button>
            </div>
            <div className="header-btn">
              <Link
                href="https://wa.me/923420000201"
                target="_blank"
                rel="noopener noreferrer"
                className="thm-btn"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className="xb-header-wrap">
        <div className={`xb-header-menu ${mobileMenuOpen ? "active" : ""}`} aria-hidden={!mobileMenuOpen}>
          <div className="xb-header-menu-scroll">
            <button
              type="button"
              className="xb-close-btn"
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaXmark size={18} />
            </button>
            <div className="xb-logo-mobile" style={{ padding: "10px 0 18px", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: "15px" }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "#304049",
                  textTransform: "uppercase",
                  display: "block",
                  letterSpacing: "-0.3px",
                }}
              >
                Journey Towards Life
              </span>
              <span style={{ fontSize: "12px", color: "#a04444", fontWeight: 600 }}>
                Autism &amp; Special Education Centre
              </span>
            </div>

            <nav className="xb-header-nav">
              <ul className="xb-menu-primary clearfix">
                <li>
                  <Link href="#about" onClick={() => setMobileMenuOpen(false)}>
                    <span className="menu-icon">
                      <FaCircleInfo size={15} />
                    </span>
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="#services" onClick={() => setMobileMenuOpen(false)}>
                    <span className="menu-icon">
                      <FaShapes size={15} />
                    </span>
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link href="#why-choose" onClick={() => setMobileMenuOpen(false)}>
                    <span className="menu-icon">
                      <FaStar size={15} />
                    </span>
                    <span>Why Choose Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" onClick={() => setMobileMenuOpen(false)}>
                    <span className="menu-icon">
                      <FaImages size={15} />
                    </span>
                    <span>Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link href="#videos" onClick={() => setMobileMenuOpen(false)}>
                    <span className="menu-icon">
                      <FaPlay size={13} />
                    </span>
                    <span>Videos</span>
                  </Link>
                </li>
                <li>
                  <Link href="#team" onClick={() => setMobileMenuOpen(false)}>
                    <span className="menu-icon">
                      <FaUserDoctor size={15} />
                    </span>
                    <span>Our Team</span>
                  </Link>
                </li>
                <li className="whatsapp-item">
                  <Link
                    href="https://wa.me/923420000201"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="menu-icon">
                      <FaWhatsapp size={18} />
                    </span>
                    <span>Message On WhatsApp</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mobile-drawer-contact">
              <div className="mobile-drawer-contact-item">
                <FaWhatsapp size={17} style={{ color: "#25D366" }} />
                <div>
                  <strong style={{ color: "#304049", fontSize: "12px", display: "block" }}>WhatsApp / Call:</strong>
                  <a href="https://wa.me/923420000201" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 700 }}>
                    0342 0000201
                  </a>
                </div>
              </div>
              <div className="mobile-drawer-contact-item">
                <FaPhone size={14} style={{ color: "#a04444" }} />
                <div>
                  <strong style={{ color: "#304049", fontSize: "12px", display: "block" }}>Other Contacts:</strong>
                  <a href="tel:03709986381" style={{ color: "#304049" }}>0370 9986381</a> · <a href="tel:03479684918" style={{ color: "#304049" }}>0347 9684918</a>
                </div>
              </div>
              <div className="mobile-drawer-contact-item">
                <FaLocationDot size={15} style={{ color: "#a04444" }} />
                <div>
                  <strong style={{ color: "#304049", fontSize: "12px", display: "block" }}>Location:</strong>
                  <span>College Colony, Mingora, Swat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`xb-header-menu-backdrop ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      </div>
    </header>
  );
}
