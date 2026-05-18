import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NexaAvatar from "./NexaAvatar.jsx";
import { NexaIsotipo } from "./NexaBrand.jsx";

const SYSTEM = `Sos NEXA, la IA de negocios de Neexo Solutions.
Tu especialidad: ayudar a fundadores, CEOs y equipos a tomar mejores decisiones de negocio.
Áreas: revenue, operaciones, marketing, gestión de equipo, estrategia, finanzas, growth.
Estilo: directo, claro, sin paja. Usás datos y frameworks cuando sirve.
Si te preguntan algo fuera del contexto de negocios, redirigís amablemente.
Idioma: español, con términos de negocio en inglés si son estándar (KPI, funnel, MRR, etc.).
Podés usar listas, tablas en markdown cuando ayude a clarificar.`;

const SUGGESTED = [
  "¿Cómo analizo si mi MRR está en el rango correcto para mi industria?",
  "¿Cuáles son los KPIs más importantes para un SaaS B2B?",
  "¿Cómo priorizo el backlog cuando hay muchos frentes abiertos?",
  "¿Qué métricas de marketing debo revisar semanalmente?",
  "¿Cómo calculo el CAC y LTV para saber si mi modelo es viable?",
  "¿Qué estrategias de retención recomendan para clientes enterprise?",
];

const C = {
  bg: "#050f1a",
  surface: "rgba(15,23,42,0.95)",
  sky: "#0ea5e9",
  emerald: "#10b981",
  text: "#e2e8f0",
  muted: "#64748b",
  sub: "#94a3b8",
  border: "rgba(14,165,233,0.12)",
};

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; background: ${C.bg}; color: ${C.text}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.25); border-radius: 4px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
  .msg-enter { animation: fadeUp .3s ease; }
