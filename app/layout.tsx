import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/Providers";
import Intro, { INTRO_SCRIPT } from "@/components/Intro";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Analytics from "@/components/Analytics";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/poppins/latin-700.css";
import "./globals.css";
import { ON_VERCEL, SITE_URL } from "@/lib/config";
import { JsonLd, organization, website } from "@/lib/schema";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

/* Site-wide defaults. Every page sets its own title, description and canonical via lib/seo.ts. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Flow HQ | Custom AI Automation Systems for Growing Businesses", template: "%s | Flow HQ" },
  applicationName: "Flow HQ",
  // robots is set per page by pageMetadata() (indexable on production, noindex on previews); the 404 gets Next's own noindex
  openGraph: { siteName: SITE_NAME, locale: "en_IN", type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
};

export const viewport: Viewport = {
  themeColor: "#0D0906",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        <JsonLd graph={[organization, website]} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Intro />
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
        {/* Vercel Web Analytics only exists on Vercel; other hosts (e.g. Hostinger) skip it */}
        {ON_VERCEL && <Analytics />}
      </body>
    </html>
  );
}
