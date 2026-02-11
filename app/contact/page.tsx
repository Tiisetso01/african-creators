import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen pt-40 pb-24 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-24 items-start">

                    {/* Left Column: Vision & Contact */}
                    <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000">
                        <div className="space-y-6">
                            <div className="h-1 w-12 bg-primary" />
                            <h1 className="text-5xl md:text-8xl font-serif font-bold text-foreground leading-[1] italic">
                                Secure your <br />
                                <span className="text-primary italic">Margin.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed font-sans max-w-lg">
                                We are currently accepting new automation partners for Q1 2026.
                                Let's reveal the hidden friction in your business.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-10">
                            {[
                                { icon: Mail, label: "Digital Correspondence", value: "hello@africancreators.online" },
                                { icon: Phone, label: "Direct Line", value: "+27 (0) 10 000 0000" },
                                { icon: MapPin, label: "Studio", value: "Johannesburg \\ Remote" },
                                { icon: Clock, label: "Efficiency Hours", value: "08:00 — 17:00 CAT" }
                            ].map((item, i) => (
                                <div key={i} className="space-y-3 group">
                                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                                        {item.label}
                                    </div>
                                    <div className="text-sm font-medium text-foreground/80 font-sans tracking-wide">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/5">
                            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-muted-foreground italic">
                                Based in Africa. Serving Globally.
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Premium Form */}
                    <div className="relative group animate-in fade-in slide-in-from-right duration-1000 delay-200">
                        <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
                        <div className="relative glass border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
                            <h2 className="text-3xl font-serif font-bold mb-8">Request Audit.</h2>

                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Principal Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans"
                                            placeholder="e.g. Tendai M."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Enterprise</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans"
                                            placeholder="Brand Name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Digital Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-white/5 border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans"
                                        placeholder="name@company.com"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Primary Friction Point</label>
                                    <select className="w-full bg-white/5 border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans appearance-none cursor-pointer">
                                        <option className="bg-[#050505]">Communication Overload</option>
                                        <option className="bg-[#050505]">Manual Document Handling</option>
                                        <option className="bg-[#050505]">Process Transparency</option>
                                        <option className="bg-[#050505]">Other Scale Blockers</option>
                                    </select>
                                </div>

                                <div className="pt-6">
                                    <Button size="lg" className="w-full h-16 text-sm uppercase tracking-[0.2em] font-bold rounded-full shadow-lg shadow-primary/20 group">
                                        Schedule Discovery <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest italic opacity-50">
                                    Resilience takes time. Accuracy takes intent.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
