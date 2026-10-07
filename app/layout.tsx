import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/Providers";
import Intro, { INTRO_SCRIPT } from "@/components/Intro";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/poppins/latin-700.css";
import "./globals.css";
import { SITE_URL } from "@/lib/config";

const OG_TITLE = "FlowHQ — We install growth engines";
const OG_DESCRIPTION = "Custom automation systems for local businesses in India. Get a free 2-minute visibility audit.";
const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "FlowHQ — We don't sell marketing. We install growth engines." };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FlowHQ — AI Automation Studio",
  description:
    "FlowHQ builds AI-powered systems that capture leads, manage customers, automate follow-ups and keep your business moving.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: "/",
    siteName: "FlowHQ",
    locale: "en_IN",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0906",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <Intro />
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
