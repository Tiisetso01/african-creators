import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal information when requesting a business automation audit.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    url: "https://africancreators.online/privacy",
    title: "Privacy Policy | African Creators",
    description: "How we collect, use, and protect your personal information when requesting a business automation audit.",
  },
  twitter: {
    title: "Privacy Policy | African Creators",
    description: "How we collect, use, and protect your personal information when requesting a business automation audit.",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
