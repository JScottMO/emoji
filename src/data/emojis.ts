import emojiData from "unicode-emoji-json/data-by-group.json";

export interface EmojiEntry {
  emoji: string;
  name: string;
  slug: string;
  group: string;
  subGroup: string;
  codePoints: string;
  shortcode: string;
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toShortcode(name: string): string {
  return ":" + name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") + ":";
}

function getCodePoints(emoji: string): string {
  return [...emoji]
    .map((char) => {
      const cp = char.codePointAt(0);
      return cp ? "U+" + cp.toString(16).toUpperCase().padStart(4, "0") : "";
    })
    .filter((s) => s && s !== "U+FE0F")
    .join(" ");
}

const allEmojis: EmojiEntry[] = [];
const categoryMap = new Map<string, EmojiEntry[]>();
const slugMap = new Map<string, EmojiEntry>();

// Process grouped data
for (const [group, subGroups] of Object.entries(emojiData)) {
  for (const [subGroup, emojis] of Object.entries(subGroups as Record<string, any[]>)) {
    for (const item of emojis) {
      const entry: EmojiEntry = {
        emoji: item.emoji,
        name: item.name,
        slug: toSlug(item.name),
        group,
        subGroup,
        codePoints: getCodePoints(item.emoji),
        shortcode: toShortcode(item.name),
      };
      
      // Skip skin tone variants and other modifiers to keep dataset clean
      if (item.skin_tone_support && entry.slug !== toSlug(item.name)) continue;
      
      allEmojis.push(entry);
      slugMap.set(entry.slug, entry);
      
      if (!categoryMap.has(group)) categoryMap.set(group, []);
      categoryMap.get(group)!.push(entry);
    }
  }
}

export const emojis = allEmojis;
export const categories = Array.from(categoryMap.keys());
export const emojisByCategory = categoryMap;

export function getEmojiBySlug(slug: string): EmojiEntry | undefined {
  return slugMap.get(slug);
}

export function searchEmojis(query: string): EmojiEntry[] {
  if (!query.trim()) return allEmojis;
  const q = query.toLowerCase().trim();
  return allEmojis.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.shortcode.includes(q) ||
      e.emoji === q ||
      e.group.toLowerCase().includes(q) ||
      e.subGroup.toLowerCase().includes(q)
  );
}

export function getRelatedEmojis(entry: EmojiEntry, count = 12): EmojiEntry[] {
  const sameSubGroup = allEmojis.filter(
    (e) => e.subGroup === entry.subGroup && e.slug !== entry.slug
  );
  const sameGroup = allEmojis.filter(
    (e) => e.group === entry.group && e.subGroup !== entry.subGroup && e.slug !== entry.slug
  );
  return [...sameSubGroup, ...sameGroup].slice(0, count);
}

export function getRandomEmoji(): EmojiEntry {
  return allEmojis[Math.floor(Math.random() * allEmojis.length)];
}

export function getTwemojiUrl(emoji: string): string {
  const codePoints = [...emoji]
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter((cp) => cp && cp !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/${codePoints}.png`;
}

// Category display names mapping
export const categoryDisplayNames: Record<string, string> = {
  "Smileys & Emotion": "😊 Smileys",
  "People & Body": "👋 People",
  "Animals & Nature": "🐾 Animals",
  "Food & Drink": "🍕 Food",
  "Travel & Places": "✈️ Travel",
  Activities: "⚽ Activities",
  Objects: "💡 Objects",
  Symbols: "💠 Symbols",
  Flags: "🏳️ Flags",
  "Component": "🔧 Component",
};
