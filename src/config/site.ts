/**
 * Centralized site configuration and environment variables.
 * Values are loaded from NEXT_PUBLIC_* environment variables with fallback defaults.
 */
export const siteConfig = {
  // Backend API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",

  // Site URL
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://jtl-swat.com",

  // Contact Details
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "0342 0000201",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/923420000201",
  phonePrimary: process.env.NEXT_PUBLIC_PHONE_PRIMARY || "0370 9986381",
  phoneSecondary: process.env.NEXT_PUBLIC_PHONE_SECONDARY || "0347 9684918",

  // Location & Navigation
  googleMapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    "https://maps.app.goo.gl/tCBshiyu1gugG8Xt8",
  address:
    process.env.NEXT_PUBLIC_LOCATION_ADDRESS ||
    "Near Girls Degree College, College Colony, Mingora, Swat, KPK, Pakistan",

  // Official Social Media Channels
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/jtl.pk/",
  youtubeUrl:
    process.env.NEXT_PUBLIC_YOUTUBE_URL ||
    "https://www.youtube.com/@jtlswat5618/videos",

  // People & Credits
  founderName: process.env.NEXT_PUBLIC_FOUNDER_NAME || "Adil Khan",
  developerName: process.env.NEXT_PUBLIC_DEVELOPER_NAME || "Wajid Ali Khan",
  developerLinkedIn:
    process.env.NEXT_PUBLIC_DEVELOPER_LINKEDIN ||
    "https://www.linkedin.com/in/wajid-ali-khan-364bb9220/?isSelfProfile=true",
} as const;

export default siteConfig;
