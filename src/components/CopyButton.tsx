import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { useTrackCopy } from "@/hooks/useCopyStats";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  emojiSlug?: string;
}

const CopyButton = ({ text, label, className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    },
    [text]
  );

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:bg-secondary active:scale-95 ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-primary" />
          <span className="text-primary">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};

export default CopyButton;
