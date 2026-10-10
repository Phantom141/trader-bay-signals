const TRIAL_KEY = "tb_trial_start";
const TIER_KEY = "tb_tier";
const SPLASH_KEY = "tb_splash_seen";
const ONBOARD_KEY = "tb_onboard_done";

export type Tier = "free" | "pro" | "elite" | "locked";

export function startTrial() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(TRIAL_KEY)) {
    localStorage.setItem(TRIAL_KEY, Date.now().toString());
    localStorage.setItem(TIER_KEY, "free");
  }
}

export function daysLeftInTrial(): number {
  if (typeof window === "undefined") return 7;
  const start = localStorage.getItem(TRIAL_KEY);
  if (!start) return 7;
  const elapsed = Date.now() - Number(start);
  const days = 7 - Math.floor(elapsed / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

export function getTier(): Tier {
  if (typeof window === "undefined") return "free";
  const t = localStorage.getItem(TIER_KEY) as Tier | null;
  if (!t) return "free";
  if (t === "free" && daysLeftInTrial() <= 0) {
    localStorage.setItem(TIER_KEY, "locked");
    return "locked";
  }
  return t;
}

export function setTier(tier: Tier) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIER_KEY, tier);
}

export function hasSeenSplash(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SPLASH_KEY) === "1";
}

export function markSplashSeen() {
  if (typeof window === "undefined") return;
  localStorage.setItem(SPLASH_KEY, "1");
}

export function isOnboardingDone(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARD_KEY) === "1";
}

export function completeOnboarding() {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARD_KEY, "1");
}
