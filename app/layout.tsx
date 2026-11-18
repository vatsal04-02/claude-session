import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Providers from "@/components/Providers";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowHQ — Custom AI Systems for Your Operations",
  description:
    "FlowHQ designs and builds custom operational AI systems around how your business actually runs: workflows, assistants, integrations, dashboards and reporting.",
  openGraph: {
    title: "FlowHQ — Custom AI systems that run your operations.",
    description:
      "Operational AI built around your process: workflow automation, AI assistants, WhatsApp and booking flows, integrations and reporting.",
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
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
