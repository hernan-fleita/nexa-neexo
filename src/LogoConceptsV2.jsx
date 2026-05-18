import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #050f1a; color: #e2e8f0; font-family: 'Inter', sans-serif; }
  @keyframes v2-spin1 { to { transform: rotate(360deg);  } }
  @keyframes v2-spin2 { to { transform: rotate(-360deg); } }
  @keyframes v2-pulse { 0%,100%{opacity:.45} 50%{opacity:1} }
  @keyframes v2-glow  { 0%,100%{filter:drop-shadow(0 0 5px #0ea5e9)} 50%{filter:drop-shadow(0 0 14px #10b981)} }
  @keyframes v2-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
  .v2-ring1 { transform-origin:50% 50%; animation: v2-spin1 22s linear infinite; }
  .v2-ring2 { transform-origin:50% 50%; animation: v2-spin2 15s linear infinite; }
  .v2-pulse { animation: v2-pulse 2.5s ease-in-out infinite; }
  .v2-glow  { animation: v2-glow  3s   ease-in-out infinite; }
  .v2-breathe { animation: v2-breathe 4s ease-in-out infinite; }
  .concepts-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  @media(max-width:900px){ .concepts-grid { grid-template-columns:1fr; } }
`;

/* ─────────────────────────────────────────────────────────
   CONCEPTO A · "ee → NN especular"
   ADN: las dos e enfrentadas de Neexo se convierten en
   dos N especulares. La N derecha es la N izquierda
   reflejada horizontalmente (= И). El espacio negativo
   central forma un rombo — la gema de NEXA.
───────────────────────────────────────────────────────── */
export function LogoV2A({ size = 200, animate = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v2a-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2d8f8a" />
          <stop offset="40%"  stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="v2a-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <radialGradient id="v2a-bg" cx="50%" cy="45%">
          <stop offset="0%"   stopColor="#0c2040" />
          <stop offset="100%" stopColor="#060e1c" />
        </radialGradient>
        <filter id="v2a-f">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="v2a-fg">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="v2a-clip"><circle cx="50" cy="50" r="44"/></clipPath>
      </defs>

      {/* Outer ring — abierto como Neexo, ~45° gap top-right */}
      <circle cx="50" cy="50" r="44"
        fill="none" stroke="url(#v2a-g)" strokeWidth="4"
        strokeLinecap="round" strokeDasharray="234 42"
        transform="rotate(-52 50 50)" />

      {/* Nodo en el gap (herencia de la flecha Neexo) */}
      <circle cx="83" cy="21" r="3.5" fill="#0ea5e9"
        filter="url(#v2a-f)" className={animate ? "v2-pulse" : ""} />

      {/* Fondo cara */}
      <circle cx="50" cy="50" r="37" fill="url(#v2a-bg)" />

      {/*
        N izquierda  (trazo izq, diag izq→der, trazo der)  x: 20-45
        N derecha especular (İ) x: 55-80, diagonal va der→izq
        Espacio negativo entre diagonales = rombo central glowing
      */}

      {/* === N izquierda === */}
      {/* vertical izq */}
      <line x1="22" y1="30" x2="22" y2="70" stroke="url(#v2a-g)" strokeWidth="6.5" strokeLinecap="round"/>
      {/* vertical der */}
      <line x1="44" y1="30" x2="44" y2="70" stroke="url(#v2a-g)" strokeWidth="6.5" strokeLinecap="round"/>
      {/* diagonal top-left → bottom-right */}
      <line x1="22" y1="30" x2="44" y2="70" stroke="url(#v2a-g)" strokeWidth="6.5" strokeLinecap="round"/>

      {/* === N derecha especular (İ) === */}
      {/* vertical izq */}
      <line x1="56" y1="30" x2="56" y2="70" stroke="url(#v2a-g)" strokeWidth="6.5" strokeLinecap="round"/>
      {/* vertical der */}
      <line x1="78" y1="30" x2="78" y2="70" stroke="url(#v2a-g)" strokeWidth="6.5" strokeLinecap="round"/>
      {/* diagonal top-right → bottom-left (espejada) */}
      <line x1="78" y1="30" x2="56" y2="70" stroke="url(#v2a-g)" strokeWidth="6.5" strokeLinecap="round"/>

      {/* Rombo central — espacio negativo iluminado */}
      <polygon points="50,38 58,50 50,62 42,50"
        fill="url(#v2a-glow)" filter="url(#v2a-fg)"
        className={animate ? "v2-glow" : ""} opacity="0.9"/>
      <polygon points="50,43 54,50 50,57 46,50"
        fill="#050f1a" opacity="0.85"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   CONCEPTO B · "ee → ojos especulares"
   ADN: las dos e de Neexo son orgánicas y curvas. En NEXA
   se convierten en dos ojos almendrados enfrentados —
   el rasgo icónico del avatar. Bilateral symmetry exacta.
   El eje de simetría es vertical (mismo que el ee).
   Más femenino. Más "cara de marca".
───────────────────────────────────────────────────────── */
export function LogoV2B({ size = 200, animate = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v2b-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2d8f8a" />
          <stop offset="45%"  stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <radialGradient id="v2b-bg" cx="50%" cy="45%">
          <stop offset="0%"   stopColor="#0c2040" />
          <stop offset="100%" stopColor="#060e1c" />
        </radialGradient>
        <filter id="v2b-f">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="v2b-fg">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx="50" cy="50" r="44"
        fill="none" stroke="url(#v2b-g)" strokeWidth="4"
        strokeLinecap="round" strokeDasharray="234 42"
        transform="rotate(-52 50 50)" />

      <circle cx="83" cy="21" r="3.5" fill="#0ea5e9"
        filter="url(#v2b-f)" className={animate ? "v2-pulse" : ""} />

      {/* Fondo */}
      <circle cx="50" cy="50" r="37" fill="url(#v2b-bg)" />

      {/* Eje de simetría vertical (invisible, referencia) */}
      {/* Eje en x=50 */}

      {/* Ojo superior (apunta hacia arriba) */}
      <g className={animate ? "v2-breathe" : ""} style={{ transformOrigin: "50px 34px" }}>
        {/* Glow */}
        <ellipse cx="50" cy="34" rx="20" ry="12" fill="url(#v2b-g)" opacity="0.12" filter="url(#v2b-fg)"/>
        {/* Almendra */}
        <path d="M 30 34 Q 50 20 70 34 Q 50 48 30 34 Z"
          fill="rgba(14,165,233,0.07)" stroke="url(#v2b-g)" strokeWidth="1.2"/>
        {/* Iris */}
        <circle cx="50" cy="34" r="8" fill="url(#v2b-g)" filter="url(#v2b-f)"
          className={animate ? "v2-glow" : ""}/>
        {/* Pupila */}
        <circle cx="50" cy="34" r="4" fill="#050f1a"/>
        {/* Brillo */}
        <circle cx="53" cy="31" r="2"   fill="#fff" opacity="0.9"/>
        <circle cx="47" cy="37" r="1"   fill="#fff" opacity="0.45"/>
      </g>

      {/* Ojo inferior especular (apunta hacia abajo) */}
      <g className={animate ? "v2-breathe" : ""} style={{ transformOrigin: "50px 66px" }}>
        <ellipse cx="50" cy="66" rx="20" ry="12" fill="url(#v2b-g)" opacity="0.12" filter="url(#v2b-fg)"/>
        {/* Almendra invertida */}
        <path d="M 30 66 Q 50 52 70 66 Q 50 80 30 66 Z"
          fill="rgba(14,165,233,0.07)" stroke="url(#v2b-g)" strokeWidth="1.2"/>
        <circle cx="50" cy="66" r="8" fill="url(#v2b-g)" filter="url(#v2b-f)"
          className={animate ? "v2-glow" : ""}/>
        <circle cx="50" cy="66" r="4" fill="#050f1a"/>
        <circle cx="53" cy="63" r="2"   fill="#fff" opacity="0.9"/>
        <circle cx="47" cy="69" r="1"   fill="#fff" opacity="0.45"/>
      </g>

      {/* Línea de eje (muy sutil) */}
      <line x1="50" y1="46" x2="50" y2="54"
        stroke="rgba(14,165,233,0.25)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   CONCEPTO C · "ee → venn / intersección"
   ADN: las dos e enfrentadas forman un espacio compartido
   en el centro. Acá dos semicírculos se tocan en el eje
   central creando una vesica piscis (la intersección).
   La zona compartida = el "cerebro" de NEXA, glowing.
   Más abstracto, más premium, más "producto de IA".
───────────────────────────────────────────────────────── */
export function LogoV2C({ size = 200, animate = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v2c-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2d8f8a" />
          <stop offset="45%"  stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="v2c-left" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%"   stopColor="#2d8f8a" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="v2c-right" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="v2c-center" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <radialGradient id="v2c-bg" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#091a30" />
          <stop offset="100%" stopColor="#050f1a" />
        </radialGradient>
        <filter id="v2c-f">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="v2c-fg">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Clip para la intersección vesica */}
        <clipPath id="v2c-lclip">
          <circle cx="38" cy="50" r="22"/>
        </clipPath>
        <clipPath id="v2c-rclip">
          <circle cx="62" cy="50" r="22"/>
        </clipPath>
      </defs>

      {/* Outer ring */}
      <circle cx="50" cy="50" r="44"
        fill="none" stroke="url(#v2c-g)" strokeWidth="4"
        strokeLinecap="round" strokeDasharray="234 42"
        transform="rotate(-52 50 50)" />

      <circle cx="83" cy="21" r="3.5" fill="#0ea5e9"
        filter="url(#v2c-f)" className={animate ? "v2-pulse" : ""} />

      {/* Fondo */}
      <circle cx="50" cy="50" r="37" fill="url(#v2c-bg)" />

      {/* Círculo izquierdo — herencia Neexo (teal) */}
      <circle cx="38" cy="50" r="22"
        fill="none" stroke="url(#v2c-left)" strokeWidth="2.5" opacity="0.8"/>

      {/* Círculo derecho — NEXA (emerald) */}
      <circle cx="62" cy="50" r="22"
        fill="none" stroke="url(#v2c-right)" strokeWidth="2.5" opacity="0.8"/>

      {/* Relleno sutil izquierdo */}
      <circle cx="38" cy="50" r="22" fill="#0ea5e9" opacity="0.04"/>
      {/* Relleno sutil derecho */}
      <circle cx="62" cy="50" r="22" fill="#10b981" opacity="0.04"/>

      {/* Intersección / vesica — zona compartida glowing */}
      {/* La intersección de dos círculos r=22, centros separados 24px */}
      {/* Clip = solo la parte donde ambos se solapan */}
      <g clipPath="url(#v2c-rclip)">
        <circle cx="38" cy="50" r="22"
          fill="url(#v2c-center)" opacity="0.18" filter="url(#v2c-fg)"
          className={animate ? "v2-glow" : ""}/>
      </g>

      {/* Gem central en la intersección */}
      <circle cx="50" cy="50" r="7"
        fill="url(#v2c-center)" filter="url(#v2c-f)"
        className={animate ? "v2-glow" : ""} />
      <circle cx="50" cy="50" r="3.5" fill="#050f1a"/>
      <circle cx="52" cy="48" r="1.5" fill="#fff" opacity="0.9"/>

      {/* Pequeños nodos en los extremos de los círculos */}
      <circle cx="16" cy="50" r="2.5" fill="#2d8f8a" opacity="0.7" filter="url(#v2c-f)"/>
      <circle cx="84" cy="50" r="2.5" fill="#10b981" opacity="0.7" filter="url(#v2c-f)"/>
    </svg>
  );
}

/* ─── Helpers ─────────────────────────────────────────── */
function Wordmark({ Logo, animate = false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12,
      background:"rgba(14,165,233,0.04)", border:"1px solid rgba(14,165,233,0.1)",
      borderRadius:12, padding:"14px 20px" }}>
      <Logo size={40} animate={animate}/>
      <div>
        <div style={{ fontSize:24, fontWeight:900, letterSpacing:"-0.5px",
          background:"linear-gradient(135deg,#0ea5e9,#10b981)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1 }}>
          NEXA
        </div>
        <div style={{ fontSize:9, color:"#475569", letterSpacing:"0.1em", marginTop:3 }}>
          BY NEEXO SOLUTIONS
        </div>
      </div>
    </div>
  );
}

function SmallSizes({ Logo }) {
  return (
    <div style={{ display:"flex", gap:12, alignItems:"flex-end", flexWrap:"wrap" }}>
      {[64, 40, 28, 18].map(s => (
        <div key={s} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
          <Logo size={s} animate={false}/>
          <span style={{ fontSize:9, color:"#475569" }}>{s}px</span>
        </div>
      ))}
    </div>
  );
}

function OnLight({ Logo }) {
  return (
    <div style={{ background:"#f1f5f9", borderRadius:10, padding:"16px 20px",
      display:"flex", alignItems:"center", gap:14 }}>
      <Logo size={48} animate={false}/>
      <div>
        <div style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.5px",
          background:"linear-gradient(135deg,#0c6e6a,#0284c7)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          NEXA
        </div>
        <div style={{ fontSize:9, color:"#94a3b8", letterSpacing:"0.1em" }}>BY NEEXO SOLUTIONS</div>
      </div>
    </div>
  );
}

function Panel({ letter, name, desc, Logo, dna }) {
  return (
    <div style={{ background:"rgba(15,23,42,0.85)", border:"1px solid rgba(14,165,233,0.12)",
      borderRadius:20, padding:28, display:"flex", flexDirection:"column", gap:22 }}>

      {/* Label */}
      <div>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ background:"linear-gradient(135deg,#0ea5e9,#10b981)", color:"#fff",
            borderRadius:8, width:28, height:28, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:13, fontWeight:800 }}>{letter}</span>
          <span style={{ fontSize:16, fontWeight:700 }}>{name}</span>
        </div>
        <p style={{ fontSize:12, color:"#64748b", lineHeight:1.65, marginBottom:8 }}>{desc}</p>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6,
          background:"rgba(45,143,138,0.1)", border:"1px solid rgba(45,143,138,0.25)",
          borderRadius:6, padding:"3px 10px", fontSize:11, color:"#2d8f8a" }}>
          🧬 {dna}
        </div>
      </div>

      {/* Isotipo grande */}
      <div style={{ display:"flex", justifyContent:"center", padding:"8px 0" }}>
        <Logo size={190} animate={true}/>
      </div>

      {/* Wordmark */}
      <div>
        <div style={{ fontSize:10, color:"#334155", letterSpacing:"0.08em", marginBottom:8 }}>LOGOTIPO</div>
        <Wordmark Logo={Logo}/>
      </div>

      {/* Fondo claro */}
      <div>
        <div style={{ fontSize:10, color:"#334155", letterSpacing:"0.08em", marginBottom:8 }}>SOBRE FONDO CLARO</div>
        <OnLight Logo={Logo}/>
      </div>

      {/* Tamaños */}
      <div>
        <div style={{ fontSize:10, color:"#334155", letterSpacing:"0.08em", marginBottom:10 }}>ESCALA</div>
        <SmallSizes Logo={Logo}/>
      </div>
    </div>
  );
}

export default function LogoConceptsV2() {
  const navigate = useNavigate();
  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight:"100vh", padding:"0 24px 60px", maxWidth:1280, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"24px 0 28px", borderBottom:"1px solid rgba(14,165,233,0.1)",
          marginBottom:32, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:11, color:"#0ea5e9", fontWeight:700,
              letterSpacing:"0.1em", marginBottom:6 }}>NEXA · BRAND IDENTITY v2</div>
            <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.5px" }}>
              Isotipo — Segunda ronda
            </h1>
            <p style={{ fontSize:13, color:"#64748b", marginTop:4 }}>
              ADN real: dos "e" enfrentadas → simetría bilateral
            </p>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <button onClick={() => navigate("/logos")} style={{ background:"transparent",
              border:"1px solid rgba(14,165,233,0.2)", borderRadius:8, padding:"7px 14px",
              color:"#94a3b8", fontSize:12, cursor:"pointer" }}>← v1</button>
            <button onClick={() => navigate("/")} style={{ background:"transparent",
              border:"1px solid rgba(14,165,233,0.2)", borderRadius:8, padding:"7px 14px",
              color:"#94a3b8", fontSize:12, cursor:"pointer" }}>Landing</button>
            <button onClick={() => navigate("/dashboard")} style={{
              background:"linear-gradient(135deg,#0ea5e9,#0284c7)", border:"none",
              borderRadius:8, padding:"7px 14px", color:"#fff", fontSize:12,
              cursor:"pointer", fontWeight:600 }}>Dashboard →</button>
          </div>
        </div>

        {/* Referencia Neexo */}
        <div style={{ background:"rgba(45,143,138,0.07)", border:"1px solid rgba(45,143,138,0.3)",
          borderRadius:14, padding:"16px 22px", marginBottom:32,
          display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <img src="/neexo-isotipo.png" alt="Neexo" style={{ width:44, height:44, borderRadius:8 }}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#2d8f8a", letterSpacing:"0.08em" }}>
              MARCA MADRE — NEEXO SOLUTIONS
            </div>
            <div style={{ fontSize:13, color:"#94a3b8", marginTop:3 }}>
              Isotipo: <strong style={{ color:"#e2e8f0" }}>dos "e" enfrentadas</strong> dentro de un anillo parcialmente abierto (top-right) · Color teal monocromático · Flecha →
            </div>
          </div>
          <div style={{ fontSize:12, color:"#64748b", fontStyle:"italic" }}>
            Principio visual: simetría bilateral
          </div>
        </div>

        {/* 3 concepts */}
        <div className="concepts-grid">
          <Panel
            letter="A" name="NN Especular"
            desc="Las dos 'e' de Neexo se convierten en N + N espejada (İ). Las diagonales cruzadas crean un rombo de luz en el centro — la gema de NEXA. Herencia más literal."
            dna="ee → NN · simetría en diagonales"
            Logo={LogoV2A}
          />
          <Panel
            letter="B" name="Ojos Especulares"
            desc="Las dos 'e' curvas y orgánicas de Neexo se convierten en dos ojos almendrados, uno sobre el otro. Bilateral symmetry exacta. Conecta directamente con el avatar."
            dna="ee → ojos · simetría vertical"
            Logo={LogoV2B}
          />
          <Panel
            letter="C" name="Venn / Vesica"
            desc="Las dos 'e' enfrentadas crean un espacio compartido. Dos círculos, uno teal (Neexo), uno emerald (NEXA), intersectando. La zona de overlap = inteligencia compartida."
            dna="ee → intersección · fusión generacional"
            Logo={LogoV2C}
          />
        </div>

        <div style={{ marginTop:36, padding:"14px 20px",
          background:"rgba(14,165,233,0.04)", border:"1px solid rgba(14,165,233,0.1)",
          borderRadius:12, fontSize:12, color:"#475569", lineHeight:1.7 }}>
          💡 El gradiente <strong style={{ color:"#2d8f8a" }}>teal Neexo</strong> → <strong style={{ color:"#0ea5e9" }}>sky NEXA</strong> → <strong style={{ color:"#10b981" }}>emerald NEXA</strong> aparece en los tres conceptos como hilo conductor generacional.
          El que elijas se implementa en toda la app, el favicon y el avatar.
        </div>
      </div>
    </>
  );
}
