import React from "react";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center gap-3 font-semibold text-xl tracking-tight transition-all duration-300 ${className}`}>
            <div className="relative h-9 w-9 flex items-center justify-center">
                {/* Abstract "AC" / Systemic Monogram */}
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary transform group-hover:scale-110 transition-transform duration-500"
                >
                    <path
                        d="M20 4L4 12V28L20 36L36 28V12L20 4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20 4V20L36 12M20 20L4 12"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.5"
                    />
                    <path
                        d="M20 36V20"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle cx="20" cy="20" r="3" fill="currentColor" />
                </svg>
            </div>
            <span className="text-foreground font-sans font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                African <span className="text-primary/90">Creators</span>
            </span>
        </div>
    );
}
