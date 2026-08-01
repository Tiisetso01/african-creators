'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from "@/components/ui/Button"
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react"
import { Reveal, RevealLeft, RevealRight, StaggerGroup, StaggerItem } from "@/components/ui/Reveal"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    friction: 'Communication Overload',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-40 pb-24 px-6 overflow-x-hidden">

      {/* Ambient background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_40%,rgba(197,160,89,0.04),transparent)] pointer-events-none -z-10" />

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* ══ LEFT — Info ══ */}
          <RevealLeft>
            <div className="space-y-14">
              <div className="space-y-6">
                <div className="h-1 w-12 bg-primary" />
                <h1 className="text-5xl md:text-8xl font-serif font-bold text-primary leading-[1] italic">
                  Secure your <br />
                  <span className="text-foreground italic">Margin.</span>
                </h1>
                <p className="text-xl text-foreground/60 font-light leading-relaxed max-w-lg">
                  We are currently accepting new automation partners.{" "}
                  Let's reveal the hidden friction in your business.
                </p>
              </div>

              {/* Contact tiles */}
              <StaggerGroup className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Mail, label: "Email Inquiry", value: "hello@africancreators.co.za" },
                  { icon: Phone, label: "Direct Line", value: "076 354 0378" },
                  { icon: MapPin, label: "Studio", value: "Cape Town · Remote" },
                  { icon: Clock, label: "Efficiency Hours", value: "08:00 — 17:00 CAT" },
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="group flex items-start gap-4 p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-primary/20 hover:bg-primary/[0.03] transition-all duration-400">
                      <div className="h-9 w-9 rounded-lg border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-all duration-400">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/40 mb-1">{item.label}</div>
                        <div className="text-sm font-medium text-foreground/80 tracking-wide">{item.value}</div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <Reveal delay={0.3}>
                <div className="pt-8 border-t border-white/[0.05]">
                  <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-foreground/30 italic">
                    Based in Africa. Serving Globally.
                  </span>
                </div>
              </Reveal>
            </div>
          </RevealLeft>

          {/* ══ RIGHT — Form ══ */}
          <RevealRight>
            <div className="relative group">
              {/* Glow behind card */}
              <motion.div
                className="absolute -inset-6 rounded-3xl bg-primary/5 blur-2xl pointer-events-none"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative glass border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-primary" />
                    </motion.div>
                    <h2 className="text-3xl font-serif font-bold italic">Request received.</h2>
                    <p className="text-foreground/60 max-w-xs leading-relaxed">
                      We'll review your friction point and be in touch within 24 hours.
                    </p>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', company: '', email: '', friction: 'Communication Overload' }) }}
                      className="text-[10px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors mt-4"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-3xl font-serif font-bold mb-8">Request Audit.</h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">
                            Your Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            className="w-full bg-white/[0.04] border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans placeholder:text-foreground/20"
                            placeholder="e.g. Tendai M."
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Company Name</label>
                          <input
                            type="text"
                            value={form.company}
                            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                            className="w-full bg-white/[0.04] border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans placeholder:text-foreground/20"
                            placeholder="Brand Name"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">
                          Business Email <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full bg-white/[0.04] border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans placeholder:text-foreground/20"
                          placeholder="name@company.com"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Primary Business Challenge</label>
                        <select
                          value={form.friction}
                          onChange={e => setForm(f => ({ ...f, friction: e.target.value }))}
                          className="w-full bg-white/[0.04] border-b border-white/10 px-4 py-3 focus:border-primary outline-none transition-colors text-sm font-sans appearance-none cursor-pointer"
                        >
                          <option className="bg-[#050505]">Communication Overload</option>
                          <option className="bg-[#050505]">Manual Document Handling</option>
                          <option className="bg-[#050505]">Process Transparency</option>
                          <option className="bg-[#050505]">Other Scale Blockers</option>
                        </select>
                      </div>

                      {status === 'error' && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 text-center"
                        >
                          {errorMsg}
                        </motion.p>
                      )}

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={status === 'loading'}
                          size="lg"
                          className="w-full h-16 text-sm uppercase tracking-[0.2em] font-bold rounded-full shadow-[0_0_40px_-10px_rgba(197,160,89,0.4)] group disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_60px_-10px_rgba(197,160,89,0.6)] transition-shadow duration-500"
                        >
                          {status === 'loading' ? (
                            <span className="flex items-center gap-2">
                              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block w-4 h-4 border-2 border-black/40 border-t-black rounded-full" />
                              Sending...
                            </span>
                          ) : (
                            <>Schedule Discovery <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" /></>
                          )}
                        </Button>
                      </div>

                      <p className="text-[10px] text-center text-foreground/30 uppercase tracking-widest italic">
                        Resilience takes time. Accuracy takes intent.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </RevealRight>
        </div>
      </div>
    </div>
  )
}
