import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import "./globals.css";
import "./jtl.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = siteConfig.siteUrl;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#030712" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Journey Towards Life | Autism & Special Education Centre - Mingora, Swat",
    template: "%s | Journey Towards Life",
  },
  description:
    `Journey Towards Life (JTL) is a dedicated autism and special education centre in Mingora, Swat, KPK, Pakistan. Established in 2021 by ${siteConfig.founderName}, providing Speech & Language Therapy, Occupational Therapy (OT), Behavioural Therapy (ABA), Sensory Regulation, and Individual Education Plans (IEPs).`,
  applicationName: "Journey Towards Life",
  authors: [
    { name: "Journey Towards Life", url: siteUrl },
    { name: siteConfig.founderName },
  ],
  generator: "Next.js",
  keywords: [
    "Journey Towards Life",
    "JTL Swat",
    "Autism Centre Swat",
    "Autism Centre Mingora",
    "Special Education Swat",
    "Special Needs Centre KPK",
    "Speech Therapy Swat",
    "Speech and Language Therapy Mingora",
    "Occupational Therapy Swat",
    "ABA Therapy Swat",
    "Applied Behaviour Analysis Pakistan",
    "Sensory Issues Management Swat",
    "Sensory Regulation Therapy",
    "Individual Education Plan Swat",
    "Child Developmental Delay Centre Swat",
    "Adil Khan Swat",
    "Autism Rehabilitation Mingora Swat",
  ],
  creator: "Journey Towards Life",
  publisher: "Journey Towards Life",
  category: "Health & Special Education",
  classification: "Autism and Special Education Centre",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "Journey Towards Life",
    title: "Journey Towards Life | Autism & Special Education Centre - Mingora, Swat",
    description:
      "Specialized autism therapies and compassionate special education in Mingora, Swat. One-to-one Speech Therapy, Occupational Therapy (OT), ABA Behavioural Therapy, and Sensory Regulation.",
    images: [
      {
        url: "/assets/img/hero/hero_img.jpeg",
        width: 1200,
        height: 630,
        alt: "Journey Towards Life Autism & Special Education Centre Swat",
        type: "image/jpeg",
      },
      {
        url: "/assets/img/logo.png",
        width: 512,
        height: 512,
        alt: "Journey Towards Life Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey Towards Life | Autism & Special Education Centre - Mingora, Swat",
    description:
      "Specialized autism therapies and compassionate special education in Mingora, Swat. Speech Therapy, OT, ABA, Sensory Regulation, and IEPs.",
    images: ["/assets/img/hero/hero_img.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/assets/img/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/assets/img/logo.png",
    shortcut: "/assets/img/logo.png",
  },
  other: {
    "geo.region": "PK-KP",
    "geo.placename": "Mingora, Swat",
    "geo.position": "34.7758;72.3626",
    ICBM: "34.7758, 72.3626",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <link rel="icon" type="image/png" href="/assets/img/logo.png" />
        <link rel="apple-touch-icon" href="/assets/img/logo.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}

