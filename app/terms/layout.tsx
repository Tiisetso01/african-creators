import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Governing terms and conditions for using our website and services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    url: "https://africancreators.online/terms",
    title: "Terms of Service | African Creators",
    description: "Governing terms and conditions for using our website and services.",
  },
  twitter: {
    title: "Terms of Service | African Creators",
    description: "Governing terms and conditions for using our website and services.",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
