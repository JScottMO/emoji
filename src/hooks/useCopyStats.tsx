import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useTrackCopy() {
  return async (emojiSlug: string) => {
    try {
      await supabase.from("copy_events").insert({ emoji_slug: emojiSlug });
    } catch {
      // silent fail – analytics shouldn't break UX
    }
  };
}

export function useCopyStats() {
  const [totalCopies, setTotalCopies] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase
        .from("copy_events")
        .select("*", { count: "exact", head: true });
      setTotalCopies(count ?? 0);
    };
    fetchStats();
  }, []);

  return { totalCopies };
}
