import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Assessment from "@/pages/Assessment";
import Results from "@/pages/Results";
import TawjihiGuide from "@/pages/TawjihiGuide";
import NotFound from "@/pages/not-found";
import { LanguageProvider, useLang } from "@/lib/LanguageContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/results/:id" component={Results} />
      <Route path="/tawjihi" component={TawjihiGuide} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const { dir } = useLang();
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <div
        dir={dir}
        className="flex flex-col min-h-screen font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary"
      >
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Router />
        </div>
        <Footer />
        <Toaster />
      </div>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AppShell />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
