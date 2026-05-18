/* ─────────────────────────────────────────────────────────────
   NEXA Brand System — fuente única de verdad

   NexaIsotipo  (V2-B) · ojos verticales · uso standalone
     → favicon, header compacto, chat avatar, app icon

   NexaLogotype (V1-A) · ojos horizontales · uso con wordmark
     → navbar, hero landing, welcome screen, footer
───────────────────────────────────────────────────────────── */

const BRAND_CSS = `
  @keyframes nb-spin1   { to { transform: rotate(360deg);  } }
  @keyframes nb-spin2   { to { transform: rotate(-360deg); } }
  @keyframes nb-pulse   { 0%,100%{opacity:.45} 50%{opacity:1} }
  @keyframes nb-glow    { 0%,100%{filter:drop-shadow(0 0 4px #0ea5e9)} 50%{filter:drop-shadow(0 0 12px #10b981)} }
  @keyframes nb-blink   { 0%,88%,100%{transform:scaleY(1)} 93%{transform:scaleY(0.1)} }
  @keyframes nb-scan    { 0%{transform:translateY(-30px);opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{transform:translateY(30px);opacity:0} }
  .nb-ring1   { transform-origin:50% 50%; animation: nb-spin1 20s linear infinite; }
  .nb-ring2   { transform-origin:50% 50%; animation: nb-spin2 13s linear infinite; }
  .nb-pulse   { animation: nb-pulse 2.5s ease-in-out infinite; }
  .nb-glow    { animation: nb-glow  3s   ease-in-out infinite; }
  .nb-blink   { transform-origin:50% 50%; animation: nb-blink 4s ease-in-out infinite; }
  .nb-blink2  { transform-origin:50% 50%; animation: nb-blink 4s ease-in-out .15s infinite; }
  .nb-scan    { animation: nb-scan 4s ease-in-out infinite; }
`;

