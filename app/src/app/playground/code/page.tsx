"use client";

import { CodePlayground } from "@/components/playground/code-playground";

export default function CodePlaygroundPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-extrabold">מעבדת קוד</h1>
      <p className="mt-2 text-muted">כתוב JavaScript, הרץ, וראה את הפלט מיד</p>
      <div className="mt-8">
        <CodePlayground
          initialCode={`console.log("שלום, אקדמיית AI!");\nconst sum = (a, b) => a + b;\nconsole.log("2 + 3 =", sum(2, 3));`}
        />
      </div>
    </div>
  );
}
