export const siteConfig = {
  name: "Allwin Marbles",
  description: "Premium Makrana marble, granite, and handicrafts exporter. Since 1985, crafting elegance in stone.",
  phone: "+91 8005660023",
  phoneAlt: "+91 9766606211",
  email: "contact@allwinmarbles.com",
  address: {
    makrana: "Near Bhati Petrol Pump, Bye Pass Road, Makrana, Rajasthan (India) — PIN: 341505",
    kerala: "Allwin Marbles & Granite, Palakkad, Kerala, India — PIN: 673304",
  },
  coordinates: {
    makrana: "27.0475, 74.7261",
    kerala: "10.9847, 76.4789",
  },
  social: {
    whatsapp: "918005660023",
    telegram: "+918005660023",
    whatsappLink: "https://wa.me/918005660023",
    telegramLink: "https://t.me/+918005660023",
    mapsMakrana: "https://maps.google.com/?q=Allwin+Marbles+Makrana+Rajasthan+India",
    mapsKerala: "https://maps.google.com/?q=Allwin+Marbles+Palakkad+Kerala+India",
  },
  company: {
    founded: 1985,
    iec: "ACCPR2904A",
    gstin: "08ACCPR2904A1Z3",
    location: "Makrana, Rajasthan, India",
  },
  url: "https://allwinmarbles.com",
} as const;

export type SiteConfig = typeof siteConfig;