let cssInjected = false;
function injectCSS() {
  if (cssInjected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.textContent = BRAND_CSS;
  document.head.appendChild(s);
  cssInjected = true;
}

/* ── shared defs id prefix evita colisiones cuando ambos coexisten ── */
function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#2d8f8a" />
        <stop offset="42%"  stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <radialGradient id={`${id}-bg`} cx="42%" cy="36%">
        <stop offset="0%"   stopColor="#0d2040" />
        <stop offset="100%" stopColor="#060e1c" />
      </radialGradient>
      <filter id={`${id}-f`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.2" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id={`${id}-fg`} x="-120%" y="-120%" width="340%" height="340%">
        <feGaussianBlur stdDeviation="5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  );
}

/* ── Eye: almendra reutilizable ─────────────────────────────────── */
function Eye({ id, cx, cy, rx, ry, blinkClass, animate }) {
  const g  = `${id}-g`;
  const f  = `${id}-f`;
  const fg = `${id}-fg`;
  return (
    <g className={animate ? blinkClass : ""} style={{ transformOrigin: `${cx}px ${cy}px` }}>
      {/* Halo */}
      <ellipse cx={cx} cy={cy} rx={rx * 1.5} ry={ry * 1.5}
        fill={`url(#${g})`} opacity="0.1" filter={`url(#${fg})`}/>
      {/* Almendra */}
      <path d={`M ${cx - rx} ${cy} Q ${cx} ${cy - ry * 1.4} ${cx + rx} ${cy} Q ${cx} ${cy + ry * 1.4} ${cx - rx} ${cy} Z`}
        fill="rgba(14,165,233,0.07)" stroke={`url(#${g})`} strokeWidth="1.1"/>
      {/* Iris */}
      <circle cx={cx} cy={cy} r={ry * 0.85}
        fill={`url(#${g})`} filter={`url(#${f})`}
        className={animate ? "nb-glow" : ""}/>
      {/* Pupila */}
      <circle cx={cx} cy={cy} r={ry * 0.42} fill="#050f1a"/>
      {/* Brillo */}
      <circle cx={cx + ry * 0.28} cy={cy - ry * 0.28} r={ry * 0.2} fill="#fff" opacity="0.9"/>
      <circle cx={cx - ry * 0.18} cy={cy + ry * 0.22} r={ry * 0.1} fill="#fff" opacity="0.4"/>
    </g>
  );
}

/* ════════════════════════════════════════════════════════════════
   NEXA ISOTIPO — V2-B · ojos verticales · uso standalone
   Contextos: favicon, header compacto, chat avatar, app icon
════════════════════════════════════════════════════════════════ */
export function NexaIsotipo({ size = 40, animate = true, style }) {
  injectCSS();
  const id = "nbi";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" style={style}>
      <Defs id={id}/>

      {/* Anillo abierto — ADN Neexo */}
      {animate ? (
        <g className="nb-ring1">
          <circle cx="50" cy="50" r="44" fill="none"
            stroke={`url(#${id}-g)`} strokeWidth="4"
            strokeLinecap="round" strokeDasharray="234 42"
            transform="rotate(-52 50 50)"/>
        </g>
      ) : (
        <circle cx="50" cy="50" r="44" fill="none"
          stroke={`url(#${id}-g)`} strokeWidth="4"
          strokeLinecap="round" strokeDasharray="234 42"
          transform="rotate(-52 50 50)"/>
      )}

      {/* Nodo en el gap */}
      <circle cx="83" cy="21" r="3.5" fill="#0ea5e9"
        filter={`url(#${id}-f)`}
        className={animate ? "nb-pulse" : ""}/>

      {/* Fondo */}
      <circle cx="50" cy="50" r="37" fill={`url(#${id}-bg)`}/>

      {/* Ojo superior */}
      <Eye id={id} cx={50} cy={33} rx={17} ry={11}
        blinkClass="nb-blink" animate={animate}/>

      {/* Eje sutil */}
      <line x1="50" y1="45" x2="50" y2="55"
        stroke="rgba(14,165,233,0.2)" strokeWidth="0.8" strokeLinecap="round"/>

      {/* Ojo inferior especular */}
      <Eye id={id} cx={50} cy={67} rx={17} ry={11}
        blinkClass="nb-blink2" animate={animate}/>

      {/* Scan line */}
      {animate && (
        <line className="nb-scan" x1="34" y1="50" x2="66" y2="50"
          stroke="rgba(14,165,233,0.12)" strokeWidth="1.5"
          clipPath={`circle(37px at 50px 50px)`}/>
      )}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   NEXA LOGOTYPE — V1-A · ojos horizontales · uso con wordmark
   Contextos: navbar landing, hero, welcome screen, footer
════════════════════════════════════════════════════════════════ */
export function NexaLogotype({ size = 40, animate = true, style }) {
  injectCSS();
  const id = "nbl";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" style={style}>
      <Defs id={id}/>

      {/* Anillo abierto */}
      {animate ? (
        <g className="nb-ring1">
          <circle cx="50" cy="50" r="44" fill="none"
            stroke={`url(#${id}-g)`} strokeWidth="4"
            strokeLinecap="round" strokeDasharray="234 42"
            transform="rotate(-52 50 50)"/>
        </g>
      ) : (
        <circle cx="50" cy="50" r="44" fill="none"
          stroke={`url(#${id}-g)`} strokeWidth="4"
          strokeLinecap="round" strokeDasharray="234 42"
          transform="rotate(-52 50 50)"/>
      )}

      <circle cx="83" cy="21" r="3.5" fill="#0ea5e9"
        filter={`url(#${id}-f)`}
        className={animate ? "nb-pulse" : ""}/>

      {/* Fondo */}
      <circle cx="50" cy="50" r="37" fill={`url(#${id}-bg)`}/>

      {/* Sonrisa sutil (cara = contexto humano) */}
      <path d="M 36 63 Q 50 72 64 63"
        fill="none" stroke={`url(#${id}-g)`}
        strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>

      {/* Ojo izquierdo */}
      <Eye id={id} cx={33} cy={46} rx={15} ry={10}
        blinkClass="nb-blink" animate={animate}/>

      {/* Eje nasal sutil */}
      <path d="M 47 52 L 44 58 Q 50 61 56 58 L 53 52"
        fill="none" stroke="rgba(148,163,184,0.07)"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Ojo derecho */}
      <Eye id={id} cx={67} cy={46} rx={15} ry={10}
        blinkClass="nb-blink2" animate={animate}/>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   NEXA WORDMARK — isotipo + texto, lista para usar
════════════════════════════════════════════════════════════════ */
export function NexaWordmark({
  size = 36,
  animate = false,
  showTagline = false,
  style,
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, ...style }}>
      <NexaLogotype size={size} animate={animate}/>
      <div>
        <div style={{
          fontSize: size * 0.5, fontWeight: 900,
          letterSpacing: "-0.04em", lineHeight: 1,
          background: "linear-gradient(135deg, #0ea5e9, #10b981)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>NEXA</div>
        {showTagline && (
          <div style={{
            fontSize: size * 0.22, color: "#475569",
            letterSpacing: "0.08em", marginTop: 2,
          }}>BY NEEXO SOLUTIONS</div>
        )}
      </div>
    </div>
  );
}
