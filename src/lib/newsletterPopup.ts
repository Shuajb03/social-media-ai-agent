const KEY = "skubi-newsletter-popup-dismissed";

export function hasNewsletterPopupBeenDismissed() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEY) === "1";
}

export function markNewsletterPopupDismissed() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, "1");
}
