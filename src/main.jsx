import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Dashboard from "./Dashboard.jsx";
import NexaAI from "./NexaAI.jsx";
import IncidentPage from "./IncidentPage.jsx";
import LogoConcepts from "./LogoConcepts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nexa"      element={<NexaAI />} />
        <Route path="/incident"  element={<IncidentPage />} />
        <Route path="/logos"     element={<LogoConcepts />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
