import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-6">
    <div className="container text-center text-sm text-muted-foreground">
      <span className="font-medium text-foreground">emojis.rsvp</span>
      {" · No ads · No tracking · No nonsense · "}
      <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
        Privacy
      </Link>
    </div>
  </footer>
);

export default Footer;
