type EventName =
  | "intro_started"
  | "intro_skipped"
  | "intro_completed"
  | "intro_fallback"
  | "project_opened"
  | "resume_clicked"
  | "contact_link_clicked"
  | "contact_submitted";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** Fire-and-forget GA4 event. No-ops when GA is unavailable or blocked. */
export function track(event: EventName, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", event, params);
}
