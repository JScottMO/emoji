import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { Check } from "lucide-react";
import type { EmojiEntry } from "@/data/emojis";
import FavoriteButton from "@/components/FavoriteButton";
import { useTrackCopy } from "@/hooks/useCopyStats";

interface EmojiCardProps {
  entry: EmojiEntry;
}

const EmojiCard = ({ entry }: EmojiCardProps) => {
  const [copied, setCopied] = useState(false);
  const trackCopy = useTrackCopy();

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(entry.emoji);
      trackCopy(entry.slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    },
    [entry.emoji, entry.slug, trackCopy]
  );

  return (
    <Link
      to={`/emoji/${entry.slug}`}
      className="group relative flex flex-col items-center gap-2 rounded-lg bg-card p-4 emoji-card-shadow transition-all duration-200 hover:emoji-card-shadow-hover hover:-translate-y-0.5"
    >
      <span className="text-4xl sm:text-5xl select-none" role="img" aria-label={entry.name}>
        {entry.emoji}
      </span>
      <span className="text-xs text-muted-foreground text-center leading-tight line-clamp-2">
        {entry.name}
      </span>
      <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <FavoriteButton type="emoji" itemKey={entry.slug} />
        <button
          onClick={handleCopy}
          className="rounded-md p-1 text-muted-foreground transition-all hover:bg-secondary"
          aria-label={`Copy ${entry.name}`}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-primary" />
          ) : (
            <span className="text-xs">Copy</span>
          )}
        </button>
      </div>
    </Link>
  );
};

export default EmojiCard;
