import {
  Lightbulb,
  GitCompare,
  Ban,
  AlertTriangle,
  Gauge,
  DollarSign,
  Shield,
  Wrench,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * רכיב תוכן אחיד לכל האקדמיה: "לחשוב כמו מהנדס AI" — לא רק "איך", אלא גם "למה".
 * לשימוש בכל שיעור AI מרכזי (Claude Code, MCP, RAG, Agents וכו') כדי לשמור על עקביות.
 * כל שדה אופציונלי — מלא רק את מה שרלוונטי לנושא השיעור.
 */

export interface EngineeringInsightsProps {
  why?: string;
  alternatives?: string;
  whenNotTo?: string;
  commonMistakes?: string;
  performance?: string;
  cost?: string;
  security?: string;
  maintenance?: string;
  realWorld?: string;
}

const FIELD_CONFIG: {
  key: keyof EngineeringInsightsProps;
  label: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { key: "why", label: "למה בחרו בגישה הזו", icon: Lightbulb, color: "#5b5bf6" },
  { key: "alternatives", label: "אילו חלופות קיימות", icon: GitCompare, color: "#22d3ee" },
  { key: "whenNotTo", label: "מתי לא כדאי להשתמש בה", icon: Ban, color: "#f87171" },
  { key: "commonMistakes", label: "טעויות נפוצות", icon: AlertTriangle, color: "#fbbf24" },
  { key: "performance", label: "שיקולי ביצועים", icon: Gauge, color: "#34d399" },
  { key: "cost", label: "שיקולי עלות", icon: DollarSign, color: "#f59e0b" },
  { key: "security", label: "שיקולי אבטחה", icon: Shield, color: "#ef4444" },
  { key: "maintenance", label: "שיקולי תחזוקה", icon: Wrench, color: "#818cf8" },
  { key: "realWorld", label: "איך זה נראה במערכות אמיתיות", icon: Building2, color: "#7c7cfd" },
];

export function EngineeringInsights(props: EngineeringInsightsProps) {
  const active = FIELD_CONFIG.filter((f) => props[f.key]);
  if (active.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {active.map(({ key, label, icon: Icon, color }) => (
        <div key={key} className="rounded-xl border border-border bg-card p-4">
          <div className="mb-1.5 flex items-center gap-2 text-sm font-bold" style={{ color }}>
            <Icon size={15} /> {label}
          </div>
          <p className="text-sm text-muted">{props[key]}</p>
        </div>
      ))}
    </div>
  );
}
