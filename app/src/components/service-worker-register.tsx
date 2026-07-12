"use client";

import { useEffect } from "react";

/**
 * רושם Service Worker לתמיכת PWA/אופליין — רק בסביבת production.
 * חשוב: בדפדוף לא לרשום ב-dev — ה-SW עלול להגיש קבצי JS מהקאש במקום את הגרסה החדשה
 * מ-Turbopack/HMR, מה שגורם לבאגים "רפאים" שנראים כאילו קוד חדש לא נטען (זו בדיוק התקלה
 * שתפסנו: שינוי אמיתי בקוד לא השתקף בדפדפן כי ה-SW הגיש עותק ישן מהקאש).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
