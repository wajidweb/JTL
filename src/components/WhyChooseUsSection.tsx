import React from "react";
import Link from "next/link";

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose" className="funfact pos-rel z-1 radius-20 mt-30" style={{ backgroundColor: "rgb(160, 68, 68)" }}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="funfact-image">
              <div className="funfact-image-inner">
                {["01", "02", "03", "04", "01", "02", "03", "04"].map((img, i) => (
                  <div className="xb-item--img" key={`ff-col1-${i}`}>
                    <img src={`/assets/img/funfact/ff_${img}.png`} alt="JTL Activities" />
                  </div>
                ))}
              </div>
              <div className="funfact-image-inner marquee-2">
                {["05", "06", "07", "08", "05", "06", "07", "08"].map((img, i) => (
                  <div className="xb-item--img" key={`ff-col2-${i}`}>
                    <img src={`/assets/img/funfact/ff_${img}.png`} alt="JTL Sessions" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="funfact-content pt-150 pb-150 wow fadeIn" style={{ visibility: "visible" }}>
              <div className="sec-title sec-title--white mb-45">
                <span className="xb-item--subtitle">Why Families Choose Journey Towards Life</span>
                <h2 className="xb-item--title mb-25">
                  A Trusted Haven Where Every Child Feels Understood, Valued, and Empowered to Grow
                </h2>
                <p className="xb-item--content" style={{ lineHeight: "1.8", marginBottom: "20px" }}>
                  We understand that navigating developmental delays or autism brings heartfelt questions, hopes, and vulnerability. At our centre in Mingora, Swat, we walk with families as compassionate, dedicated partners.
                </p>
                <p className="xb-item--content" style={{ lineHeight: "1.8", marginBottom: "0px" }}>
                  Combining evidence informed therapies with close parental coaching, we recognize every child&apos;s unique potential. Together, we celebrate every smile, every new word, and every independent step forward.
                </p>
              </div>

              <ul className="funfact-list list-unstyled">
                <li>
                  <span className="funfact-icon-wrap">
                    <img src="/assets/img/icon/ff_01.svg" alt="" />
                  </span>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
                      Individual Therapy Plans Built for Your Child
                    </h4>
                    <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "14.5px", lineHeight: "22px", marginBottom: 0 }}>
                      No identical templates. Every therapy goal is shaped around your child&apos;s distinct sensory profile, strengths, and pace.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="funfact-icon-wrap">
                    <img src="/assets/img/icon/ff_02.svg" alt="" />
                  </span>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
                      Active Weekly Parent Guidance and Collaboration
                    </h4>
                    <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "14.5px", lineHeight: "22px", marginBottom: 0 }}>
                      We equip parents with practical home routines and clear weekly updates so growth continues beyond our centre.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="funfact-icon-wrap">
                    <img src="/assets/img/icon/ff_03.svg" alt="" />
                  </span>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
                      Integrated Speech, Sensory, and Motor Support
                    </h4>
                    <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "14.5px", lineHeight: "22px", marginBottom: 0 }}>
                      Five core therapies coordinated seamlessly under one caring roof for balanced developmental progress.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="funfact-icon-wrap">
                    <img src="/assets/img/icon/ff_02.svg" alt="" />
                  </span>
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
                      Safe, Compassionate, and Respectful Atmosphere
                    </h4>
                    <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "14.5px", lineHeight: "22px", marginBottom: 0 }}>
                      A gentle and joyful space in Mingora where children feel secure, loved, and eager to learn.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="funfact-btn mt-50">
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
      </div>
      <div className="funfact-shape">
        <img src="/assets/img/shape/ff_shape.png" alt="" />
      </div>
    </section>
  );
}
