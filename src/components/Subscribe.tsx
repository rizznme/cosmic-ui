import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FORM_ID = import.meta.env.PUBLIC_CONVERTKIT_FORM_ID as string | undefined;
const API_KEY = import.meta.env.PUBLIC_CONVERTKIT_API_KEY as string | undefined;

type Status = "idle" | "loading" | "success" | "error";

function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // No-op until the ConvertKit form exists - hides the whole section (heading
  // included), not just the input, so nothing half-finished ships to visitors.
  if (!FORM_ID || !API_KEY) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: API_KEY, email }),
        },
      );
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-32 mb-20 px-5 text-center">
      <div className="text-xl md:text-2xl font-bold text-shadow-lg text-shadow-primary">
        Stay in the loop
      </div>
      <div className="opacity-70 max-w-md">
        New components, releases, and what's coming next. No spam.
      </div>
      {status === "success" ? (
        <div className="text-center opacity-70">
          You're in. Watch for the next update.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <div className="flex-1">
            <Input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={status === "loading"} className="sm:w-40">
            {status === "loading" ? "..." : "Subscribe"}
          </Button>
          {status === "error" && (
            <div className="text-destructive text-sm text-center sm:absolute sm:mt-16">
              Something went wrong. Try again.
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export { Subscribe };
