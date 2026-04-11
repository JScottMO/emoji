import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import EmojiDetail from "./pages/EmojiDetail";
import Category from "./pages/Category";
import Combos from "./pages/Combos";
import Random from "./pages/Random";
import Privacy from "./pages/Privacy";
import Auth from "./pages/Auth";
import Favorites from "./pages/Favorites";
import Feedback from "./pages/Feedback";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/emoji/:slug" element={<EmojiDetail />} />
                  <Route path="/category/:name" element={<Category />} />
                  <Route path="/combos" element={<Combos />} />
                  <Route path="/random" element={<Random />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/unsubscribe" element={<Unsubscribe />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
