import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlowHQ — AI Automation Agency",
    short_name: "FlowHQ",
    description: "Custom AI and workflow automation systems for businesses in India.",
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
