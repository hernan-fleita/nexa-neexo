import { useState } from "react";
import { useNavigate } from "react-router-dom";

const S = {
  page: {
    fontFamily: "'Inter', system-ui, sans-serif",
    background: "#050f1a",
    color: "#e2e8f0",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 40px", height: 64,
    background: "rgba(5,15,26,0.85)", backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(14,165,233,0.12)",
  },
  logo: {
    display: "flex", alignItems: "center", gap: 10, textDecoration: "none",
    fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#0ea5e9",
  },
  navLinks: {
    display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0,
  },
  navLink: {
    color: "#94a3b8", textDecoration: "none", fontSize: 14, fontWeight: 500,
    transition: "color .2s",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    color: "#fff", border: "none", borderRadius: 8,
    padding: "10px 22px", fontSize: 14, fontWeight: 600,
    cursor: "pointer", transition: "opacity .2s",
  },
  btnOutline: {
    background: "transparent",
    color: "#0ea5e9", border: "1px solid #0ea5e9", borderRadius: 8,
    padding: "10px 22px", fontSize: 14, fontWeight: 600,
    cursor: "pointer", transition: "all .2s",
  },
  hero: {
    paddingTop: 140, paddingBottom: 100,
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", position: "relative",
  },
  heroEyebrow: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)",
    borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 600,
    color: "#0ea5e9", letterSpacing: "0.08em", textTransform: "uppercase",
    marginBottom: 28,
  },
  heroTitle: {
    fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800,
    lineHeight: 1.05, letterSpacing: "-2px", margin: "0 0 24px",
    maxWidth: 820,
  },
  heroGrad: {
    background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: 18, color: "#94a3b8", maxWidth: 540, lineHeight: 1.65,
    margin: "0 0 44px",
  },
  heroCTA: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" },
  btnLg: {
    background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    color: "#fff", border: "none", borderRadius: 10,
    padding: "15px 32px", fontSize: 16, fontWeight: 700,
    cursor: "pointer", transition: "transform .15s, box-shadow .15s",
    boxShadow: "0 0 24px rgba(14,165,233,0.35)",
  },
  btnLgOut: {
    background: "transparent",
    color: "#e2e8f0", border: "1px solid rgba(148,163,184,0.3)", borderRadius: 10,
    padding: "15px 32px", fontSize: 16, fontWeight: 600,
    cursor: "pointer", transition: "border-color .2s",
  },
  stats: {
    display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap",
    marginTop: 72, padding: "32px 0",
    borderTop: "1px solid rgba(148,163,184,0.1)",
    borderBottom: "1px solid rgba(148,163,184,0.1)",
  },
  statItem: { textAlign: "center" },
  statNum: { fontSize: 36, fontWeight: 800, color: "#0ea5e9", display: "block" },
  statLabel: { fontSize: 13, color: "#64748b", marginTop: 4 },

  section: { padding: "96px 40px", maxWidth: 1140, margin: "0 auto" },
  sectionLabel: {
    fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#0ea5e9", marginBottom: 16,
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800,
    letterSpacing: "-1px", margin: "0 0 16px", lineHeight: 1.15,
  },
  sectionSub: {
    fontSize: 17, color: "#64748b", maxWidth: 540, lineHeight: 1.6, margin: 0,
  },
  grid2: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24, marginTop: 56,
  },
  featureCard: {
    background: "rgba(14,165,233,0.04)",
    border: "1px solid rgba(14,165,233,0.1)",
    borderRadius: 16, padding: 28,
    transition: "border-color .2s, transform .2s",
  },
  featureIcon: {
    width: 48, height: 48, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, marginBottom: 20,
    background: "rgba(14,165,233,0.12)",
  },
  featureTitle: { fontSize: 18, fontWeight: 700, margin: "0 0 10px" },
  featureDesc: { fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 },

  steps: { display: "flex", flexDirection: "column", gap: 0, marginTop: 56 },
  step: {
    display: "flex", gap: 32, alignItems: "flex-start",
    position: "relative", paddingBottom: 48,
  },
  stepNum: {
    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 800, color: "#050f1a",
    background: "linear-gradient(135deg, #0ea5e9, #10b981)",
    position: "relative", zIndex: 1,
  },
  stepLine: {
    position: "absolute", left: 21, top: 44, bottom: 0, width: 2,
    background: "linear-gradient(to bottom, rgba(14,165,233,0.4), transparent)",
  },
  stepTitle: { fontSize: 18, fontWeight: 700, margin: "8px 0 8px" },
  stepDesc: { fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 },

  pricing: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24, marginTop: 56,
  },
  priceCard: {
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(148,163,184,0.12)",
    borderRadius: 20, padding: "36px 32px",
  },
  priceCardFeatured: {
    background: "linear-gradient(145deg, rgba(14,165,233,0.12), rgba(16,185,129,0.08))",
    border: "1px solid rgba(14,165,233,0.35)",
    borderRadius: 20, padding: "36px 32px",
    position: "relative",
  },
  priceBadge: {
    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #0ea5e9, #10b981)",
    color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
    textTransform: "uppercase", padding: "4px 14px", borderRadius: 20,
    whiteSpace: "nowrap",
  },
  planName: { fontSize: 14, fontWeight: 600, color: "#64748b", marginBottom: 8 },
  planPrice: { fontSize: 44, fontWeight: 800, letterSpacing: "-2px", marginBottom: 4 },
  planCurrency: { fontSize: 20, verticalAlign: "super", color: "#94a3b8" },
  planPeriod: { fontSize: 13, color: "#64748b" },
  planDesc: { fontSize: 13, color: "#64748b", margin: "16px 0 24px", lineHeight: 1.5 },
  planFeatures: { listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 },
  planFeature: { fontSize: 13, color: "#94a3b8", display: "flex", alignItems: "center", gap: 8 },
  checkIcon: { color: "#10b981", fontWeight: 700, fontSize: 14 },

  cta: {
    padding: "96px 40px", textAlign: "center",
    background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(16,185,129,0.05) 100%)",
    borderTop: "1px solid rgba(14,165,233,0.1)",
  },
  footer: {
    padding: "40px", display: "flex", justifyContent: "space-between",
    alignItems: "center", flexWrap: "wrap", gap: 16,
    borderTop: "1px solid rgba(148,163,184,0.08)",
  },
  footerLinks: { display: "flex", gap: 24 },
  footerLink: { color: "#64748b", textDecoration: "none", fontSize: 13 },
};

