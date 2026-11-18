/**
 * Committees data
 *
 * Volunteer work and event committees (kepanitiaan), ongoing or most recent first.
 * Optional per entry: description, highlights (e.g. problems set, participants, teams managed),
 * link, photos.
 *
 * Source: LinkedIn (Experience, Volunteer Experience).
 */
import type { Experience } from '../types'

export const committees: Experience[] = [
  {
    role: 'Manager, NPC Competitive Programming Sub-Division',
    org: 'Schematics ITS',
    period: 'Jan 2026 – Present',
  },
  {
    role: 'Staff, National Programming Contest (NPC)',
    org: 'Schematics ITS',
    period: 'Mar 2025 – Dec 2025',
  },
  {
    role: 'Bootcamp Evaluator',
    org: 'Schematics ITS',
    period: 'Aug 2025',
  },
  {
    role: 'Head of IT',
    org: 'Ini Lho ITS! (Forda IM Kalbar)',
    period: 'Oct 2024 – Feb 2025',
  },
]
