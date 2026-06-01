import type { Locale, Translation } from '../types'
import { zh } from './zh'
import { en } from './en'

export const translations: Record<Locale, Translation> = {
  zh,
  en,
}

export type { Translation }