const FEATURES = [
  {
    icon: "💰", title: "Revenue Intelligence",
    desc: "Seguimiento de facturas, alertas de vencimiento, proyecciones de ingresos y análisis de cartera en tiempo real.",
  },
  {
    icon: "⚙️", title: "Ops Command Center",
    desc: "Gestión de tareas, monitoreo de uptime, control de blockers críticos y deployment tracking automático.",
  },
  {
    icon: "📈", title: "Marketing Analytics",
    desc: "Tráfico web, leads, conversiones por canal y performance de campañas activas en un solo panel.",
  },
  {
    icon: "👥", title: "Team Pulse",
    desc: "Velocidad del equipo, estado de stand-ups, tareas del día y disponibilidad de miembros en tiempo real.",
  },
  {
    icon: "🤖", title: "NEXA AI",
    desc: "IA integrada con contexto completo de tu negocio. Consultas en lenguaje natural, análisis y recomendaciones.",
  },
  {
    icon: "🔔", title: "Alertas Inteligentes",
    desc: "Notificaciones proactivas sobre facturas vencidas, blockers críticos y métricas fuera de rango.",
  },
];

const STEPS = [
  {
    title: "Conectá tus fuentes",
    desc: "Integrá con tu facturación, repositorios, CRM y herramientas de marketing en minutos. Sin código.",
  },
  {
    title: "NEXA aprende tu negocio",
    desc: "La IA analiza tus datos históricos y patrones para generar insights contextualizados a tu operación.",
  },
  {
    title: "Tomá decisiones más rápido",
    desc: "Un dashboard unificado con briefing diario automático y chat con tu IA de negocios disponible 24/7.",
  },
];

