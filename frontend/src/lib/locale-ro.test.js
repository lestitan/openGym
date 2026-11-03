import { describe, expect, it } from 'vitest'
import { LANGS, DATE_LOCALES } from './i18n-core.js'
import { matchLocale } from './default-lang.js'
import ro from '../locales/ro.js'

// Romanian came in as a pack plus two registry lines, like Swedish (locale-sv.test.js checks every
// pack is wired). These hold what is particular to it.
describe('Romanian', () => {
  it('a Romanian phone gets Romanian, with Romanian dates', () => {
    expect(LANGS.ro).toBe('Română')
    expect(matchLocale('ro-RO')).toBe('ro')
    expect(matchLocale('ro_MD')).toBe('ro')
    expect(new Intl.DateTimeFormat(DATE_LOCALES.ro, { month: 'long' }).format(new Date(2026, 10, 3))).toBe('noiembrie')
  })

  it('writes ș and ț with the comma below, never the cedilla, and has no em dashes', () => {
    const bad = Object.entries(ro).filter(([, v]) => /[şţŞŢ—]/.test(String(v))).map(([k]) => k)
    expect(bad).toEqual([])
  })

  // The short labels came without context and were the one place the translation slipped
  // ("We" read as the pronoun, "Noi"; months half with dots). Weekdays and months, as the calendar shows them.
  it('names the days and months the way a Romanian calendar does', () => {
    expect(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(k => ro[k])).toEqual(['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'])
    expect(['Mon', 'Wed', 'Fri'].map(k => ro[k])).toEqual(['Lu', 'Mi', 'Vi'])
    expect(['Jan', 'Apr', 'Aug', 'Nov', 'Dec'].map(k => ro[k])).toEqual(['Ian', 'Apr', 'Aug', 'Noi', 'Dec'])
  })

  it('keeps the gym words the glossary chose', () => {
    expect(ro.Settings).toBe('Setări')
    expect(ro.Workout).toBe('Antrenament')
    expect(ro.Sets).toBe('Serii')
    expect(ro['Rest timer']).toBe('Cronometru de pauză')
  })
})
