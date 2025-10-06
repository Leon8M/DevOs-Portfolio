"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWindowStore } from "@/lib/store/windowStore";
import { projects } from "@/lib/data/projects";
import { skills } from "@/lib/data/skills";
import MyResume from "./MyResume";
import ProjectDetailWindow from "./ProjectDetailWindow";
import moment from "moment";

interface CommandOutput {
  type: "command" | "response" | "error";
  text: string | JSX.Element;
}

const DevShell: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<CommandOutput[]>([
    {
      type: "response",
      text: "Welcome to DevShell. Type 'help' for a list of commands.",
    },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { addWindow } = useWindowStore();
  const [cwd, setCwd] = useState("C:\\Users\\Guest");

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (command: string) => {
    const lower = command.toLowerCase().trim();
    const [main, ...args] = lower.split(" ");
    let response: string | JSX.Element = "";
    let type: "response" | "error" = "response";

    switch (main) {
      case "help":
        response = `Available commands:
- help: Show this help message.
- whoami: Display user info.
- ls / dir: List items.
- cd <dir>: Change directory.
- view --projects: List projects.
- open <project>: Open a project window.
- list skills: Show skill categories.
- show resume: Open resume.
- clear: Clear screen.
- date: Show date/time.
- echo <msg>: Echo text.
- exit: Close shell.`;
        break;

      case "whoami":
        response =
          "You are a curious developer exploring LeonOS — a Windows XP-inspired portfolio.";
        break;

      case "ls":
      case "dir":
        response = `Directory listing for "${cwd}":
AboutMe.txt  Projects  Contact.txt  DevShell.exe`;
        break;

      case "cd":
        if (!args[0]) {
          type = "error";
          response = "Usage: cd <directory>";
        } else if (args[0] === "..") {
          const parts = cwd.split("\\");
          if (parts.length > 2) {
            const newDir = parts.slice(0, -1).join("\\");
            setCwd(newDir);
            response = `Changed directory to ${newDir}`;
          } else {
            type = "error";
            response = "Cannot go higher than root directory.";
          }
        } else if (args[0] === "projects") {
          setCwd("C:\\Users\\Guest\\Projects");
          response = "Changed directory to C:\\Users\\Guest\\Projects";
        } else {
          type = "error";
          response = `Directory not found: ${args[0]}`;
        }
        break;

      case "view":
        if (args[0] === "--projects") {
          response = (
            <div>
              <p>--- Portfolio Projects ---</p>
              {projects.map((p) => (
                <p key={p.id}>
                  • {p.title} (ID: {p.id})
                </p>
              ))}
              <p>Type 'open &lt;project-id&gt;' to view details.</p>
            </div>
          );
        } else {
          type = "error";
          response = "Usage: view --projects";
        }
        break;

      case "open":
        if (!args[0]) {
          type = "error";
          response = "Usage: open <project-name>";
        } else {
          const name = args.join(" ");
          const project = projects.find(
            (p) => p.title.toLowerCase() === name
          );
          if (project) {
            addWindow(
              `project-${project.id}`,
              `${project.title} - Details`,
              <ProjectDetailWindow project={project} />,
              { x: 100, y: 100 }
            );
            response = `Opening ${project.title}...`;
          } else {
            type = "error";
            response = `Project '${name}' not found.`;
          }
        }
        break;

      case "list":
        if (args[0] === "skills") {
          response = (
            <div>
              <p>--- Skills ---</p>
              {skills.map((cat) => (
                <div key={cat.category}>
                  <p className="font-bold text-white">{cat.category}</p>
                  <p>{cat.skills.join(", ")}</p>
                </div>
              ))}
            </div>
          );
        } else {
          type = "error";
          response = "Usage: list skills";
        }
        break;

      case "show":
        if (args[0] === "resume") {
          addWindow("resume", "My Resume", <MyResume />);
          response = "Opening My Resume...";
        } else {
          type = "error";
          response = "Usage: show resume";
        }
        break;

      case "clear":
        setOutput([]);
        response = "";
        break;

      case "date":
        response = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
        break;

      case "echo":
        response = args.join(" ");
        break;

      case "exit":
        response = "Exiting DevShell... (Click 'X' to close the window)";
        break;

      default:
        type = "error";
        response = `Command not found: ${command}. Type 'help' for a list of commands.`;
        break;
    }

    setOutput((prev) => [
      ...prev,
      { type: "command", text: `${cwd}> ${command}` },
      ...(response ? [{ type, text: response }] : []),
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="p-4 bg-black text-green-400 font-mono flex flex-col h-full">
      <div
        ref={terminalRef}
        className="flex-grow overflow-y-auto pr-2 custom-scrollbar-devshell"
      >
        {output.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.type === "command"
                ? "text-white"
                : line.type === "error"
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex mt-2 flex-shrink-0">
        <span className="text-white mr-2">{cwd}&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none text-green-400 caret-green-400"
          autoFocus
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default DevShell;
