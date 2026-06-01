import type { Locale } from '../types'

export function LanguageSwitch({
  locale,
  onChange,
  label,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
  label: string
}) {
  return (
    <div className="locale-switch" role="group" aria-label={label}>
      <button
        className={locale === 'zh' ? 'locale-button active' : 'locale-button'}
        type="button"
        onClick={() => onChange('zh')}
      >
        中文
      </button>
      <button
        className={locale === 'en' ? 'locale-button active' : 'locale-button'}
        type="button"
        onClick={() => onChange('en')}
      >
        EN
      </button>
    </div>
  )
}
