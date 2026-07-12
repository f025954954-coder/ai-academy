export interface Commit {
  id: string;
  parentIds: string[];
  branch: string;
  message: string;
  order: number;
}

export interface GitState {
  commits: Commit[];
  branches: Record<string, string | null>; // branch name -> head commit id
  currentBranch: string;
  staged: string[];
  nextOrder: number;
}

export function createInitialGitState(): GitState {
  return {
    commits: [],
    branches: { main: null },
    currentBranch: "main",
    staged: [],
    nextOrder: 0,
  };
}

function shortId(n: number) {
  return (n * 7919).toString(16).slice(0, 7).padStart(7, "0");
}

export interface GitCommandResult {
  output: string;
  isError?: boolean;
}

export function runGitCommand(state: GitState, rawInput: string): GitCommandResult {
  const input = rawInput.trim();
  if (!input.startsWith("git ")) {
    return { output: "פקודות חייבות להתחיל ב-'git ' (למשל: git commit -m \"...\")", isError: true };
  }
  const rest = input.slice(4).trim();
  const [sub, ...args] = rest.split(/\s+/);

  switch (sub) {
    case "init":
      return { output: "אתחלתי מאגר Git ריק בענף main." };

    case "add": {
      const file = args[0] ?? ".";
      state.staged.push(file);
      return { output: `נוסף לאזור ההכנה (staging): ${file}` };
    }

    case "status": {
      return {
        output: `ענף נוכחי: ${state.currentBranch}\nקבצים מוכנים לקומיט: ${state.staged.join(", ") || "(אין)"}`,
      };
    }

    case "commit": {
      const msgMatch = rest.match(/-m\s+"([^"]+)"/);
      const message = msgMatch?.[1];
      if (!message) return { output: 'שימוש: git commit -m "הודעת קומיט"', isError: true };
      if (state.staged.length === 0)
        return { output: "אין קבצים ב-staging. הרץ קודם git add.", isError: true };

      const parentId = state.branches[state.currentBranch];
      const id = shortId(state.nextOrder);
      const commit: Commit = {
        id,
        parentIds: parentId ? [parentId] : [],
        branch: state.currentBranch,
        message,
        order: state.nextOrder,
      };
      state.commits.push(commit);
      state.branches[state.currentBranch] = id;
      state.nextOrder++;
      state.staged = [];
      return { output: `[${state.currentBranch} ${id}] ${message}` };
    }

    case "branch": {
      if (!args[0]) return { output: Object.keys(state.branches).join("\n") };
      const headOfCurrent = state.branches[state.currentBranch];
      state.branches[args[0]] = headOfCurrent ?? null;
      return { output: `נוצר ענף חדש: ${args[0]} (מצביע לאותו commit כמו ${state.currentBranch})` };
    }

    case "checkout": {
      const branchName = args[0] === "-b" ? args[1] : args[0];
      if (!branchName) return { output: "שימוש: git checkout <ענף>", isError: true };
      if (args[0] === "-b") {
        state.branches[branchName] = state.branches[state.currentBranch] ?? null;
      }
      if (!(branchName in state.branches))
        return { output: `checkout: אין ענף בשם ${branchName}`, isError: true };
      state.currentBranch = branchName;
      return { output: `עברת לענף: ${branchName}` };
    }

    case "merge": {
      const source = args[0];
      if (!source) return { output: "שימוש: git merge <ענף>", isError: true };
      const sourceHead = state.branches[source];
      const targetHead = state.branches[state.currentBranch];
      if (!sourceHead) return { output: `merge: הענף ${source} ריק`, isError: true };
      const id = shortId(state.nextOrder);
      const commit: Commit = {
        id,
        parentIds: targetHead ? [targetHead, sourceHead] : [sourceHead],
        branch: state.currentBranch,
        message: `Merge branch '${source}' into ${state.currentBranch}`,
        order: state.nextOrder,
      };
      state.commits.push(commit);
      state.branches[state.currentBranch] = id;
      state.nextOrder++;
      return { output: `מוזג ${source} לתוך ${state.currentBranch} — נוצר merge commit ${id}` };
    }

    case "log": {
      const lines: string[] = [];
      let cur = state.branches[state.currentBranch];
      const byId = new Map(state.commits.map((c) => [c.id, c]));
      while (cur) {
        const c = byId.get(cur);
        if (!c) break;
        lines.push(`${c.id}  ${c.message}`);
        cur = c.parentIds[0];
      }
      return { output: lines.join("\n") || "(אין קומיטים עדיין)" };
    }

    default:
      return { output: `git: '${sub}' אינה פקודה מוכרת בסימולטור זה`, isError: true };
  }
}
