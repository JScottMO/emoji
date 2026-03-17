import { useState, useMemo, useCallback } from "react";
import { Search, BarChart3 } from "lucide-react";
import { emojis, searchEmojis, categories, categoryDisplayNames } from "@/data/emojis";
import EmojiCard from "@/components/EmojiCard";
import CategoryChip from "@/components/CategoryChip";
import { useCopyStats } from "@/hooks/useCopyStats";

const PAGE_SIZE = 200;

const Index = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    let filtered = query ? searchEmojis(query) : emojis;
    if (activeCategory) {
      filtered = filtered.filter((e) => e.group === activeCategory);
    }
    return filtered;
  }, [query, activeCategory]);

  // Reset visible count when filters change
  const handleCategoryChange = useCallback((cat: string | null) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
  }, []);

  return (
    <div className="container py-8 sm:py-12">
      {/* Hero */}
      <div className="mx-auto mb-8 max-w-xl text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Find the perfect emoji
        </h1>
        <p className="text-muted-foreground">
          {emojis.length.toLocaleString()} emojis · No ads · No tracking
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mb-6 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search emojis..."
            className="w-full rounded-lg border border-input bg-background py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <CategoryChip
          label="All"
          active={activeCategory === null}
          onClick={() => handleCategoryChange(null)}
        />
        {categories
          .filter((c) => c !== "Component")
          .map((cat) => (
            <CategoryChip
              key={cat}
              label={categoryDisplayNames[cat] || cat}
              active={activeCategory === cat}
              onClick={() => handleCategoryChange(activeCategory === cat ? null : cat)}
            />
          ))}
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-muted-foreground">
        {results.length.toLocaleString()} emoji{results.length !== 1 ? "s" : ""}
        {query && ` matching "${query}"`}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {results.slice(0, visibleCount).map((entry) => (
          <EmojiCard key={entry.slug} entry={entry} />
        ))}
      </div>

      {results.length > visibleCount && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Load more
          </button>
          <p className="mt-2 text-xs text-muted-foreground">
            Showing {Math.min(visibleCount, results.length).toLocaleString()} of {results.length.toLocaleString()}
          </p>
        </div>
      )}

      {results.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🤷</p>
          <p className="text-muted-foreground">No emojis found. Try a different search.</p>
        </div>
      )}
    </div>
  );
};

export default Index;
