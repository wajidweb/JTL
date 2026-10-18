import React from "react";
import {
  BackToTop,
  TopBanner,
  Header,
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyChooseUsSection,
  GallerySection,
  VideosSection,
  TeamSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <div className="qbxr">
      <div className="jtl_main_container">
        {/* Back to top button */}
        <BackToTop />

        <div className="body_wrap o-clip">
          {/* Top banner notification */}
          <TopBanner />

          {/* Header area */}
          <Header />

          {/* Main Area */}
          <main>
            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AboutSection />

            {/* Services Section */}
            <ServicesSection />

            {/* Why Choose Us Section */}
            <WhyChooseUsSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* Videos Section */}
            <VideosSection />

            {/* Our Team Section */}
            <TeamSection />
          </main>
        </div>
      </div>

      {/* Full-Width Redesigned Footer */}
      <Footer />
    </div>
  );
}
