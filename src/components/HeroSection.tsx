import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section id="hero" className="hero hero-style-one wow animated" style={{ visibility: "visible" }}>
      <div className="hero-inner hero-height pos-rel radius-20">
        <div
          className="hero-one-image bg_img"
          style={{
            backgroundImage: 'url("/assets/img/hero/hero_img.jpeg")',
            filter: "brightness(0.9)",
          }}
        ></div>
        <div className="container-fluid px-50">
          <div className="row">
            <div className="col-xxl-9 col-xl-10 col-lg-11 col-12">
              <div className="hero-content">
                <span className="xb-item--subtitle wow fadeInUp" style={{ visibility: "visible" }}>
                  Autism and Special Education Centre · Mingora, Swat
                </span>
                <h1 className="xb-item--title wow fadeInUp" style={{ visibility: "visible" }}>
                  Helping Every Child Communicate, Learn, and Step Confidently into Life.
                </h1>
                <p className="xb-item--content wow fadeInUp" style={{ visibility: "visible" }}>
                  Every child holds unique strengths waiting to be unlocked. We provide personalized therapies, sensory support, and adaptive learning, partnering with families to turn daily challenges into proud milestones.
                </p>
                <div className="hero-btn wow fadeInUp" style={{ visibility: "visible" }}>
                  <Link
                    href={siteConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="thm-btn"
                  >
                    <span>Get Directions</span>
                  </Link>
                  <Link
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="thm-btn thm-btn--whatsapp"
                  >
                    <span>WhatsApp: {siteConfig.whatsappNumber}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
