"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, RotateCw } from "lucide-react";

export function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* 3D Flip Card Container */}
      <div
        className="w-full max-w-[540px] aspect-[1.75/1] cursor-pointer group [perspective:1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full duration-700 transition-transform [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ═════════════════════════════════════════════════════════
              FRONT SIDE OF BUSINESS CARD
          ═════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#090909] border border-[#222222] p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden [backface-visibility:hidden]">

            {/* Corner Wave Accents */}
            <svg
              className="absolute top-0 left-0 w-28 h-28 opacity-20 text-[#C5A059] pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <path d="M0,0 Q50,0 50,50 Q50,100 100,100" />
              <path d="M0,10 Q40,10 40,50 Q40,90 90,90" />
              <path d="M0,20 Q30,20 30,50 Q30,80 80,80" />
              <path d="M0,30 Q20,30 20,50 Q20,70 70,70" />
            </svg>
            <svg
              className="absolute bottom-0 right-0 w-28 h-28 opacity-20 text-[#C5A059] rotate-180 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              <path d="M0,0 Q50,0 50,50 Q50,100 100,100" />
              <path d="M0,10 Q40,10 40,50 Q40,90 90,90" />
              <path d="M0,20 Q30,20 30,50 Q30,80 80,80" />
              <path d="M0,30 Q20,30 20,50 Q20,70 70,70" />
            </svg>

            {/* Main Brand Title */}
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E5B25D] to-[#C5A059] mb-4">
              African Creators
            </h2>

            {/* Thin Gold Divider */}
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent mb-5" />

            {/* Subtitle Services */}
            <div className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-2">
              WEBSITES &bull; AUTOMATION &bull; BUSINESS SYSTEMS
            </div>

            {/* Tagline */}
            <p className="text-xs md:text-sm text-[#A0A096] font-serif italic tracking-wide font-light">
              Helping African businesses save time and grow
            </p>
          </div>

          {/* ═════════════════════════════════════════════════════════
              BACK SIDE OF BUSINESS CARD
          ═════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#090909] border border-[#222222] p-8 md:p-10 flex flex-col justify-between shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">

            {/* Right Side Traditional African Geometric Pattern */}
            <div className="absolute right-0 top-0 bottom-0 w-28 md:w-36 opacity-15 text-[#C5A059] pointer-events-none flex flex-col justify-between py-4 pr-3 items-end">
              <svg viewBox="0 0 100 300" fill="none" stroke="currentColor" strokeWidth="1" className="h-full">
                {/* Geometric diamonds & triangles pattern */}
                <polygon points="50,10 90,50 50,90 10,50" />
                <polygon points="50,25 75,50 50,75 25,50" />
                <line x1="10" y1="100" x2="90" y2="100" />
                <line x1="10" y1="105" x2="90" y2="105" />
                <polygon points="50,115 90,155 50,195 10,155" />
                <polygon points="50,130 75,155 50,180 25,155" />
                <line x1="10" y1="205" x2="90" y2="205" />
                <line x1="10" y1="210" x2="90" y2="210" />
                <polygon points="50,220 90,260 50,300 10,260" />
              </svg>
            </div>

            {/* Header Details */}
            <div className="space-y-1 z-10">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E5B25D] to-[#C5A059]">
                Tiisetso Mmaboko
              </h3>
              <p className="text-xs md:text-sm text-[#A0A096] font-sans font-light tracking-wide">
                Founder &amp; Digital Solutions Consultant
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-2.5 z-10 my-auto pt-2">
              {/* Phone */}
              <div className="flex items-center gap-3 text-xs md:text-sm text-[#D4D4CE]">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>+27 76 354 0378</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-xs md:text-sm text-[#D4D4CE]">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href="mailto:tiisetso@africancreators.co.za" className="hover:text-[#C5A059] transition-colors">
                  tiisetso@africancreators.co.za
                </a>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3 text-xs md:text-sm text-[#D4D4CE]">
                <Globe className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href="https://africancreators.co.za" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors">
                  africancreators.co.za
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-xs md:text-sm text-[#D4D4CE]">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>Cape Town, South Africa</span>
              </div>
            </div>

            {/* Bottom Right Tagline */}
            <div className="text-right z-10">
              <span className="font-serif italic text-[11px] md:text-xs text-[#C5A059]/90 tracking-wider">
                Save time. Reduce costs. Enable growth.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Helper instruction button */}
      <button
        type="button"
        onClick={() => setIsFlipped(!isFlipped)}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A059]/80 hover:text-[#C5A059] transition-colors bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-full"
      >
        <RotateCw className="w-3.5 h-3.5" />
        Click Card to Flip (Front / Back)
      </button>
    </div>
  );
}
