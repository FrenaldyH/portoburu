/**
 * EmailPill
 *
 * Contact pill for the email address. It reads "Email" like the other pills; on mouse hover or
 * keyboard focus its label becomes the address itself. Clicking copies the address to the
 * clipboard and the label shows "Copied" for two seconds. Copying works for visitors without a
 * mail app, for whom a mailto: link does nothing; if the browser blocks the clipboard, it falls
 * back to opening the mail app. Touch screens have no hover, so a tap copies directly.
 *
 * The label swap is pure CSS (group-hover / group-focus-visible); only the "Copied" state uses
 * React state. A visually hidden status line lets screen readers announce "Copied to clipboard".
 * The pill widens while it shows the address; it is the last pill, so nothing after it moves.
 *
 * Exports: EmailPill({ email })
 * Uses: classes.ts (pillClass)
 */
import { useState } from 'react'
import { pillClass } from './classes'

export function EmailPill({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${email}`}
        className={`group/email ${pillClass}`}
      >
        {copied ? (
          'Copied'
        ) : (
          <>
            <span className="group-hover/email:hidden group-focus-visible/email:hidden">Email</span>
            <span className="hidden group-hover/email:inline group-focus-visible/email:inline">{email}</span>
          </>
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </>
  )
}
