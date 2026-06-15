/**
 * Hand-built SVG illustrations for the Apple-style home page.
 * Light-gray + Apple-blue palette, soft shadows, rounded geometry.
 * Each SVG namespaces its gradient/filter ids (h-, ex-, vi-, co-) so the
 * inline copies don't collide in the document.
 */

const FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'PingFang SC', sans-serif"

function Check({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d={`M${cx - 6} ${cy} l4.5 4.5 L${cx + 7} ${cy - 6}`}
      stroke="#fff"
      strokeWidth={2.4}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

/* ---------- Hero: a stylised agent workspace ---------- */
export function HeroArt() {
  return (
    <svg viewBox="0 0 1120 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bodhi agent workspace">
      <defs>
        <linearGradient id="h-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2997ff" />
          <stop offset="1" stopColor="#0071e3" />
        </linearGradient>
        <linearGradient id="h-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6f7f9" />
        </linearGradient>
        <radialGradient id="h-glow" cx="0.5" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#0071e3" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0071e3" stopOpacity="0" />
        </radialGradient>
        <filter id="h-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="22" stdDeviation="30" floodColor="#0b1220" floodOpacity="0.16" />
        </filter>
        <filter id="h-shadow-sm" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#0b1220" floodOpacity="0.14" />
        </filter>
      </defs>

      <ellipse cx="560" cy="180" rx="540" ry="250" fill="url(#h-glow)" />

      {/* app window */}
      <g filter="url(#h-shadow)">
        <rect x="210" y="78" width="700" height="466" rx="26" fill="url(#h-card)" stroke="#e7e8ee" />
      </g>
      <circle cx="246" cy="116" r="6" fill="#ff5f57" />
      <circle cx="268" cy="116" r="6" fill="#febc2e" />
      <circle cx="290" cy="116" r="6" fill="#28c840" />
      <rect x="330" y="108" width="150" height="16" rx="8" fill="#e9eaef" />
      <line x1="210" y1="146" x2="910" y2="146" stroke="#eef0f3" />

      {/* sidebar */}
      <rect x="234" y="166" width="150" height="22" rx="11" fill="#f1f2f6" />
      <rect x="234" y="204" width="150" height="18" rx="9" fill="#eceef2" />
      <rect x="226" y="232" width="158" height="30" rx="9" fill="#e8f1fd" />
      <rect x="226" y="232" width="4" height="30" rx="2" fill="url(#h-blue)" />
      <rect x="240" y="242" width="118" height="10" rx="5" fill="#bcd9f7" />
      <rect x="234" y="276" width="150" height="18" rx="9" fill="#eceef2" />
      <rect x="234" y="304" width="150" height="18" rx="9" fill="#eceef2" />
      <rect x="234" y="332" width="150" height="18" rx="9" fill="#eceef2" />
      <rect x="234" y="492" width="150" height="34" rx="11" fill="url(#h-blue)" />

      {/* main: task checklist */}
      <rect x="410" y="170" width="120" height="14" rx="7" fill="#d9dbe1" />
      <circle cx="420" cy="214" r="11" fill="#34c759" />
      <Check cx={420} cy={214} />
      <rect x="442" y="208" width="230" height="12" rx="6" fill="#e7e8ee" />
      <circle cx="420" cy="252" r="11" fill="#34c759" />
      <Check cx={420} cy={252} />
      <rect x="442" y="246" width="188" height="12" rx="6" fill="#e7e8ee" />
      <circle cx="420" cy="290" r="11" fill="url(#h-blue)" />
      <circle cx="420" cy="290" r="4" fill="#fff" />
      <rect x="442" y="284" width="210" height="12" rx="6" fill="#e7e8ee" />

      {/* progress */}
      <rect x="410" y="332" width="300" height="10" rx="5" fill="#ececf1" />
      <rect x="410" y="332" width="186" height="10" rx="5" fill="url(#h-blue)" />

      {/* input */}
      <rect x="410" y="378" width="248" height="36" rx="18" fill="#f3f4f7" stroke="#e7e8ee" />
      <circle cx="690" cy="396" r="18" fill="url(#h-blue)" />
      <path d="M684 396 h12 M691 391 l5 5 l-5 5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* right panel: diffs */}
      <line x1="724" y1="160" x2="724" y2="436" stroke="#eef0f3" />
      <rect x="742" y="170" width="90" height="14" rx="7" fill="#d9dbe1" />
      {[196, 234, 272, 310].map((y) => (
        <g key={y}>
          <rect x="742" y={y} width="150" height="28" rx="8" fill="#f6f7f9" stroke="#edeef2" />
          <rect x="754" y={y + 10} width="72" height="8" rx="4" fill="#dfe1e7" />
          <rect x="836" y={y + 8} width="44" height="12" rx="6" fill="#d8f3e0" />
        </g>
      ))}

      {/* floating chips */}
      <g filter="url(#h-shadow-sm)">
        <rect x="826" y="54" width="106" height="44" rx="22" fill="#fff" stroke="#edeef2" />
      </g>
      <circle cx="852" cy="76" r="6" fill="url(#h-blue)" />
      <text x="868" y="81" fontFamily={FONT} fontSize="15" fontWeight="600" fill="#1d1d1f">MCP</text>

      <g filter="url(#h-shadow-sm)">
        <rect x="150" y="436" width="116" height="44" rx="22" fill="#fff" stroke="#edeef2" />
      </g>
      <circle cx="174" cy="458" r="6" fill="#34c759" />
      <text x="190" y="463" fontFamily={FONT} fontSize="15" fontWeight="600" fill="#1d1d1f">SSE</text>
    </svg>
  )
}

/* ---------- "Actually executes": goal broken into completed steps ---------- */
export function ExecutesArt() {
  return (
    <svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tasks broken into steps">
      <defs>
        <linearGradient id="ex-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2997ff" />
          <stop offset="1" stopColor="#0071e3" />
        </linearGradient>
        <linearGradient id="ex-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6f7f9" />
        </linearGradient>
        <filter id="ex-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#0b1220" floodOpacity="0.14" />
        </filter>
      </defs>
      <g filter="url(#ex-shadow)">
        <rect x="60" y="44" width="520" height="332" rx="26" fill="url(#ex-card)" stroke="#e7e8ee" />
      </g>
      <rect x="96" y="80" width="160" height="16" rx="8" fill="#d9dbe1" />
      <line x1="118" y1="150" x2="118" y2="318" stroke="#e3e5eb" strokeWidth="2" />
      {[
        { y: 150, w: 360, sw: 220, done: true },
        { y: 206, w: 320, sw: 180, done: true },
        { y: 262, w: 340, sw: 200, done: true },
        { y: 318, w: 280, sw: 150, done: false },
      ].map((s) => (
        <g key={s.y}>
          <circle cx="118" cy={s.y} r="15" fill={s.done ? '#34c759' : 'url(#ex-blue)'} />
          {s.done ? <Check cx={118} cy={s.y} /> : <circle cx="118" cy={s.y} r="5" fill="#fff" />}
          <rect x="152" y={s.y - 7} width={s.w} height="14" rx="7" fill="#e9ebf0" />
          <rect x="152" y={s.y + 13} width={s.sw} height="8" rx="4" fill="#f0f1f5" />
        </g>
      ))}
    </svg>
  )
}

/* ---------- "Visible by default": a live event stream ---------- */
export function VisibleArt() {
  const rows = [
    { y: 150, c: '#34c759' },
    { y: 200, c: '#0071e3', active: true },
    { y: 250, c: '#ff9f0a' },
    { y: 300, c: '#34c759' },
  ]
  return (
    <svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Live event stream">
      <defs>
        <linearGradient id="vi-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2997ff" />
          <stop offset="1" stopColor="#0071e3" />
        </linearGradient>
        <linearGradient id="vi-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6f7f9" />
        </linearGradient>
        <filter id="vi-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#0b1220" floodOpacity="0.14" />
        </filter>
      </defs>
      <g filter="url(#vi-shadow)">
        <rect x="60" y="44" width="520" height="332" rx="26" fill="url(#vi-card)" stroke="#e7e8ee" />
      </g>
      {/* LIVE pill */}
      <rect x="96" y="80" width="96" height="26" rx="13" fill="#eaf3fd" stroke="#cfe6fb" />
      <circle cx="114" cy="93" r="5" fill="#34c759" />
      <text x="128" y="98" fontFamily={FONT} fontSize="13" fontWeight="700" fill="#0071e3">LIVE</text>

      <line x1="118" y1="150" x2="118" y2="300" stroke="#e3e5eb" strokeWidth="2" />
      {rows.map((r) => (
        <g key={r.y}>
          {r.active && <circle cx="118" cy={r.y} r="13" fill="none" stroke="url(#vi-blue)" strokeWidth="2" opacity="0.4" />}
          <rect x="142" y={r.y - 18} width="392" height="36" rx="11" fill="#f6f7f9" stroke="#eef0f3" />
          <circle cx="118" cy={r.y} r="7" fill={r.c} />
          <rect x="160" y={r.y - 8} width="240" height="10" rx="5" fill="#e4e6ec" />
          <rect x="160" y={r.y + 6} width="150" height="7" rx="3.5" fill="#eef0f4" />
          <rect x="470" y={r.y - 5} width="44" height="10" rx="5" fill="#dfe1e7" />
        </g>
      ))}
    </svg>
  )
}

/* ---------- "Compounds over time": rising chart + recurring loop ---------- */
export function CompoundsArt() {
  return (
    <svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Value compounding over time">
      <defs>
        <linearGradient id="co-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2997ff" />
          <stop offset="1" stopColor="#0071e3" />
        </linearGradient>
        <linearGradient id="co-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6f7f9" />
        </linearGradient>
        <linearGradient id="co-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0071e3" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0071e3" stopOpacity="0" />
        </linearGradient>
        <filter id="co-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#0b1220" floodOpacity="0.14" />
        </filter>
      </defs>
      <g filter="url(#co-shadow)">
        <rect x="60" y="44" width="520" height="332" rx="26" fill="url(#co-card)" stroke="#e7e8ee" />
      </g>
      <rect x="96" y="80" width="150" height="16" rx="8" fill="#d9dbe1" />

      {/* baseline */}
      <line x1="110" y1="312" x2="528" y2="312" stroke="#e9ebf0" strokeWidth="2" />

      {/* area + curve */}
      <path
        d="M110 300 C170 286 200 250 250 244 C300 238 320 214 370 198 C420 182 450 156 528 138 L528 312 L110 312 Z"
        fill="url(#co-area)"
      />
      <path
        d="M110 300 C170 286 200 250 250 244 C300 238 320 214 370 198 C420 182 450 156 528 138"
        fill="none"
        stroke="url(#co-blue)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {[
        [250, 244],
        [370, 198],
        [528, 138],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="6" fill="#fff" stroke="url(#co-blue)" strokeWidth="3.5" />
      ))}

      {/* recurring loop badge */}
      <g transform="translate(470 96)">
        <circle cx="0" cy="0" r="26" fill="#eaf3fd" stroke="#cfe6fb" />
        <path d="M-9 -3 a9 9 0 1 1 2 8" fill="none" stroke="url(#co-blue)" strokeWidth="3" strokeLinecap="round" />
        <path d="M-9 -10 v7 h7" fill="none" stroke="url(#co-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
