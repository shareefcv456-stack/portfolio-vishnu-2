import { BusinessSection } from "@/components/sections/BusinessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { GlobalPresenceSection } from "@/components/sections/GlobalPresenceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroductionSection } from "@/components/sections/IntroductionSection";
import { JournalSection } from "@/components/sections/JournalSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { site, socials } from "@/lib/content";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "CEO & Executive Director",
  worksFor: { "@type": "Organization", name: "RG Group" },
  address: { "@type": "PostalAddress", addressLocality: "Calicut", addressRegion: "Kerala", addressCountry: "IN" },
  email: site.email,
  url: site.url,
  sameAs: socials.map((s) => s.href),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <HeroSection />
      <IntroductionSection />
      <BusinessSection />
      <TimelineSection toneFrom="#211f1b" />
      <LeadershipSection />
      <GlobalPresenceSection />
      <PhilosophySection />
      <GallerySection />
      <JournalSection />
      <ContactSection />
    </>
  );
}
