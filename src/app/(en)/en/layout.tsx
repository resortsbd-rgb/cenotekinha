import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home", "en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
