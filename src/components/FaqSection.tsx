"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaWhatsapp,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import { siteConfig } from "@/config/site";

interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "faq-services",
    num: "01",
    question: "What therapies and special education programs does Journey Towards Life offer?",
    answer:
      "Journey Towards Life provides five comprehensive, evidence-informed services under one roof in Mingora, Swat: Speech and Language Therapy (articulation, expressive/receptive vocabulary, and social communication), Occupational Therapy (OT for fine and gross motor skills, pencil grip, coordination, balance, and daily self-care), Behavioural Therapy (ABA strategies for positive adaptive learning), Sensory Issues Management (calming routines for sensory sensitivities), and Adaptive Special Education with Individual Education Plans (IEPs).",
  },
  {
    id: "faq-booking",
    num: "02",
    question: "How do I book an initial consultation or developmental assessment for my child?",
    answer: `Booking an assessment is easy and confidential. You can message our primary WhatsApp line at ${siteConfig.whatsappNumber} or call our direct phone lines at ${siteConfig.phonePrimary} and ${siteConfig.phoneSecondary}. During the first visit, our specialists conduct a friendly developmental observation, discuss your child's communication and sensory profile, and formulate an individualized support plan.`,
  },
  {
    id: "faq-ages",
    num: "03",
    question: "What age groups and developmental conditions do you support?",
    answer:
      "We support toddlers, young children, and adolescents with Autism Spectrum Disorder (ASD), speech delays, developmental delays, motor coordination difficulties, sensory processing differences, and specialized learning hurdles. We place strong emphasis on early intervention to maximize long-term independence and cognitive development.",
  },
  {
    id: "faq-parents",
    num: "04",
    question: "How are parents and families involved throughout the child's therapy?",
    answer:
      "Family partnership is the cornerstone of our philosophy. We actively guide parents through weekly coaching sessions, provide practical home routines, and offer regular progress reports. This ensures that skills developed during centre sessions are naturally practiced and reinforced in everyday family life.",
  },
  {
    id: "faq-iep",
    num: "05",
    question: "What is an Individual Education Plan (IEP) and how is progress measured?",
    answer:
      "An Individual Education Plan (IEP) is a personalized learning roadmap designed around your child's unique starting abilities, strengths, and sensory profile. We establish clear, achievable milestones, regularly review targets, and collaborate with parents so that every improvement in communication, self-care, and learning is tracked and celebrated.",
  },
  {
    id: "faq-location",
    num: "06",
    question: "Where is Journey Towards Life located in Swat, and what are the opening hours?",
    answer: `Our centre is situated near Girls Degree College in College Colony, Mingora, Swat, Khyber Pakhtunkhwa, Pakistan. We are open Monday through Saturday from 8:30 AM to 4:00 PM. You can get exact turn-by-turn driving directions by clicking the Google Maps link on our website.`,
  },
];

export default function FaqSection() {
  const [activeId, setActiveId] = useState<string | null>("faq-services");

  const toggleFaq = (id: string) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section id="faq" className="jtl-faq-section" aria-labelledby="faq-title">
      <div className="jtl-faq-wrapper">
        {/* Section Header */}
        <div className="jtl-faq-header">
          <div className="jtl-faq-badge-wrap">
            <span className="jtl-faq-badge-dot" />
            <span className="jtl-faq-badge-text">Compassionate Guidance · Swat</span>
          </div>

          <h2 id="faq-title" className="jtl-faq-main-title">
            Frequently Asked <span>Questions</span>
          </h2>

          <p className="jtl-faq-subtitle">
            Practical answers about assessments, our 5 core therapy programs, Individual Education Plans (IEPs), and family collaboration in Mingora, Swat.
          </p>
        </div>

        {/* Full-Width Stack (One question per row) */}
        <div className="jtl-faq-list" role="region" aria-label="Frequently Asked Questions">
          {FAQS.map((faq) => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`jtl-faq-card ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="jtl-faq-card-header"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <div className="jtl-faq-card-left">
                    <span className="jtl-faq-num">{faq.num}</span>
                    <h3 className="jtl-faq-question-text">{faq.question}</h3>
                  </div>

                  <div className="jtl-faq-icon-btn" aria-hidden="true">
                    <FaChevronDown size={14} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="jtl-faq-card-body"
                  >
                    <p style={{ margin: 0 }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full-Width Bottom Help & Direct Consultation Banner */}
        <div className="jtl-faq-fullwidth-cta">
          <div className="jtl-faq-cta-left">
            <span className="jtl-faq-cta-badge">Have Additional Questions?</span>
            <h4 className="jtl-faq-cta-heading">
              Connect With Our Care Team in Mingora, Swat
            </h4>
            <p className="jtl-faq-cta-text">
              Every child is unique. Our specialists are ready to listen, understand your family&apos;s goals, explain our therapy plans, and book an initial assessment consultation.
            </p>
          </div>

          <div className="jtl-faq-cta-buttons">
            <Link
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="thm-btn thm-btn--whatsapp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 24px",
                fontSize: "14.5px",
              }}
            >
              <FaWhatsapp size={18} />
              <span>WhatsApp: {siteConfig.whatsappNumber}</span>
            </Link>

            <a
              href={`tel:${siteConfig.phonePrimary.replace(/\s+/g, "")}`}
              className="thm-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 22px",
                fontSize: "14.5px",
              }}
            >
              <FaPhone size={13} />
              <span>Direct Call: {siteConfig.phonePrimary}</span>
            </a>

            <Link
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="thm-btn thm-btn--dark"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 20px",
                fontSize: "14.5px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <FaLocationDot size={14} />
              <span>Get Directions</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
