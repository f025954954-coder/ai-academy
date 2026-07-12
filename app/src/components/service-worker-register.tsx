"use client";

import { useEffect } from "react";

/** רושם Service Worker לתמיכת PWA/אופליין. שקט לחלוטין בכשלון (למשל בסביבת פיתוח ללא HTTPS). */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
