/**
 * Build a `mailto:` URL with the subject and body prefilled.
 *
 * Uses `encodeURIComponent` rather than `URLSearchParams`, which encodes spaces
 * as `+`; several mail clients render those literally in the body.
 */
export function buildMailto({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}): string {
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${to}?${query}`;
}
