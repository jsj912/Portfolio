"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { buildMailto } from "@/lib/mailto";

type Errors = { name?: string; message?: string };

/**
 * Composes an email rather than sending one.
 *
 * There is no backend, so submitting validates locally and hands off to the
 * visitor's own mail client with the subject and body prefilled. Nothing leaves
 * the page — no fetch, no third party, nothing to leak.
 */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: Errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!message.trim()) next.message = "Please add a message.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    window.location.href = buildMailto({
      to: email,
      subject: `Portfolio enquiry from ${name.trim()}`,
      body: `${message.trim()}\n\n— ${name.trim()}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm text-muted">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="min-h-11 w-full rounded-xl border border-border bg-bg px-4 py-3 text-base text-text outline-none transition-colors focus:border-accent"
        />
        {errors.name ? (
          <p id="contact-name-error" role="alert" className="mt-2 text-sm text-accent-soft">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="w-full resize-y rounded-xl border border-border bg-bg px-4 py-3 text-base text-text outline-none transition-colors focus:border-accent"
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-2 text-sm text-accent-soft"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-bg transition-colors hover:bg-accent-soft"
      >
        Compose email
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className="text-xs text-muted">
        This opens your own email app with the message ready to send. Nothing is
        submitted from this page.
      </p>
    </form>
  );
}
