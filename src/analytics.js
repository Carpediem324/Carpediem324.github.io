// Public site code, not an API token. Rebuild after changing this value.
export const analyticsConfig = {
  siteCode: "YOUR_GOATCOUNTER_CODE",
};

export function getAnalyticsOrigin() {
  const code = analyticsConfig.siteCode;
  return /^[a-z0-9][a-z0-9-]*$/.test(code) ? `https://${code}.goatcounter.com` : null;
}

let tracker;

function loadTracker() {
  if (tracker) return tracker;
  const origin = getAnalyticsOrigin();
  // Keep development/preview traffic out of production statistics.
  if (!origin || import.meta.env.DEV || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)) {
    return Promise.resolve(null);
  }
  tracker = new Promise((resolve) => {
    window.goatcounter = { no_onload: true };
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = `${origin}/count`;
    const timeout = window.setTimeout(() => resolve(null), 8000);
    script.onload = () => {
      window.clearTimeout(timeout);
      resolve(window.goatcounter);
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return tracker;
}

export function trackPage(page) {
  const paths = { home: "/", profile: "/profile", projects: "/projects" };
  // Count tab transitions, not theme/language changes. Sessions deduplicate paths.
  void loadTracker().then((counter) => {
    counter?.count({ path: paths[page], title: `Portfolio | ${page}` });
  }).catch(() => {});
}

export async function fetchVisitorCount(origin, today, signal) {
  // Public counter = visits to '/', NOT a sum of paths or lifetime unique people.
  const url = new URL(`${origin}/counter/${encodeURIComponent("/")}.json`);
  if (today) {
    // Use UTC calendar dates consistently with the documented dashboard setup.
    const date = new Date().toISOString().slice(0, 10);
    url.searchParams.set("start", date);
    // No end: today from 00:00 UTC through the latest recorded visit.
  }
  const response = await fetch(url, { signal, credentials: "omit" });
  if (!response.ok) throw new Error("Visitor counter unavailable");
  const { count } = await response.json();
  // GoatCounter returns a formatted string. Never insert server HTML.
  if (typeof count !== "string" || !/^\d[\d, .\u00a0\u202f]*$/.test(count)) {
    throw new Error("Invalid visitor count");
  }
  return count;
}
