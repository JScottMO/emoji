import { useState, useCallback } from "react";
import { getRandomEmoji, getTwemojiUrl } from "@/data/emojis";
import CopyButton from "@/components/CopyButton";
import { Link } from "react-router-dom";

const Random = () => {
  const [entry, setEntry] = useState(() => getRandomEmoji());
  const twemojiUrl = getTwemojiUrl(entry.emoji);

  const handleNewRandom = useCallback(() => {
    setEntry(getRandomEmoji());
  }, []);

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Random Emoji</h1>

        <div className="mb-6 rounded-xl bg-card p-8 emoji-card-shadow animate-fade-in" key={entry.slug}>
          <span className="text-8xl select-none">{entry.emoji}</span>
          <h2 className="mt-4 text-xl font-semibold capitalize text-foreground">{entry.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{entry.group}</p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">{entry.codePoints}</p>
        </div>

        <div className="mb-4 flex justify-center gap-2">
          <CopyButton text={entry.emoji} label="Copy Emoji" />
          <CopyButton text={entry.shortcode} label={entry.shortcode} />
        </div>

        <button
          onClick={handleNewRandom}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          🎲 Give me another
        </button>

        <div className="mt-4">
          <Link
            to={`/emoji/${entry.slug}`}
            className="text-sm text-primary hover:underline"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Random;
