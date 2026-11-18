/**
 * Certifications data
 *
 * Certifications, newest first. Reuses the Experience shape: role = certificate name,
 * org = issuer, period = issue date.
 *
 * Source: LinkedIn, Licenses & Certifications.
 * Optional: add `link: 'https://...'` with the credential URL from LinkedIn ("See credential");
 * it appears under the row labeled with its domain.
 */
import type { Experience } from '../types'

export const certifications: Experience[] = [
  {
    role: 'AWS Academy Graduate, Cloud Foundations (Training Badge)',
    org: 'Amazon Web Services (AWS)',
    period: 'Feb 2026',
  },
  {
    role: 'Problem Solving (Intermediate)',
    org: 'HackerRank',
    period: 'Apr 2025',
  },
]
