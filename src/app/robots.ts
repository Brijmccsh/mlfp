import type { MetadataRoute } from "next";
import { noIndex } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (noIndex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" } };
}
