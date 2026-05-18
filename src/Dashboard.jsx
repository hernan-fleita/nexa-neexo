import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_DATA } from "./dashboardData.js";

const C = {
  sky: "#0ea5e9",
  emerald: "#10b981",
  bg: "#050f1a",
  surface: "rgba(15,23,42,0.9)",
  border: "rgba(14,165,233,0.12)",
  borderHover: "rgba(14,165,233,0.28)",
  text: "#e2e8f0",
  muted: "#64748b",
  sub: "#94a3b8",
  alert: "#f59e0b",
  red: "#ef4444",
};

const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; }
  body { font-family: 'Inter', system-ui, sans-serif; background: ${C.bg}; color: ${C.text}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.3); border-radius: 4px; }
  @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
  @keyframes briefIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  @keyframes slideRight { from{transform:translateX(100%);opacity:0} to{transform:none;opacity:1} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
`;

function fmt(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function Badge({ color = C.sky, children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: `${color}18`, border: `1px solid ${color}40`,
      color, borderRadius: 20, padding: "2px 10px",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
    }}>{children}</span>
  );
}

function MetricCard({ title, icon, value, sub, change, alert, onAlert, children }) {
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
      padding: 24, display: "flex", flexDirection: "column", gap: 14,
      transition: "border-color .2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.sub, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{icon}</span> {title}
        </div>
        {change !== undefined && (
          <Badge color={change >= 0 ? C.emerald : C.red}>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </Badge>
        )}
      </div>
      <div>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{sub}</div>}
      </div>
      {children}
      {alert && (
        <div
          onClick={onAlert}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 8, padding: "8px 12px",
            fontSize: 12, fontWeight: 600, color: C.alert,
            cursor: onAlert ? "pointer" : "default",
            transition: "background .15s",
          }}
          onMouseEnter={e => onAlert && (e.currentTarget.style.background = "rgba(245,158,11,0.18)")}
          onMouseLeave={e => onAlert && (e.currentTarget.style.background = "rgba(245,158,11,0.1)")}
        >
          <span>⚠</span> {alert}
          {onAlert && <span style={{ marginLeft: "auto", color: C.sky }}>VER →</span>}
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: color || C.sky }}>{value}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function ActivityItem({ item }) {
  const colors = { ops: C.sky, revenue: C.emerald, marketing: "#a855f7", team: "#f59e0b", alert: C.red };
  return (
    <div style={{
      display: "flex", gap: 12, padding: "10px 0",
      borderBottom: "1px solid rgba(148,163,184,0.06)",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: `${colors[item.type] || C.sky}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, color: colors[item.type] || C.sky,
      }}>{item.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.4 }}>{item.text}</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{item.time}</div>
      </div>
    </div>
  );
}

