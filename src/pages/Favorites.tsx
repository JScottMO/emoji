import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { getEmojiBySlug, emojis } from "@/data/emojis";
import { emojiCombos } from "@/data/combos";
import EmojiCard from "@/components/EmojiCard";
import CopyButton from "@/components/CopyButton";
import FavoriteButton from "@/components/FavoriteButton";
import { Navigate, Link } from "react-router-dom";
import { Download } from "lucide-react";

function exportFavoritesHtml(
  favEmojis: typeof emojis,
  favCombos: typeof emojiCombos
) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Favorite Emojis — emojis.rsvp</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 700px; margin: 2rem auto; padding: 0 1rem; color: #1a1a1a; }
  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.1rem; margin-top: 2rem; color: #666; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 0.5rem; }
  .card { text-align: center; padding: 0.75rem; border: 1px solid #eee; border-radius: 8px; }
  .card .emoji { font-size: 2rem; }
  .card .name { font-size: 0.7rem; color: #888; margin-top: 0.25rem; }
  .combo { padding: 0.5rem 0; border-bottom: 1px solid #f0f0f0; display: flex; gap: 0.75rem; align-items: center; }
  .combo .emojis { font-size: 1.5rem; }
  .combo .label { font-size: 0.85rem; color: #555; }
  footer { margin-top: 3rem; font-size: 0.75rem; color: #aaa; }
</style>
</head>
<body>
<h1>⭐ My Favorite Emojis</h1>
<p>Exported from <a href="https://emojis.rsvp">emojis.rsvp</a></p>
${favEmojis.length > 0 ? `
<h2>Emojis</h2>
<div class="grid">
${favEmojis.map((e) => `<div class="card"><div class="emoji">${e.emoji}</div><div class="name">${e.name}</div></div>`).join("\n")}
</div>` : ""}
${favCombos.length > 0 ? `
<h2>Combos</h2>
${favCombos.map((c) => `<div class="combo"><span class="emojis">${c.combo}</span><span class="label">${c.label}</span></div>`).join("\n")}` : ""}
<footer>Generated on ${new Date().toLocaleDateString()} · emojis.rsvp — No ads, no tracking</footer>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-favorite-emojis.html";
  a.click();
  URL.revokeObjectURL(url);
}

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading, isFavorite, toggleFavorite } = useFavorites();

  if (!user) return <Navigate to="/auth" replace />;

  const favEmojis = favorites
    .filter((f) => f.item_type === "emoji")
    .map((f) => emojis.find((e) => e.slug === f.item_key))
    .filter(Boolean) as typeof emojis;

  const favCombos = favorites
    .filter((f) => f.item_type === "combo")
    .map((f) => emojiCombos.find((c) => c.combo === f.item_key))
    .filter(Boolean) as typeof emojiCombos;

  const hasAny = favEmojis.length > 0 || favCombos.length > 0;

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Favorites</h1>
            <p className="text-sm text-muted-foreground">{favorites.length} saved</p>
          </div>
          {hasAny && (
            <button
              onClick={() => exportFavoritesHtml(favEmojis, favCombos)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" />
              Export HTML
            </button>
          )}
        </div>

        {loading && <p className="text-muted-foreground">Loading...</p>}

        {!loading && !hasAny && (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">⭐</p>
            <p className="text-muted-foreground mb-2">No favorites yet.</p>
            <p className="text-sm text-muted-foreground">
              Click the heart icon on any emoji or combo to save it here.
            </p>
            <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
              Browse emojis →
            </Link>
          </div>
        )}

        {favEmojis.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Emojis</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {favEmojis.map((entry) => (
                <EmojiCard key={entry.slug} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {favCombos.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Combos</h2>
            <div className="grid gap-2">
              {favCombos.map((combo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-card p-4 emoji-card-shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{combo.combo}</span>
                    <div>
                      <p className="font-medium text-foreground">{combo.label}</p>
                      <p className="text-xs text-muted-foreground">{combo.mood}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CopyButton text={combo.combo} label="Copy" />
                    <FavoriteButton type="combo" itemKey={combo.combo} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
