import { useState } from "react";
import { emojiCombos, moods } from "@/data/combos";
import CopyButton from "@/components/CopyButton";
import CategoryChip from "@/components/CategoryChip";
import FavoriteButton from "@/components/FavoriteButton";

const Combos = () => {
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const filtered = activeMood
    ? emojiCombos.filter((c) => c.mood === activeMood)
    : emojiCombos;

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">Emoji Combos</h1>
        <p className="mb-6 text-muted-foreground">
          Popular emoji combinations for every mood. One click to copy.
        </p>

        {/* Mood filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <CategoryChip
            label="All"
            active={activeMood === null}
            onClick={() => setActiveMood(null)}
          />
          {moods.map((mood) => (
            <CategoryChip
              key={mood}
              label={mood}
              active={activeMood === mood}
              onClick={() => setActiveMood(activeMood === mood ? null : mood)}
            />
          ))}
        </div>

        {/* Combos list */}
        <div className="grid gap-2">
          {filtered.map((combo, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-card p-4 emoji-card-shadow transition-all hover:emoji-card-shadow-hover"
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
    </div>
  );
};

export default Combos;
