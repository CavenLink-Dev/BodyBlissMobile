import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/auth", "/styleguide"],
    },
    sitemap: "https://bodyblissmobile.vercel.app/sitemap.xml", // TODO: custom domain
  };
}
