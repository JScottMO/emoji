import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Favorite {
  item_type: "emoji" | "combo";
  item_key: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  loading: boolean;
  isFavorite: (type: "emoji" | "combo", key: string) => boolean;
  toggleFavorite: (type: "emoji" | "combo", key: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    supabase
      .from("favorites")
      .select("item_type, item_key")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setFavorites((data as Favorite[]) || []);
        setLoading(false);
      });
  }, [user]);

  const isFavorite = useCallback(
    (type: "emoji" | "combo", key: string) =>
      favorites.some((f) => f.item_type === type && f.item_key === key),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (type: "emoji" | "combo", key: string) => {
      if (!user) return;
      const exists = isFavorite(type, key);
      if (exists) {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("item_type", type)
          .eq("item_key", key);
        setFavorites((prev) => prev.filter((f) => !(f.item_type === type && f.item_key === key)));
      } else {
        await supabase
          .from("favorites")
          .insert({ user_id: user.id, item_type: type, item_key: key });
        setFavorites((prev) => [...prev, { item_type: type, item_key: key }]);
      }
    },
    [user, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, loading, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavoritesContext must be used within FavoritesProvider");
  return ctx;
}
