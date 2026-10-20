import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function TopBanner() {
  return (
    <p className="hero-top-content text-center">
      Journey Towards Life, Autism &amp; Special Education Centre in Mingora, Swat :{" "}
      <Link
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Chat on WhatsApp
      </Link>
    </p>
  );
}
