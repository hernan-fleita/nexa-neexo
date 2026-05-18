import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NexaAvatar from "./NexaAvatar.jsx";
import { NexaWordmark, NexaIsotipo } from "./NexaBrand.jsx";

const LANDING_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; }

  .lp-nav-links { display: flex; gap: 32px; list-style: none; }
  .lp-nav-btns  { display: flex; gap: 12px; }
  .lp-hamburger { display: none; background: transparent; border: 1px solid rgba(14,165,233,0.25); border-radius: 8px; padding: 6px 10px; color: #94a3b8; cursor: pointer; font-size: 20px; line-height: 1; }
  .lp-mobile-menu { display: none; }
  .lp-mobile-menu.open {
    display: flex; flex-direction: column;
    position: fixed; top: 64px; left: 0; right: 0; z-index: 99;
    background: rgba(5,15,26,0.98); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(14,165,233,0.15);
    padding: 8px 20px 24px;
  }
  .lp-mobile-menu a { color: #94a3b8; text-decoration: none; font-size: 16px; font-weight: 500; padding: 14px 0; display: block; border-bottom: 1px solid rgba(148,163,184,0.08); }
  .lp-mobile-menu-btns { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }

  .lp-how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }

  @media (max-width: 768px) {
    .lp-nav-inner  { padding: 0 20px !important; }
    .lp-nav-links  { display: none; }
    .lp-nav-btns   { display: none; }
    .lp-hamburger  { display: flex; align-items: center; justify-content: center; }
    .lp-section    { padding: 60px 20px !important; }
    .lp-hero       { padding-top: 100px !important; padding-bottom: 60px !important; }
    .lp-how-grid   { grid-template-columns: 1fr !important; gap: 40px !important; }
    .lp-cta        { padding: 60px 20px !important; }
    .lp-footer     { padding: 24px 20px !important; flex-direction: column !important; align-items: flex-start !important; }
    .lp-stats      { gap: 20px !important; }
    .lp-footer-links { gap: 16px !important; }
  }
`;

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // "privacidad" | "terminos" | "contacto" | null

  return (
    <div style={S.page}>
      <style>{LANDING_CSS}</style>

      {/* NAV */}
      <nav style={S.nav} className="lp-nav-inner">
        <a href="/" style={{ textDecoration: "none" }}>
          <NexaWordmark size={30} animate={false} />
        </a>
        <ul style={S.navLinks} className="lp-nav-links">
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
        <div style={{ display: "flex", gap: 12 }} className="lp-nav-btns">
          <button style={S.btnOutline} onClick={() => navigate("/dashboard")}>Ver Demo</button>
          <button style={S.btnPrimary} onClick={() => navigate("/nexa")}>Hablar con NEXA</button>
        </div>
        <button className="lp-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`lp-mobile-menu${menuOpen ? " open" : ""}`}>
        {["Funciones", "Cómo funciona", "Precios"].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <div className="lp-mobile-menu-btns">
          <button style={{ ...S.btnOutline, padding: "12px 0" }} onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Ver Demo</button>
          <button style={{ ...S.btnPrimary, padding: "12px 0" }} onClick={() => { navigate("/nexa"); setMenuOpen(false); }}>Hablar con NEXA</button>
        </div>
      </div>

      {/* HERO */}
      <section style={S.hero} className="lp-hero">
        <div style={{ maxWidth: 960, padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Avatar */}
          <NexaAvatar size={148} style={{ marginBottom: 8 }} />

          {/* Acronym tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { letter: "N", word: "Next-gen" },
              { letter: "E", word: "Enterprise" },
              { letter: "X", word: "eXecutive" },
              { letter: "A", word: "Assistant" },
            ].map(({ letter, word }) => (
              <span key={letter} style={{ display: "inline-flex", alignItems: "center", gap: 5,
                background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.18)",
                borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "#94a3b8" }}>
                <strong style={{ color: "#0ea5e9", fontWeight: 800 }}>{letter}</strong>{word.slice(1)}
              </span>
            ))}
          </div>

          <div style={S.heroEyebrow}>
            <span>✦</span> Plataforma de IA para negocios
          </div>
          <h1 style={S.heroTitle}>
            Tu negocio,<br />
            <span style={S.heroGrad}>inteligente y unificado</span>
          </h1>
          <p style={S.heroSub}>
            NEXA es tu asistente ejecutiva de próxima generación — centraliza revenue,
            operaciones, marketing y equipo con IA que entiende el contexto de tu empresa.
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
        <div style={{ ...S.stats, maxWidth: 860, width: "100%", padding: "32px 24px" }} className="lp-stats">
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
      <section id="funciones" style={S.section} className="lp-section">
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
      <section id="cómo-funciona" style={{ ...S.section, background: "rgba(14,165,233,0.02)", borderRadius: 24 }} className="lp-section">
        <div className="lp-how-grid">
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
      <section id="precios" style={S.section} className="lp-section">
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
      <section style={S.cta} className="lp-cta">
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

      {/* LEGAL MODALS */}
      {legalModal && <NexaLegalModal type={legalModal} onClose={() => setLegalModal(null)} />}

      {/* FOOTER */}
      <footer style={S.footer} className="lp-footer">
        <a href="/" style={{ textDecoration: "none" }}>
          <NexaWordmark size={22} animate={false} />
        </a>
        <p style={{ margin: 0, fontSize: 12, color: "#475569" }}>
          © 2026 Neexo Solutions. Todos los derechos reservados.
        </p>
        <div style={S.footerLinks} className="lp-footer-links">
          {[["Privacidad", "privacidad"], ["Términos", "terminos"], ["Contacto", "contacto"]].map(([label, key]) => (
            <button key={key}
              onClick={() => setLegalModal(key)}
              style={{ ...S.footerLink, background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}
              onMouseEnter={e => e.target.style.color = "#94a3b8"}
              onMouseLeave={e => e.target.style.color = "#64748b"}
            >{label}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   NEXA Legal Modal — NEXA habla en primera persona
────────────────────────────────────────────────────────────── */
const LEGAL_CONTENT = {
  privacidad: {
    title: "Política de privacidad",
    messages: [
      {
        text: "Hola. Soy NEXA, y quiero ser completamente transparente sobre cómo manejamos tu información. Acá te lo explico sin vueltas ni letra chica.",
      },
      {
        label: "Qué datos recopilamos",
        text: "Cuando usás NEXA recopilamos lo que vos mismo nos das: nombre, email, nombre de tu empresa y los datos que ingresás a tu workspace. También registramos métricas de uso agregadas para mejorar la experiencia — nunca contenido de tus conversaciones.",
      },
      {
        label: "Cómo los usamos",
        text: "Tu información se usa exclusivamente para darte el servicio. No vendemos ni compartimos tus datos con terceros. Nunca. Los datos de tu negocio son tuyos y solo tuyos.",
      },
      {
        label: "Seguridad",
        text: "Toda la información viaja encriptada (TLS 1.3) y se almacena con cifrado en reposo (AES-256). El acceso está restringido al equipo técnico de Neexo Solutions bajo protocolos estrictos de autenticación.",
      },
      {
        label: "Tus derechos",
        text: "Podés solicitar en cualquier momento: acceso a tus datos, corrección, exportación completa o eliminación definitiva. Solo escribinos a privacy@neexo.com y lo resolvemos en 72 horas.",
      },
      {
        label: "Cookies",
        text: "Usamos únicamente cookies esenciales para mantener tu sesión activa. Sin rastreadores, sin publicidad, sin cookies de terceros.",
      },
      {
        text: "Esta política puede actualizarse. Si hay cambios relevantes, te aviso por email con al menos 30 días de anticipación. Cualquier duda, escribime directamente.",
      },
    ],
  },
  terminos: {
    title: "Términos de uso",
    messages: [
      {
        text: "Antes de arrancar, quiero que quede claro cómo funciona esto. Son las reglas del juego — las mías y las tuyas.",
      },
      {
        label: "Qué es NEXA",
        text: "Soy una plataforma de inteligencia artificial para negocios, desarrollada por Neexo Solutions. Mi rol es ayudarte a centralizar información, analizar métricas y tomar mejores decisiones. Soy una herramienta de apoyo — las decisiones finales siempre son tuyas.",
      },
      {
        label: "Uso aceptable",
        text: "Podés usarme para gestionar tu negocio, analizar datos y consultar estrategia. No está permitido: actividades ilegales, compartir credenciales de acceso, intentar acceder a datos de otros workspaces, ni usar la plataforma para generar contenido dañino.",
      },
      {
        label: "Tus datos",
        text: "Todo lo que ingresás a tu workspace te pertenece. Podés exportarlo o eliminarlo en cualquier momento. Neexo Solutions no reclama propiedad sobre el contenido de tu negocio.",
      },
      {
        label: "Propiedad intelectual",
        text: "La marca NEXA, el diseño, el código y los modelos de IA son propiedad de Neexo Solutions. No podés reproducir ni redistribuir la plataforma sin autorización.",
      },
      {
        label: "Disponibilidad",
        text: "Nos comprometemos a mantener el servicio disponible 24/7 con un uptime objetivo del 99.5%. Si hay mantenimiento planificado, te aviso con al menos 24 horas de anticipación.",
      },
      {
        label: "Cancelación",
        text: "Podés cancelar tu cuenta en cualquier momento desde la configuración de tu workspace, sin cargos adicionales. Tus datos se eliminan de forma permanente a los 30 días de la cancelación.",
      },
      {
        text: "Cualquier consulta sobre estos términos, escribime a hola@neexo.solutions. Estoy para ayudarte.",
      },
    ],
  },
  contacto: null,
};

const TITLES = { privacidad: "Privacidad", terminos: "Términos", contacto: "Contacto" };

function NexaMessage({ msg }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
      <NexaIsotipo size={32} animate={false} style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{
        background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)",
        borderRadius: "4px 14px 14px 14px", padding: "12px 16px", flex: 1,
      }}>
        {msg.label && (
          <div style={{ fontSize: 11, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.07em", marginBottom: 6, textTransform: "uppercase" }}>
            {msg.label}
          </div>
        )}
        <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>{msg.text}</p>
      </div>
    </div>
  );
}

function ContactForm({ onClose }) {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.nombre.trim()) e.nombre = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.mensaje.trim()) e.mensaje = true;
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  }

  const inputStyle = (field) => ({
    width: "100%", background: "rgba(15,23,42,0.8)",
    border: `1px solid ${errors[field] ? "rgba(239,68,68,0.5)" : "rgba(14,165,233,0.2)"}`,
    borderRadius: 8, padding: "10px 14px", fontSize: 13,
    color: "#e2e8f0", outline: "none", fontFamily: "inherit",
    boxSizing: "border-box",
  });

  if (sent) {
    return (
      <div style={{ padding: "8px 0" }}>
        <NexaMessage msg={{ text: `Recibí tu mensaje, ${form.nombre.split(" ")[0]}. Te respondo a ${form.email} dentro de las próximas 24 horas. ¡Gracias por escribirme!` }} />
        <button onClick={onClose} style={{
          marginTop: 8, width: "100%",
          background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
          border: "none", borderRadius: 8, padding: "11px 0",
          color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}>Cerrar</button>
      </div>
    );
  }

  return (
    <div>
      <NexaMessage msg={{ text: "Hola. Si tenés alguna consulta, problema o simplemente querés hablar sobre cómo NEXA puede ayudar a tu empresa — escribime acá y te respondo en menos de 24 horas." }} />
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 5 }}>Nombre *</label>
            <input value={form.nombre} onChange={e => { setForm(f => ({ ...f, nombre: e.target.value })); setErrors(err => ({ ...err, nombre: false })); }}
              style={inputStyle("nombre")} placeholder="Tu nombre" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 5 }}>Email *</label>
            <input type="email" value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(err => ({ ...err, email: false })); }}
              style={inputStyle("email")} placeholder="tu@empresa.com" />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 5 }}>Asunto</label>
          <input value={form.asunto} onChange={e => setForm(f => ({ ...f, asunto: e.target.value }))}
            style={inputStyle("asunto")} placeholder="¿En qué puedo ayudarte?" />
        </div>
        <div>
          <label style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 5 }}>Mensaje *</label>
          <textarea value={form.mensaje} onChange={e => { setForm(f => ({ ...f, mensaje: e.target.value })); setErrors(err => ({ ...err, mensaje: false })); }}
            style={{ ...inputStyle("mensaje"), resize: "vertical", minHeight: 100, lineHeight: 1.6 }}
            placeholder="Contame de tu proyecto o empresa…" rows={4} />
        </div>
        {Object.values(errors).some(Boolean) && (
          <p style={{ fontSize: 12, color: "#ef4444", margin: 0 }}>Por favor completá los campos obligatorios.</p>
        )}
        <button type="submit" style={{
          background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
          border: "none", borderRadius: 8, padding: "12px 0",
          color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
          marginTop: 4,
        }}>Enviar mensaje →</button>
        <p style={{ fontSize: 11, color: "#475569", textAlign: "center", margin: 0 }}>
          También podés escribirnos directo a <span style={{ color: "#0ea5e9" }}>hola@neexo.solutions</span>
        </p>
      </form>
    </div>
  );
}

function NexaLegalModal({ type, onClose }) {
  const content = LEGAL_CONTENT[type];

  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
      }} />
      {/* Panel */}
      <div style={{
        position: "fixed", top: "50%", left: "50%", zIndex: 301,
        transform: "translate(-50%, -50%)",
        width: "min(640px, calc(100vw - 32px))",
        maxHeight: "min(700px, calc(100vh - 48px))",
        background: "#080f1e",
        border: "1px solid rgba(14,165,233,0.2)",
        borderRadius: 20,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(14,165,233,0.08)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 22px 16px",
          borderBottom: "1px solid rgba(14,165,233,0.1)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NexaIsotipo size={30} animate={true} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0ea5e9", letterSpacing: "-0.3px" }}>NEXA</div>
              <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.06em" }}>{TITLES[type].toUpperCase()}</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.12)",
            borderRadius: 8, padding: "6px 12px", color: "#64748b",
            cursor: "pointer", fontSize: 14, lineHeight: 1,
          }}>✕</button>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", padding: "20px 22px 24px", flex: 1 }}>
          {type === "contacto" ? (
            <ContactForm onClose={onClose} />
          ) : (
            content.messages.map((msg, i) => <NexaMessage key={i} msg={msg} />)
          )}
        </div>
      </div>
    </>
  );
}

