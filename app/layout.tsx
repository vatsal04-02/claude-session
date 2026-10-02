import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowHQ — AI Automation Studio",
  description:
    "FlowHQ builds AI-powered systems that capture leads, manage customers, automate follow-ups and keep your business moving.",
  openGraph: {
    title: "FlowHQ — Your business, running on autopilot.",
    description:
      "AI systems for modern businesses: lead capture, AI CRM, WhatsApp and booking automation, revenue recovery.",
    type: "website",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
