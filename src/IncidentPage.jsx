import { useNavigate } from "react-router-dom";

const C = {
  bg: "#050f1a",
  surface: "rgba(15,23,42,0.95)",
  red: "#ef4444",
  sky: "#0ea5e9",
  emerald: "#10b981",
  amber: "#f59e0b",
  text: "#e2e8f0",
  sub: "#94a3b8",
  muted: "#64748b",
  border: "rgba(14,165,233,0.12)",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; background: ${C.bg}; color: ${C.text}; font-family: 'Inter', system-ui, sans-serif; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.3); border-radius: 4px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .inc-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
  @media (max-width: 768px) {
    .inc-grid { grid-template-columns: 1fr; }
    .inc-main { padding: 16px !important; }
    .inc-header { padding: 12px 16px !important; }
  }
`;

function Badge({ color, children, pulse }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: `${color}18`, border: `1px solid ${color}40`,
      color, borderRadius: 20, padding: "3px 12px",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
    }}>
      {pulse && <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, animation: "pulse 1.5s infinite", display: "inline-block" }} />}
      {children}
    </span>
  );
}

function Field({ label, value, mono }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      <div style={{ fontSize: 13, color: C.text, fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit", fontWeight: mono ? 600 : 500 }}>{value}</div>
    </div>
  );
}

const TIMELINE = [
  { time: "22:14", color: C.red,     icon: "⚡", label: "Incidencia detectada", desc: "Auth service devolvió 503 — timeout tras 30s" },
  { time: "22:15", color: C.amber,   icon: "🔔", label: "Alerta disparada",     desc: "NEXA detectó degradación en integración CRM" },
  { time: "22:18", color: C.sky,     icon: "👤", label: "Asignado a equipo",    desc: "Escalado a backend — Nicolás R." },
  { time: "22:31", color: C.muted,   icon: "🔍", label: "En investigación",     desc: "Revisando logs de OAuth — token rotation sospechoso" },
];

const TRACE = `POST /oauth/token → 503 Service Unavailable
  at CRMClient.refreshToken (crm-adapter.js:142)
  at AuthService.validateSession (auth.service.js:89)
  at LeadsSync.run (leads-sync.js:34)

Response body:
  {"error": "upstream_timeout", "retry_after": 60}

Last successful auth: 17/05/2026 21:47 UTC`;

export default function IncidentPage() {
  const navigate = useNavigate();
  const p = new URLSearchParams(window.location.search);

  const id       = p.get("id")       || "87";
  const service  = p.get("service")  || "CRM";
  const error    = p.get("error")    || "AUTH_TIMEOUT_503";
  const severity = p.get("severity") || "CRÍTICO";
  const created  = p.get("created")  || "17/05/2026, 22:14";
  const affected = (p.get("affected") || "Leads,Contactos,Sincronización").split(",");

  const sevColor = severity === "CRÍTICO" ? C.red : severity === "ALTO" ? C.amber : C.sky;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <header className="inc-header" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px", height: 56, flexShrink: 0,
          background: "rgba(5,15,26,0.97)", borderBottom: `1px solid ${C.border}`,
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => navigate("/dashboard")} style={{
              background: "transparent", border: `1px solid ${C.border}`,
              borderRadius: 8, padding: "5px 12px", color: C.sub,
              fontSize: 12, cursor: "pointer",
            }}>← Dashboard</button>
            <span style={{ color: C.muted, fontSize: 13 }}>Incidencia <span style={{ color: C.sky, fontWeight: 700 }}>#{id}</span></span>
          </div>
          <Badge color={sevColor} pulse>{severity}</Badge>
        </header>

        {/* Body */}
        <main className="inc-main" style={{ flex: 1, padding: "28px 32px", maxWidth: 1100, margin: "0 auto", width: "100%", animation: "fadeUp .4s" }}>

          {/* Title */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
              <Badge color={sevColor}>{severity}</Badge>
              <Badge color={C.amber}>ABIERTA</Badge>
              <Badge color={C.muted}>PRODUCCIÓN</Badge>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>
              Auth timeout — Integración {service}
            </h1>
            <p style={{ fontSize: 14, color: C.sub }}>Detectado el {created} · Afecta sincronización de datos en tiempo real</p>
          </div>

          <div className="inc-grid">

            {/* Left col */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Error details */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 20 }}>DETALLE DEL ERROR</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                  <Field label="Código de error" value={error} mono />
                  <Field label="Servicio afectado" value={service} />
                  <Field label="Endpoint" value={`/oauth/token`} mono />
                  <Field label="HTTP status" value="503 Service Unavailable" mono />
                  <Field label="Duración" value="Activa desde hace 28 min" />
                  <Field label="Último auth exitoso" value="17/05/2026, 21:47" />
                </div>

                {/* Stack trace */}
                <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", marginBottom: 10 }}>STACK TRACE</div>
                <pre style={{
                  background: "rgba(0,0,0,0.4)", border: "1px solid rgba(148,163,184,0.08)",
                  borderRadius: 10, padding: "16px 18px",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: "#94a3b8", lineHeight: 1.7, overflowX: "auto",
                  whiteSpace: "pre-wrap", wordBreak: "break-all",
                }}>{TRACE}</pre>
              </div>

              {/* Timeline */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 20 }}>LÍNEA DE TIEMPO</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {TIMELINE.map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                      {i < TIMELINE.length - 1 && (
                        <div style={{ position: "absolute", left: 19, top: 36, bottom: 0, width: 1, background: "rgba(148,163,184,0.1)" }} />
                      )}
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                        background: `${t.color}15`, border: `1px solid ${t.color}40`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                      }}>{t.icon}</div>
                      <div style={{ paddingTop: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{t.label}</span>
                          <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>17/05 {t.time}</span>
                        </div>
                        <p style={{ fontSize: 12, color: C.sub, margin: 0 }}>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Impact */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 16 }}>IMPACTO</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {affected.map(a => (
                    <div key={a} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, animation: "pulse 1.5s infinite", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: C.text }}>{a}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, color: C.red, fontWeight: 600 }}>DEGRADADO</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 16 }}>ACCIONES</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Reconocer incidencia", color: C.sky },
                    { label: "Escalar a tier 2", color: C.amber },
                    { label: "Marcar como resuelta", color: C.emerald },
                  ].map(a => (
                    <button key={a.label} style={{
                      width: "100%", padding: "10px 0",
                      background: `${a.color}12`, border: `1px solid ${a.color}30`,
                      borderRadius: 10, color: a.color, fontSize: 13,
                      fontWeight: 600, cursor: "pointer", transition: "background .15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = `${a.color}22`}
                      onMouseLeave={e => e.currentTarget.style.background = `${a.color}12`}
                    >{a.label}</button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 16 }}>INFO</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <Field label="ID" value={`INC-${id}`} mono />
                  <Field label="Entorno" value="Producción" />
                  <Field label="Asignado a" value="Nicolás R." />
                  <Field label="Prioridad" value={severity} />
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
