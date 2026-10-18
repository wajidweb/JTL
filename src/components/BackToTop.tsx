"use client";

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`xb-backtotop ${showBackToTop ? "active" : ""}`}>
      <a
        href="#hero"
        className="scroll"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp size={16} />
      </a>
    </div>
  );
}
