import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Heart, LogOut, User } from "lucide-react";

const navLinks = [
  { label: "Browse", path: "/" },
  { label: "Combos", path: "/combos" },
  { label: "Random", path: "/random" },
  { label: "Privacy", path: "/privacy" },
];

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
          emojis<span className="text-primary">.rsvp</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/favorites"
                className={`rounded-md p-1.5 transition-colors ${
                  location.pathname === "/favorites"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Favorites"
              >
                <Heart className="h-4 w-4" />
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="ml-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
