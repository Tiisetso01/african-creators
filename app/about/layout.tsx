import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about African Creators. We design resilient, automated systems to help African businesses save time and increase profit.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "https://africancreators.online/about",
    title: "About Us | African Creators",
    description: "Learn about African Creators. We design resilient, automated systems to help African businesses save time and increase profit.",
  },
  twitter: {
    title: "About Us | African Creators",
    description: "Learn about African Creators. We design resilient, automated systems to help African businesses save time and increase profit.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
