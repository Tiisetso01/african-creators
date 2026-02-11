import { Button } from "@/components/ui/Button";
import {
    MessageSquare,
    FileText,
    Settings,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

export default function ServicesPage() {
    const services = [
        {
            title: "Communication Automation",
            icon: MessageSquare,
            description: "Stop spending your day replying to the same questions. We build intelligent triage systems.",
            features: [
                "WhatsApp Business API Integration",
                "Email Auto-Triage & Smart Replies",
                "Appointment Scheduling without back-and-forth",
                "Missed Call Auto-Text back"
            ],
            benefit: "Save ~15 hours/week on support."
        },
        {
            title: "Document Automation",
            icon: FileText,
            description: "Quotes, invoices, and contracts generated in seconds, not hours.",
            features: [
                "Instant Quote Generator from web forms",
                "Auto-Invoicing upon job completion",
                "Digital Contracts & E-Signatures",
                "Automatic Late Payment Follow-ups"
            ],
            benefit: "Get paid 40% faster."
        },
        {
            title: "Process Optimization",
            icon: Settings,
            description: "Connect your disjointed systems (Excel, Email, Accounting) into one flow.",
            features: [
                "Inventory Synced across platforms",
                "Automated Weekly Reports to your phone",
                "Client Onboarding workflows",
                "Vendor Management portals"
            ],
            benefit: "Reveal hidden operational leaks."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen pt-32 pb-20">

            {/* HEADER */}
            <section className="px-6 py-20 relative overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <div className="text-[10px] uppercase tracking-[0.4rem] text-primary font-bold mb-8">Capabilities</div>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-foreground mb-12 italic">Precision Systems.</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed font-sans">
                        We don't just "install software". We engineer resilience into your daily operations.
                    </p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="px-6 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid gap-12">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative glass border border-white/5 rounded-3xl p-8 md:p-16 overflow-hidden hover:border-primary/20 transition-all duration-700 backdrop-blur-md"
                            >
                                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />

                                <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-16 items-start">
                                    <div className="space-y-8">
                                        <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-primary/40">
                                            <service.icon size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground group-hover:text-primary transition-colors mb-4">{service.title}</h3>
                                            <div className="inline-block rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-[10px] font-bold text-green-500 uppercase tracking-widest font-mono">
                                                {service.benefit}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        <p className="text-xl text-muted-foreground leading-relaxed font-light italic font-serif">
                                            "{service.description}"
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            {service.features.map((feature, fIndex) => (
                                                <div key={fIndex} className="flex items-center gap-4 group/item">
                                                    <CheckCircle2 size={20} className="text-primary/40 group-hover/item:text-primary transition-colors" />
                                                    <span className="text-foreground/80 font-medium font-sans text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-8 border-t border-white/5">
                                            <Button variant="outline" className="h-14 px-8 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-widest text-[10px]">
                                                Request Case Study <ArrowRight className="ml-3 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="py-40 px-6 text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12">Ready for <span className="text-primary italic">Operational Harmony</span>?</h2>
                    <Button size="lg" className="h-20 px-12 text-2xl rounded-full font-serif font-bold group shadow-2xl shadow-primary/20">
                        Get a Free Workflow Audit
                        <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform h-6 w-6" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
