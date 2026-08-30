export type Locale = 'zh' | 'en'
export type TimelineState = 'done' | 'live' | 'queued'

export type HeroStat = {
  value: string
  label: string
}

export type TimelineEvent = {
  time: string
  title: string
  state: TimelineState
}

export type HighlightItem = {
  icon: string
  title: string
  description: string
  points: string[]
}

export type ShowcasePanel = {
  kicker: string
  title: string
  badge: string
  imageSrc: string
  imageAlt: string
}

export type Capability = {
  icon: string
  kicker: string
  title: string
  description: string
  points: string[]
  featureId?: string
}

export type FAQItem = {
  question: string
  answer: string
}

export type FeatureSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  imageSrc?: string
  imageAlt?: string
  code?: string
}

export type DocSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  code?: string
}

export type DownloadScreenshot = {
  title: string
  description: string
  src: string
}

export type DownloadContent = {
  primaryCta: string
  secondaryCta: string
  githubCta: string
  page: {
    kicker: string
    title: string
    description: string
    latestKicker: string
    latestTitle: string
    latestDescription: string
    primaryCta: string
    secondaryCta: string
    tertiaryCta: string
    routeNote: string
    sideKicker: string
    sideTitle: string
    sidePoints: string[]
    screenshotKicker: string
    screenshotTitle: string
    screenshotDescription: string
    screenshotNote: string
    metaTitle: string
    screenshots: DownloadScreenshot[]
  }
}

export type Translation = {
  meta: {
    homeTitle: string
    docsTitle: string
    featuresTitle: string
  }
  nav: {
    brand: string
    brandTagline: string
    highlights: string
    features: string
    download: string
    faq: string
    docs: string
    github: string
    home: string
    overview: string
    firstRun: string
    powerUsers: string
    developers: string
    api: string
    bodhiServer: string
    cicd: string
    multiAgent: string
    security: string
    language: string
  }
  hero: {
    kicker: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    chips: string[]
    stats: HeroStat[]
    liveLabel: string
    liveTitle: string
    liveSummary: string
    liveBadges: string[]
    liveTimeline: TimelineEvent[]
  }
  highlights: {
    kicker: string
    title: string
    items: HighlightItem[]
  }
  showcase: {
    kicker: string
    title: string
    panels: ShowcasePanel[]
  }
  capabilities: {
    kicker: string
    title: string
    items: Capability[]
  }
  faq: {
    kicker: string
    title: string
    items: FAQItem[]
  }
  download: DownloadContent
  features: {
    kicker: string
    title: string
    description: string
    tocTitle: string
    sections: FeatureSection[]
  }
  docs: {
    kicker: string
    title: string
    description: string
    tocTitle: string
    sections: DocSection[]
  }
  footer: {
    home: string
    docs: string
  }
}
