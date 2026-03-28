import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Clock,
  TrendingUp,
  ShieldCheck,
  FileText,
  MessageSquare,
  BarChart3,
  Check,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-48 px-6 overflow-hidden">
        <div className="container mx-auto relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Q1 2026 Strategy Intake Active
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-bold text-foreground mb-8 leading-[1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Automating <br />
            The <span className="text-primary font-serif italic">Boring</span> Work.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 font-sans">
            We help established African businesses reclaim their time and margin by replacing manual admin with elegant, invisible systems.
            <span className="hidden sm:inline text-foreground/40 italic ml-2">— Efficiency is no longer optional.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button size="lg" className="h-16 px-10 text-lg rounded-full w-full sm:w-auto font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
              Get an Audit <ArrowRight className="ml-3 h-5 w-5 border border-white/20 rounded-full p-1" />
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full w-full sm:w-auto font-bold uppercase tracking-wider border-primary/30 text-primary/80 hover:bg-primary/5">
              Our Methodology
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEM / THE REALITY SECTION */}
      <section className="py-32 bg-card/10 relative border-y border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="h-1.5 w-12 bg-primary/40 rounded-full" />
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-foreground">
                Traditional way, <br />
                <span className="text-muted-foreground opacity-50">Modern friction.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-light font-sans max-w-lg">
                Most companies rely on paper forms, WhatsApp clusters, and Excel sheets that break.
                In 2026, this isn't just inefficient—it's a massive financial leak.
                <span className="text-foreground block mt-4 font-medium italic">We plug the leak.</span>
              </p>
              <div className="grid gap-6">
                {[
                  "Staff trapped in repetitive data entry",
                  "Losing quotes because follow-ups take days",
                  "Owner too busy with operations to think about growth",
                  "No single source of truth for business data"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-6 w-6 rounded border border-primary/20 flex items-center justify-center text-primary/40 group-hover:border-primary group-hover:text-primary transition-colors bg-background">
                      <span className="text-[10px]">FIX</span>
                    </div>
                    <span className="text-foreground/80 font-medium font-sans text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
              <div className="relative glass border border-primary/20 rounded-3xl p-10 shadow-2xl overflow-hidden backdrop-blur-md">
                <div className="bg-primary/30 absolute top-0 left-0 h-1 w-full" />
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Status Report</div>
                        <div className="text-sm font-bold font-sans text-foreground">Invoicing Cycle</div>
                      </div>
                    </div>
                    <span className="text-green-500 font-mono text-[10px] font-bold bg-green-500/10 px-2 py-1 rounded border border-green-500/20 leading-none">+82% Speed Improvement</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-mono opacity-55 uppercase tracking-widest text-foreground">
                      <span>BEFORE: Manual (45m per quote)</span>
                      <span>AFTER: Automated (2s per quote)</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[82%] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.3)] animate-pulse" />
                    </div>
                  </div>

                  <blockquote className="italic text-foreground/80 font-serif text-xl py-4 border-l-2 border-primary/20 pl-6 leading-relaxed">
                    "We stopped hiring admin staff and started hiring sales people. The difference is night and day."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS SECTION */}
      <section className="py-40 px-6" id="solutions">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 italic text-primary/90">Invisible Infrastructure.</h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed font-sans">
                We build the systems that do the work while you sleep. No hype, just high-availability business processes.
              </p>
            </div>
            <Link href="/services">
              <Button variant="link" className="text-primary text-xs group p-0 h-auto font-bold uppercase tracking-[0.25em]">
                Review Capabilities
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
            {[
              {
                icon: MessageSquare,
                title: "Intent-based Communication",
                desc: "Bots that don't just 'chat', but solve. We automate WhatsApp support and email triage with absolute precision."
              },
              {
                icon: FileText,
                title: "Digital Document Engines",
                desc: "From complex quotes to compliance-ready invoices. We automate the entire document lifecycle including follow-ups."
              },
              {
                icon: BarChart3,
                title: "Operational Dashboards",
                desc: "Real-time visibility into every automated process. No more guessing about stock, leads, or margins."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-12 bg-background/40 hover:bg-card/60 transition-all duration-500">
                <div className="flex items-center gap-6 mb-10">
                  <div className="h-14 w-14 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-700 shadow-xl group-hover:shadow-primary/40 text-background shrink-0">
                    <feature.icon size={28} className="group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold tracking-tight group-hover:text-primary transition-colors duration-500 leading-tight">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed font-light font-sans text-sm group-hover:text-foreground/80 transition-colors duration-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS / THE PROMISE */}
      <section className="py-40 px-6 border-t border-white/5 bg-primary/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              { label: "Manual Admin Time", value: "-30%", accent: "text-green-500", icon: Clock },
              { label: "Operational Speed", value: "10x", accent: "text-primary", icon: TrendingUp },
              { label: "End-to-End Connectivity", value: "Full Sync", accent: "text-foreground", icon: Zap }
            ].map((stat, i) => (
              <div key={i} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <stat.icon size={16} className="text-primary/60" />
                  <div className="text-[12px] font-bold uppercase tracking-[0.3em] text-muted-foreground inline-block">{stat.label}</div>
                </div>
                <div className={`text-6xl md:text-8xl font-serif font-bold ${stat.accent} leading-none tracking-tighter`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-48 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-center scale-110 pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-6xl md:text-[10rem] font-serif font-bold mb-16 leading-tight tracking-tighter">
            Reclaim your <span className="italic text-primary">Margin</span>.
          </h2>
          <p className="text-xl md:text-3xl text-muted-foreground mb-20 max-w-3xl mx-auto font-light leading-relaxed font-sans">
            We are looking for <span className="text-foreground font-bold">3 new partners</span> this quarter ready to modernize their core operations.
          </p>
          <div className="flex flex-col items-center gap-12">
            <Button size="lg" className="h-24 px-16 text-3xl rounded-full font-serif font-bold group shadow-2xl shadow-primary/30 active:scale-95 transition-all">
              Apply for Audit
              <ArrowRight className="ml-5 h-8 w-8 group-hover:translate-x-3 transition-transform duration-500 border border-current rounded-full p-1.5" />
            </Button>
            <span className="text-[10px] text-muted-foreground font-mono tracking-[0.5em] uppercase italic opacity-40">
              Strategy is our specialty. Efficiency is our obsession.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
