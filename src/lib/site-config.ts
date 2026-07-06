// Single source of truth for clinic contact details.
// Update the phone number, address, or hours here ONCE — every component
// (nav, hero, contact section, WhatsApp link, footer) reads from this file
// instead of hardcoding the value separately.

const PHONE_DIGITS = "251912819999"; // country code + number, digits only
const PHONE_DISPLAY = "+251 912 819 999";
const WHATSAPP_MESSAGE =
  "Hello, I'd like to book a dental appointment at Fenan Dental Clinic.";

export const SITE = {
  name: "Fenan Dental Clinic",
  tagline: "Healthy Mouth, Healthy Body",
  phone: {
    display: PHONE_DISPLAY,
    tel: `tel:+${PHONE_DIGITS}`,
  },
  whatsapp: {
    url: `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  },
  address: {
    short: "Goro Square (Mediad), Addis Ababa",
    full: "Goro Square, Addis Ababa, Ethiopia",
  },
  hours: "Mon – Sat · 9:00 – 19:00",
} as const;
