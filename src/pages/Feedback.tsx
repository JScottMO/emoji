import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Send, CheckCircle } from "lucide-react";

const CATEGORIES = [
  { value: "general", label: "💬 General Feedback" },
  { value: "feature", label: "💡 Feature Request" },
  { value: "bug", label: "🐛 Bug Report" },
  { value: "content", label: "📝 Content / Emoji Suggestion" },
];

const Feedback = () => {
  const [category, setCategory] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    setError(null);

    const id = crypto.randomUUID();

    const { error: dbError } = await supabase
      .from("feedback_submissions")
      .insert({
        id,
        category,
        name: name.trim() || null,
        email: email.trim() || null,
        message: message.trim(),
      });

    if (dbError) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    // Send email notification
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "feedback-notification",
        recipientEmail: "jscottchristianson@mac.com",
        idempotencyKey: `feedback-notify-${id}`,
        templateData: {
          category: CATEGORIES.find((c) => c.value === category)?.label ?? category,
          name: name.trim() || "Anonymous",
          email: email.trim() || "Not provided",
          message: message.trim(),
        },
      },
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-16 sm:py-24">
        <div className="mx-auto max-w-md text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-2 text-2xl font-bold text-foreground">Thank you!</h1>
          <p className="text-muted-foreground">
            Your feedback has been submitted. We appreciate you taking the time to help us improve.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setCategory("general");
              setName("");
              setEmail("");
              setMessage("");
            }}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 sm:py-12">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            Suggestions & Feedback
          </h1>
          <p className="text-muted-foreground">
            Help us make this emoji tool better. We'd love to hear from you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                    category === cat.value
                      ? "border-primary bg-primary/10 text-foreground font-medium"
                      : "border-input bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
              Your feedback <span className="text-destructive">*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              maxLength={2000}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none transition-shadow"
              placeholder="Tell us what's on your mind..."
            />
            <p className="mt-1 text-xs text-muted-foreground text-right">
              {message.length}/2000
            </p>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
              Name <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email <span className="text-muted-foreground font-normal">(optional — if you'd like a reply)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
              placeholder="you@example.com"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={submitting || !message.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Sending..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