// Detail panel shown when clicking an alert
function DetailPanel({ type, data, onClose }) {
  const items = type === "invoice"
    ? (data.revenue?.overdueList || DEMO_DATA.revenue.overdueList || [])
    : (data.ops?.blockerList || DEMO_DATA.ops.blockerList || []);

  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        animation: "fadeIn .2s",
      }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
        width: Math.min(480, window.innerWidth),
        background: "#0b1628", borderLeft: "1px solid rgba(14,165,233,0.2)",
        padding: "28px 24px", overflowY: "auto",
        animation: "slideRight .25s",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>
            {type === "invoice" ? "⚠ Facturas vencidas" : "🚨 Blockers críticos"}
          </h2>
          <button onClick={onClose} style={{
            background: "rgba(148,163,184,0.1)", border: "none", borderRadius: 8,
            padding: "6px 12px", color: C.sub, cursor: "pointer", fontSize: 14,
          }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {type === "invoice" ? items.map(inv => (
            <div key={inv.id} style={{
              background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 12, padding: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <Badge color={C.alert}>{inv.id}</Badge>
                <Badge color={C.red}>{inv.daysOverdue}d vencida</Badge>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
                ${inv.amount.toLocaleString()} {inv.currency}
              </div>
              <div style={{ fontSize: 13, color: C.sub, marginBottom: 8 }}>{inv.description}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["Cliente", inv.client],
                  ["Contacto", inv.contact],
                  ["Emisión", inv.issued],
                  ["Vencimiento", inv.due],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, color: C.muted }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )) : items.map(bl => (
            <div key={bl.id} style={{
              background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 12, padding: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <Badge color={C.muted}>{bl.id}</Badge>
                <Badge color={C.red}>{bl.severity}</Badge>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{bl.title}</div>
              <div style={{ fontSize: 12, color: C.muted }}>Creado: {bl.created}</div>
              {bl.url && (
                <a href={bl.url} target="_blank" rel="noreferrer" style={{
                  display: "inline-block", marginTop: 12,
                  fontSize: 12, color: C.sky, textDecoration: "none",
                }}>Ver en GitHub →</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Mini AI chat (Haiku-powered)
function MiniChat({ metrics }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const context = `Sos NEXA, una IA de negocios para ${metrics.tenant}. Plan: ${metrics.plan}.
Revenue mensual: $${metrics.revenue.monthly.toLocaleString()} ARS (${metrics.revenue.change > 0 ? "+" : ""}${metrics.revenue.change}% vs mes anterior).
Facturas: ${metrics.revenue.invoices.paid} pagas, ${metrics.revenue.invoices.pending} pendientes, ${metrics.revenue.invoices.overdue} vencidas.
Ops: ${metrics.ops.tasks.open} tareas abiertas, ${metrics.ops.tasks.inProgress} en progreso, uptime ${metrics.ops.uptime}%, blockers: ${metrics.ops.blockers}.
Marketing: ${metrics.marketing.visits} visitas, ${metrics.marketing.leads} leads, ${metrics.marketing.conversion}% conversión. Canal top: ${metrics.marketing.topChannel}.
Equipo: ${metrics.team.members} miembros, velocidad ${metrics.team.velocity}%.
Respondé de forma concisa y útil en español.`;

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const history = [...msgs, { role: "user", content: userMsg }];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          system: [{ type: "text", text: context, cache_control: { type: "ephemeral" } }],
          messages: history,
        }),
      });
      const d = await res.json();
      const reply = d.content?.find(b => b.type === "text")?.text || "Sin respuesta.";
      setMsgs(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs(m => [...m, { role: "assistant", content: "Error al conectar con NEXA AI." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 4 }}>
        {msgs.length === 0 && (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🤖</div>
            <div style={{ fontSize: 13, color: C.muted }}>Preguntale algo a NEXA AI sobre tu negocio</div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
            background: m.role === "user"
              ? "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(14,165,233,0.15))"
              : "rgba(15,23,42,0.8)",
            border: `1px solid ${m.role === "user" ? "rgba(14,165,233,0.3)" : "rgba(148,163,184,0.1)"}`,
            borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            padding: "10px 14px",
            fontSize: 13, lineHeight: 1.55, color: C.text,
          }}>{m.content}</div>
        ))}
        {loading && (
          <div style={{
            alignSelf: "flex-start", background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.1)", borderRadius: "14px 14px 14px 4px",
            padding: "10px 14px", fontSize: 13, color: C.muted,
            animation: "pulse 1.2s infinite",
          }}>NEXA está analizando…</div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Preguntá sobre revenue, ops, marketing…"
          disabled={loading}
          style={{
            flex: 1, background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(14,165,233,0.15)", borderRadius: 10,
            padding: "10px 14px", fontSize: 13, color: C.text, outline: "none",
            transition: "border-color .2s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.4)"}
          onBlur={e => e.target.style.borderColor = "rgba(14,165,233,0.15)"}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
          border: "none", borderRadius: 10, padding: "0 16px",
          color: "#fff", fontSize: 14, cursor: "pointer",
          opacity: loading || !input.trim() ? 0.5 : 1,
        }}>→</button>
      </div>
    </div>
  );
}

function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w < 1024 };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useBreakpoint();
  const [metrics, setMetrics] = useState(DEMO_DATA);
  const [brief, setBrief] = useState("");
  const [briefLoading, setBriefLoading] = useState(true);
  const [detail, setDetail] = useState(null); // "invoice" | "blocker" | null
  const [activeTab, setActiveTab] = useState("activity"); // "activity" | "chat"

  // Load brief from Haiku
  useEffect(() => {
    const context = `Sos NEXA, IA de negocios para ${metrics.tenant}.
Revenue: $${metrics.revenue.monthly.toLocaleString()} ARS (${metrics.revenue.change > 0 ? "+" : ""}${metrics.revenue.change}%).
Facturas: ${metrics.revenue.invoices.paid} pagas, ${metrics.revenue.invoices.overdue} vencidas.
Ops: ${metrics.ops.tasks.open} tareas abiertas, uptime ${metrics.ops.uptime}%, ${metrics.ops.blockers} blocker(s).
Marketing: ${metrics.marketing.leads} leads, ${metrics.marketing.conversion}% conversión.
Equipo: velocidad ${metrics.team.velocity}%, standup ${metrics.team.standupDone ? "completado" : "pendiente"}.`;

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        system: [{ type: "text", text: context, cache_control: { type: "ephemeral" } }],
        messages: [{ role: "user", content: "Dame el briefing ejecutivo del día en 2-3 oraciones clave. Sin intro, directo al grano." }],
      }),
    })
      .then(r => r.json())
      .then(d => { setBrief(d.content?.find(b => b.type === "text")?.text || ""); })
      .catch(() => setBrief(""))
      .finally(() => setBriefLoading(false));
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLE}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: isMobile ? 8 : 0,
          padding: isMobile ? "10px 16px" : "0 32px",
          minHeight: 60,
          background: "rgba(5,15,26,0.95)", backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NexaLogo size={28} />
            <div>
              <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, letterSpacing: "-0.5px", color: C.sky }}>NEXA</div>
              {!isMobile && <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.05em" }}>COMMAND CENTER</div>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 20 }}>
            {!isMobile && (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{metrics.tenant}</div>
                <Badge color={C.emerald}>{metrics.plan}</Badge>
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => navigate("/")}
                style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", color: C.sub, fontSize: 12, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >← Inicio</button>
              <button
                onClick={() => navigate("/nexa")}
                style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
              >NEXA AI →</button>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: isMobile ? "16px" : isTablet ? "20px 24px" : "28px 32px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          {/* Brief */}
          <div style={{
            background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(16,185,129,0.05))",
            border: `1px solid rgba(14,165,233,0.18)`,
            borderRadius: 14, padding: isMobile ? "14px 16px" : "16px 20px", marginBottom: isMobile ? 16 : 24,
            display: "flex", alignItems: "flex-start", gap: isMobile ? 10 : 16,
          }}>
            <div style={{ fontSize: 22 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.sky, letterSpacing: "0.08em", marginBottom: 6 }}>
                NEXA AI · BRIEFING DEL DÍA
              </div>
              {briefLoading ? (
                <div style={{ fontSize: 13, color: C.muted, animation: "pulse 1.2s infinite" }}>Analizando tu negocio…</div>
              ) : brief ? (
                <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6, animation: "briefIn .4s" }}>{brief}</div>
              ) : (
                <div style={{ fontSize: 13, color: C.muted }}>Revenue mensual: {fmt(metrics.revenue.monthly)} ARS · {metrics.revenue.invoices.overdue} factura(s) vencida(s)</div>
              )}
            </div>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))", gap: isMobile ? 12 : 20, marginBottom: isMobile ? 16 : 24 }}>
            <MetricCard
              title="Revenue Mensual" icon="💰"
              value={fmt(metrics.revenue.monthly)}
              sub={`${metrics.revenue.currency} · ${metrics.revenue.invoices.paid} pagas, ${metrics.revenue.invoices.pending} pendientes`}
              change={metrics.revenue.change}
              alert={metrics.revenue.alert}
              onAlert={() => setDetail("invoice")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <MiniStat label="Pagas" value={metrics.revenue.invoices.paid} color={C.emerald} />
                <MiniStat label="Pendientes" value={metrics.revenue.invoices.pending} color={C.alert} />
                <MiniStat label="Vencidas" value={metrics.revenue.invoices.overdue} color={C.red} />
              </div>
            </MetricCard>

            <MetricCard
              title="Operaciones" icon="⚙️"
              value={`${metrics.ops.uptime}%`}
              sub="Uptime · Producción"
              alert={metrics.ops.alert}
              onAlert={() => setDetail("blocker")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <MiniStat label="Abiertas" value={metrics.ops.tasks.open} color={C.sky} />
                <MiniStat label="En curso" value={metrics.ops.tasks.inProgress} color={C.alert} />
                <MiniStat label="Listas" value={metrics.ops.tasks.done} color={C.emerald} />
              </div>
            </MetricCard>

            <MetricCard
              title="Marketing" icon="📈"
              value={`${metrics.marketing.leads}`}
              sub={`Leads · ${metrics.marketing.conversion}% conversión`}
              change={metrics.marketing.change}
            >
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <MiniStat label="Visitas" value={metrics.marketing.visits.toLocaleString()} color={C.sky} />
                <MiniStat label="Canal top" value={metrics.marketing.topChannel} color={C.emerald} />
                <MiniStat label="Campañas" value={metrics.marketing.campaigns.active} color={C.alert} />
              </div>
            </MetricCard>

            <MetricCard
              title="Equipo" icon="👥"
              value={`${metrics.team.online}/${metrics.team.members}`}
              sub={`Online · ${metrics.team.tasksToday} tareas hoy`}
            >
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <MiniStat label="Velocidad" value={`${metrics.team.velocity}%`} color={C.emerald} />
                <MiniStat label="Stand-up" value={metrics.team.standupDone ? "✓ OK" : "Pendiente"} color={metrics.team.standupDone ? C.emerald : C.alert} />
                <MiniStat label="Tareas hoy" value={metrics.team.tasksToday} color={C.sky} />
              </div>
            </MetricCard>
          </div>

          {/* Bottom: Activity + Mini Chat */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1.3fr", gap: isMobile ? 12 : 20 }}>
            {/* Activity / Chat Panel */}
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: 24, display: "flex", flexDirection: "column",
              minHeight: 380,
            }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                {["activity", "chat"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: "6px 16px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all .15s",
                    background: activeTab === tab ? "rgba(14,165,233,0.15)" : "transparent",
                    color: activeTab === tab ? C.sky : C.muted,
                  }}>
                    {tab === "activity" ? "Actividad" : "NEXA AI"}
                  </button>
                ))}
              </div>

              {activeTab === "activity" ? (
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {metrics.activity.map((item, i) => <ActivityItem key={i} item={item} />)}
                </div>
              ) : (
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <MiniChat metrics={metrics} />
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.sub, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span>📊</span> Resumen del período
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Revenue mensual", value: `${fmt(metrics.revenue.monthly)} ARS`, color: C.emerald },
                  { label: "Variación mensual", value: `${metrics.revenue.change > 0 ? "+" : ""}${metrics.revenue.change}%`, color: metrics.revenue.change >= 0 ? C.emerald : C.red },
                  { label: "Uptime producción", value: `${metrics.ops.uptime}%`, color: C.sky },
                  { label: "Leads generados", value: metrics.marketing.leads, color: "#a855f7" },
                  { label: "Tareas completadas", value: metrics.ops.tasks.done, color: C.emerald },
                  { label: "Visitas web", value: metrics.marketing.visits.toLocaleString(), color: C.sky },
                  { label: "Velocidad equipo", value: `${metrics.team.velocity}%`, color: C.emerald },
                  { label: "Conversión web", value: `${metrics.marketing.conversion}%`, color: "#a855f7" },
                ].map(s => (
                  <div key={s.label} style={{
                    background: "rgba(15,23,42,0.5)", border: "1px solid rgba(148,163,184,0.06)",
                    borderRadius: 10, padding: "14px 16px",
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 20, padding: "14px 16px",
                background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(16,185,129,0.05))",
                border: "1px solid rgba(14,165,233,0.15)", borderRadius: 12,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: 22 }}>💡</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.sky, marginBottom: 2 }}>Insight NEXA</div>
                  <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.5 }}>
                    Canal orgánico generando {metrics.marketing.change > 0 ? "+" : ""}{metrics.marketing.change}% de tráfico.
                    Considerá escalar contenido SEO esta semana.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {detail && (
        <DetailPanel type={detail} data={metrics} onClose={() => setDetail(null)} />
      )}
    </>
  );
}

function NexaLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="nlg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#nlg)" />
      <text x="16" y="22" textAnchor="middle" fontFamily="monospace" fontSize="16" fontWeight="bold" fill="#fff">N</text>
    </svg>
  );
}
