import React from "react";
import { siteConfig } from "@/config/site";

export default function StructuredData() {
  const baseUrl = siteConfig.siteUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalBusiness", "SpecialEducationSchool", "LocalBusiness"],
        "@id": `${baseUrl}/#organization`,
        name: "Journey Towards Life (JTL) - Autism & Special Education Centre",
        alternateName: [
          "Journey Towards Life",
          "JTL",
          "JTL Swat",
          "JTL Autism Centre Mingora",
        ],
        url: baseUrl,
        logo: `${baseUrl}/assets/img/logo.png`,
        image: `${baseUrl}/assets/img/hero/hero_img.jpeg`,
        description:
          "Established in 2021 in Mingora, Swat, Journey Towards Life provides specialized Speech Therapy, Occupational Therapy (OT), Behavioural Therapy (ABA), Sensory Regulation, and Individual Education Plans (IEPs) for children with autism and developmental needs.",
        foundingDate: "2021",
        founder: {
          "@type": "Person",
          name: siteConfig.founderName,
          jobTitle: "Founder & Director",
        },
        telephone: siteConfig.whatsappNumber,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Near Girls Degree College, College Colony",
          addressLocality: "Mingora",
          addressRegion: "Khyber Pakhtunkhwa",
          postalCode: "19130",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 34.7758,
          longitude: 72.3626,
        },
        hasMap: siteConfig.googleMapsUrl,
        priceRange: "$$",
        currenciesAccepted: "PKR",
        paymentAccepted: "Cash, Bank Transfer",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "08:30",
            closes: "16:00",
          },
        ],
        medicalSpecialty: [
          "Pediatric",
          "SpeechLanguagePathology",
          "OccupationalTherapy",
        ],
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Mingora, Swat",
          },
          {
            "@type": "AdministrativeArea",
            name: "Khyber Pakhtunkhwa, Pakistan",
          },
        ],
        sameAs: [
          siteConfig.googleMapsUrl,
          siteConfig.whatsappUrl,
          siteConfig.facebookUrl,
          siteConfig.youtubeUrl,
          siteConfig.developerLinkedIn,
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Core Therapy & Special Education Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Speech and Language Therapy",
                description:
                  "Evidence-informed speech articulation, vocabulary building, comprehension, and social communication therapy.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Occupational Therapy (OT)",
                description:
                  "Functional fine and gross motor skills, pencil grip, coordination, balance, and everyday self-care routines.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Behavioural Therapy (ABA)",
                description:
                  "Applied Behaviour Analysis using positive, structured strategies for adaptive skill-building and behavioral hurdles.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Sensory Issues Management",
                description:
                  "Sensory regulation and calming routines for children with sensory processing sensitivities to sound, light, or touch.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Special Education & Individual Education Plans (IEPs)",
                description:
                  "Personalized adaptive learning pathways with measurable developmental milestones tailored to each child's pace.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Journey Towards Life",
        description:
          "Autism and Special Education Centre in Mingora, Swat, KPK, Pakistan",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "en-PK",
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What services are provided at Journey Towards Life in Mingora, Swat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Journey Towards Life provides five core therapy and learning services: Speech and Language Therapy, Occupational Therapy (OT), Behavioural Therapy (ABA), Sensory Issues Management, and adaptive Special Education with Individual Education Plans (IEPs).",
            },
          },
          {
            "@type": "Question",
            name: "How do I book an initial consultation or developmental assessment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `Families can book an assessment directly by contacting our primary WhatsApp line at ${siteConfig.whatsappNumber} or calling ${siteConfig.phonePrimary}. You can also visit our centre located near Girls Degree College, College Colony, Mingora, Swat.`,
            },
          },
          {
            "@type": "Question",
            name: "What age groups and developmental needs do you support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We support toddlers, young children, and adolescents with Autism Spectrum Disorder (ASD), speech and language delays, motor coordination difficulties, sensory processing challenges, and learning delays.",
            },
          },
          {
            "@type": "Question",
            name: "Are parents involved in the therapy sessions and progress reviews?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Active family collaboration is a core pillar of our philosophy. We provide regular parental guidance, home routine strategies, and clear progress updates so therapy milestones continue seamlessly at home.",
            },
          },
          {
            "@type": "Question",
            name: "What is an Individual Education Plan (IEP) and how is progress measured?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An Individual Education Plan (IEP) is a personalized learning roadmap designed around your child's unique starting abilities, strengths, and sensory profile. We establish clear, achievable milestones, regularly review targets, and collaborate with parents so that every improvement in communication, self-care, and learning is tracked and celebrated.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Journey Towards Life located in Swat?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The centre is conveniently located near Girls Degree College in College Colony, Mingora, Swat, Khyber Pakhtunkhwa, Pakistan. Turn-by-turn navigation is available via our Google Maps directions.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
