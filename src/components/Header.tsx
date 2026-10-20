"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { siteConfig } from "@/config/site";

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

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Smooth scroll handler with sticky header offset compensation & drawer close
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    isMobile: boolean = false
  ) => {
    e.preventDefault();

    if (isMobile) {
      setMobileMenuOpen(false);
    }

    const element = document.getElementById(targetId);
    if (element) {
      const delay = isMobile ? 120 : 0;
      setTimeout(() => {
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });

        window.history.pushState(null, "", `#${targetId}`);
      }, delay);
    } else {
      window.location.hash = targetId;
    }
  };

  return (
    <header id="xb-header-area" className="header-area header-style header-transparent">
      {/* Original Static Header */}
      <div className="xb-header stricky original">
        <div className="container-fluid p-0">
          <div className="header__wrap ul_li_between glass">
            <div className="xb-header-logo">
              <Link
                href="#hero"
                onClick={(e) => scrollToSection(e, "hero")}
                className="logo1 jtl-header-logo-link"
                aria-label="Journey Towards Life - Home"
              >
                <Image
                  src="/assets/img/logo.png"
                  alt="Journey Towards Life"
                  width={64}
                  height={64}
                  priority
                  className="jtl-header-logo-img"
                />
              </Link>
            </div>
            <div className="main-menu__wrap navbar navbar-expand-xl p-0">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li>
                    <Link
                      href="#about"
                      onClick={(e) => scrollToSection(e, "about")}
                    >
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      onClick={(e) => scrollToSection(e, "services")}
                    >
                      <span>Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#why-choose"
                      onClick={(e) => scrollToSection(e, "why-choose")}
                    >
                      <span>Why Choose Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#gallery"
                      onClick={(e) => scrollToSection(e, "gallery")}
                    >
                      <span>Gallery</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#videos"
                      onClick={(e) => scrollToSection(e, "videos")}
                    >
                      <span>Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#team"
                      onClick={(e) => scrollToSection(e, "team")}
                    >
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
                href={siteConfig.whatsappUrl}
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
              <Link
                href="#hero"
                onClick={(e) => scrollToSection(e, "hero")}
                className="logo1 jtl-header-logo-link"
                aria-label="Journey Towards Life - Home"
              >
                <Image
                  src="/assets/img/logo.png"
                  alt="Journey Towards Life"
                  width={64}
                  height={64}
                  priority
                  className="jtl-header-logo-img"
                />
              </Link>
            </div>
            <div className="main-menu__wrap navbar navbar-expand-xl p-0">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li>
                    <Link
                      href="#about"
                      onClick={(e) => scrollToSection(e, "about")}
                    >
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      onClick={(e) => scrollToSection(e, "services")}
                    >
                      <span>Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#why-choose"
                      onClick={(e) => scrollToSection(e, "why-choose")}
                    >
                      <span>Why Choose Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#gallery"
                      onClick={(e) => scrollToSection(e, "gallery")}
                    >
                      <span>Gallery</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#videos"
                      onClick={(e) => scrollToSection(e, "videos")}
                    >
                      <span>Videos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#team"
                      onClick={(e) => scrollToSection(e, "team")}
                    >
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
                href={siteConfig.whatsappUrl}
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
            <div className="xb-logo-mobile">
              <Link
                href="#hero"
                onClick={(e) => scrollToSection(e, "hero", true)}
                className="jtl-drawer-logo-link"
                aria-label="Journey Towards Life - Home"
              >
                <Image
                  src="/assets/img/logo.png"
                  alt="Journey Towards Life"
                  width={56}
                  height={56}
                  className="jtl-drawer-logo-img"
                />
              </Link>
            </div>

            <nav className="xb-header-nav">
              <ul className="xb-menu-primary clearfix">
                <li>
                  <Link
                    href="#about"
                    onClick={(e) => scrollToSection(e, "about", true)}
                  >
                    <span className="menu-icon">
                      <FaCircleInfo size={15} />
                    </span>
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    onClick={(e) => scrollToSection(e, "services", true)}
                  >
                    <span className="menu-icon">
                      <FaShapes size={15} />
                    </span>
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#why-choose"
                    onClick={(e) => scrollToSection(e, "why-choose", true)}
                  >
                    <span className="menu-icon">
                      <FaStar size={15} />
                    </span>
                    <span>Why Choose Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#gallery"
                    onClick={(e) => scrollToSection(e, "gallery", true)}
                  >
                    <span className="menu-icon">
                      <FaImages size={15} />
                    </span>
                    <span>Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#videos"
                    onClick={(e) => scrollToSection(e, "videos", true)}
                  >
                    <span className="menu-icon">
                      <FaPlay size={13} />
                    </span>
                    <span>Videos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#team"
                    onClick={(e) => scrollToSection(e, "team", true)}
                  >
                    <span className="menu-icon">
                      <FaUserDoctor size={15} />
                    </span>
                    <span>Our Team</span>
                  </Link>
                </li>
                <li className="whatsapp-item">
                  <Link
                    href={siteConfig.whatsappUrl}
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
                  <strong style={{ color: "#ffffff", fontSize: "12px", display: "block" }}>WhatsApp / Call:</strong>
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 700 }}>
                    {siteConfig.whatsappNumber}
                  </a>
                </div>
              </div>
              <div className="mobile-drawer-contact-item">
                <FaPhone size={14} style={{ color: "#38bdf8" }} />
                <div>
                  <strong style={{ color: "#ffffff", fontSize: "12px", display: "block" }}>Other Contacts:</strong>
                  <a href={`tel:${siteConfig.phonePrimary.replace(/\s+/g, "")}`} style={{ color: "#cbd5e1" }}>{siteConfig.phonePrimary}</a> · <a href={`tel:${siteConfig.phoneSecondary.replace(/\s+/g, "")}`} style={{ color: "#cbd5e1" }}>{siteConfig.phoneSecondary}</a>
                </div>
              </div>
              <div className="mobile-drawer-contact-item">
                <FaLocationDot size={15} style={{ color: "#38bdf8" }} />
                <div>
                  <strong style={{ color: "#ffffff", fontSize: "12px", display: "block" }}>Location:</strong>
                  <span style={{ color: "#cbd5e1" }}>College Colony, Mingora, Swat</span>
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
