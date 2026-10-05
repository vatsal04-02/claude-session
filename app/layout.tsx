import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/Providers";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "@fontsource/instrument-serif/latin-400.css";
import "./globals.css";

const SITE_URL = "https://claude-session-iota.vercel.app";
const OG_TITLE = "FlowHQ — We install growth engines";
const OG_DESCRIPTION = "Custom automation systems for local businesses in India. Get a free 2-minute visibility audit.";

/* NOTE: /og-image.png (1200×630) is not in the repo yet — it must be supplied in public/. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FlowHQ — AI Automation Studio",
  description:
    "FlowHQ builds AI-powered systems that capture leads, manage customers, automate follow-ups and keep your business moving.",
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0906",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
