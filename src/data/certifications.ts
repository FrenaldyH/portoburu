import type { Experience } from '../types'

// Certifications. Newest first.
// Reuses the Experience shape: role = certificate name, org = issuer, period = issue date.
// Source: LinkedIn, Licenses & Certifications.
export const certifications: Experience[] = [
  {
    role: 'AWS Academy Graduate, Cloud Foundations (Training Badge)',
    org: 'Amazon Web Services (AWS)',
    period: 'Feb 2026',
    // link: 'https://...', // optional: credential URL from LinkedIn ("See credential")
  },
  {
    role: 'Problem Solving (Intermediate)',
    org: 'HackerRank',
    period: 'Apr 2025',
    // link: 'https://...', // optional: credential URL from LinkedIn ("See credential")
  },
]
