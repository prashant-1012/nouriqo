"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";
import { counters, type Counter } from "@/lib/counters";

function CounterItem({
  counter,
  isInView,
  prefersReducedMotion,
}: {
  counter: Counter;
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      motionValue.set(counter.value);
      return;
    }
    const controls = animate(motionValue, counter.value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, prefersReducedMotion, motionValue, counter.value]);

  return (
    <div className="flex flex-col items-center gap-3 px-4 text-center">
      <Image
        src={counter.icon}
        alt=""
        aria-hidden="true"
        width={69}
        height={69}
        className="h-14 w-14 sm:h-[69px] sm:w-[69px]"
      />
      <p className="font-display text-3xl text-emerald-900 sm:text-4xl">
        {display}
        {counter.suffix}
      </p>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-soft sm:text-sm">
        {counter.label}
      </p>
    </div>
  );
}

export function Counters() {
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-ivory to-cream py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,82,64,0.06),transparent_60%)]"
      />

      <Motif
        src="/assets/decorative/leaf-branch-medium.png"
        size={110}
        className="pointer-events-none absolute -left-6 -top-6 opacity-70 sm:left-0 sm:top-0"
      />
      <Motif
        src="/assets/decorative/leaf-single-large.png"
        size={110}
        className="pointer-events-none absolute -bottom-8 -right-6 opacity-70 sm:bottom-0 sm:right-0"
      />

      <Container className="relative">
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-ink/10"
        >
          {counters.map((counter) => (
            <CounterItem
              key={counter.label}
              counter={counter}
              isInView={isInView}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-xs italic text-ink-soft/70">
          Figures shown are provisional placeholders pending confirmed
          numbers.
        </p>
      </Container>
    </section>
  );
}
