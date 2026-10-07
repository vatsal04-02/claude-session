import { SITE_URL } from "./config";
import { WHATSAPP_NUMBER } from "./whatsapp";

/* schema.org JSON-LD. Only facts that are true and visible on the site. */
export const ORG_ID = `${SITE_URL}/#organization`;

const phone = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

export const organization = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "FlowHQ",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  slogan: "Built To Automate.",
  description:
    "FlowHQ builds custom AI and automation systems for businesses: we map repetitive work, connect the tools a business already uses and put its operations on autopilot. Based in Lucknow, India.",
  telephone: phone,
  address: { "@type": "PostalAddress", addressLocality: "Lucknow", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  areaServed: { "@type": "Country", name: "India" },
  founder: [
    { "@type": "Person", name: "Prachi Pathak" },
    { "@type": "Person", name: "Vatsal Tripathi" },
  ],
  knowsAbout: [
    "AI automation",
    "Workflow automation",
    "Business process automation",
    "n8n",
    "AI agents",
    "WhatsApp Business API",
    "CRM automation",
  ],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", telephone: phone, areaServed: "IN" },
};

export const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "FlowHQ",
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

export function faqPage(faqs: readonly (readonly [string, string])[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path === "/" ? "/" : path}#faq`,
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}

export function service(s: { name: string; serviceType: string; description: string; path: string }) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${s.path}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: `${SITE_URL}${s.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "India" },
  };
}

/** <script type="application/ld+json"> with an @graph; "<" escaped so content can never close the tag. */
export function JsonLd({ graph }: { graph: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
