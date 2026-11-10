/**
 * Every fact here comes from the original rgvishnu.com pages and profile.
 * Do not add achievements, figures, places or biography the original doesn't state.
 */
import { media } from "@/lib/media";
import type { Award, Faq, GalleryItem, Milestone, NavItem, Photo, Stat, Venture } from "@/types";

export const site = {
  name: "Vishnu R G",
  url: "https://rgvishnu.com",
  role: "CEO & Executive Director, RG Group",
  location: "Calicut, Kerala",
  email: "Office@rgvishnu.com",
  phone: "+91 93883 74023",
  phoneHref: "tel:+919388374023",
  office: "RG Foods, RG Group, RG Arcade, Calicut – 09",
  officialAddress: "RG Group, Corporation Building, Cherooty Road, Calicut 673001",
  officialPhone: "+91 495 404 0010, 404 0020",
  residentialAddress: "Vashnaveeyam, Malaparambu P.O., Parappadi, Calicut 673009",
  residentialPhone: "+91 495 237 1872",
  profilePdf: "/images/rgvishnu.pdf",
  rgFoods: "https://www.rgfoods.in",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31302.497187029887!2d75.77142577249813!3d11.275215133020348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65e9bffffffff%3A0x3f10353b914ba36b!2sRG%20Group!5e0!3m2!1sen!2sin!4v1742230841069!5m2!1sen!2sin",
  tagline: "Building Success, Inspiring Growth",
  description:
    "Vishnu R G is the third-generation CEO & Executive Director of RG Group, the Kerala business group founded in 1940 — leading RG Foods and its ventures into 31+ countries.",
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rg-vishnu-716a55174/" },
  { label: "Instagram", href: "https://www.instagram.com/rgvishnu/" },
  { label: "Facebook", href: "https://www.facebook.com/vishnurg/" },
];

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/business", label: "Enterprises" },
  { href: "/leadership", label: "Journey" },
  { href: "/gallery", label: "Gallery" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const p = (src: Photo["src"], alt: string): Photo => ({ src, alt });

export const portrait = p(media.g11, "Vishnu R G, CEO & Executive Director of RG Group");

export const intro = {
  statement:
    "Fuelled by innovation and guided by purpose, I combine effort and strategy to shape a legacy of lasting success.",
  heading: "Learning, Leading, Succeeding",
  paragraphs: [
    "Born into a legacy of entrepreneurial excellence, Vishnu R G represents the third generation of a business family that has shaped the food industry in Kerala and beyond. The RG Group, founded in 1940 by Sri M. Gopalan, began its journey with a focus on producing premium-quality gingelly oil — a product that quickly became a household name across the state.",
    "This foundation of trust and quality was later expanded by his father, Mr. Ramesh R G, who strengthened the company’s operations and extended its reach throughout India.",
  ],
};

export const generations = [
  { label: "Founded 1940", name: "Sri M. Gopalan", text: "Began with premium-quality gingelly oil — a household name across Kerala." },
  { label: "Second generation", name: "Mr. Ramesh R G", text: "Strengthened the company’s operations and extended its reach throughout India." },
  { label: "Third generation", name: "Vishnu R G", text: "CEO & Executive Director — leading RG Group into a new era as a global enterprise." },
];

export const heroStats: Stat[] = [
  { value: 1.5, decimals: 1, suffix: "L+", label: "Retail outlets" },
  { value: 31, suffix: "+", label: "Countries" },
  { value: 450, suffix: "+", label: "Distributors" },
];

export const stats: Stat[] = [
  { value: 1.5, decimals: 1, suffix: "L+", label: "Retail outlets reached across Kerala" },
  { value: 31, suffix: "+", label: "Countries where RG Group operates" },
  { value: 450, suffix: "+", label: "Distributors across India" },
  { value: 30, suffix: "+", label: "New product lines in food & FMCG" },
  { value: 60, suffix: "%", label: "Market share in the GCC’s oil segment, 2017" },
];

export const timelineIntro = {
  title: "The Path to Success of RG Group",
  text: "Three generations of leadership at RG Group have transformed the company through modern technological advances while maintaining their traditional values.",
};

export const milestones: Milestone[] = [
  { year: "1940", photo: p(media.t1, "Founding era of RG Group"), text: "Founded by Shri Moduvil Gopalan, laying the foundation for a legacy in the food industry." },
  { year: "1980", photo: p(media.t2, "Archival photograph from RG Group’s early years"), text: "Entered institutional sales, establishing strong partnerships with Ayurvedic institutions and temples." },
  { year: "2010", photo: p(media.t3, "RG Group recognised on stage"), text: "Expanded into the retail market, bringing RG Foods’ trusted quality to households." },
  { year: "2011", photo: p(media.t2011, "International business meeting"), text: "Ventured into the international market, marking the beginning of global expansion." },
  { year: "2015", photo: p(media.t2015, "Vishnu R G on stage"), text: "RG Group rebranded with a global identity, introducing Traditional Snacks, Palakkadan Matta Rice, Tamarind and Payasam Mix." },
  { year: "2017", photo: p(media.t2017, "RG product launch event"), text: "Captured 60% market share in the GCC’s oil segment and expanded with 30 new product lines." },
  { year: "2020", photo: p(media.t2020, "Vishnu R G at a retail summit"), text: "Built state-of-the-art factories, expanded to 18 countries and launched RG Nannari Sarbath." },
  { year: "2024", photo: p(media.t2024, "Vishnu R G in conversation"), text: "Reached 1.5L retail outlets in Kerala, partnered in sustainable contract farming, expanded to 32 countries and introduced frozen foods." },
  { year: "2025", photo: p(media.t2_2, "Vishnu R G at the RG Foods pavilion"), text: "Driving global expansion to bring RG Foods to every corner of the world by 2030.", current: true },
];

export const ventures: Venture[] = [
  {
    name: "RG Foods",
    category: "Food & FMCG",
    description: "More than 30 product lines in the food and FMCG sector — delivering authentic Indian flavours to kitchens around the world.",
    url: "https://www.rgfoods.in",
    photo: p(media.journal3, "RG Foods pavilion at an international trade expo"),
  },
  {
    name: "RG Gingelly Oil",
    category: "Heritage · Since 1940",
    description: "Where the group began: premium-quality gingelly oil that quickly became a household name across Kerala.",
    photo: p(media.journal4, "RG gingelly oil cans ready for distribution"),
  },
  { name: "Pride India Exports Pvt. Ltd.", category: "Exports", description: "Exporting high-quality RG products across the GCC and other international markets." },
  { name: "RG Marines", category: "Marine trade", description: "Enhancing the group’s presence in the marine and seafood trade." },
  { name: "RG Links", category: "Overseas procurement", description: "A specialised arm for overseas procurement and international partnerships." },
  { name: "RG Arcade", category: "Retail", description: "A modern retail and shopping destination." },
];

export const brandMarks: Photo[] = [
  p(media.brandGingelly, "Ramesh RG Gingelly Oil — since 1940"),
  p(media.brandGroup, "RG Group"),
  p(media.brandFoods, "RG Foods"),
];

/**
 * Only places the original content names. Coordinates are [lon, lat].
 * The original states 31+ countries but does not list them, so none are invented here.
 */
export const presence = [
  { name: "Calicut, Kerala", note: "Headquarters · RG Group since 1940", coords: [75.78, 11.26] as const, hq: true },
  { name: "GCC", note: "Pride India Exports · 60% oil-segment share in 2017", coords: [51.5, 25.3] as const },
  { name: "China", note: "RG Links Limited", coords: [113.3, 23.1] as const },
];

export const philosophy = {
  quote: "True success lies in building something that outlasts you — something that uplifts people, adds value, and stands the test of time.",
  title: "A vision for the future",
  paragraphs: [
    "For Vishnu R G, success is not measured in numbers alone — it is defined by impact, purpose and enduring value. His mission is to position RG Foods as a globally recognised brand, delivering authentic Indian flavours to kitchens around the world.",
    "His leadership continues to focus on innovation, integrity and customer-centric growth — while always honouring the core values that shaped RG Group’s legacy. Beyond building a business, he is committed to creating jobs, strengthening partnerships and delivering exceptional quality to customers worldwide.",
  ],
  pillars: ["Innovation", "Integrity", "Customer-centric growth"],
};

export const awardsIntro = "Each award represents dedication, hard work, and a commitment to success.";

export const awards: Award[] = [
  { year: "2012", name: "Kerala State Business Excellence Award", by: "Conferred on RG Group", description: "Given to RG Group for its outstanding contribution to the industry. The recognition threw a light on the company’s focus on quality, innovation and customer satisfaction, making it a brand of trust in its segment." },
  { year: "2015", name: "Product of the Year", by: "Young Chamber of Commerce", description: "Awarded to RG Group for its outstanding product innovation and market impact — a tribute to the company’s commitment to delivering products that are good quality and good for users." },
  { year: "2015", name: "Brand Achiever Award", by: "Conferred on RG Group", description: "For its successful rebranding and expansion into new markets, crediting the company’s performance in merging a traditional approach with business strategy and turning RG into a renowned and reputable name in the industry." },
  { year: "2016", name: "Young Manager Award", by: "Calicut Management Association", description: "Conferred on Vishnu R G for his outstanding leadership and management skills; his contribution to RG Group’s success was viewed as his ability to grow the business through innovation and expansion." },
  { year: "2016", name: "Young Entrepreneurs Award", by: "Rotary Club of Calicut City", description: "Presented to Vishnu R G for his leadership in expanding RG Group globally, introducing new product lines and sustaining business excellence." },
];

export const recognitionPhotos: Photo[] = [
  p(media.award1, "Receiving an award on stage"),
  p(media.award2, "With an award and certificate"),
  p(media.award3, "Recognition at a management convention"),
  p(media.award4, "At the annual management convention"),
];

export const faqs: Faq[] = [
  { question: "Who is RG Group, and in which industries does it operate?", answer: "RG Group is a Kerala-based, leading business group with an area of specialisation as the largest gingelly oil producer and exporter. Over the years RG has expanded into marine trade (RG Marines), export (Pride India Exports Pvt. Ltd.), food products (RG Foods), overseas acquisition (RG Links) and retail (RG Arcade)." },
  { question: "What are the contributions of the current CEO of RG Group?", answer: "RG Group is headed by Vishnu R G as CEO and Executive Director. He has set the pace in modernising the brand, spreading its global face and acquiring ISO, GMP and AGMARK certifications. With RG Group, he introduced more than 30 new product lines and made his presence felt in 18 countries." },
  { question: "What did RG Group’s 2012 rebranding mean?", answer: "The 2012 rebranding modelled the brand, packaging and marketing strategies of RG Group and turned it into an internationally known brand. The launch of the newly labelled RG Gingelly Oil bottle at Westway Hotel, Calicut offered a turning point and enhanced its appeal while retaining the centuries-old tradition and quality image of the company." },
];

export const aboutChapters = [
  {
    id: "legacy",
    numeral: "I",
    title: "Learning. Leading. Succeeding.",
    paragraphs: [
      ...intro.paragraphs,
      "With a deep understanding of both heritage and modern business needs, Vishnu R G, as CEO & Executive Director, has led RG Group into a new era — transforming it into a global enterprise rooted in values yet focused on innovation.",
    ],
  },
  {
    id: "instinct",
    numeral: "II",
    title: "A natural entrepreneurial instinct",
    paragraphs: [
      "From a young age, Vishnu demonstrated a keen sense for identifying opportunities and understanding market dynamics. With the business environment evolving rapidly, he recognised the importance of innovation, strategic agility and global thinking. His goal wasn’t just to sustain RG Group — but to future-proof it and elevate it to a world-class brand.",
    ],
  },
  {
    id: "new-era",
    numeral: "III",
    title: "A new era for RG Group",
    paragraphs: [
      "In 2012, Vishnu R G spearheaded a comprehensive rebranding and modernisation initiative, redefining the company’s visual identity, operational framework and market positioning. The unveiling of the redesigned RG Gingelly Oil bottle at Westway Hotel, Calicut, marked a symbolic beginning of this transformation.",
      "This evolution was not just aesthetic — it reflected deeper strategic changes, such as the adoption of modern technologies, enhanced production efficiency, and an expanded product portfolio that aligned with global standards.",
      "Under his leadership, RG Group achieved prestigious certifications including ISO, GMP and AGMARK, reinforcing the company’s commitment to quality, safety and customer satisfaction. These milestones elevated RG Group’s credibility and unlocked new international market opportunities.",
    ],
  },
  {
    id: "expansion",
    numeral: "IV",
    title: "Strategic business expansion",
    paragraphs: [
      "Recognising the need for diversification, Vishnu R G led RG Group’s expansion into new verticals and global markets. His strategic foresight resulted in the establishment of several key ventures:",
    ],
    ventures: [
      { name: "Pride India Exports Pvt. Ltd.", text: "Exporting high-quality RG products across the GCC and other international markets." },
      { name: "RG Marines", text: "Enhancing presence in the marine and seafood trade." },
      { name: "RG Foods", text: "Launching over 30 product lines in the food and FMCG sector." },
      { name: "RG Links", text: "A specialised arm for overseas procurement and international partnerships." },
      { name: "RG Arcade", text: "A modern retail and shopping destination." },
    ],
    closing: "Today, RG Group operates in 31+ countries, supported by a robust network of 450+ distributors across India and a growing global footprint.",
  },
  { id: "vision", numeral: "V", title: philosophy.title, paragraphs: philosophy.paragraphs },
  {
    id: "legacy-in-motion",
    numeral: "VI",
    title: "Legacy in motion",
    paragraphs: [
      "Vishnu R G leads RG Group with a rare blend of traditional wisdom and modern vision — building a business that not only stands tall today but is also built for the future.",
    ],
    quote: philosophy.quote,
  },
];

export const dossier: { label: string; value: string; href?: string }[] = [
  { label: "Name", value: "Vishnu R G" },
  { label: "Position", value: "CEO & Executive Director, RG Group" },
  { label: "Occupation", value: "Businessman" },
  { label: "Education", value: "MBA" },
  { label: "Father", value: "R G Ramesh" },
  { label: "Mobile", value: site.phone, href: site.phoneHref },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Office", value: site.office },
  { label: "Official address", value: `${site.officialAddress} · Ph: ${site.officialPhone}` },
  { label: "Residential address", value: `${site.residentialAddress} · Ph: ${site.residentialPhone}` },
];

export const organisations = [
  "Gopal Refineries & Oil Mills, Malappuram",
  "Leela Oil Industries, Mahe",
  "Ambika Store, Big Bazar",
  "Ambika Store, Cherooty Road",
  "RG Arcade, Paropadi",
  "RG Exports",
  "RG Links Limited, China",
  "RG Marines",
  "Pride India Exports Pvt. Ltd.",
];

const g = (src: Photo["src"], category: GalleryItem["category"], caption: string): GalleryItem => ({ src, alt: caption, category, caption });

export const gallery: GalleryItem[] = [
  g(media.g11, "portraits", "Portrait"),
  g(media.g4, "stage", "Speaking at South India’s Biggest Retail Expo 2024"),
  g(media.g12, "portraits", "Portrait"),
  g(media.g22, "events", "With guests and well-wishers"),
  g(media.g17, "stage", "Brand Story session, South India’s Biggest Retail Expo"),
  g(media.g15, "portraits", "Portrait"),
  g(media.g16, "events", "At an RG Foods exhibition pavilion"),
  g(media.g6, "stage", "Addressing an audience"),
  g(media.g9, "portraits", "Portrait"),
  g(media.g2, "stage", "On stage at South India’s Biggest Retail Expo"),
  g(media.g13, "portraits", "In conversation"),
  g(media.g1, "stage", "Speaking at an RG Group event"),
  g(media.g23, "events", "With guests and well-wishers"),
  g(media.g19, "portraits", "Singapore"),
  g(media.g21, "stage", "Brand Story session"),
  g(media.g14, "portraits", "Portrait"),
  g(media.g5, "portraits", "Outside RG Group"),
  g(media.g10, "stage", "On stage"),
  g(media.g7, "stage", "Speaking at an RG Group event"),
  g(media.g20, "portraits", "Portrait"),
  g(media.g8, "stage", "Speaking at an RG Group event"),
  g(media.g18, "stage", "Speaking at an RG Group event"),
  ...[media.family1, media.family2, media.family3, media.family5, media.family6, media.family7, media.family8].map((src) =>
    g(src, "family", "With family")
  ),
];

export const galleryFilters: { value: GalleryItem["category"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "stage", label: "On stage" },
  { value: "portraits", label: "Portraits" },
  { value: "events", label: "Events" },
  { value: "family", label: "Family" },
];
