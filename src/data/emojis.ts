import emojiGroupData from "unicode-emoji-json/data-by-group.json";
import cldrAnnotations from "cldr-annotations-modern/annotations/en/annotations.json";

export interface EmojiEntry {
  emoji: string;
  name: string;
  slug: string;
  group: string;
  codePoints: string;
  shortcode: string;
  popularity: number;
  keywords: string[];
}

// Top emojis by popularity (based on Unicode CLDR and social media usage data)
const popularityRanking: string[] = [
  "😂","❤️","🤣","👍","😭","🙏","😘","🥰","😍","😊",
  "🎉","😁","💕","🥺","😅","🔥","☺️","🤦","♥️","🤷",
  "🙄","😆","🤗","😉","🎂","🤔","👏","🙂","😳","🥳",
  "😎","👀","😋","😡","😔","💪","✨","🙈","😱","💖",
  "😈","🌹","💀","😫","😤","🤮","🤢","🤠","🤧","😏",
  "😩","😶","😐","😰","🤡","🫠","🫶","🫡","🫣","🫢",
  "💗","😬","✅","💯","😢","👑","😑","🤭","😜","🤪",
  "👻","💜","🤝","😄","😌","😒","💛","🙃","😝","😙",
  "😲","🤨","😞","🤯","😟","😕","👊","☹️","🥲","😣",
  "😖","😯","😚","🫥","😧","🤬","😠","😮","🫤","😵",
  "🥴","😪","🤐","🥱","😴","😷","🤕","🤑","🤠","😇",
  "🥸","🤥","🤫","🤓","😈","👿","👹","👺","💀","☠️",
  "👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽",
  "🙀","😿","😾","🫶","👋","🤚","🖐️","✋","🖖","🫱",
  "🫲","🫳","🫴","👌","🤌","🤏","✌️","🤞","🫰","🤟",
  "🤘","🤙","👈","👉","👆","🖕","👇","☝️","🫵","👍",
  "👎","✊","👊","🤛","🤜","👏","🙌","🫶","👐","🤲",
  "🤝","🙏","✍️","💅","🤳","💪","🦾","🦿","🦵","🦶",
  "👂","🦻","👃","🧠","🫀","🫁","🦷","🦴","👀","👁️",
  "👅","👄","🫦","👶","🧒","👦","👧","🧑","👱","👨",
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯",
  "🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐒","🐔",
  "🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇","🐺",
  "🐗","🐴","🦄","🐝","🪱","🐛","🦋","🐌","🐞","🐜",
  "🪰","🪲","🪳","🦟","🦗","🕷️","🕸️","🦂","🐢","🐍",
  "🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐠",
  "🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍",
  "🦧","🐘","🦛","🦏","🐪","🐫","🦒","🦘","🦬","🐃",
  "🍕","🍔","🍟","🌭","🍿","🧂","🥓","🥚","🍳","🧇",
  "🥞","🧈","🍞","🥐","🥨","🥖","🫓","🥯","🥗","🥙",
  "🥪","🌮","🌯","🫔","🥫","🍝","🍜","🍲","🍛","🍣",
  "🍱","🥟","🦪","🍤","🍙","🍚","🍘","🍥","🥠","🥮",
  "🍢","🍡","🍧","🍨","🍦","🥧","🧁","🍰","🎂","🍮",
  "🍭","🍬","🍫","🍩","🍪","🌰","🥜","🍯","🥛","🍼",
  "☕","🫖","🍵","🧃","🥤","🧋","🍶","🍺","🍻","🥂",
  "🍷","🥃","🍸","🍹","🧉","🍾","🧊","🥄","🍴","🍽️",
  "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱",
  "🪀","🏓","🏸","🏒","🏑","🥍","🏏","🪃","🥅","⛳",
  "🪁","🏹","🎣","🤿","🥊","🥋","🎽","🛹","🛼","🛷",
  "⛸️","🥌","🎿","⛷️","🏂","🪂","🏋️","🤸","🤺","⛹️",
  "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔",
  "❤️‍🔥","❤️‍🩹","❣️","💕","💞","💓","💗","💖","💘","💝",
  "🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐",
  "🛻","🚚","🚛","🚜","🏍️","🛵","🚲","🛴","🛺","🚔",
  "🌍","🌎","🌏","🗺️","🧭","🏔️","⛰️","🌋","🗻","🏕️",
  "🏖️","🏜️","🏝️","🏞️","🌅","🌄","🌠","🎇","🎆","🌇",
  "🌆","🏙️","🌃","🌌","🌉","🌁","🏠","🏡","🏢","🏣",
  "⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️",
  "🗜️","💾","💿","📀","📼","📷","📸","📹","🎥","📽️",
  "⭐","🌟","💫","✨","☀️","🌤️","⛅","🌥️","☁️","🌦️",
  "🌈","🌊","🎵","🎶","🎤","🎧","🎼","🎹","🥁","🪘",
  "🎸","🎷","🎺","🪗","🎻","🪕","🎬","🎭","🎨","🎪",
];

const popularityMap = new Map<string, number>();
popularityRanking.forEach((emoji, i) => popularityMap.set(emoji, i));

// Build CLDR keyword map
const cldrKeywords = (cldrAnnotations as any).annotations.annotations as Record<string, { default?: string[]; tts?: string[] }>;


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

interface GroupData {
  name: string;
  slug: string;
  emojis: Array<{
    emoji: string;
    skin_tone_support: boolean;
    name: string;
    slug: string;
    unicode_version: string;
    emoji_version: string;
  }>;
}

for (const group of emojiGroupData as GroupData[]) {
  for (const item of group.emojis) {
    const keywords = cldrKeywords[item.emoji]?.default ?? [];
    const entry: EmojiEntry = {
      emoji: item.emoji,
      name: item.name,
      slug: toSlug(item.name),
      group: group.name,
      codePoints: getCodePoints(item.emoji),
      shortcode: toShortcode(item.name),
      popularity: popularityMap.has(item.emoji) ? popularityMap.get(item.emoji)! : 9999,
      keywords,
    };

    allEmojis.push(entry);
    slugMap.set(entry.slug, entry);

    if (!categoryMap.has(group.name)) categoryMap.set(group.name, []);
    categoryMap.get(group.name)!.push(entry);
  }
}

allEmojis.sort((a, b) => a.popularity - b.popularity);
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
      e.keywords.some((kw) => kw.toLowerCase().includes(q))
  );
}

export function getRelatedEmojis(entry: EmojiEntry, count = 12): EmojiEntry[] {
  return allEmojis
    .filter((e) => e.group === entry.group && e.slug !== entry.slug)
    .slice(0, count);
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
  Component: "🔧 Component",
};
