import { useParams, Link } from "react-router-dom";
import { getEmojiBySlug, getRelatedEmojis, getTwemojiUrl } from "@/data/emojis";
import { getEmojiCombosFor } from "@/data/combos";
import CopyButton from "@/components/CopyButton";
import EmojiCard from "@/components/EmojiCard";
import FavoriteButton from "@/components/FavoriteButton";

const EmojiDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getEmojiBySlug(slug) : undefined;

  if (!entry) {
    return (
      <div className="container py-16 text-center">
        <p className="text-5xl mb-4">😵</p>
        <h1 className="text-xl font-semibold text-foreground mb-2">Emoji not found</h1>
        <Link to="/" className="text-primary hover:underline">Back to search</Link>
      </div>
    );
  }

  const related = getRelatedEmojis(entry);
  const combos = getEmojiCombosFor(entry.emoji);
  const twemojiUrl = getTwemojiUrl(entry.emoji);

  return (
    <div className="container py-8 sm:py-12">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Back
      </Link>

      <div className="mx-auto max-w-2xl">
        {/* Main display */}
        <div className="mb-8 rounded-xl bg-card p-8 text-center emoji-card-shadow relative">
          <div className="absolute top-3 right-3">
            <FavoriteButton type="emoji" itemKey={entry.slug} />
          </div>
          <span className="text-8xl sm:text-[128px] select-none">{entry.emoji}</span>
          <h1 className="mt-4 text-2xl font-bold capitalize text-foreground">{entry.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{entry.group}</p>
        </div>

        {/* Copy actions */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <CopyButton text={entry.emoji} label="Copy Emoji" />
          <CopyButton text={entry.codePoints} label={entry.codePoints} />
          <CopyButton text={entry.shortcode} label={entry.shortcode} />
        </div>

        {/* Size previews */}
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Size Preview</h2>
          <div className="flex items-end gap-6 rounded-lg bg-card p-4 emoji-card-shadow">
            {[16, 32, 64, 128].map((size) => (
              <div key={size} className="text-center">
                <span style={{ fontSize: `${size}px`, lineHeight: 1 }} className="select-none">{entry.emoji}</span>
                <p className="mt-1 text-xs text-muted-foreground">{size}px</p>
              </div>
            ))}
          </div>
        </div>

        {/* Twemoji preview */}
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Twitter/X (Twemoji)</h2>
          <div className="rounded-lg bg-card p-4 emoji-card-shadow">
            <img
              src={twemojiUrl}
              alt={`${entry.name} Twemoji`}
              className="h-16 w-16"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>

        {/* Combos */}
        {combos.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Emoji Combos</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {combos.map((combo, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-card p-3 emoji-card-shadow">
                  <div>
                    <span className="text-2xl mr-2">{combo.combo}</span>
                    <span className="text-sm text-muted-foreground">{combo.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CopyButton text={combo.combo} />
                    <FavoriteButton type="combo" itemKey={combo.combo} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Related Emojis</h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {related.map((e) => (
                <EmojiCard key={e.slug} entry={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiDetail;
