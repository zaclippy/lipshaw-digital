"use client";

import { useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";

/**
 * Email-capture block — audience the studio owns 100%.
 * Posts to the same Formspree endpoint, tagged so signups are
 * distinguishable from contact enquiries.
 */
export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: trimmed,
          _subject: "LD Apps — next-game waitlist signup",
          list: "next-game-waitlist",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-apps-text/10 bg-apps-surface p-8 md:p-12">
      <div className="max-w-xl">
        <p className="text-apps-muted text-xs tracking-[0.25em] uppercase mb-3">
          Coming next
        </p>
        <h3 className="font-display text-2xl md:text-3xl leading-tight">
          Our next game is in the works.
        </h3>
        <p className="mt-3 text-apps-muted text-base">
          Be first to play it. Drop your email and we&rsquo;ll let you know the
          moment it&rsquo;s live — no spam, just the launch.
        </p>

        {done ? (
          <p className="mt-6 font-display text-lg text-apps-accent">
            You&rsquo;re on the list. Talk soon. 🎉
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-apps-text/15 bg-cloud px-5 py-3 text-sm text-apps-text placeholder:text-apps-muted focus:outline-none focus:ring-2 focus:ring-apps-accent/30"
            />
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-apps-accent text-cloud font-display tracking-wide px-6 py-3 text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity whitespace-nowrap"
            >
              {sending ? "Joining…" : "Notify me"}
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
