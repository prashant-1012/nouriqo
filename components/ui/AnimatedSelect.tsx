"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";

export type AnimatedSelectOption = {
  value: string;
  label: string;
  /** Secondary text shown right-aligned in the list, e.g. a price. */
  hint?: string;
};

/**
 * A single-value select with an animated listbox — rotating chevron,
 * fade/scale panel, staggered options. Adapted from 21st.dev's
 * AnimatedDropdown (emerald-ui, MIT): that version is a menu of links,
 * this one is a controlled value picker following the ARIA listbox
 * pattern (arrow keys, Home/End, Enter/Space, Escape, click-outside).
 *
 * `side` controls which way the panel opens — "top" for places that
 * clip overflow below the trigger, like ProductCard.
 */
export function AnimatedSelect({
  options,
  value,
  onChange,
  ariaLabel,
  side = "bottom",
  className,
}: {
  options: AnimatedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  side?: "top" | "bottom";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const prefersReducedMotion = useReducedMotion();

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  function open() {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function choose(index: number) {
    onChange(options[index].value);
    close();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      open();
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(last, index + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(0, index - 1));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  }

  const offsetY = side === "top" ? 8 : -8;

  return (
    <div ref={wrapperRef} className={clsx("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={`${ariaLabel}: ${selected.label}`}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleTriggerKeyDown}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-full border border-ink/15 bg-ivory px-4 text-sm text-ink transition-colors hover:border-ink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-800"
      >
        <span className="truncate">{selected.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeInOut" }}
          className="flex shrink-0 text-ink-soft"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-label={ariaLabel}
            aria-activedescendant={`${listId}-${activeIndex}`}
            onKeyDown={handleListKeyDown}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: offsetY, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: offsetY, scale: 0.96 }
            }
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={clsx(
              "absolute left-0 z-20 min-w-full overflow-hidden rounded-2xl border border-ink/10 bg-ivory py-1.5 shadow-lg shadow-ink/10 outline-none",
              side === "top"
                ? "bottom-[calc(100%+0.5rem)] origin-bottom"
                : "top-[calc(100%+0.5rem)] origin-top"
            )}
          >
            {options.map((option, index) => {
              const isSelected = index === selectedIndex;
              return (
                <motion.li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.18,
                    delay: prefersReducedMotion ? 0 : index * 0.04,
                  }}
                  onPointerEnter={() => setActiveIndex(index)}
                  onClick={() => choose(index)}
                  className={clsx(
                    "flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150",
                    index === activeIndex && "bg-emerald-800/5",
                    isSelected ? "font-medium text-emerald-800" : "text-ink"
                  )}
                >
                  <Check
                    size={14}
                    aria-hidden
                    className={clsx("shrink-0", !isSelected && "invisible")}
                  />
                  <span className="whitespace-nowrap">{option.label}</span>
                  {option.hint && (
                    <span className="ml-auto whitespace-nowrap pl-4 text-ink-soft tabular-nums">
                      {option.hint}
                    </span>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
