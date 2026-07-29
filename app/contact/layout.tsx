import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Free Business Automation Audit",
  description: "Ready to eliminate copy-paste errors and reclaim hours of admin time? Request a free, custom diagnostic audit from African Creators today.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "https://africancreators.online/contact",
    title: "Request a Free Business Automation Audit | African Creators",
    description: "Ready to eliminate copy-paste errors and reclaim hours of admin time? Request a free, custom diagnostic audit from African Creators today.",
  },
  twitter: {
    title: "Request a Free Business Automation Audit | African Creators",
    description: "Ready to eliminate copy-paste errors and reclaim hours of admin time? Request a free, custom diagnostic audit from African Creators today.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
