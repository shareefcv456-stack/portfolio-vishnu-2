import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { IntroCurtain } from "@/components/layout/IntroCurtain";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/lib/content";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.description,
  keywords: ["Vishnu R G", "RG Vishnu", "RG Group", "RG Foods", "CEO", "Calicut", "Kerala", "Gingelly oil"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: "/images/gallery/g11.webp" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/images/favicon.png", apple: "/images/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#171513" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`.curtain,.page-wipe{display:none!important}`}</style>
        </noscript>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <IntroCurtain />
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
