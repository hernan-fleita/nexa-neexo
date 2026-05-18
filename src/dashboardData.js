export const DEMO_DATA = {
  tenant:  "Demo Corp S.A.",
  plan:    "NEXA Pro",
  revenue: {
    monthly:  1248000,
    currency: "ARS",
    change:   +8.3,
    invoices: { paid: 9, pending: 3, overdue: 1 },
    alert:    "1 factura vencida",
    overdueList: [{
      id: "#0039", client: "Demo Corp S.A.", amount: 95000, currency: "ARS",
      issued: "18/04/2026", due: "03/05/2026", daysOverdue: 15,
      contact: "admin@democorp.com", description: "Servicios de desarrollo — Mayo 2026",
    }],
  },
  ops: {
    tasks:   { open: 8, inProgress: 3, done: 21 },
    uptime:  99.7,
    blockers: 1,
    alert:   "1 bloqueante crítico",
    blockerList: [{
      id: "#87", title: "Auth timeout — Integración HubSpot CRM", severity: "CRÍTICO",
      created: "17/05/2026, 22:14",
      url: "/incident?id=87&service=HubSpot+CRM&error=AUTH_TIMEOUT_503&severity=CR%C3%8DTICO&created=17%2F05%2F2026%2C+22%3A14&affected=Leads%2CContactos%2CSincronizaci%C3%B3n",
    }],
  },
  marketing: {
    visits: 2840, leads: 47, conversion: 1.65,
    topChannel: "Orgánico", change: +12.1,
    campaigns: { active: 2, scheduled: 1 },
  },
  team: {
    members: 4, online: 3, tasksToday: 11,
    velocity: 87, standupDone: true,
  },
  activity: [
    { time: "09:14", type: "ops",       icon: "▲", text: "Deploy exitoso en producción — v2.3.1" },
    { time: "08:52", type: "revenue",   icon: "≡", text: "Factura #0042 enviada — $180.000 ARS" },
    { time: "08:30", type: "team",      icon: "●", text: "Stand-up completado — 3/4 miembros" },
    { time: "07:45", type: "marketing", icon: "⌕", text: "Lead calificado desde formulario web" },
    { time: "Ayer",  type: "alert",     icon: "⚠", text: "Factura #0039 vencida — $95.000 ARS" },
    { time: "Ayer",  type: "ops",       icon: "⑂", text: "Issue crítico #87 creado: Auth timeout" },
  ],
};
