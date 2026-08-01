"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { ServicesShowcase } from "@/components/ui/ServicesShowcase";
import { NodeNetwork } from "@/components/ui/NodeNetwork";
import { Reveal, RevealLeft, RevealRight, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/* ─── Typewriter Hook ────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 60, delay = 500) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return displayed;
}

/* ─── Decorative Section Divider ────────────────────────────────── */
function SectionDivider() {
  return (
    <Reveal>
      <div className="flex items-center gap-4 max-w-xs mx-auto py-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </Reveal>
  );
}

/* ─── Stat Badge ─────────────────────────────────────────────────── */
function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
      <span className="text-2xl md:text-3xl font-serif font-bold text-primary">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-mono">{label}</span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const fullText = "We build the systems of tomorrow.";
  const splitIndex = "We build the ".length;
  const displayed = useTypewriter(fullText, 65, 600);
  const normalText = displayed.slice(0, splitIndex);
  const highlightedText = displayed.slice(splitIndex);

  return (
    <div className="flex flex-col min-h-screen relative bg-background overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="top" className="relative pt-44 pb-32 md:pt-64 md:pb-52 px-6 isolate grid-bg overflow-hidden">

        {/* Node network background */}
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <NodeNetwork />
        </div>

        {/* Warm radial glow */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(197,160,89,0.09),transparent)] pointer-events-none" aria-hidden="true" />

        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto relative z-10 max-w-5xl text-center space-y-10">


          {/* Typewriter headline */}
          <Reveal delay={0.15}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-extrabold leading-[1.05] tracking-tight select-none">
              <span className="text-foreground">{normalText}</span>
              {highlightedText && (
                <span className="text-primary text-glow-primary font-serif italic">
                  {highlightedText}
                </span>
              )}
              <span className="inline-block w-[4px] h-[44px] md:h-[64px] lg:h-[78px] bg-primary ml-2 align-middle animate-pulse rounded-sm" />
            </h1>
          </Reveal>

          {/* Sub-headline */}
          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
              We connect your databases, spreadsheets, and software so they share information automatically.{" "}
              <span className="text-foreground font-medium">No more copy-pasting.</span>
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.45}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <Button size="lg" className="rounded-full font-bold uppercase tracking-wider shadow-[0_0_40px_-8px_rgba(197,160,89,0.4)] h-14 px-10 text-base hover:shadow-[0_0_60px_-8px_rgba(197,160,89,0.6)] transition-shadow duration-500">
                  Request an Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#services" className="text-sm text-foreground/50 hover:text-primary transition-colors font-medium tracking-wide flex items-center gap-1">
                See what we build <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Reveal>

          {/* Social proof stats */}
          <Reveal delay={0.6}>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <StatBadge value="10×" label="Faster Proposals" />
              <StatBadge value="15h" label="Admin Saved / Week" />
              <StatBadge value="Zero" label="Copy-Paste Errors" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CHAPTER 01 — THE FRICTION
      ══════════════════════════════════════════════════════ */}
      <section id="story" className="relative py-28 md:py-40 overflow-hidden">

        {/* Subtle side glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl space-y-20">

          {/* Section header */}
          <Reveal>
            <div className="text-center space-y-5 max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/50 font-mono font-bold block">Chapter 01</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
                The hidden cost of manual work.
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                Every day your team is manually copying data between systems. Those hours add up — and so do the mistakes.
              </p>
            </div>
          </Reveal>

          {/* Side-by-side cards sliding in from opposite directions */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">

            {/* LEFT — slides in from the left */}
            <RevealLeft>
              <div className="group relative bg-[#0f0f0f] rounded-3xl p-8 md:p-10 border border-red-500/10 h-full shadow-xl transition-all duration-500 hover:border-red-500/25 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 space-y-7">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <h3 className="text-sm uppercase tracking-widest text-red-400 font-mono font-bold">The Manual Flow — Fragile</h3>
                  </div>
                  <div className="space-y-5">
                    {[
                      "Hours spent manually copying data between spreadsheets and systems",
                      "Quotes and contracts take days instead of seconds to generate",
                      "Inventory counts that don't match across your platforms",
                      "Spreadsheets that break or get lost as your team grows",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="text-red-500/60 font-bold shrink-0 mt-0.5 text-lg leading-none">×</span>
                        <span className="text-foreground/80 text-sm md:text-base leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealLeft>

            {/* RIGHT — slides in from the right */}
            <RevealRight>
              <div className="group relative bg-[#0f0f0f] rounded-3xl p-8 md:p-10 border border-emerald-500/10 h-full shadow-xl transition-all duration-500 hover:border-emerald-500/25 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10 space-y-7">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="text-sm uppercase tracking-widest text-emerald-400 font-mono font-bold">The Connected Flow — Resilient</h3>
                  </div>
                  <div className="space-y-5">
                    {[
                      "Client details and invoices sync instantly across every system",
                      "Quotes and contracts generated in seconds from any inquiry",
                      "Inventory levels automatically balanced across all platforms",
                      "Secure, scalable pipelines that grow with your business",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5 text-lg leading-none">✓</span>
                        <span className="text-foreground/80 text-sm md:text-base leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealRight>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          CHAPTER 02 — CAPABILITIES (ServicesShowcase)
      ══════════════════════════════════════════════════════ */}
      <ServicesShowcase />

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          CHAPTER 03 — METHODOLOGY
      ══════════════════════════════════════════════════════ */}
      <section id="methodology" className="relative py-28 md:py-40 overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(197,160,89,0.04),transparent)] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl space-y-20 relative z-10">

          <Reveal>
            <div className="text-center space-y-5 max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/50 font-mono font-bold block">Chapter 02</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                Three steps to a simpler workflow.
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                We move you from slow manual admin to connected, automated systems — without disrupting your team.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                label: "Audit",
                title: "Mapping the manual work.",
                description: "We observe your current workflow, identify the bottlenecks, and map exactly where your team is losing hours.",
                color: "border-primary/20",
              },
              {
                number: "02",
                label: "Build",
                title: "Designing the connections.",
                description: "We connect your forms, spreadsheets, databases, and apps so they share data automatically without human input.",
                color: "border-primary/20",
              },
              {
                number: "03",
                label: "Launch",
                title: "Monitoring the systems.",
                description: "We go live, train your team, and monitor the pipelines — so you can stop worrying about data and focus on growth.",
                color: "border-primary/20",
              },
            ].map((step, i) => (
              <StaggerItem key={i}>
                <div className="group relative bg-[#0f0f0f] rounded-3xl p-8 border border-white/[0.07] h-full shadow-xl transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_60px_-20px_rgba(197,160,89,0.15)]">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-3xl overflow-hidden pointer-events-none">
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start justify-between">
                      <span className="font-serif italic text-5xl text-primary font-bold">{step.number}</span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono font-bold pt-2">{step.label}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-primary/20 to-transparent" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/65 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════
          CHAPTER 03 — CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-36 px-6 text-center overflow-hidden">

        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(197,160,89,0.07),transparent)] pointer-events-none" />

        {/* Animated ring */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5 pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/8 pointer-events-none"
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        <div className="container mx-auto max-w-4xl relative z-10">
          <Reveal>
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/50 font-mono font-bold block">Chapter 03</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-primary leading-tight">
                Ready to secure your{" "}
                <span className="text-foreground italic">Margin?</span>
              </h2>
              <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto leading-relaxed font-light">
                The first step is finding the bottlenecks. Request a free diagnostic audit of your systems today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full font-bold uppercase tracking-wider h-16 px-12 text-base shadow-[0_0_60px_-10px_rgba(197,160,89,0.5)] hover:shadow-[0_0_80px_-10px_rgba(197,160,89,0.7)] transition-shadow duration-500">
                    Request an Audit <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
