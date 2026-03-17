
import { useAuth } from "@/hooks/useAuth";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";

interface FavoriteButtonProps {
  type: "emoji" | "combo";
  itemKey: string;
  className?: string;
}

const FavoriteButton = ({ type, itemKey, className = "" }: FavoriteButtonProps) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
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
      <span className={`text-sm transition-opacity ${active ? "opacity-100" : "opacity-40 grayscale"}`}>
        🥳
      </span>
    </button>
  );
};

export default FavoriteButton;
