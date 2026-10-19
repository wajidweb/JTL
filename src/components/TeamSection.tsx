import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Adil Khan",
      role: "Founder and Director",
      badge: "Centre Leadership",
      themeColor: "#e69e01",
      bannerGrad: "linear-gradient(135deg, #e69e01 0%, #996200 100%)",
      image: "/assets/img/team/team_01.svg",
      bio: "Guiding Journey Towards Life with dedication to individualized autism support, family empowerment, and accessible therapies across Swat Valley.",
      skills: ["Strategic Vision", "Clinical Direction", "Family Guidance"],
    },
    {
      id: 2,
      name: "[NAME]",
      role: "Speech Therapist",
      badge: "Speech and Language",
      themeColor: "#1d6c80",
      bannerGrad: "linear-gradient(135deg, #2a7385 0%, #143e49 100%)",
      image: "/assets/img/team/team_02.svg",
      bio: "Specializing in speech articulation, language comprehension, and social communication so children can express thoughts and feelings with joy.",
      skills: ["Articulation", "Social Language", "Comprehension"],
    },
    {
      id: 3,
      name: "[NAME]",
      role: "Occupational Therapist",
      badge: "Occupational Therapy OT",
      themeColor: "#ad6921",
      bannerGrad: "linear-gradient(135deg, #be772f 0%, #744414 100%)",
      image: "/assets/img/team/team_03.svg",
      bio: "Developing fine and gross motor coordination, sensory regulation, and self reliance for holding tools, dressing, and everyday routines.",
      skills: ["Motor Skills", "Sensory Balance", "Daily Living"],
    },
    {
      id: 4,
      name: "[NAME]",
      role: "Behaviour Therapist (ABA)",
      badge: "Behavioural Support ABA",
      themeColor: "#395b82",
      bannerGrad: "linear-gradient(135deg, #446383 0%, #1f3346 100%)",
      image: "/assets/img/team/team_04.svg",
      bio: "Employing positive, structured techniques to foster adaptive habits, address frustration, and equip parents with reassuring home strategies.",
      skills: ["Positive Behaviour", "Skill Acquisition", "Parent Coaching"],
    },
    {
      id: 5,
      name: "[NAME]",
      role: "Special Educator",
      badge: "Special Education and IEPs",
      themeColor: "#357053",
      bannerGrad: "linear-gradient(135deg, #467960 0%, #1e4532 100%)",
      image: "/assets/img/team/team_05.svg",
      bio: "Crafting structured Individual Education Plans tailored to unique learning styles, turning academic goals into celebrated milestones.",
      skills: ["Adaptive Teaching", "IEP Development", "Learning Milestones"],
    },
  ];

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
              <p className="xb-item--content" style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "1.7" }}>
                Working together in Mingora, Swat to support every child with individualized therapy, respectful guidance, and empowering education.
              </p>
            </div>
          </div>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="jtl-team-card">
              {/* Card Banner with Custom Specialty Gradient */}
              <div
                className="jtl-team-banner"
                style={{ background: member.bannerGrad }}
              >
                <span
                  className="jtl-team-category-badge"
                  style={{ color: member.themeColor }}
                >
                  {member.badge}
                </span>
              </div>

              {/* Card Body with Overlapping Avatar */}
              <div className="jtl-team-body">
                <div className="jtl-team-avatar-wrap">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3 className="jtl-team-name">{member.name}</h3>
                <p className="jtl-team-role" style={{ color: member.themeColor }}>
                  {member.role}
                </p>
                <p className="jtl-team-bio">{member.bio}</p>

                {/* Focus Skill Badges */}
                <div className="jtl-team-skills">
                  {member.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="jtl-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Interactive Action Button */}
                <Link
                  href="https://wa.me/923420000201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jtl-team-whatsapp-btn"
                >
                  <FaWhatsapp size={16} />
                  <span>Connect On WhatsApp</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-55">
          <Link
            href="https://wa.me/923420000201"
            target="_blank"
            rel="noopener noreferrer"
            className="thm-btn thm-btn--dark"
          >
            <span>Consult With Our Specialists On WhatsApp</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
