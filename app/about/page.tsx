import { Button } from "@/components/ui/Button";
import { ArrowRight, Trophy, Users, Shield, Target } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen pt-32 pb-20">

            <section className="px-6 py-20">
                <div className="container mx-auto max-w-5xl">
                    <div className="h-1 w-12 bg-primary mb-12" />
                    <h1 className="text-5xl md:text-8xl font-serif font-bold mb-12 leading-tight">
                        We are <span className="text-primary italic">Systems</span> Designers.
                    </h1>

                    <div className="grid md:grid-cols-2 gap-20 items-start">
                        <div className="space-y-8">
                            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed font-sans">
                                African Creators was founded on a simple realization: Traditional businesses in Africa aren't failing because of a lack of skill—they're slowing down because of manual friction.
                            </p>
                            <p className="text-lg text-foreground/80 leading-relaxed font-sans">
                                We don't sell "AI hype". We sell time. We build the invisible infrastructure that allows business owners to stop being operators and start being visionaries.
                            </p>
                        </div>

                        <div className="glass border border-primary/20 p-10 rounded-2xl space-y-8 backdrop-blur-md">
                            <div className="space-y-4">
                                <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">The Mission</div>
                                <div className="text-2xl font-serif font-bold">1 Million Hours Reclaimed.</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Our goal is to save African businesses 1,000,000 productive hours by 2030 through elegant, resilient automation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES / EXPERTISE */}
            <section className="py-32 bg-card/10 relative border-y border-white/5">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-serif font-bold mb-20 text-center">Our Operating Principles</h2>
                    <div className="grid md:grid-cols-4 gap-12">
                        {[
                            {
                                icon: Shield,
                                title: "Resilience First",
                                desc: "We build systems that don't break when the internet slows down or staff changes."
                            },
                            {
                                icon: Target,
                                title: "Extreme ROI",
                                desc: "Every automation must pay for itself within the first 60 days of deployment."
                            },
                            {
                                icon: Users,
                                title: "Human Centric",
                                desc: "We don't replace people; we replace the 'boring' parts of their jobs."
                            },
                            {
                                icon: Trophy,
                                title: "Local context",
                                desc: "We understand the unique challenges of the African business landscape."
                            }
                        ].map((item, i) => (
                            <div key={i} className="space-y-6 group">
                                <div className="h-12 w-12 rounded border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl font-serif font-bold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed italic">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* METHODOLOGY SECTION */}
            <section className="py-40 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">How We Work.</h2>
                        <p className="text-xl text-muted-foreground font-light">The transition from manual to automated happens in three precise stages.</p>
                    </div>

                    <div className="space-y-20">
                        {[
                            {
                                step: "01",
                                title: "Efficiency Audit",
                                desc: "We observe your current workflow, identify bottleneck 'leaks', and quantify the cost of manual friction."
                            },
                            {
                                step: "02",
                                title: "Architecture",
                                desc: "We design a custom automation stack using resilient, low-maintenance tools that fit your budget."
                            },
                            {
                                step: "03",
                                title: "Deployment",
                                desc: "We handle the build, the staff training, and the ongoing monitoring. You just watch the speed improve."
                            }
                        ].map((phase, i) => (
                            <div key={i} className="grid md:grid-cols-[100px_1fr] gap-12 border-l border-white/5 pl-12 relative group">
                                <div className="absolute left-[-1px] top-0 h-12 w-[1px] bg-primary shadow-[0_0_10px_rgba(197,160,89,1)]" />
                                <div className="text-5xl font-serif font-bold text-primary/20 group-hover:text-primary transition-colors">{phase.step}</div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-4">{phase.title}</h3>
                                    <p className="text-lg text-muted-foreground font-light leading-relaxed">{phase.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 px-6 text-center">
                <div className="container mx-auto">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12 leading-tight">Ready for a <span className="text-primary italic">Systems Upgrade</span>?</h2>
                    <Button size="lg" className="h-20 px-12 text-2xl rounded-full font-serif font-bold group">
                        Book Strategy Call
                        <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
