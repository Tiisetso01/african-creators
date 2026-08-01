"use client";

import { BusinessCard } from "@/components/ui/BusinessCard";
import Link from "next/link";
import { ArrowRight, Trophy, Users, Shield, Target } from "lucide-react";
import { motion } from "motion/react";
import { Reveal, RevealLeft, RevealRight, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20 overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(197,160,89,0.06),transparent)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10">

          <Reveal>
            <div className="h-1 w-12 bg-primary mb-10" />
          </Reveal>

          <Reveal delay={0.1} y={60}>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-14 leading-tight text-primary">
              We are <span className="text-foreground italic">Systems</span> Designers.
            </h1>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-20 items-start">
            <RevealLeft delay={0.15}>
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-foreground/70 font-light leading-relaxed">
                  African Creators was founded on a simple realization: Traditional businesses in Africa aren't failing because of a lack of skill — they're slowing down because of manual friction.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  We don't sell "AI hype". We sell <span className="text-primary font-semibold">time</span>. We build the invisible infrastructure that allows business owners to stop being operators and start being visionaries.
                </p>
              </div>
            </RevealLeft>

            <RevealRight delay={0.15}>
              <div className="glass border border-primary/20 p-10 rounded-3xl space-y-8 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-foreground/60 font-bold">The Mission</div>
                  <div className="text-3xl font-serif font-bold text-primary">1 Million Hours Reclaimed.</div>
                  <p className="text-sm text-foreground/65 leading-relaxed">
                    Our goal is to save African businesses 1,000,000 productive hours by 2030 through elegant, resilient automation.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono">Active — Accepting Q3 2026 Partners</span>
                </div>
              </div>
            </RevealRight>
          </div>
        </div>
      </section>

      {/* ══ BUSINESS CARD SHOWCASE ══ */}
      <section className="py-20 px-6 relative border-t border-white/[0.06]">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="text-center mb-6 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 font-mono font-bold">Digital Identity</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Official Business Card</h2>
            </div>
          </Reveal>
          <Reveal>
            <BusinessCard />
          </Reveal>
        </div>
      </section>

      {/* ══ OPERATING PRINCIPLES ══ */}
      <section className="py-28 relative border-y border-white/[0.06] bg-[#0A0A0A]/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(197,160,89,0.03),transparent)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <h2 className="text-4xl font-serif font-bold mb-20 text-center text-primary">Our Operating Principles</h2>
          </Reveal>

          <StaggerGroup className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Resilience First",
                desc: "We build systems that don't break when the internet slows down or staff changes.",
              },
              {
                icon: Target,
                title: "Extreme ROI",
                desc: "Every automation must pay for itself within the first 60 days of deployment.",
              },
              {
                icon: Users,
                title: "Human Centric",
                desc: "We don't replace people; we replace the 'boring' parts of their jobs.",
              },
              {
                icon: Trophy,
                title: "Local Context",
                desc: "We understand the unique challenges of the African business landscape.",
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="group space-y-5 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-500">
                  <div className="h-12 w-12 rounded-xl border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shrink-0">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-lg font-serif font-bold group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-foreground/55 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══ HOW WE WORK ══ */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-1/3 w-64 h-64 rounded-full bg-primary/4 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Reveal>
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">How We Work.</h2>
              <p className="text-xl text-foreground/55 font-light">The transition from manual to automated happens in three precise stages.</p>
            </div>
          </Reveal>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Efficiency Audit",
                desc: "We observe your current workflow, identify bottleneck 'leaks', and quantify the cost of manual friction in hours and rand per month.",
                fromLeft: true,
              },
              {
                step: "02",
                title: "Architecture",
                desc: "We design a custom automation stack using resilient, low-maintenance tools that fit your budget and team size.",
                fromLeft: false,
              },
              {
                step: "03",
                title: "Deployment",
                desc: "We handle the build, the staff training, and the ongoing monitoring. You just watch the speed improve.",
                fromLeft: true,
              },
            ].map((phase, i) =>
              phase.fromLeft ? (
                <RevealLeft key={i} delay={0.05}>
                  <div className="grid md:grid-cols-[80px_1fr] gap-10 border-l border-white/[0.06] pl-10 relative group">
                    <div className="absolute left-[-1px] top-0 h-10 w-[1px] bg-primary shadow-[0_0_12px_rgba(197,160,89,0.8)]" />
                    <div className="text-5xl font-serif font-bold text-primary group-hover:text-primary transition-colors duration-500">{phase.step}</div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors duration-300">{phase.title}</h3>
                      <p className="text-lg text-foreground/60 font-light leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                </RevealLeft>
              ) : (
                <RevealRight key={i} delay={0.05}>
                  <div className="grid md:grid-cols-[80px_1fr] gap-10 border-l border-white/[0.06] pl-10 relative group">
                    <div className="absolute left-[-1px] top-0 h-10 w-[1px] bg-primary shadow-[0_0_12px_rgba(197,160,89,0.8)]" />
                    <div className="text-5xl font-serif font-bold text-primary group-hover:text-primary transition-colors duration-500">{phase.step}</div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors duration-300">{phase.title}</h3>
                      <p className="text-lg text-foreground/60 font-light leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                </RevealRight>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(197,160,89,0.06),transparent)] pointer-events-none" />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/8 pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto relative z-10">
          <Reveal>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-primary">
                Ready for a <span className="text-foreground italic">Systems Upgrade?</span>
              </h2>
              <Link href="/contact">
                <Button size="lg" className="h-16 px-12 text-base rounded-full font-bold group mt-4 shadow-[0_0_40px_-8px_rgba(197,160,89,0.4)] hover:shadow-[0_0_60px_-8px_rgba(197,160,89,0.6)] transition-shadow duration-500">
                  Book a Strategy Call <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
