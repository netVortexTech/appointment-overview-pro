export const site = {
  name: "PALMCLEANERS",
  tagline: "Professional cleaning services",
  phone: "0693 816 261",
  phoneIntl: "+255693816261",
  whatsapp: "255693816261",
  email: "palmharan3@gmail.com",
  location: "Makongo Juu, Oryx",
  city: "Dar es Salaam, Tanzania",
  hours: "Monday - Saturday, 8:00 - 18:00",
} as const;

export function whatsappLink(message?: string) {
  const text = message ?? `Hello ${site.name}, I would like to enquire about your cleaning services.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const serviceAreas = [
  "Makongo Juu",
  "Oryx",
  "Mlalakuwa",
  "Kijitonyama",
  "Mikocheni",
  "Mbezi Beach",
  "Masaki & Mikocheni B",
  "Ubungo & Survey",
  "Sinza & Kimara",
  "Surrounding Dar es Salaam areas",
];
