import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://africancreators.co.za"),
  title: {
    default: "African Creators | Business Efficiency & Automation Experts",
    template: "%s | African Creators",
  },
  description: "We help traditional African businesses save time and money by automating boring daily work. Less admin, more profit.",
  keywords: [
    "African Creators",
    "business automation",
    "workflow efficiency",
    "process automation South Africa",
    "Zapier consulting",
    "efficiency experts Johannesburg",
    "save business time",
    "no-code automation"
  ],
  authors: [{ name: "African Creators", url: "https://africancreators.co.za" }],
  creator: "African Creators",
  publisher: "African Creators",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://africancreators.co.za",
    title: "African Creators | Business Efficiency & Automation Experts",
    description: "We help traditional African businesses save time and money by automating boring daily work. Less admin, more profit.",
    siteName: "African Creators",
    images: [
      {
        url: "https://africancreators.co.za/og-image.png",
        width: 1200,
        height: 630,
        alt: "African Creators - Systems Designers & Business Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "African Creators | Business Efficiency & Automation Experts",
    description: "We help traditional African businesses save time and money by automating boring daily work. Less admin, more profit.",
    images: ["https://africancreators.co.za/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${playfair.variable} antialiased bg-background text-foreground min-h-screen flex flex-col font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "African Creators",
              "image": "https://africancreators.co.za/og-image.png",
              "@id": "https://africancreators.co.za/#organization",
              "url": "https://africancreators.co.za",
              "telephone": "",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cape Town",
                "addressRegion": "Western Cape",
                "addressCountry": "ZA"
              },
              "areaServed": {
                "@type": "Continent",
                "name": "Africa"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "17:00"
              },
              "description": "We design and build robust business automation systems for businesses across Africa to help them save time and scale without manual errors."
            })
          }}
        />
        <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none -z-10" />
        <div className="fixed inset-0 bg-grain -z-10" />
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
