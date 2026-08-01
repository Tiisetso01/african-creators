"use client";

import { motion } from "motion/react";
import type { Easing } from "motion/react";
import { ReactNode } from "react";

// Typed easing curve so TypeScript is happy
const ease: Easing = [0.22, 1, 0.36, 1];
const viewport = { margin: "0px 0px -10% 0px" };

/* ────────────────────────────────────────────────────────────────
   Reveal — fade + slide UP on enter, reverses on leave
──────────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewport, once: false }}
      transition={{ duration: 1.0, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   RevealLeft — slides in from the LEFT
──────────────────────────────────────────────────────────────── */
export function RevealLeft({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -72 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ ...viewport, once: false }}
      transition={{ duration: 1.0, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   RevealRight — slides in from the RIGHT
──────────────────────────────────────────────────────────────── */
export function RevealRight({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 72 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ ...viewport, once: false }}
      transition={{ duration: 1.0, delay: delay + 0.12, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   StaggerGroup — wraps a list; children stagger in one-by-one
──────────────────────────────────────────────────────────────── */
export function StaggerGroup({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, once: false }}
      transition={{ staggerChildren: 0.14, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   StaggerItem — single item inside a StaggerGroup
──────────────────────────────────────────────────────────────── */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
