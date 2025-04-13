import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import { Clients } from "./pages/Clients";
import { Calendar } from "./pages/Calendar";
import { Reports } from "./pages/Reports";
import { CreateBudget } from "./pages/CreateBudget";
import { CreateService } from "./pages/CreateService";
import { Settings } from "./pages/Settings";
import { Notifications } from "./pages/Notifications";
import { Help } from "./pages/Help";
import { Budgets } from "./pages/Budgets";
import { Services } from "./pages/Services";
import { CreateClient } from "./pages/CreateClient";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reports" element={<Reports />} />

            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            
            <Route path="/budgets/new" element={<CreateBudget />} />
            <Route path="/services/new" element={<CreateService />} />
            <Route path="/clients/new" element={<CreateClient />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
