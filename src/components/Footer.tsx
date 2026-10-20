import React from "react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaPhone,
  FaLocationDot,
  FaUserDoctor,
  FaAngleRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="jtl-footer">
      <div className="jtl-footer-container">
        {/* 1. Full-Width Action Banner (Top) */}
        <div className="jtl-footer-cta-banner">
          <div className="jtl-footer-cta-text">
            <span className="jtl-footer-badge">Journey Towards Life</span>
            <h3 className="jtl-footer-cta-title">
              Ready to Begin Your Child&apos;s Journey of Growth?
            </h3>
            <p className="jtl-footer-cta-desc">
              Connect directly with our care team in Mingora, Swat for compassionate guidance, developmental assessments, and personalized therapy planning.
            </p>
          </div>
          <div className="jtl-footer-cta-actions">
            <Link
              href="https://wa.me/923420000201"
              target="_blank"
              rel="noopener noreferrer"
              className="jtl-btn-whatsapp"
            >
              <FaWhatsapp size={20} />
              <span>Chat on WhatsApp: 0342 0000201</span>
            </Link>
            <a href="tel:03709986381" className="jtl-btn-call">
              <FaPhone size={14} />
              <span>Direct Call: 0370 9986381</span>
            </a>
          </div>
        </div>

        {/* 2. Main 4-Column Grid (Full Available Width) */}
        <div className="jtl-footer-main-grid">
          {/* Col 1: About & Mission */}
          <div className="jtl-footer-col jtl-footer-col-about">
            <div className="jtl-footer-brand">
              <h2 className="jtl-footer-brand-name">Journey Towards Life</h2>
              <span className="jtl-footer-brand-sub">
                Autism and Special Education Centre · Mingora, Swat
              </span>
            </div>
            <p className="jtl-footer-about-text">
              Established in 2021 by founder <strong>Adil Khan</strong>, Journey Towards Life is devoted to supporting children with Autism Spectrum Disorder and developmental, communication, sensory, and learning needs. We partner closely with families to unlock strengths and nurture lifelong independence.
            </p>
            <div className="jtl-footer-slogan-box">
              <span>Nurture Strengths. Build Skills. Inspiring Life.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="jtl-footer-col">
            <h4 className="jtl-footer-heading">Navigation</h4>
            <ul className="jtl-footer-links">
              <li>
                <Link href="#hero">
                  <FaAngleRight size={11} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="#about">
                  <FaAngleRight size={11} />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="#services">
                  <FaAngleRight size={11} />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link href="#why-choose">
                  <FaAngleRight size={11} />
                  <span>Why Choose Us</span>
                </Link>
              </li>
              <li>
                <Link href="#gallery">
                  <FaAngleRight size={11} />
                  <span>Centre Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="https://wa.me/923420000201" target="_blank" rel="noopener noreferrer">
                  <FaAngleRight size={11} />
                  <span>Book Assessment</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Therapy Services */}
          <div className="jtl-footer-col">
            <h4 className="jtl-footer-heading">Therapy Programs</h4>
            <ul className="jtl-footer-links">
              <li>
                <Link href="#services">
                  <FaAngleRight size={11} />
                  <span>Speech and Language Therapy</span>
                </Link>
              </li>
              <li>
                <Link href="#services">
                  <FaAngleRight size={11} />
                  <span>Occupational Therapy OT</span>
                </Link>
              </li>
              <li>
                <Link href="#services">
                  <FaAngleRight size={11} />
                  <span>Behavioural Therapy ABA</span>
                </Link>
              </li>
              <li>
                <Link href="#services">
                  <FaAngleRight size={11} />
                  <span>Sensory Issues Management</span>
                </Link>
              </li>
              <li>
                <Link href="#services">
                  <FaAngleRight size={11} />
                  <span>Special Education and IEPs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Centre Location & Details */}
          <div className="jtl-footer-col jtl-footer-col-contact">
            <h4 className="jtl-footer-heading">Centre Contact</h4>
            <div className="jtl-footer-contact-list">
              <div className="jtl-contact-item">
                <div className="jtl-contact-icon">
                  <FaLocationDot size={16} />
                </div>
                <div>
                  <span className="jtl-contact-label">Location:</span>
                  <p>Near Girls Degree College, College Colony, Mingora, Swat, KPK, Pakistan</p>
                </div>
              </div>
              <div className="jtl-contact-item">
                <div className="jtl-contact-icon">
                  <FaWhatsapp size={16} />
                </div>
                <div>
                  <span className="jtl-contact-label">Primary WhatsApp / Call:</span>
                  <a
                    href="https://wa.me/923420000201"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jtl-contact-link"
                  >
                    0342 0000201
                  </a>
                </div>
              </div>
              <div className="jtl-contact-item">
                <div className="jtl-contact-icon">
                  <FaPhone size={14} />
                </div>
                <div>
                  <span className="jtl-contact-label">Additional Phone Lines:</span>
                  <p>
                    <a href="tel:03709986381">0370 9986381</a> · <a href="tel:03479684918">0347 9684918</a>
                  </p>
                </div>
              </div>
              <div className="jtl-contact-item">
                <div className="jtl-contact-icon">
                  <FaUserDoctor size={15} />
                </div>
                <div>
                  <span className="jtl-contact-label">Founder and Director:</span>
                  <p>Adil Khan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Full-Width Bar */}
        <div className="jtl-footer-bottom">
          <div className="jtl-footer-copyright">
            Copyright © 2026 Journey Towards Life. All Rights Reserved. ·{" "}
            <Link
              href="/admin/login"
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "underline",
                fontSize: "13px",
                transition: "color 0.2s ease",
              }}
            >
              Admin Portal
            </Link>
          </div>

          <div className="jtl-footer-developer">
            Developed by{" "}
            <Link
              href="https://www.linkedin.com/in/wajid-ali-khan-364bb9220/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wajid Ali Khan
            </Link>
          </div>

          <div className="jtl-footer-social">
            <a
              href="https://wa.me/923420000201"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/wajid-ali-khan-364bb9220/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={17} />
            </a>
            <a href="#!" aria-label="Facebook">
              <FaFacebook size={17} />
            </a>
            <a href="#!" aria-label="Instagram">
              <FaInstagram size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
