export type Difficulty = "מתחיל" | "בינוני" | "מתקדם";

export interface LessonSummary {
  slug: string;
  title: string;
  objectives: string[];
  estMinutes: number;
  difficulty: Difficulty;
  prerequisites: string[];
}

export interface ModuleSummary {
  slug: string;
  title: string;
  description: string;
  projectBrief: string;
  lessons: LessonSummary[];
  isCapstone?: boolean;
}

export interface TrackSummary {
  slug: string;
  order: number;
  title: string;
  goal: string;
  color: string;
  modules: ModuleSummary[];
}
