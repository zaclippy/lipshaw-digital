/**
 * Formspree endpoint used by the contact modal and the email-capture block.
 *
 * ▸ SETUP: create a form at https://formspree.io, then either
 *   1. set NEXT_PUBLIC_FORMSPREE_FORM_ID in your env (recommended), or
 *   2. replace the fallback string below with your form id.
 *
 * The id is the last path segment of your Formspree endpoint, e.g. for
 * https://formspree.io/f/abcdwxyz the id is "abcdwxyz".
 */
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "REPLACE_ME";

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORM_ID}`;

/** True once a real form id has been configured. */
export const FORMSPREE_READY = FORM_ID !== "REPLACE_ME";
