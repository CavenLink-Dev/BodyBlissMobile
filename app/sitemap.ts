import type { MetadataRoute } from "next";

import { getServicesWithPricing } from "@/lib/catalogue";

const BASE_URL = "https://bodyblissmobile.vercel.app"; // TODO: swap to custom domain when confirmed

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServicesWithPricing();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/book",
    "/therapists",
    "/gift-cards",
    "/areas",
    "/about",
    "/help",
    "/terms",
    "/privacy",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/book" ? 0.9 : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.code}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
