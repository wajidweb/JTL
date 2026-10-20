"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string;
  whatsapp_number: string;
  profile_picture: string;
}

const SPECIALTY_COLORS = ["#e69e01", "#1d6c80", "#ad6921", "#395b82", "#357053"];

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE = siteConfig.apiUrl;
  const BACKEND_URL = API_BASE.replace(/\/api$/, "");

  // Fetch dynamic team members strictly from the backend
  useEffect(() => {
    let ignore = false;

    async function loadTeam() {
      try {
        const res = await fetch(`${API_BASE}/team`);
        const json = await res.json();
        if (!ignore && res.ok && json.success && Array.isArray(json.data)) {
          setMembers(json.data);
        }
      } catch (err) {
        console.error("Error loading team members from backend:", err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadTeam();

    return () => {
      ignore = true;
    };
  }, [API_BASE]);

  return (
    <section id="team" className="team-section gradient-bg-2 radius-20 mt-30">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10">
            <div className="sec-title text-center mb-40">
              <span className="xb-item--subtitle">Dedicated Specialists</span>
              <h2 className="xb-item--title mb-15">
                Meet Our Multidisciplinary Specialist Team
              </h2>
              <p
                className="xb-item--content"
                style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "1.7" }}
              >
                Working together in Mingora, Swat to support every child with individualized therapy, respectful guidance, and empowering education.
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid rgba(230, 158, 1, 0.2)",
                borderTopColor: "var(--admin-gold, #e69e01)",
                borderRadius: "50%",
                animation: "spin 0.75s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ color: "#ffffff", opacity: 0.85, fontSize: "14px" }}>
              Loading specialist profiles...
            </p>
          </div>
        ) : members.length === 0 ? (
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
              Specialist profiles are being updated. Please connect with our director for direct consultations.
            </p>
            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="thm-btn thm-btn--dark"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 32px",
                minWidth: 0,
              }}
            >
              <span style={{ marginLeft: 0, whiteSpace: "nowrap" }}>
                Consult On WhatsApp: {siteConfig.whatsappNumber}
              </span>
            </Link>
          </div>
        ) : (
          /* Live Dynamic Members Grid */
          <div className="team-grid">
            {members.map((member, idx) => {
              const themeColor = SPECIALTY_COLORS[idx % SPECIALTY_COLORS.length];
              const bannerGrad = `linear-gradient(135deg, ${themeColor} 0%, #08082e 100%)`;
              const imageUrl = member.profile_picture
                ? member.profile_picture.startsWith("http")
                  ? member.profile_picture
                  : `${BACKEND_URL}${member.profile_picture}`
                : null;

              const skillList = member.skills
                ? member.skills.split(",").map((s) => s.trim()).filter(Boolean)
                : [];

              const rawWhatsApp = member.whatsapp_number || siteConfig.whatsappNumber;
              const digitsOnly = rawWhatsApp.replace(/[^0-9]/g, "");
              const waLink = digitsOnly.startsWith("92")
                ? `https://wa.me/${digitsOnly}`
                : `https://wa.me/92${digitsOnly.replace(/^0+/, "")}`;

              return (
                <div key={member.id} className="jtl-team-card">
                  {/* Card Banner */}
                  <div className="jtl-team-banner" style={{ background: bannerGrad }}>
                    <span className="jtl-team-category-badge" style={{ color: themeColor }}>
                      {member.role}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="jtl-team-body">
                    <div className="jtl-team-avatar-wrap">
                      {imageUrl ? (
                        <img src={imageUrl} alt={member.name} />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #1d6c80 0%, #08082e 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontWeight: 800,
                            fontSize: "26px",
                          }}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <h3 className="jtl-team-name">{member.name}</h3>
                    <p className="jtl-team-role" style={{ color: themeColor }}>
                      {member.role}
                    </p>
                    <p className="jtl-team-bio">
                      {member.bio || "Dedicated specialist providing compassionate and individualized therapy."}
                    </p>

                    {/* Skill Badges */}
                    {skillList.length > 0 && (
                      <div className="jtl-team-skills">
                        {skillList.map((skill, sIdx) => (
                          <span key={sIdx} className="jtl-skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* WhatsApp Action Button */}
                    <Link
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="jtl-team-whatsapp-btn"
                    >
                      <FaWhatsapp size={16} />
                      <span>{member.whatsapp_number ? `WhatsApp: ${member.whatsapp_number}` : "Connect On WhatsApp"}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-55">
          <Link
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="thm-btn thm-btn--dark"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 36px",
              minWidth: 0,
            }}
          >
            <span style={{ marginLeft: 0, whiteSpace: "nowrap" }}>
              Consult With Our Specialists On WhatsApp
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
