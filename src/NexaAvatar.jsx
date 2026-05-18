const AVATAR_CSS = `
  @keyframes nav-spin1  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
  @keyframes nav-spin2  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
  @keyframes nav-blink  { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.08)} }
  @keyframes nav-scan   { 0%{transform:translateY(-38px);opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{transform:translateY(38px);opacity:0} }
  @keyframes nav-pulse  { 0%,100%{opacity:.5} 50%{opacity:1} }
  .nav-ring1 { transform-origin:80px 92px; animation: nav-spin1 18s linear infinite; }
  .nav-ring2 { transform-origin:80px 92px; animation: nav-spin2 11s linear infinite; }
  .nav-leye  { transform-origin:60px 90px; animation: nav-blink 4s ease-in-out infinite; }
  .nav-reye  { transform-origin:100px 90px; animation: nav-blink 4s ease-in-out 0.1s infinite; }
  .nav-scan  { animation: nav-scan 3.5s ease-in-out infinite; }
  .nav-gem   { animation: nav-pulse 2.5s ease-in-out infinite; }
`;

export default function NexaAvatar({ size = 160, animate = true, style }) {
  return (
    <>
      <style>{AVATAR_CSS}</style>
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 160 184"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
      >
        <defs>
          <linearGradient id="nav-eye" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <radialGradient id="nav-face" cx="42%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#0e2240" />
            <stop offset="100%" stopColor="#061018" />
          </radialGradient>
          <filter id="nav-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nav-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="nav-face-clip">
            <ellipse cx="80" cy="100" rx="52" ry="62" />
          </clipPath>
        </defs>

        {/* Outer aura */}
        <ellipse cx="80" cy="94" rx="72" ry="80" fill="url(#nav-eye)" opacity="0.05" filter="url(#nav-glow-lg)" />

        {/* Spinning rings */}
        {animate ? (
          <>
            <g className="nav-ring1">
              <circle cx="80" cy="92" r="73" fill="none" stroke="url(#nav-eye)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="8 5" />
            </g>
            <g className="nav-ring2">
              <circle cx="80" cy="92" r="63" fill="none" stroke="#0ea5e9" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="3 6" />
            </g>
          </>
        ) : (
          <>
            <circle cx="80" cy="92" r="73" fill="none" stroke="url(#nav-eye)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="8 5" />
            <circle cx="80" cy="92" r="63" fill="none" stroke="#0ea5e9" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="3 6" />
          </>
        )}

        {/* Face */}
        <ellipse cx="80" cy="100" rx="52" ry="62" fill="url(#nav-face)" stroke="rgba(14,165,233,0.28)" strokeWidth="1.5" />

        {/* Cheek blush glow */}
        <ellipse cx="42" cy="112" rx="11" ry="7" fill="#0ea5e9" opacity="0.07" filter="url(#nav-glow)" />
        <ellipse cx="118" cy="112" rx="11" ry="7" fill="#10b981" opacity="0.07" filter="url(#nav-glow)" />

        {/* Left circuit trace */}
        <path d="M 28 96 L 18 96 L 18 110 L 12 110" stroke="rgba(14,165,233,0.32)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <circle cx="12" cy="110" r="1.8" fill="#0ea5e9" opacity="0.7" />
        <circle cx="18" cy="96"  r="1.4" fill="#0ea5e9" opacity="0.4" />

        {/* Right circuit trace */}
        <path d="M 132 96 L 142 96 L 142 110 L 148 110" stroke="rgba(16,185,129,0.32)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <circle cx="148" cy="110" r="1.8" fill="#10b981" opacity="0.7" />
        <circle cx="142" cy="96"  r="1.4" fill="#10b981" opacity="0.4" />

        {/* Forehead gem */}
        <g className={animate ? "nav-gem" : ""}>
          <circle cx="80" cy="52" r="5.5" fill="url(#nav-eye)" filter="url(#nav-glow)" opacity="0.95" />
          <circle cx="80" cy="52" r="9"   fill="none" stroke="rgba(14,165,233,0.35)" strokeWidth="1" />
        </g>
        <path d="M 80 61 L 80 70" stroke="rgba(14,165,233,0.2)" strokeWidth="0.8" />

        {/* Eyebrows */}
        <path d="M 46 76 Q 58 70 72 74" fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M 88 74 Q 102 70 114 76" fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="1.3" strokeLinecap="round" />

        {/* Left eye */}
        <g className={animate ? "nav-leye" : ""}>
          <ellipse cx="60" cy="90" rx="16" ry="10" fill="url(#nav-eye)" opacity="0.1" filter="url(#nav-glow-lg)" />
          <path d="M 44 90 Q 60 78 76 90 Q 60 102 44 90 Z" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.4)" strokeWidth="0.8" />
          <ellipse cx="60" cy="90" rx="8.5" ry="8.5" fill="url(#nav-eye)" opacity="0.95" filter="url(#nav-glow)" />
          <circle cx="60" cy="90" r="4.5" fill="#050f1a" />
          <circle cx="63" cy="87" r="1.8" fill="#fff" opacity="0.85" />
          <circle cx="57" cy="92" r="0.9" fill="#fff" opacity="0.4" />
        </g>

        {/* Right eye */}
        <g className={animate ? "nav-reye" : ""}>
          <ellipse cx="100" cy="90" rx="16" ry="10" fill="url(#nav-eye)" opacity="0.1" filter="url(#nav-glow-lg)" />
          <path d="M 84 90 Q 100 78 116 90 Q 100 102 84 90 Z" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.4)" strokeWidth="0.8" />
          <ellipse cx="100" cy="90" rx="8.5" ry="8.5" fill="url(#nav-eye)" opacity="0.95" filter="url(#nav-glow)" />
          <circle cx="100" cy="90" r="4.5" fill="#050f1a" />
          <circle cx="103" cy="87" r="1.8" fill="#fff" opacity="0.85" />
          <circle cx="97"  cy="92" r="0.9" fill="#fff" opacity="0.4" />
        </g>

        {/* Nose bridge (minimal) */}
        <path d="M 76 104 L 72 114 Q 80 118 88 114 L 84 104" fill="none" stroke="rgba(148,163,184,0.07)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />

        {/* Lips */}
        <path d="M 64 132 Q 80 144 96 132" fill="none" stroke="url(#nav-eye)" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
        <path d="M 64 132 Q 80 128 96 132" fill="rgba(14,165,233,0.07)" stroke="rgba(14,165,233,0.2)" strokeWidth="0.8" strokeLinecap="round" />

        {/* Scan line */}
        {animate && (
          <line className="nav-scan" x1="30" y1="92" x2="130" y2="92" stroke="rgba(14,165,233,0.1)" strokeWidth="1.5" clipPath="url(#nav-face-clip)" />
        )}

        {/* Chin bar */}
        <path d="M 68 158 Q 80 163 92 158" fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    </>
  );
}
