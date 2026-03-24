export default function PrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen pt-40 pb-24 px-6">
            <div className="container mx-auto max-w-3xl space-y-12">
                <div className="space-y-4">
                    <div className="h-1 w-12 bg-primary" />
                    <h1 className="text-5xl font-serif font-bold italic">Privacy Policy</h1>
                    <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase">Last updated: March 2026</p>
                </div>

                <div className="space-y-10 text-muted-foreground leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">1. Information We Collect</h2>
                        <p>When you submit an audit request via our contact form, we collect your name, company name, email address, and the nature of your operational challenge. This information is used solely to respond to your inquiry.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">2. How We Use Your Information</h2>
                        <p>We use the information you provide to contact you about our services, respond to your audit request, and send you a confirmation of your submission. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">3. Data Storage</h2>
                        <p>Submitted information is transmitted via secure email and stored within our internal systems. We retain contact information for the duration of our business relationship and for a reasonable period thereafter for record-keeping purposes.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">4. Cookies</h2>
                        <p>This website does not use tracking cookies. We do not use Google Analytics or any third-party tracking scripts.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">5. Your Rights</h2>
                        <p>You have the right to request access to, correction of, or deletion of any personal information we hold about you. To exercise these rights, contact us at <a href="mailto:hello@africancreators.online" className="text-primary hover:underline">hello@africancreators.online</a>.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">6. Contact</h2>
                        <p>For any privacy-related questions, reach us at <a href="mailto:hello@africancreators.online" className="text-primary hover:underline">hello@africancreators.online</a>.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
