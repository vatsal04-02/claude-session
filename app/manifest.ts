import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flow HQ — Custom AI + Automation Systems",
    short_name: "Flow HQ",
    description: "Custom AI and automation systems that reduce manual work, connect your tools and put repetitive business processes on autopilot.",
    start_url: "/",
    display: "browser",
    background_color: "#110b08",
    theme_color: "#110b08",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