const PLANS = [
  {
    name: "Starter", price: "0", period: "/mes",
    desc: "Para equipos chicos que arrancan con IA.",
    features: ["1 workspace", "Dashboard básico", "NEXA AI (50 consultas/mes)", "Revenue + Ops"],
    featured: false,
  },
  {
    name: "Pro", price: "29.900", period: "/mes ARS",
    desc: "El stack completo para equipos en crecimiento.",
    features: ["5 workspaces", "Dashboard completo", "NEXA AI ilimitado", "Revenue + Ops + Marketing + Team", "Alertas + Reportes PDF", "Soporte prioritario"],
    featured: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    desc: "Para empresas con necesidades específicas y escala.",
    features: ["Workspaces ilimitados", "SSO + RBAC", "Integraciones custom", "SLA garantizado", "Onboarding dedicado", "API access"],
    featured: false,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <div style={S.page}>
      {/* NAV */}
      <nav style={S.nav}>
        <a href="/" style={S.logo}>
          <NexaLogoSVG size={30} />
          NEXA
        </a>
        <ul style={S.navLinks}>
          {["Funciones", "Cómo funciona", "Precios"].map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase().replace(" ", "-")}`}
                style={S.navLink}
                onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                onMouseLeave={e => e.target.style.color = "#94a3b8"}
              >{l}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={S.btnOutline} onClick={() => navigate("/dashboard")}>Ver Demo</button>
          <button style={S.btnPrimary} onClick={() => navigate("/nexa")}>Hablar con NEXA</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{ maxWidth: 860, padding: "0 24px" }}>
          <div style={S.heroEyebrow}>
            <span>✦</span> Plataforma de IA para negocios
          </div>
          <h1 style={S.heroTitle}>
            Tu negocio,<br />
            <span style={S.heroGrad}>inteligente y unificado</span>
          </h1>
          <p style={S.heroSub}>
            NEXA centraliza revenue, operaciones, marketing y equipo en un solo lugar.
            Con IA integrada que entiende tu contexto y te ayuda a decidir más rápido.
          </p>
          <div style={S.heroCTA}>
            <button
              style={{ ...S.btnLg, transform: hoverBtn ? "translateY(-2px)" : "none", boxShadow: hoverBtn ? "0 0 40px rgba(14,165,233,0.5)" : "0 0 24px rgba(14,165,233,0.35)" }}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              onClick={() => navigate("/dashboard")}
            >
              Ver el dashboard →
            </button>
            <button style={S.btnLgOut} onClick={() => navigate("/nexa")}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(148,163,184,0.6)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(148,163,184,0.3)"}
            >
              Probar NEXA AI
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ ...S.stats, maxWidth: 860, width: "100%", padding: "32px 24px" }}>
          {[
            { n: "97%", l: "Satisfacción de clientes" },
            { n: "<2 min", l: "Setup inicial" },
            { n: "4 módulos", l: "Integrados nativamente" },
            { n: "24/7", l: "IA siempre disponible" },
          ].map(s => (
            <div key={s.l} style={S.statItem}>
              <span style={S.statNum}>{s.n}</span>
              <span style={{ ...S.statLabel }}>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="funciones" style={S.section}>
        <p style={S.sectionLabel}>Funcionalidades</p>
        <h2 style={S.sectionTitle}>Todo lo que necesitás<br />para gestionar tu negocio</h2>
        <p style={S.sectionSub}>Un panel unificado con datos en tiempo real y una IA que entiende el contexto de tu empresa.</p>
        <div style={S.grid2}>
          {FEATURES.map(f => (
            <div key={f.title} style={S.featureCard}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,0.1)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={S.featureIcon}>{f.icon}</div>
              <h3 style={S.featureTitle}>{f.title}</h3>
              <p style={S.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cómo-funciona" style={{ ...S.section, background: "rgba(14,165,233,0.02)", borderRadius: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={S.sectionLabel}>Cómo funciona</p>
            <h2 style={S.sectionTitle}>De los datos al insight<br />en minutos</h2>
            <p style={{ ...S.sectionSub, marginBottom: 0 }}>
              NEXA se conecta a tus herramientas existentes y centraliza toda la información.
              Sin migraciones complejas ni semanas de onboarding.
            </p>
          </div>
          <div style={S.steps}>
            {STEPS.map((s, i) => (
              <div key={i} style={S.step}>
                <div style={{ position: "relative" }}>
                  <div style={S.stepNum}>{i + 1}</div>
                  {i < STEPS.length - 1 && <div style={S.stepLine} />}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <h3 style={S.stepTitle}>{s.title}</h3>
                  <p style={S.stepDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" style={S.section}>
        <p style={S.sectionLabel}>Precios</p>
        <h2 style={S.sectionTitle}>Simple, transparente</h2>
        <p style={S.sectionSub}>Empezá gratis y escalá cuando lo necesités. Sin sorpresas.</p>
        <div style={S.pricing}>
          {PLANS.map(p => (
            <div key={p.name} style={p.featured ? S.priceCardFeatured : S.priceCard}>
              {p.featured && <div style={S.priceBadge}>Más popular</div>}
              <div style={S.planName}>{p.name}</div>
              <div style={S.planPrice}>
                {p.price === "Custom" ? (
                  <span>Custom</span>
                ) : (
                  <><span style={S.planCurrency}>$</span>{p.price}</>
                )}
              </div>
              <div style={S.planPeriod}>{p.period}</div>
              <p style={S.planDesc}>{p.desc}</p>
              <ul style={S.planFeatures}>
                {p.features.map(f => (
                  <li key={f} style={S.planFeature}>
                    <span style={S.checkIcon}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                style={p.featured ? { ...S.btnPrimary, width: "100%", padding: "12px 0", fontSize: 15 } : { ...S.btnOutline, width: "100%", padding: "12px 0", fontSize: 15 }}
                onClick={() => navigate(p.name === "Starter" ? "/dashboard" : "/nexa")}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                {p.name === "Enterprise" ? "Hablemos" : "Empezar"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={S.cta}>
        <h2 style={{ ...S.sectionTitle, marginBottom: 16 }}>¿Listo para tomar el control<br />de tu negocio?</h2>
        <p style={{ ...S.sectionSub, margin: "0 auto 40px" }}>
          Empezá hoy con el plan gratuito. Sin tarjeta de crédito.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ ...S.btnLg }} onClick={() => navigate("/dashboard")}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >Ver el dashboard →</button>
          <button style={S.btnLgOut} onClick={() => navigate("/nexa")}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(148,163,184,0.6)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(148,163,184,0.3)"}
          >Hablar con NEXA AI</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <a href="/" style={{ ...S.logo, fontSize: 16 }}>
          <NexaLogoSVG size={22} /> NEXA
        </a>
        <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>
          © 2025 Neexo Solutions. Todos los derechos reservados.
        </p>
        <div style={S.footerLinks}>
          {["Privacidad", "Términos", "Contacto"].map(l => (
            <a key={l} href="#" style={S.footerLink}
              onMouseEnter={e => e.target.style.color = "#94a3b8"}
              onMouseLeave={e => e.target.style.color = "#64748b"}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

function NexaLogoSVG({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
      <rect width="32" height="32" rx="7" fill="url(#ng)" />
      <defs>
        <linearGradient id="ng" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <text x="16" y="22" textAnchor="middle" fontFamily="monospace" fontSize="16" fontWeight="bold" fill="#fff">N</text>
    </svg>
  );
}
