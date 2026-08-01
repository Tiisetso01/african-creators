"use client";

import { MessageSquare, FileText, Settings, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const services = [
  {
    title: "WhatsApp & Email Automation",
    icon: MessageSquare,
    description: "Stop spending your day replying to the same questions. We build simple systems that answer common inquiries and follow up with leads automatically.",
    features: [
      "Auto-reply to common questions on WhatsApp",
      "Sort incoming emails and draft quick replies",
      "Automated appointment booking links",
      "Missed call auto-text back customer support"
    ],
    benefit: "Save ~15 hours of admin time per week."
  },
  {
    title: "Automated Documents & Quotes",
    icon: FileText,
    description: "Generate custom quotes, contracts, and proposals in seconds instead of hours, keeping your information accurate.",
    features: [
      "Create quotes instantly from website inquiries",
      "Auto-generate client contracts when a project starts",
      "Digital signatures and document tracking",
      "Automatic friendly alerts for key milestones"
    ],
    benefit: "Deliver proposals 10x faster."
  },
  {
    title: "Connected Software Systems",
    icon: Settings,
    description: "Connect your CRM, database, spreadsheets, and active software tools so they share information automatically.",
    features: [
      "Keep team trackers matching automatically on all platforms",
      "Weekly status reports sent straight to your phone",
      "Automated onboarding steps for new clients",
      "Link spreadsheets directly to your central database"
    ],
    benefit: "Stop copy-pasting data forever."
  }
];

export function ServicesShowcase() {
  return (
    <section id="services" className="px-6 py-20 md:py-32 bg-background relative border-t border-border/40">
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
              What We Do
            </span>
            <h2 className="mt-6 text-balance text-4xl font-serif font-bold tracking-tight sm:text-5xl text-primary">
              Systems built to simplify your work.
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed font-normal">
              We don't sell complicated software. We connect and automate the tools you already use to help your business run smoothly.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="grid gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={index}>
                <div className="group relative bg-[#121212] rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 hover:border-primary/35 hover:-translate-y-1 hover:shadow-primary/5">
                  {/* Glow border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -inset-px rounded-3xl border border-primary/20 shadow-[0_0_24px_-8px_rgba(197,160,89,0.25)]" />
                  </div>

                  <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
                    <div className="space-y-6">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl shrink-0">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground group-hover:text-primary transition-colors mb-4">
                          {service.title}
                        </h3>
                        <div className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                          {service.benefit}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <p className="text-lg text-foreground/90 leading-relaxed font-normal italic font-serif">
                        "{service.description}"
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {service.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-3 group/item">
                            <CheckCircle2 className="h-4.5 w-4.5 text-primary/40 group-hover/item:text-primary transition-colors shrink-0" />
                            <span className="text-foreground/90 font-medium text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
