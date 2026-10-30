"use client";

import React, { useEffect, useRef, useState } from "react";
import { useWindowStore } from "@/lib/store/windowStore";
import { openFile, openFolder, openPath } from "@/lib/launcher";
import { profile } from "@/lib/data/profile";
import {
  type FsNode,
  type Path,
  PATHS,
  displayName,
  getNode,
  pathToString,
  resolvePath,
  sizeLabel,
} from "@/lib/fs";

interface Line {
  type: "command" | "response" | "error";
  text: string;
}

const HELP = `LeonOS DevShell. Commands work on the real LeonOS file system.

  dir / ls             List the current folder
  cd <folder>          Change folder  (cd .. , cd "My Projects", cd c:\\program files)
  type <file>          Print a text file  (alias: cat)
  start <name>         Open a file or folder in its window  (alias: open)
  tree                 Show the folder tree below here
  whoami               Who built this
  resume               Open my resume
  date / ver / echo    The classics
  cls / clear          Clear the screen
  exit                 Close DevShell

Tab completes names, Up/Down recall previous commands.`;

/** Split a command line into words, honouring "quoted names with spaces". */
const tokenize = (line: string) => (line.match(/"[^"]*"|\S+/g) ?? []).map((w) => w.replace(/^"(.*)"$/, "$1"));

const childrenOf = (path: Path): FsNode[] => {
  const node = getNode(path);
  return node?.kind === "folder" ? node.children : [];
};

function listing(path: Path): string {
  const children = childrenOf(path);
  const rows = children.map((c) => {
    const kind = c.kind === "folder" ? "<DIR>     " : sizeLabel(c).padStart(10);
    return `${kind}  ${c.name}`;
  });
  const dirs = children.filter((c) => c.kind === "folder").length;
  return [
    ` Directory of ${pathToString(path)}`,
    "",
    ...rows,
    `${String(children.length - dirs).padStart(16)} File(s)`,
    `${String(dirs).padStart(16)} Dir(s)`,
  ].join("\n");
}

function tree(path: Path, prefix = ""): string[] {
  const folders = childrenOf(path).filter((c) => c.kind === "folder");
  return folders.flatMap((f, i) => {
    const last = i === folders.length - 1;
    return [`${prefix}${last ? "└── " : "├── "}${f.name}`, ...tree([...path, f.name], `${prefix}${last ? "    " : "│   "}`)];
  });
}

export default function DevShell({ windowId }: { windowId: string }) {
  const [cwd, setCwd] = useState<Path>(PATHS.home);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [lines, setLines] = useState<Line[]>([
    { type: "response", text: `LeonOS DevShell [Version 2.0]\nType 'help' to see what you can do.\n` },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const removeWindow = useWindowStore((s) => s.removeWindow);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const prompt = `${pathToString(cwd)}>`;

  const run = (line: string): Line | null => {
    const [rawCmd = "", ...args] = tokenize(line);
    const cmd = rawCmd.toLowerCase();
    const arg = args.join(" ");
    const ok = (text: string): Line => ({ type: "response", text });
    const fail = (text: string): Line => ({ type: "error", text });

    switch (cmd) {
      case "help":
      case "?":
        return ok(HELP);
      case "dir":
      case "ls":
        return ok(listing(cwd));
      case "cd":
      case "chdir": {
        if (!arg) return ok(pathToString(cwd));
        const target = resolvePath(cwd, arg);
        const node = target && getNode(target);
        if (!target || !node || node.kind !== "folder" || target.length === 0) {
          return fail("The system cannot find the path specified.");
        }
        setCwd(target);
        return null;
      }
      case "type":
      case "cat": {
        const target = resolvePath(cwd, arg);
        const node = target && getNode(target);
        if (!node) return fail("The system cannot find the file specified.");
        if (node.kind === "folder") return fail("Access is denied. (That's a folder: try 'cd' or 'dir'.)");
        if (node.type !== "text") return fail(`'${node.name}' isn't a text file. Try: start "${node.name}"`);
        return ok(node.text ?? "");
      }
      case "start":
      case "open": {
        if (!arg) return fail('Usage: start <file or folder>   e.g. start "My Projects"');
        const target = resolvePath(cwd, arg);
        const node = target && getNode(target);
        if (!target || !node) return fail(`Windows cannot find '${arg}'.`);
        if (node.kind === "folder") openFolder(target);
        else openFile(node, target);
        return ok(`Opening ${displayName(node)}...`);
      }
      case "tree":
        return ok([pathToString(cwd), ...tree(cwd)].join("\n"));
      case "whoami":
        return ok(`${profile.name}, ${profile.title}\n${profile.location} | ${profile.email}`);
      case "resume":
        openPath(PATHS.resume);
        return ok("Opening Resume.pdf...");
      case "date":
        return ok(new Date().toString());
      case "ver":
        return ok("LeonOS Portfolio Edition [Version 2.0]\nBuilt with Next.js, React and TypeScript.");
      case "echo":
        return ok(arg);
      case "cls":
      case "clear":
        setLines([]);
        return null;
      case "exit":
        removeWindow(windowId);
        return null;
      case "sudo":
        return fail("Nice try. This incident will be reported.");
      default:
        return fail(`'${rawCmd}' is not recognized as an internal or external command.\nType 'help' for a list of commands.`);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const line = input.trim();
    setInput("");
    setHistoryIndex(null);
    if (!line) {
      setLines((l) => [...l, { type: "command", text: prompt }]);
      return;
    }
    setHistory((h) => [...h, line]);
    const echo: Line = { type: "command", text: `${prompt}${line}` };
    const result = run(line);
    if (["cls", "clear"].includes(line.toLowerCase())) return;
    setLines((l) => [...l, echo, ...(result ? [result, { type: "response" as const, text: "" }] : [])]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (!history.length) return;
      const next =
        e.key === "ArrowUp"
          ? historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
          : historyIndex === null ? null : historyIndex + 1 >= history.length ? null : historyIndex + 1;
      setHistoryIndex(next);
      setInput(next === null ? "" : history[next]);
    } else if (e.key === "Tab") {
      // Complete the last word against names in the current folder.
      e.preventDefault();
      const match = input.match(/^(.*?\s)?"?([^"]*)$/);
      const before = match?.[1] ?? "";
      const partial = (match?.[2] ?? "").toLowerCase();
      const hit = childrenOf(cwd).find((c) => c.name.toLowerCase().startsWith(partial));
      if (hit) setInput(`${before}${hit.name.includes(" ") ? `"${hit.name}"` : hit.name}`);
    }
  };

  return (
    <div className="flex h-full flex-col bg-black p-2 font-mono text-[13px] text-[#c0c0c0]" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto pr-1 custom-scrollbar-devshell">
        {lines.map((line, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-words font-mono ${
              line.type === "command" ? "text-white" : line.type === "error" ? "text-[#ff6b6b]" : "text-[#4cd964]"
            }`}
          >
            {line.text}
          </pre>
        ))}
        <form onSubmit={submit} className="flex">
          <span className="whitespace-pre text-white">{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="DevShell command"
            className="min-w-0 flex-1 bg-transparent text-white caret-white outline-none"
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
