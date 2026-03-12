import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";

interface FavoriteButtonProps {
  type: "emoji" | "combo";
  itemKey: string;
  className?: string;
}

const FavoriteButton = ({ type, itemKey, className = "" }: FavoriteButtonProps) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const active = isFavorite(type, itemKey);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/auth");
      return;
    }
    toggleFavorite(type, itemKey);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-md p-1.5 transition-colors hover:bg-secondary ${className}`}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          active ? "fill-primary text-primary" : "text-muted-foreground"
        }`}
      />
    </button>
  );
};

export default FavoriteButton;
