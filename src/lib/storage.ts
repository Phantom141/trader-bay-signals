export type TierId = "free" | "pro" | "elite" | "locked";

const TRIAL_KEY = "tb_trial_start";
const TIER_KEY = "tb_tier";
const ONBOARD_KEY = "tb_onboard";
const SPLASH_KEY = "tb_splash_seen";
const TRIAL_DAYS = 7;

export function getTrialStart(): number | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(TRIAL_KEY);
  return v ? Number(v) : null;
}

export function startTrial(): void {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(TRIAL_KEY)) {
    localStorage.setItem(TRIAL_KEY, String(Date.now()));
    localStorage.setItem(TIER_KEY, "free");
  }
}

export function getTier(): TierId {
  if (typeof window === "undefined") return "free";
  const stored = localStorage.getItem(TIER_KEY) as TierId | null;
  if (stored === "pro" || stored === "elite") return stored;
  const start = getTrialStart();
  if (!start) return "free";
  const days = (Date.now() - start) / (1000 * 60 * 60 * 24);
  if (days > TRIAL_DAYS) {
    localStorage.setItem(TIER_KEY, "locked");
    return "locked";
  }
  return "free";
}

export function setTier(tier: TierId) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIER_KEY, tier);
}

export function isOnboardingDone(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(ONBOARD_KEY) === "1";
}

export function completeOnboarding() {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARD_KEY, "1");
}

export function hasSeenSplash(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SPLASH_KEY) === "1";
}

export function markSplashSeen() {
  if (typeof window === "undefined") return;
  localStorage.setItem(SPLASH_KEY, "1");
}

export function daysLeftInTrial(): number {
  const start = getTrialStart();
  if (!start) return TRIAL_DAYS;
  const days = (Date.now() - start) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(TRIAL_DAYS - days));
}
