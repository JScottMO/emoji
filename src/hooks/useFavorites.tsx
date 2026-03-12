import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./useAuth";

interface Favorite {
  item_type: "emoji" | "combo";
  item_key: string;
}

export function useFavorites() {
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

  return { favorites, loading, isFavorite, toggleFavorite };
}
