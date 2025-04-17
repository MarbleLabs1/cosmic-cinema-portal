
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Downloads from "./pages/Downloads";
import Discover from "./pages/Discover";
import Watchlist from "./pages/Watchlist";
import Requests from "./pages/Requests";
import Recent from "./pages/Recent";
import Settings from "./pages/Settings";
import PlayerSettings from "./pages/PlayerSettings";
import NotFound from "./pages/NotFound";
import { PlayerSettingsProvider } from "./hooks/usePlayerSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerSettingsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/recent" element={<Recent />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/player" element={<PlayerSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PlayerSettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
