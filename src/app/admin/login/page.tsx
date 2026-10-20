"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaLock,
  FaEnvelope,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCircleExclamation,
} from "react-icons/fa6";
import { siteConfig } from "@/config/site";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthToken() {
  return localStorage.getItem("jtl_admin_token");
}

function getServerToken() {
  return null;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Read auth token from external store without triggering setState-in-effect
  const token = useSyncExternalStore(subscribe, getAuthToken, getServerToken);

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    if (token) {
      router.replace("/admin");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const apiUrl = siteConfig.apiUrl;
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      // Store authenticated JWT token & admin user details
      if (typeof window !== "undefined") {
        if (data.token) {
          localStorage.setItem("jtl_admin_token", data.token);
        }
        if (data.user) {
          localStorage.setItem("jtl_admin_user", JSON.stringify(data.user));
        }
      }

      // Successful redirect to Admin Dashboard
      router.replace("/admin");
    } catch (err: unknown) {
      console.error("Login request failed:", err);
      setErrorMessage(
        "Unable to reach the server. Please verify backend is running on port 5001."
      );
      setIsLoading(false);
    }
  };

  // Prevent flash of login screen if already logged in
  if (token) {
    return (
      <div
        className="admin-login-wrapper"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08082e",
        }}
      >
        <div style={{ textAlign: "center", color: "#ffffff" }}>
          <div className="admin-spinner" />
          <span style={{ fontSize: "14px", opacity: 0.85 }}>Redirecting to dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Left Side: Brand Visual & Centre Photo */}
        <div className="admin-login-visual">
          <div style={{ position: "relative", zIndex: 2 }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                background: "rgba(0, 0, 0, 0.35)",
                padding: "8px 14px",
                borderRadius: "50px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(6px)",
                transition: "all 0.2s ease",
              }}
            >
              <FaArrowLeft size={12} />
              <span>Back to Website</span>
            </Link>
          </div>

          <div className="admin-login-visual-content">
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                padding: "3px",
                background: "linear-gradient(135deg, #fed23c 0%, #e69e01 100%)",
                boxShadow: "0 8px 25px rgba(230, 158, 1, 0.4)",
                marginBottom: "20px",
                display: "inline-block",
              }}
            >
              <Image
                src="/assets/img/logo.png"
                alt="JTL Logo"
                width={70}
                height={70}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
            </div>
            <h2>Journey Towards Life</h2>
            <p style={{ color: "#ffffff", opacity: 0.95, fontSize: "15px", lineHeight: "1.6" }}>
              Autism &amp; Special Education Centre in Mingora, Swat. Welcome to the Administrative Portal.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              fontSize: "12px",
              color: "#ffffff",
              opacity: 0.8,
            }}
          >
            Empowering Growth · Nurturing Potential
          </div>
        </div>

        {/* Right Side: Clean Login Form */}
        <div className="admin-login-form-side">
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "8px",
                letterSpacing: "-0.3px",
              }}
            >
              Admin Login
            </h2>
            <p style={{ fontSize: "14px", color: "#ffffff", opacity: 0.85, margin: 0 }}>
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.18)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#ffffff",
                padding: "10px 14px",
                borderRadius: "10px",
                fontSize: "13.5px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                lineHeight: "1.4",
              }}
            >
              <FaCircleExclamation size={16} style={{ color: "#f87171", flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email / Username */}
            <div className="admin-input-group">
              <label htmlFor="admin-email">Email Address</label>
              <div className="admin-input-wrapper">
                <FaEnvelope className="admin-input-icon" />
                <input
                  id="admin-email"
                  type="email"
                  className="admin-input"
                  placeholder="Enter your admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="admin-input-group">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label htmlFor="admin-password">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ffffff",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: 0,
                    marginBottom: "8px",
                    opacity: 0.9,
                  }}
                >
                  {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
              <div className="admin-input-wrapper">
                <FaLock className="admin-input-icon" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="admin-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {/* Login CTA */}
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={isLoading}
              style={{
                marginTop: "10px",
                background: "linear-gradient(135deg, #fed23c 0%, #e69e01 100%)",
                color: "#08082e",
                fontWeight: 800,
                fontSize: "15.5px",
              }}
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Login</span>
                  <FaArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
