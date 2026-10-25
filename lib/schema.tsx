import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL } from "./site";
import { SITE_URL } from "./config";
import { SERVICES } from "./services";
import { WHATSAPP_NUMBER } from "./whatsapp";

/* schema.org JSON-LD. Only facts that are true and visible on the site. */
export const ORG_ID = `${SITE_URL}/#organization`;

const phone = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

/** One-line definition, used verbatim in the Organization data, llms.txt and the homepage FAQ so every source agrees. */
export const ORG_DEFINITION =
  "Flow HQ is an AI automation studio in Lucknow, India. It builds AI systems that capture enquiries from a business's website, WhatsApp, Instagram, calls and email, then reply, follow up, book appointments and update the CRM automatically.";

/** The founders as their own entities (referenced by @id from the Organization). */
export const FOUNDERS = [
  { id: `${SITE_URL}/#prachi-pathak`, name: "Prachi Pathak", image: `${SITE_URL}/founder-prachi.webp` },
  { id: `${SITE_URL}/#vatsal-tripathi`, name: "Vatsal Tripathi", image: `${SITE_URL}/founder-vatsal.webp` },
].map((f) => ({
  "@type": "Person",
  "@id": f.id,
  name: f.name,
  jobTitle: "Co-founder",
  image: f.image,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  homeLocation: { "@type": "Place", name: "Lucknow, Uttar Pradesh, India" },
}));

export const organization = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "Flow HQ",
  alternateName: "FlowHQ",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  slogan: "Not just AI. Systems that work.",
  description: ORG_DEFINITION,
  telephone: phone,
  address: { "@type": "PostalAddress", addressLocality: "Lucknow", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  areaServed: { "@type": "Country", name: "India" },
  foundingLocation: { "@type": "Place", name: "Lucknow, Uttar Pradesh, India" },
  founder: FOUNDERS.map((f) => ({ "@id": f["@id"] })),
  knowsAbout: [
    "Lead capture automation",
    "Lead follow-up automation",
    "Appointment booking automation",
    "AI automation",
    "AI workflow automation",
    "Business process automation",
    "CRM automation",
    "Lead automation",
    "AI receptionists",
    "WhatsApp Business API",
    "n8n",
  ],
  email: CONTACT_EMAIL,
  contactPoint: { "@type": "ContactPoint", contactType: "sales", telephone: phone, email: CONTACT_EMAIL, areaServed: "IN" },
  sameAs: [INSTAGRAM_URL, YOUTUBE_URL, LINKEDIN_URL],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI automation services",
    itemListElement: SERVICES.map((sv) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", "@id": `${SITE_URL}/${sv.slug}/#service`, name: sv.schema.name, url: `${SITE_URL}/${sv.slug}/` },
    })),
  },
};

/** A page node. `speakable` points voice assistants / answer engines at the passages that answer the page's question. */
export function webPage(p: { path: string; name: string; description: string; speakable?: string[] }) {
  return {
    "@type": "WebPage",
    "@id": `${SITE_URL}${p.path}#webpage`,
    url: `${SITE_URL}${p.path}`,
    name: p.name,
    description: p.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 },
    ...(p.speakable ? { speakable: { "@type": "SpeakableSpecification", cssSelector: p.speakable } } : {}),
  };
}

export const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Flow HQ",
  alternateName: "FlowHQ",
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

export function article(a: { title: string; description: string; path: string; datePublished: string; dateModified: string; abstract?: string; section?: string }) {
  return {
    "@type": "Article",
    "@id": `${SITE_URL}${a.path}#article`,
    headline: a.title,
    description: a.description,
    url: `${SITE_URL}${a.path}`,
    mainEntityOfPage: `${SITE_URL}${a.path}`,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    inLanguage: "en-IN",
    image: `${SITE_URL}/og-image.png`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(a.abstract ? { abstract: a.abstract } : {}),
    ...(a.section ? { articleSection: a.section } : {}),
    // the short answer is the passage to read aloud / quote
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#short-answer"] },
  };
}

/** <script type="application/ld+json"> with an @graph; "<" escaped so content can never close the tag. */
export function JsonLd({ graph }: { graph: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
