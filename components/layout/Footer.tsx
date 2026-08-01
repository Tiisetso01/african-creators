import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
    return (
        <footer className="bg-[#0A0A0A] border-t border-white/10 py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div className="space-y-6">
                        <Link href="/" className="group">
                            <Logo />
                        </Link>
                        <p className="text-foreground/85 text-sm font-normal max-w-xs font-sans leading-relaxed">
                            Engineering resilience and efficiency into the core of African business operations.
                            <span className="text-primary italic block mt-2">The future is automated.</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                        <div className="space-y-4">
                            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground">Solutions</div>
                            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-sans">
                                <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
                                <Link href="/#methodology" className="hover:text-primary transition-colors">Methodology</Link>
                                <Link href="/contact" className="hover:text-primary transition-colors">Efficiency Audit</Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground">Studio</div>
                            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-sans">
                                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground">Legal</div>
                            <div className="flex flex-col gap-3 text-sm text-foreground/80 font-sans">
                                <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                                <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] font-mono tracking-widest text-foreground/70 uppercase italic">
                    <p>&copy; {new Date().getFullYear()} African Creators. All Margins Reserved.</p>
                    <p>Built for Resilience.</p>
                </div>
            </div>
        </footer>
    );
}
