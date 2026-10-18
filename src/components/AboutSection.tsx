import React from "react";
import Link from "next/link";

export default function AboutSection() {
  const pillars = [
    "Person Centred Support",
    "Speech and Language Therapy",
    "Occupational Therapy OT",
    "Behavioural Therapy ABA",
    "Sensory Regulation",
    "Individual Education Plans",
    "Early Intervention Focus",
    "Parent Guidance and Coaching",
    "Person Centred Support",
    "Speech and Language Therapy",
    "Occupational Therapy OT",
    "Behavioural Therapy ABA",
    "Sensory Regulation",
    "Individual Education Plans",
    "Early Intervention Focus",
    "Parent Guidance and Coaching",
  ];

  return (
    <section id="about" className="about pos-rel z-1 gradient-bg pt-130 radius-20 mt-30">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="about-content text-center">
              <div className="sec-title">
                <span className="xb-item--subtitle">About Journey Towards Life</span>
                <h2 className="xb-item--title mb-30">
                  A Dedicated Haven In Swat Where Every Child Receives Respectful, <span>Individualized Care</span> To Blossom.
                </h2>
                <p className="xb-item--content" style={{ marginTop: "24px", marginBottom: "24px", lineHeight: "1.8" }}>
                  Established in 2021 in Mingora, Swat, by founder <strong>Adil Khan</strong>, <strong>Journey Towards Life</strong> is dedicated to supporting children with Autism Spectrum Disorder and developmental needs. We believe every child possesses unique strengths, dignity, and boundless potential that deserve to be nurtured with specialized, compassionate care.
                </p>
                <p className="xb-item--content" style={{ marginTop: "24px", marginBottom: "35px", lineHeight: "1.8" }}>
                  Rejecting one size fits all methods, our professionals design personalized therapy pathways combining one to one speech therapy, occupational development, sensory regulation, and adaptive special education. We walk beside families with continuous guidance, turning daily challenges into proud milestones of confidence and independence.
                </p>
              </div>

              <div style={{ marginTop: "25px", marginBottom: "45px" }}>
                <Link
                  href="https://wa.me/923420000201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thm-btn"
                >
                  <span>Contact Us On WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="about-image text-center">
          <img src="/assets/img/about/about_img1.jpeg" alt="Person Centred Support" />
          <img src="/assets/img/about/about_img2.png" alt="One to One Therapy" />
          <img src="/assets/img/about/about_img03.jpg" alt="Parent Guidance" />
          <img src="/assets/img/about/about_img04.jpg" alt="Skill Development" />
        </div>
      </div>

      {/* Core Principles Marquee */}
      <div className="about-brand">
        <span className="about-brand-title">Core Service Pillars and Standards</span>
        <div className="about-brand-inner marquee-left">
          <div className="about-brand-track">
            {pillars.map((pillar, idx) => (
              <div
                className="brand-item"
                key={`pillar-${idx}`}
                style={{
                  minWidth: "220px",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "17px",
                  letterSpacing: "0.5px",
                }}
              >
                <span>★ {pillar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
