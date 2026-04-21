import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Subscribe from "./pages/Subscribe.tsx";
import Charities from "./pages/Charities.tsx";
import CharityProfile from "./pages/CharityProfile.tsx";
import ComingSoon from "./pages/ComingSoon.tsx";
import { DashboardLayout } from "./components/dashboard/DashboardLayout.tsx";
import Overview from "./pages/dashboard/Overview.tsx";
import Scores from "./pages/dashboard/Scores.tsx";
import Charity from "./pages/dashboard/Charity.tsx";
import Draws from "./pages/dashboard/Draws.tsx";
import Winnings from "./pages/dashboard/Winnings.tsx";
import DashboardSettings from "./pages/dashboard/Settings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/charities" element={<Charities />} />
          <Route path="/charities/:id" element={<CharityProfile />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="scores" element={<Scores />} />
            <Route path="charity" element={<Charity />} />
            <Route path="draws" element={<Draws />} />
            <Route path="winnings" element={<Winnings />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
          <Route
            path="/admin/*"
            element={
              <ComingSoon
                title="Admin panel is on the way."
                description="User management, draw simulation engine, charity admin, winner verification, and reports. Coming next."
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
