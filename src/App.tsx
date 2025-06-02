
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Language } from "@/utils/translations";
import Index from "./pages/Index";
import Repairs from "./pages/Repairs";
import Parts from "./pages/Parts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<Language>('ar');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as Language);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index language={language} onLanguageChange={handleLanguageChange} />} />
            <Route path="/repairs" element={<Repairs language={language} onLanguageChange={handleLanguageChange} />} />
            <Route path="/parts" element={<Parts language={language} onLanguageChange={handleLanguageChange} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
