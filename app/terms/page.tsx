export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen pt-40 pb-24 px-6">
            <div className="container mx-auto max-w-3xl space-y-12">
                <div className="space-y-4">
                    <div className="h-1 w-12 bg-primary" />
                    <h1 className="text-5xl font-serif font-bold italic">Terms of Service</h1>
                    <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase">Last updated: March 2026</p>
                </div>

                <div className="space-y-10 text-muted-foreground leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">1. Services</h2>
                        <p>African Creators provides business automation consulting, system design, and implementation services. Specific deliverables, timelines, and fees are agreed upon in a separate engagement letter or service agreement for each project.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">2. Audit Requests</h2>
                        <p>Submitting an audit request via our website does not constitute a binding agreement or guarantee of service. All engagements are subject to availability and mutual agreement following an initial discovery call.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">3. Intellectual Property</h2>
                        <p>All content on this website — including copy, design, and code — is the property of African Creators. Custom systems and automation solutions built for clients are governed by the terms of the individual project agreement.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">4. Limitation of Liability</h2>
                        <p>African Creators is not liable for any indirect, incidental, or consequential damages arising from the use of systems we build or this website. Our liability is limited to the fees paid for the specific engagement in question.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">5. Governing Law</h2>
                        <p>These terms are governed by the laws of the Republic of South Africa. Any disputes shall be resolved in the courts of Johannesburg, South Africa.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">6. Changes to Terms</h2>
                        <p>We may update these terms from time to time. Continued use of the website constitutes acceptance of any changes.</p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-widest text-[11px]">7. Contact</h2>
                        <p>For any questions regarding these terms, contact us at <a href="mailto:hello@africancreators.online" className="text-primary hover:underline">hello@africancreators.online</a>.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
