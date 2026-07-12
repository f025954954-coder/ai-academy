export interface VNode {
  type: "dir" | "file";
  children?: Record<string, VNode>;
  content?: string;
}

export interface ShellState {
  root: VNode;
  cwd: string[]; // e.g. ["home", "student"]
}

export function createDefaultFS(): VNode {
  return {
    type: "dir",
    children: {
      home: {
        type: "dir",
        children: {
          student: {
            type: "dir",
            children: {
              "notes.txt": { type: "file", content: "פגישה עם המנטור ביום שלישי\nלסיים תרגיל טרמינל" },
              projects: {
                type: "dir",
                children: {
                  "readme.md": { type: "file", content: "# הפרויקט הראשון שלי\nנבנה באקדמיית AI." },
                },
              },
              logs: {
                type: "dir",
                children: {
                  "app.log": {
                    type: "file",
                    content: "INFO server started\nERROR connection timeout\nINFO retry succeeded",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}

function resolvePath(root: VNode, cwd: string[], target: string): string[] | null {
  let parts: string[];
  if (target.startsWith("/")) {
    parts = target.split("/").filter(Boolean);
  } else {
    parts = [...cwd];
    for (const seg of target.split("/").filter(Boolean)) {
      if (seg === "..") parts.pop();
      else if (seg === ".") continue;
      else parts.push(seg);
    }
  }
  return parts;
}

function getNode(root: VNode, parts: string[]): VNode | null {
  let node = root;
  for (const p of parts) {
    if (node.type !== "dir" || !node.children?.[p]) return null;
    node = node.children[p];
  }
  return node;
}

export interface CommandResult {
  output: string;
  newCwd?: string[];
  isError?: boolean;
}

export function runCommand(state: ShellState, rawInput: string): CommandResult {
  const input = rawInput.trim();
  if (!input) return { output: "" };
  const [cmd, ...args] = input.split(/\s+/);

  switch (cmd) {
    case "help":
      return {
        output:
          "פקודות זמינות: pwd, ls, cd <path>, cat <file>, mkdir <name>, touch <name>, rm <name>, grep <text> <file>, echo <text>, clear",
      };

    case "pwd":
      return { output: "/" + state.cwd.join("/") };

    case "ls": {
      const targetParts = args[0] ? resolvePath(state.root, state.cwd, args[0]) : state.cwd;
      if (!targetParts) return { output: `ls: נתיב לא חוקי`, isError: true };
      const node = getNode(state.root, targetParts);
      if (!node || node.type !== "dir") return { output: `ls: אין תיקייה כזו`, isError: true };
      const entries = Object.entries(node.children ?? {}).map(
        ([name, n]) => (n.type === "dir" ? name + "/" : name)
      );
      return { output: entries.join("  ") || "(תיקייה ריקה)" };
    }

    case "cd": {
      if (!args[0]) return { output: "", newCwd: ["home", "student"] };
      const targetParts = resolvePath(state.root, state.cwd, args[0]);
      if (!targetParts) return { output: `cd: נתיב לא חוקי`, isError: true };
      const node = getNode(state.root, targetParts);
      if (!node || node.type !== "dir")
        return { output: `cd: ${args[0]}: אין תיקייה כזו`, isError: true };
      return { output: "", newCwd: targetParts };
    }

    case "cat": {
      if (!args[0]) return { output: "cat: נא לציין קובץ", isError: true };
      const targetParts = resolvePath(state.root, state.cwd, args[0]);
      if (!targetParts) return { output: `cat: נתיב לא חוקי`, isError: true };
      const node = getNode(state.root, targetParts);
      if (!node || node.type !== "file")
        return { output: `cat: ${args[0]}: אין קובץ כזה`, isError: true };
      return { output: node.content ?? "" };
    }

    case "mkdir": {
      if (!args[0]) return { output: "mkdir: נא לציין שם תיקייה", isError: true };
      const parent = getNode(state.root, state.cwd);
      if (!parent || parent.type !== "dir") return { output: "mkdir: שגיאה", isError: true };
      parent.children = parent.children ?? {};
      parent.children[args[0]] = { type: "dir", children: {} };
      return { output: `נוצרה תיקייה: ${args[0]}` };
    }

    case "touch": {
      if (!args[0]) return { output: "touch: נא לציין שם קובץ", isError: true };
      const parent = getNode(state.root, state.cwd);
      if (!parent || parent.type !== "dir") return { output: "touch: שגיאה", isError: true };
      parent.children = parent.children ?? {};
      parent.children[args[0]] = { type: "file", content: "" };
      return { output: `נוצר קובץ: ${args[0]}` };
    }

    case "rm": {
      if (!args[0]) return { output: "rm: נא לציין שם", isError: true };
      const parent = getNode(state.root, state.cwd);
      if (!parent?.children?.[args[0]]) return { output: `rm: ${args[0]}: לא נמצא`, isError: true };
      delete parent.children[args[0]];
      return { output: `נמחק: ${args[0]}` };
    }

    case "grep": {
      if (args.length < 2) return { output: "grep: שימוש: grep <טקסט> <קובץ>", isError: true };
      const [needle, file] = args;
      const targetParts = resolvePath(state.root, state.cwd, file);
      const node = targetParts && getNode(state.root, targetParts);
      if (!node || node.type !== "file") return { output: `grep: ${file}: אין קובץ כזה`, isError: true };
      const matches = (node.content ?? "")
        .split("\n")
        .filter((line) => line.includes(needle));
      return { output: matches.join("\n") || "(אין התאמות)" };
    }

    case "echo":
      return { output: args.join(" ") };

    case "clear":
      return { output: "\x00CLEAR\x00" };

    default:
      return { output: `${cmd}: פקודה לא מוכרת. הקלד 'help' לרשימת הפקודות.`, isError: true };
  }
}
