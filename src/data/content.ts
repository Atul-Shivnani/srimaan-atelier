export const site = {
  name: "Srimaan Uniform",
  tagline: "Authorized Mafatlal & Raymond fabric distributors",
  phone: "+91 97695 74841",
  phoneHref: "+919769574841",
  email: "enquiry@shrimaanuniforms.com",
  address: "Narmada Apartments, Raopura, Vadodara, Gujarat 390001",
  hours: [
    { day: "Monday – Friday", hours: "10:00 AM – 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
};

export const about = {
  eyebrow: "Since the 1970s",
  title: "The cloth comes first.",
  body: "Fifty years ago, Vadodara's mills ran on Mafatlal cotton and Raymond wool. We started as the people who could get you the real thing — and we still are. Every uniform we cut begins on the same bolt of fabric a tailor in 1975 would have recognized.",
  facts: [
    { value: "50+", label: "years distributing Mafatlal & Raymond fabric" },
    { value: "2000+", label: "companies clothed across India" },
    { value: "2", label: "authorized heritage textile partnerships" },
  ],
};

export const services = [
  {
    slug: "corporate-uniform",
    name: "Corporate Uniform",
    description: "Tailored to your brand identity, cut for a full working day.",
    image: "/images/corporate-uniform.jpg",
  },
  {
    slug: "t-shirts",
    name: "T-Shirts",
    description: "Team and event wear built to survive a hundred washes.",
    image: "/images/tshirts.png",
  },
  {
    slug: "boiler-suits",
    name: "Boiler Suits",
    description: "Protective workwear engineered for industrial floors.",
    image: "/images/boiler-suit.jpg",
  },
  {
    slug: "suits-blazers",
    name: "Suits & Blazers",
    description: "Formal Raymond wool for hospitality and corporate teams.",
    image: "/images/suits-blazers.png",
  },
  {
    slug: "safety-uniform",
    name: "Safety Uniform",
    description: "High-visibility, high-risk-rated, zero compromise.",
    image: "/images/safety-uniform.png",
  },
];

export const stats = [
  { value: "50+", label: "Years in business", detail: "Founded in Vadodara, still family-run." },
  { value: "2000+", label: "Clients served", detail: "From startups to Fortune 500 floors." },
  { value: "6", label: "Industries dressed", detail: "Corporate, industrial, hospitality, healthcare, education, security." },
  { value: "48hrs", label: "Quote turnaround", detail: "Swatches and itemized pricing, fast." },
];

export const industries = [
  "Corporate & IT",
  "Manufacturing & Industrial",
  "Hospitality & Hotels",
  "Healthcare",
  "Education",
  "Security & Facility",
];

export const contactOptions = [
  { label: "Call", value: site.phone, href: `tel:${site.phoneHref}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Visit", value: site.address, href: "https://maps.google.com/?q=Narmada+Apartments+Raopura+Vadodara" },
];
