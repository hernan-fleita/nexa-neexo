import { useNavigate } from "react-router-dom";

/* ─── Shared values ─────────────────────────────────────── */
// Neexo teal:  #2d8f8a
// NEXA sky:    #0ea5e9
// NEXA emerald:#10b981

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #050f1a; color: #e2e8f0; font-family: 'Inter', sans-serif; overflow-x: hidden; }
  @keyframes lc-spin1 { to { transform: rotate(360deg);  } }
  @keyframes lc-spin2 { to { transform: rotate(-360deg); } }
  @keyframes lc-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes lc-glow  { 0%,100%{filter:drop-shadow(0 0 4px #0ea5e9)} 50%{filter:drop-shadow(0 0 10px #10b981)} }
  .lc-ring  { transform-origin: 50% 50%; animation: lc-spin1 20s linear infinite; }
  .lc-ring2 { transform-origin: 50% 50%; animation: lc-spin2 14s linear infinite; }
  .lc-gem   { animation: lc-pulse 2.5s ease-in-out infinite; }
  .lc-glow  { animation: lc-glow 3s ease-in-out infinite; }
`;

/* ─── Concept A: Orbital Eyes ────────────────────────────
   ADN: el anillo abierto de Neexo, pero en gradiente NEXA.
   Identidad propia: dos ojos almendrados = la cara de NEXA
   simplificada a su rasgo más distintivo.
────────────────────────────────────────────────────────── */
function LogoA({ size = 200, animate = true }) {
  const s = size / 100;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="la-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2d8f8a" />
          <stop offset="45%"  stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="la-eye" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <radialGradient id="la-bg" cx="42%" cy="38%">
          <stop offset="0%"   stopColor="#0c1f38" />
          <stop offset="100%" stopColor="#060e1c" />
        </radialGradient>
        <filter id="la-glow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Face background */}
      <circle cx="50" cy="50" r="37" fill="url(#la-bg)" />

      {/* Open ring — gap at top-right (~45°), same as Neexo */}
      <circle cx="50" cy="50" r="44"
        fill="none" stroke="url(#la-ring)" strokeWidth="4.5"
        strokeLinecap="round" strokeDasharray="234 42"
        transform="rotate(-52 50 50)" />

      {/* Gap node dot (like Neexo's arrow endpoint) */}
      <circle cx="84" cy="22" r="3.5" fill="#0ea5e9" filter="url(#la-glow)" className={animate ? "lc-gem" : ""} />

      {/* Left eye */}
      <path d="M 26 50 Q 37 40 48 50 Q 37 60 26 50 Z"
        fill="url(#la-eye)" opacity="0.15"/>
      <path d="M 26 50 Q 37 40 48 50 Q 37 60 26 50 Z"
        fill="none" stroke="url(#la-eye)" strokeWidth="1.2"/>
      <circle cx="37" cy="50" r="5.5" fill="url(#la-eye)" filter="url(#la-glow)" className={animate ? "lc-glow" : ""}/>
      <circle cx="37" cy="50" r="2.5" fill="#050f1a" />
      <circle cx="39" cy="48" r="1.2" fill="#fff" opacity="0.85" />

      {/* Right eye */}
      <path d="M 52 50 Q 63 40 74 50 Q 63 60 52 50 Z"
        fill="url(#la-eye)" opacity="0.15"/>
      <path d="M 52 50 Q 63 40 74 50 Q 63 60 52 50 Z"
        fill="none" stroke="url(#la-eye)" strokeWidth="1.2"/>
      <circle cx="63" cy="50" r="5.5" fill="url(#la-eye)" filter="url(#la-glow)" className={animate ? "lc-glow" : ""}/>
      <circle cx="63" cy="50" r="2.5" fill="#050f1a" />
      <circle cx="65" cy="48" r="1.2" fill="#fff" opacity="0.85" />

      {/* Smile */}
      <path d="M 38 62 Q 50 70 62 62"
        fill="none" stroke="url(#la-eye)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

/* ─── Concept B: N Slash Orbital ────────────────────────
   ADN: el anillo abierto de Neexo + el slash diagonal es
   la barra central de la N. La "N" está construida CON el
   gesto de Neexo. Gradiente teal→sky→emerald.
────────────────────────────────────────────────────────── */
function LogoB({ size = 200, animate = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lb-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2d8f8a" />
          <stop offset="40%"  stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="lb-n" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="lb-glow">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Open ring — same gap as Neexo */}
      <circle cx="50" cy="50" r="44"
        fill="none" stroke="url(#lb-ring)" strokeWidth="4.5"
        strokeLinecap="round" strokeDasharray="234 42"
        transform="rotate(-52 50 50)" />

      {/* Gap node */}
      <circle cx="84" cy="22" r="3.5" fill="#0ea5e9" filter="url(#lb-glow)" className={animate ? "lc-gem" : ""}/>

      {/* The N — stroke-based, same angle as Neexo slash */}
      {/* Left vertical */}
      <line x1="28" y1="30" x2="28" y2="70"
        stroke="url(#lb-n)" strokeWidth="7" strokeLinecap="round"/>
      {/* Right vertical */}
      <line x1="72" y1="30" x2="72" y2="70"
        stroke="url(#lb-n)" strokeWidth="7" strokeLinecap="round"/>
      {/* Diagonal slash — the Neexo gene */}
      <line x1="28" y1="30" x2="72" y2="70"
        stroke="url(#lb-n)" strokeWidth="7" strokeLinecap="round"
        filter="url(#lb-glow)"/>

      {/* Subtle glow behind N */}
      <line x1="28" y1="30" x2="72" y2="70"
        stroke="#0ea5e9" strokeWidth="14" strokeLinecap="round" opacity="0.06"/>
    </svg>
  );
}

/* ─── Concept C: Hexagon Node ────────────────────────────
   Ruptura generacional: hexágono (tech > círculo madre).
   Adentro: la gema del frente del avatar — el ojo de NEXA.
   Borde: gradiente teal(Neexo)→sky(NEXA).
────────────────────────────────────────────────────────── */
function LogoC({ size = 200, animate = true }) {
  // Hexagon points (flat top): center 50,50, radius 44
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${50 + 44 * Math.cos(a)},${50 + 44 * Math.sin(a)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lc-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2d8f8a" />
          <stop offset="50%"  stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="lc-gem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <radialGradient id="lc-bg" cx="40%" cy="35%">
          <stop offset="0%"   stopColor="#0d2040" />
          <stop offset="100%" stopColor="#060e1c" />
        </radialGradient>
        <filter id="lc-glow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="lc-glow-sm">
          <feGaussianBlur stdDeviation="1.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Hex fill */}
      <polygon points={hex} fill="url(#lc-bg)" />

      {/* Hex border */}
      <polygon points={hex} fill="none" stroke="url(#lc-border)" strokeWidth="4.5" strokeLinejoin="round"/>

      {/* Orbital ring (animated) */}
      {animate ? (
        <g className="lc-ring">
          <circle cx="50" cy="50" r="22"
            fill="none" stroke="url(#lc-gem)" strokeWidth="1"
            strokeOpacity="0.4" strokeDasharray="5 4"/>
        </g>
      ) : (
        <circle cx="50" cy="50" r="22"
          fill="none" stroke="url(#lc-gem)" strokeWidth="1"
          strokeOpacity="0.4" strokeDasharray="5 4"/>
      )}

      {/* Inner ring */}
      {animate ? (
        <g className="lc-ring2">
          <circle cx="50" cy="50" r="15"
            fill="none" stroke="#0ea5e9" strokeWidth="0.7"
            strokeOpacity="0.3" strokeDasharray="3 4"/>
        </g>
      ) : (
        <circle cx="50" cy="50" r="15"
          fill="none" stroke="#0ea5e9" strokeWidth="0.7"
          strokeOpacity="0.3" strokeDasharray="3 4"/>
      )}

      {/* Gem */}
      <circle cx="50" cy="50" r="9"
        fill="url(#lc-gem)" filter="url(#lc-glow)"
        className={animate ? "lc-gem" : ""}/>
      <circle cx="50" cy="50" r="4.5" fill="#050f1a"/>
      <circle cx="53" cy="47" r="2"   fill="#fff" opacity="0.85"/>
      <circle cx="48" cy="53" r="1"   fill="#fff" opacity="0.4"/>

      {/* Corner dots — circuit nodes */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i - 30);
        return <circle key={i}
          cx={50 + 44 * Math.cos(a)} cy={50 + 44 * Math.sin(a)}
          r="2.5" fill="url(#lc-gem)" opacity="0.6"
          filter="url(#lc-glow-sm)"/>;
      })}
    </svg>
  );
}

/* ─── Logotype row (isotipo + wordmark) ─────────────────── */
function Logotype({ Logo, label, tagline, concept }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16,
      background: "rgba(14,165,233,0.04)", border: "1px solid rgba(14,165,233,0.1)",
      borderRadius: 14, padding: "18px 24px" }}>
      <Logo size={44} animate={false} />
      <div>
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-1px",
          background: "linear-gradient(135deg,#0ea5e9,#10b981)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          NEXA
        </div>
        <div style={{ fontSize: 10, color: "#64748b", letterSpacing: "0.08em", marginTop: 1 }}>
          {tagline}
        </div>
      </div>
    </div>
  );
}

/* ─── Small favicon preview ─────────────────────────────── */
function FaviconRow({ Logo }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      {[48, 32, 24, 16].map(s => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <Logo size={s} animate={false} />
          <span style={{ fontSize: 9, color: "#475569" }}>{s}px</span>
        </div>
      ))}
    </div>
  );
}

/* ─── One concept panel ─────────────────────────────────── */
function ConceptPanel({ letter, name, description, Logo, tagline }) {
  return (
    <div style={{
      background: "rgba(15,23,42,0.8)", border: "1px solid rgba(14,165,233,0.12)",
      borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 24,
    }}>
      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{
            background: "linear-gradient(135deg,#0ea5e9,#10b981)",
            color: "#fff", borderRadius: 8, width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800,
          }}>{letter}</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{name}</span>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{description}</p>
      </div>

      {/* Large isotipo */}
      <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
        <Logo size={180} animate={true} />
      </div>

      {/* Logotype combo */}
      <div>
        <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em", marginBottom: 8 }}>LOGOTIPO</div>
        <Logotype Logo={Logo} tagline={tagline} />
      </div>

      {/* Dark / light bg */}
      <div>
        <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em", marginBottom: 8 }}>SOBRE FONDO CLARO</div>
        <div style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 18px",
          display: "flex", justifyContent: "center" }}>
          <Logo size={56} animate={false} />
        </div>
      </div>

      {/* Favicon sizes */}
      <div>
        <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.08em", marginBottom: 8 }}>TAMAÑOS PEQUEÑOS</div>
        <FaviconRow Logo={Logo} />
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function LogoConcepts() {
  const navigate = useNavigate();
  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", padding: "0 24px 60px" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 0 32px", borderBottom: "1px solid rgba(14,165,233,0.1)",
          marginBottom: 40, flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#0ea5e9", fontWeight: 700,
              letterSpacing: "0.1em", marginBottom: 6 }}>NEXA · BRAND EXPLORATION</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px" }}>
              Propuestas de Isotipo
            </h1>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>
              Hija de Neexo Solutions · Comparativa de conceptos visuales
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/")} style={{
              background: "transparent", border: "1px solid rgba(14,165,233,0.2)",
              borderRadius: 8, padding: "7px 14px", color: "#94a3b8",
              fontSize: 12, cursor: "pointer",
            }}>← Landing</button>
            <button onClick={() => navigate("/dashboard")} style={{
              background: "linear-gradient(135deg,#0ea5e9,#0284c7)", border: "none",
              borderRadius: 8, padding: "7px 14px", color: "#fff",
              fontSize: 12, cursor: "pointer", fontWeight: 600,
            }}>Dashboard →</button>
          </div>
        </div>

        {/* Reference: Neexo parent */}
        <div style={{
          background: "rgba(45,143,138,0.07)", border: "1px solid rgba(45,143,138,0.25)",
          borderRadius: 14, padding: "16px 20px", marginBottom: 36,
          display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        }}>
          <img src="/neexo-isotipo.png" alt="Neexo" style={{ width: 40, height: 40, borderRadius: 6 }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2d8f8a", letterSpacing: "0.08em" }}>MARCA MADRE — REFERENCIA</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
              Neexo Solutions · Anillo abierto + slash diagonal + flecha → · Teal monocromático
            </div>
          </div>
        </div>

        {/* 3 concepts grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          <ConceptPanel
            letter="A"
            name="Orbital Eyes"
            description="El anillo abierto de Neexo, en gradiente teal→sky→emerald. Adentro: los ojos del avatar, el rasgo más distintivo de NEXA. La herencia es el contenedor; la identidad son los ojos."
            Logo={LogoA}
            tagline="BY NEEXO SOLUTIONS"
          />
          <ConceptPanel
            letter="B"
            name="N Slash Orbital"
            description="El anillo abierto + la N construida con el slash diagonal de Neexo como barra central. La diagonal ES el gen Neexo. Reconvertido en la letra de NEXA."
            Logo={LogoB}
            tagline="BY NEEXO SOLUTIONS"
          />
          <ConceptPanel
            letter="C"
            name="Hexagon Node"
            description="Ruptura generacional: hexágono (más tech que el círculo madre). Adentro la gema del avatar con anillos orbitales. El borde arranca en teal Neexo y termina en NEXA."
            Logo={LogoC}
            tagline="BY NEEXO SOLUTIONS"
          />
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 40, padding: "16px 20px",
          background: "rgba(14,165,233,0.04)", border: "1px solid rgba(14,165,233,0.1)",
          borderRadius: 12, fontSize: 12, color: "#475569", lineHeight: 1.7 }}>
          💡 <strong style={{ color: "#64748b" }}>Nota:</strong> Todos los conceptos comparten el gradiente teal (Neexo) → sky blue → emerald (NEXA).
          Los anillos y animaciones son CSS puro, sin imágenes. El que elijas se implementa como componente SVG definitivo en toda la app.
        </div>
      </div>
    </>
  );
}
