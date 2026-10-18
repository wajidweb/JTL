import React from "react";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section id="services" className="service pos-rel z-1 radius-20 mt-30 pt-130 pb-130 gradient-bg-2">
      <div className="service-circle-shape">
        <img src="/assets/img/shape/service_bg.png" alt="" />
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="about-content text-center mb-55">
              <div className="sec-title">
                <span className="xb-item--subtitle">Individualized Therapy and Learning</span>
                <h2 className="xb-item--title mb-15">The Five Core Therapy and Special Education Services</h2>
                <p className="xb-item--content">
                  Every child&apos;s developmental path is unique. We replace rigid curricula with personalized therapy plans designed around your child&apos;s specific strengths, sensory needs, and learning pace.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="service-inner">
          <div className="row mt-none-30 justify-content-center">
            {/* Service 1 */}
            <div className="col-lg-4 col-md-6 mt-30">
              <div className="service-item wow fadeInUp" style={{ visibility: "visible" }}>
                <div className="xb-item--icon">
                  <img src="/assets/img/icon/service_icon1.gif" alt="Speech and Language Therapy" />
                </div>
                <h3 className="xb-item--title border-effect">
                  <Link href="#services">Speech and Language Therapy</Link>
                </h3>
                <p className="xb-item--content">
                  Helping children find their voice and communicate with confidence. We focus on speech sounds, vocabulary, language understanding, and social interaction so children can express their feelings and everyday needs.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="col-lg-4 col-md-6 mt-30">
              <div className="service-item middle wow fadeInUp" style={{ visibility: "visible" }}>
                <div className="xb-item--icon">
                  <img src="/assets/img/icon/service_icon2.gif" alt="Occupational Therapy OT" />
                </div>
                <h3 className="xb-item--title border-effect">
                  <Link href="#services">Occupational Therapy OT</Link>
                </h3>
                <p className="xb-item--content">
                  Fostering motor coordination and daily independence. We guide children in holding pencils, eating, dressing, and physical balance, building practical self reliance for everyday family routines.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="col-lg-4 col-md-6 mt-30">
              <div className="service-item wow fadeInUp" style={{ visibility: "visible" }}>
                <div className="xb-item--icon">
                  <img src="/assets/img/icon/service_icon3.gif" alt="Behavioural Therapy ABA" />
                </div>
                <h3 className="xb-item--title border-effect">
                  <Link href="#services">Behavioural Therapy ABA</Link>
                </h3>
                <p className="xb-item--content">
                  Using positive, structured strategies to develop adaptive habits and address learning hurdles. We work closely alongside parents to ensure consistent, encouraging guidance at home.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="col-lg-4 col-md-6 mt-50">
              <div className="service-item wow fadeInUp" style={{ visibility: "visible" }}>
                <div className="xb-item--icon">
                  <img src="/assets/img/icon/service_icon2.gif" alt="Sensory Issues Management" />
                </div>
                <h3 className="xb-item--title border-effect">
                  <Link href="#services">Sensory Issues Management</Link>
                </h3>
                <p className="xb-item--content">
                  Supporting children who experience sensitivity to sounds, lights, touch, or movement. We create calming routines and sensory activities that help children feel secure, comfortable, and focused.
                </p>
              </div>
            </div>

            {/* Service 5 */}
            <div className="col-lg-4 col-md-6 mt-50">
              <div className="service-item wow fadeInUp" style={{ visibility: "visible" }}>
                <div className="xb-item--icon">
                  <img src="/assets/img/icon/service_icon1.gif" alt="Special Education and IEPs" />
                </div>
                <h3 className="xb-item--title border-effect">
                  <Link href="#services">Special Education and IEPs</Link>
                </h3>
                <p className="xb-item--content">
                  Tailored academic learning adapted to how your child absorbs knowledge. Structured Individual Education Plans with clear milestones and regular parent updates nurture essential foundational skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="service-btn text-center mt-75">
          <Link
            href="https://wa.me/923420000201"
            target="_blank"
            rel="noopener noreferrer"
            className="thm-btn thm-btn--primary"
          >
            <span>Consult With Our Specialists On WhatsApp</span>
          </Link>
        </div>
      </div>
      <div className="service-shape">
        <div className="shape shape--1">
          <img src="/assets/img/shape/srv_shape1.png" alt="" />
        </div>
        <div className="shape shape--2">
          <img src="/assets/img/shape/srv_shape2.png" alt="" />
        </div>
      </div>
    </section>
  );
}
