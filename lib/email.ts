const LOCAL_PART = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i
const DOMAIN_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i
const TOP_LEVEL_DOMAIN = /^(?:[a-z]{2,24}|xn--[a-z0-9-]{2,59})$/i

/** Trim surrounding whitespace and lowercase an email for storage/compare. */
export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

/**
 * Strict, dependency-free email validation used by both the sign-up form and
 * the auth server. Native `type="email"` is too permissive (e.g. it accepts
 * labels that end with a hyphen), so the server re-checks every address.
 */
export function isValidEmail(email: string) {
  const value = normalizeEmail(email)

  if (!value || value.length > 254) {
    return false
  }

  const atIndex = value.indexOf("@")

  if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) {
    return false
  }

  const localPart = value.slice(0, atIndex)
  const domain = value.slice(atIndex + 1)

  if (
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    !LOCAL_PART.test(localPart)
  ) {
    return false
  }

  if (!domain || domain.length > 253) {
    return false
  }

  const labels = domain.split(".")

  if (labels.length < 2) {
    return false
  }

  if (!labels.every((label) => DOMAIN_LABEL.test(label))) {
    return false
  }

  return TOP_LEVEL_DOMAIN.test(labels[labels.length - 1])
}
