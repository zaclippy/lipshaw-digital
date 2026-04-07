"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Variant = "light" | "dark";

type Props = {
  open: boolean;
  onClose: () => void;
  variant: Variant;
  title: string;
  placeholder: string;
  submitLabel?: string;
  /** Subject line used in the mailto when the user submits */
  emailSubject: string;
};

const CONTACT_EMAIL = "hello@lipshaw.digital";

const palettes: Record<
  Variant,
  {
    panel: string;
    text: string;
    muted: string;
    border: string;
    field: string;
    button: string;
    buttonText: string;
  }
> = {
  light: {
    panel: "bg-apps-surface",
    text: "text-apps-text",
    muted: "text-apps-muted",
    border: "border-apps-text/10",
    field: "bg-cloud border-apps-text/10 text-apps-text placeholder:text-apps-muted",
    button: "bg-apps-accent hover:opacity-90",
    buttonText: "text-cloud",
  },
  dark: {
    panel: "bg-newbold-surface",
    text: "text-newbold-text",
    muted: "text-newbold-muted",
    border: "border-newbold-text/10",
    field:
      "bg-newbold-bg border-newbold-text/15 text-newbold-text placeholder:text-newbold-muted",
    button: "bg-newbold-accent hover:opacity-90",
    buttonText: "text-newbold-bg",
  },
};

export default function PromptModal({
  open,
  onClose,
  variant,
  title,
  placeholder,
  submitLabel = "Send",
  emailSubject,
}: Props) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const p = palettes[variant];

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Reset when reopening
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setValue("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    // Open the user's mail client with a prefilled message to hello@lipshaw.digital.
    // Server-side form handling can replace this later.
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(trimmed)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-earth/60 backdrop-blur-sm cursor-default"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full md:w-[560px] md:rounded-2xl rounded-t-2xl border ${p.border} ${p.panel} p-6 md:p-8 mx-0 md:mx-6`}
          >
            <div className="flex items-start justify-between gap-6 mb-5">
              <h2 className={`font-display text-xl md:text-2xl ${p.text}`}>
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className={`-m-2 p-2 rounded-md ${p.muted} hover:opacity-100`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className={`py-6 ${p.text}`}>
                <p className="font-display text-lg mb-2">Thanks.</p>
                <p className={`text-sm ${p.muted}`}>
                  Your mail app should have opened. If not, write to{" "}
                  <a
                    className="underline underline-offset-4"
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  rows={5}
                  autoFocus
                  className={`w-full resize-none rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-current/20 ${p.field}`}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!value.trim()}
                    className={`px-5 py-2.5 rounded-lg font-display text-sm tracking-wide ${p.button} ${p.buttonText} disabled:opacity-40 disabled:cursor-not-allowed transition-opacity`}
                  >
                    {submitLabel}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
