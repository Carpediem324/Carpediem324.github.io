import React from "react";
import { fetchVisitorCount, getAnalyticsOrigin } from "./analytics.js";

export default function VisitorCounter({ lang }) {
  const [counts, setCounts] = React.useState({ today: "--", total: "--" });

  React.useEffect(() => {
    const origin = getAnalyticsOrigin();
    if (!origin) return undefined;
    let disposed = false;
    let current;
    const refresh = async () => {
      current?.abort();
      const controller = new AbortController();
      current = controller;
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      const results = await Promise.allSettled([
        fetchVisitorCount(origin, true, controller.signal),
        fetchVisitorCount(origin, false, controller.signal),
      ]);
      window.clearTimeout(timeout);
      if (!disposed && current === controller) {
        setCounts({
          today: results[0].status === "fulfilled" ? results[0].value : "--",
          total: results[1].status === "fulfilled" ? results[1].value : "--",
        });
      }
    };
    void refresh();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 60000);
    return () => {
      disposed = true;
      current?.abort();
      window.clearInterval(interval);
    };
  }, []);

  const ko = lang === "ko";
  return (
    <aside className="visitor-counter" aria-label={ko ? "방문 통계" : "Visitor statistics"}
      title={ko ? "홈 방문 수 · TODAY는 UTC 기준 · 세션 내 중복 제외" : "Home visits · TODAY uses UTC · Deduplicated within sessions"}>
      <dl aria-live="polite" aria-atomic="true">
        {[ ["today", "TODAY"], ["total", "TOTAL"] ].map(([key, label]) => (
          <div key={key}>
            <dt>{label}<span className="visitor-sr-only">{ko ? (key === "today" ? " 금일 방문 수 (UTC)" : " 누적 방문 수") : " visits"}</span></dt>
            <dd aria-label={counts[key] === "--" ? (ko ? "통계 확인 불가" : "Statistics unavailable") : undefined}>{counts[key]}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
