"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialsColumn({
  testimonials,
  className,
  duration = 10,
}: {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  const cards = testimonials.map((testimonial, i) => (
    <div
      key={i}
      className="w-full max-w-xs rounded-2xl border border-ink/10 bg-ivory p-8 shadow-lg shadow-emerald-900/10"
    >
      <p className="text-sm leading-relaxed text-ink-soft">{testimonial.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="font-medium leading-5 tracking-tight text-ink">
            {testimonial.name}
          </div>
          <div className="leading-5 tracking-tight text-ink-soft/70">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  ));

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-6 pb-6">{cards}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((setIndex) => (
          <React.Fragment key={setIndex}>{cards}</React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