`;


function Markdown({ text }) {
  const lines = text.split("\n");
  return (
    <div style={{ fontSize: 14, lineHeight: 1.7, color: C.text }}>
      {lines.map((line, i) => {
        if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, marginTop: 12, color: "#e2e8f0" }}>{line.slice(4)}</h3>;
        if (line.startsWith("## "))  return <h2 key={i} style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, marginTop: 16, color: "#f1f5f9" }}>{line.slice(3)}</h2>;
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: C.sky, fontWeight: 700, flexShrink: 0 }}>·</span>
            <span>{line.replace(/^[-•]\s/, "")}</span>
          </div>;
        }
        if (/^\d+\.\s/.test(line)) {
          const match = line.match(/^(\d+)\.\s(.*)/);
          return <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: C.sky, fontWeight: 700, flexShrink: 0, minWidth: 18 }}>{match[1]}.</span>
            <span>{match[2]}</span>
          </div>;
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <strong key={i} style={{ display: "block", color: "#f1f5f9", marginTop: 8 }}>{line.slice(2, -2)}</strong>;
        }
        if (line === "") return <div key={i} style={{ height: 8 }} />;
        // Inline bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) => {
          if (p.startsWith("**") && p.endsWith("**")) {
            return <strong key={j} style={{ color: "#f1f5f9" }}>{p.slice(2, -2)}</strong>;
          }
          return p;
        });
        return <p key={i} style={{ margin: "0 0 4px" }}>{parts}</p>;
      })}
    </div>
  );
}

export default function NexaAI() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  async function send(text) {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    setMessages(m => [...m, { role: "user", content: userText }]);
    setLoading(true);
    setTyping("");

    const history = [...messages, { role: "user", content: userText }];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
          system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
          messages: history,
        }),
      });
      const d = await res.json();
      const reply = d.content?.find(b => b.type === "text")?.text || "No se pudo obtener respuesta.";

      // Simulate typing effect
      setLoading(false);
      let i = 0;
      const interval = setInterval(() => {
        i += 3;
        setTyping(reply.slice(0, i));
        if (i >= reply.length) {
          clearInterval(interval);
          setTyping("");
          setMessages(m => [...m, { role: "assistant", content: reply }]);
        }
      }, 8);
    } catch {
      setLoading(false);
      setMessages(m => [...m, { role: "assistant", content: "Error al conectar con NEXA. Verificá tu conexión." }]);
    }
  }

  const showWelcome = messages.length === 0 && !loading && !typing;

  return (
    <>
      <style>{G}</style>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: C.bg }}>
        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px", height: 60, flexShrink: 0,
          background: "rgba(5,15,26,0.95)", backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NexaIsotipo size={38} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.5px", color: C.sky }}>NEXA AI</div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.06em" }}>NEXT-GEN ENTERPRISE EXECUTIVE ASSISTANT</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => navigate("/dashboard")}
              style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 14px", color: C.sub, fontSize: 12, cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.sub; }}
            >Dashboard →</button>
            <button
              onClick={() => navigate("/")}
              style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 14px", color: C.sub, fontSize: 12, cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.sub; }}
            >← Inicio</button>
          </div>
        </header>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px", display: "flex", flexDirection: "column" }}>
          {showWelcome ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", animation: "fadeUp .5s" }}>
              <NexaAvatar size={120} />
              <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16, marginBottom: 6, letterSpacing: "-1px" }}>
                Hola, soy <span style={{ color: C.sky }}>NEXA</span>
              </h1>
              <p style={{ fontSize: 12, color: C.muted, letterSpacing: "0.06em", marginBottom: 14 }}>
                NEXT-GEN · ENTERPRISE · EXECUTIVE · ASSISTANT
              </p>
              <p style={{ fontSize: 15, color: C.sub, maxWidth: 420, lineHeight: 1.65, marginBottom: 36 }}>
                Tu asistente ejecutiva de IA. Preguntame sobre revenue, operaciones, marketing, equipo o cualquier decisión de tu empresa.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, maxWidth: 720, width: "100%" }}>
                {SUGGESTED.map((s, i) => (
                  <button key={i} onClick={() => { setInput(s); send(s); }}
                    style={{
                      background: "rgba(14,165,233,0.05)", border: `1px solid ${C.border}`,
                      borderRadius: 12, padding: "12px 16px", color: C.sub, fontSize: 12,
                      cursor: "pointer", textAlign: "left", lineHeight: 1.5, transition: "all .15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,0.1)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.28)"; e.currentTarget.style.color = C.text; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,165,233,0.05)"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.sub; }}
                  >{s}</button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 760, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
              {messages.map((m, i) => (
                <div key={i} className="msg-enter" style={{
                  display: "flex", gap: 14, flexDirection: m.role === "user" ? "row-reverse" : "row",
                  alignItems: "flex-start",
                }}>
                  {m.role === "user" ? (
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "linear-gradient(135deg, #334155, #1e293b)",
                      fontSize: 14, fontWeight: 800,
                      border: "1px solid rgba(148,163,184,0.15)",
                    }}>U</div>
                  ) : (
                    <NexaAvatar size={36} animate={false} style={{ flexShrink: 0 }} />
                  )}
                  <div style={{
                    maxWidth: "82%",
                    background: m.role === "user"
                      ? "rgba(51,65,85,0.6)"
                      : "rgba(15,23,42,0.9)",
                    border: `1px solid ${m.role === "user" ? "rgba(148,163,184,0.12)" : "rgba(14,165,233,0.15)"}`,
                    borderRadius: m.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                    padding: "14px 18px",
                  }}>
                    {m.role === "assistant" ? <Markdown text={m.content} /> : (
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: C.text, margin: 0 }}>{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="msg-enter" style={{ display: "flex", gap: 14 }}>
                  <NexaAvatar size={36} animate={true} style={{ flexShrink: 0 }} />
                  <div style={{
                    background: "rgba(15,23,42,0.9)", border: "1px solid rgba(14,165,233,0.15)",
                    borderRadius: "4px 16px 16px 16px", padding: "14px 18px",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: "50%", background: C.sky,
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {typing && (
                <div className="msg-enter" style={{ display: "flex", gap: 14 }}>
                  <NexaAvatar size={36} animate={true} style={{ flexShrink: 0 }} />
                  <div style={{
                    maxWidth: "82%", background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(14,165,233,0.15)",
                    borderRadius: "4px 16px 16px 16px", padding: "14px 18px",
                  }}>
                    <Markdown text={typing} />
                    <span style={{ animation: "blink 1s infinite", color: C.sky }}>|</span>
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: "16px 28px 24px",
          background: "rgba(5,15,26,0.97)", borderTop: `1px solid ${C.border}`,
        }}>
          <div style={{
            maxWidth: 760, margin: "0 auto",
            display: "flex", gap: 12, alignItems: "flex-end",
          }}>
            <div style={{
              flex: 1, background: "rgba(15,23,42,0.9)",
              border: `1px solid ${C.border}`, borderRadius: 14,
              padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-end",
              transition: "border-color .2s",
            }}
              onFocusCapture={e => e.currentTarget.style.borderColor = "rgba(14,165,233,0.35)"}
              onBlurCapture={e => e.currentTarget.style.borderColor = C.border}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`; }}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Preguntá sobre tu negocio… (Enter para enviar)"
                disabled={loading}
                rows={1}
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: C.text, fontSize: 14, lineHeight: 1.6, resize: "none",
                  fontFamily: "inherit", maxHeight: 160,
                }}
              />
              <button onClick={() => send()} disabled={loading || !input.trim()} style={{
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                border: "none", borderRadius: 10, padding: "8px 16px",
                color: "#fff", fontSize: 14, cursor: "pointer", fontWeight: 600,
                opacity: loading || !input.trim() ? 0.4 : 1, transition: "opacity .15s",
                flexShrink: 0,
              }}>→</button>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: C.muted }}>
            NEXA AI · Powered by Neexo Solutions · <span style={{ color: "rgba(100,116,139,0.7)" }}>Shift+Enter para nueva línea</span>
          </div>
        </div>
      </div>
    </>
  );
}
