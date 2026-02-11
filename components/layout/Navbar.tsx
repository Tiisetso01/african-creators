"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
                    : "py-8 bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="z-50 group">
                    <Logo />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/60 hover:text-primary transition-all duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/contact">
                        <Button variant="outline" className="ml-4 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-widest text-[10px] px-6">
                            Free Audit
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-foreground p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-10 animate-in fade-in duration-300">
                        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-4xl font-serif font-bold text-foreground hover:text-primary transition-colors italic"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button
                                size="lg"
                                className="mt-8 rounded-full h-16 px-10 text-xl font-serif font-bold"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
