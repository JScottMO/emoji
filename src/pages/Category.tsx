import { useParams, Link } from "react-router-dom";
import { emojisByCategory, categories, categoryDisplayNames } from "@/data/emojis";
import EmojiCard from "@/components/EmojiCard";

const Category = () => {
  const { name } = useParams<{ name: string }>();
  
  // Find category by slug-like matching
  const category = categories.find(
    (c) => c.toLowerCase().replace(/[^a-z]+/g, "-") === name
  );
  
  const categoryEmojis = category ? emojisByCategory.get(category) || [] : [];

  if (!category) {
    return (
      <div className="container py-16 text-center">
        <p className="text-5xl mb-4">🗂️</p>
        <h1 className="text-xl font-semibold text-foreground mb-2">Category not found</h1>
        <Link to="/" className="text-primary hover:underline">Back to search</Link>
      </div>
    );
  }

  return (
    <div className="container py-8 sm:py-12">
      <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        {categoryDisplayNames[category] || category}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">{categoryEmojis.length} emojis</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {categoryEmojis.map((entry) => (
          <EmojiCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default Category;
