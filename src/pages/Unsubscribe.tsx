import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Loader2, MailX } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>(token ? "loading" : "invalid");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) return;
    const validate = async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`;
        const res = await fetch(url, {
          headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        });
        if (!res.ok) { setStatus("invalid"); return; }
        const data = await res.json();
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) { setStatus("error"); }
      else { setStatus("success"); }
    } catch {
      setStatus("error");
    }
    setProcessing(false);
  };

  return (
    <div className="container py-16 sm:py-24">
      <div className="mx-auto max-w-md text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Validating…</p>
          </>
        )}
        {status === "valid" && (
          <>
            <MailX className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">Unsubscribe</h1>
            <p className="mb-6 text-muted-foreground">
              Click the button below to unsubscribe from future emails.
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={processing}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {processing ? "Processing…" : "Confirm Unsubscribe"}
            </button>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">Unsubscribed</h1>
            <p className="text-muted-foreground">You've been successfully unsubscribed.</p>
          </>
        )}
        {status === "already" && (
          <>
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">Already Unsubscribed</h1>
            <p className="text-muted-foreground">This email address has already been unsubscribed.</p>
          </>
        )}
        {(status === "invalid" || status === "error") && (
          <>
            <XCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              {status === "invalid" ? "Invalid Link" : "Something Went Wrong"}
            </h1>
            <p className="text-muted-foreground">
              {status === "invalid"
                ? "This unsubscribe link is invalid or has expired."
                : "Please try again later."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
