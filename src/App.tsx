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
          <Route
            path="/dashboard/*"
            element={
              <ComingSoon
                title="Your dashboard is next."
                description="Score tracking, charity contribution slider, draw results, and winnings — all coming in the next iteration. Connect Lovable Cloud to enable accounts."
              />
            }
          />
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
