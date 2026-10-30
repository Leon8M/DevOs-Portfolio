// LeonOS virtual file system.
//
// Everything a visitor can browse (Explorer windows, the desktop, DevShell's `dir`/`cd`/`type`)
// is this one tree, generated from the typed data in src/lib/data. Update the data, and the
// files, folders and their contents follow.
//
// A path is an array of segments starting at the drive: ["C:", "Documents and Settings", ...].
// The empty path [] is "My Computer", the virtual root above the drives.

import { projects, type Project } from "./data/projects";
import { experience } from "./data/experience";
import { education } from "./data/education";
import { skills } from "./data/skills";
import { profile, socials, leadership, certificates } from "./data/profile";

export type AppId =
  | "explorer"
  | "notepad"
  | "pictures"
  | "pdf"
  | "devshell"
  | "calculator"
  | "calendar"
  | "contact"
  | "display"
  | "system";

export type ViewMode = "thumbnails" | "tiles" | "icons" | "details";
export type FileType = "text" | "pdf" | "image" | "link" | "app" | "shortcut";
export type Path = string[];

interface BaseNode {
  /** Path segment and default display name. */
  name: string;
  /** Display name when it differs from the path segment, e.g. "Local Disk (C:)" for "C:". */
  label?: string;
  icon?: string;
  /** One-line description for the Details pane and tiles view. */
  info?: string;
  /** Heading the item is grouped under in Explorer ("Show in Groups"). */
  group?: string;
}

export interface FolderNode extends BaseNode {
  kind: "folder";
  children: FsNode[];
  view?: ViewMode;
  /** Image shown for this folder in Thumbnails view. */
  thumbnail?: string;
  drive?: boolean;
}

export interface FileNode extends BaseNode {
  kind: "file";
  type: FileType;
  text?: string;
  /** Asset path for images and PDFs. */
  src?: string;
  /** URL for Internet Shortcuts. */
  url?: string;
  app?: AppId;
  /** Where a shortcut points. */
  target?: Path;
  /** Show the shortcut arrow overlay. */
  arrow?: boolean;
}

export type FsNode = FolderNode | FileNode;

// ------------------------------------------------------------------ well-known paths
const HOME: Path = ["C:", "Documents and Settings", "Leon"];
export const PATHS = {
  myComputer: [] as Path,
  cDrive: ["C:"],
  home: HOME,
  desktop: [...HOME, "Desktop"],
  favorites: [...HOME, "Favorites"],
  myDocuments: [...HOME, "My Documents"],
  aboutMe: [...HOME, "My Documents", "About Me.txt"],
  resume: [...HOME, "My Documents", "Resume.pdf"],
  projects: [...HOME, "My Documents", "My Projects"],
  experience: [...HOME, "My Documents", "Experience"],
  education: [...HOME, "My Documents", "Education"],
  certificates: [...HOME, "My Documents", "Education", "Certificates"],
  programFiles: ["C:", "Program Files"],
  recycleBin: ["C:", "RECYCLER"],
};

export const ICONS = {
  folder: "/xp-icons/fs/folder.svg",
  text: "/xp-icons/fs/text.svg",
  image: "/xp-icons/fs/image.svg",
  pdf: "/xp-icons/fs/pdf.svg",
  link: "/xp-icons/Internet Shortcut.png",
  app: "/xp-icons/fs/exe.svg",
  drive: "/xp-icons/fs/drive.svg",
  recycle: "/xp-icons/fs/recycle.svg",
  notepad: "/xp-icons/fs/notepad.svg",
  myComputer: "/xp-icons/my-computer-icon.png",
  myDocuments: "/xp-icons/my-documents-icon.png",
  projects: "/xp-icons/projects-icon.png",
  experience: "/xp-icons/experience-icon.png",
  education: "/xp-icons/education-icon.png",
  devshell: "/xp-icons/terminal-icon.png",
  contact: "/xp-icons/contact-me-icon.png",
  calculator: "/xp-icons/calculator-icon.png",
  calendar: "/xp-icons/calendar-icon.png",
  display: "/xp-icons/control-panel-icon.png",
  system: "/xp-icons/info-icon.png",
  user: "/xp-icons/about-me-icon.png",
};

// ------------------------------------------------------------------ node builders
const folder = (name: string, children: FsNode[], extra: Partial<FolderNode> = {}): FolderNode => ({
  kind: "folder",
  name,
  children,
  ...extra,
});
const textFile = (name: string, text: string, extra: Partial<FileNode> = {}): FileNode => ({
  kind: "file",
  type: "text",
  name,
  text,
  ...extra,
});
const linkFile = (name: string, url: string, extra: Partial<FileNode> = {}): FileNode => ({
  kind: "file",
  type: "link",
  name: `${name}.url`,
  url,
  info: url.replace(/^(https?:\/\/|mailto:)/, "").replace(/\/$/, ""),
  ...extra,
});
const appFile = (name: string, app: AppId, icon: string, info: string): FileNode => ({
  kind: "file",
  type: "app",
  name: `${name}.exe`,
  app,
  icon,
  info,
});
const shortcut = (name: string, target: Path, icon: string, extra: Partial<FileNode> = {}): FileNode => ({
  kind: "file",
  type: "shortcut",
  name,
  target,
  icon,
  arrow: true,
  ...extra,
});

/** Notepad-style heading: TITLE followed by a rule of the same length. */
const heading = (title: string, rule = "=") => `${title}\n${rule.repeat(title.length)}`;
const bullets = (items: string[]) => items.map((item) => `  - ${item}`).join("\n");

// ------------------------------------------------------------------ text documents
const aboutMeText = [
  heading("ABOUT ME"),
  "",
  `Name:       ${profile.name} (${profile.altName.split(" ")[1]})`,
  `Role:       ${profile.title}`,
  `Location:   ${profile.location}`,
  `Status:     ${profile.availability}`,
  `Email:      ${profile.email}`,
  `Phone:      ${profile.phone}`,
  "",
  heading("Hello", "-"),
  profile.summary,
  "",
  heading("What I work on", "-"),
  bullets(profile.focus),
  "",
  heading("Right now", "-"),
  `${experience[0].role} at ${experience[0].company} (${experience[0].duration}).`,
  experience[0].summary,
  "",
  heading("Find me", "-"),
  ...socials.map((s) => `${s.name.padEnd(10)}  ${s.url}`),
  `${"Email".padEnd(10)}  ${profile.email}`,
  "",
  heading("Getting around LeonOS", "-"),
  "Everything on this desktop is a real file or folder. Double-click to open.",
  "  - My Projects      case studies, screenshots, live demos and source code",
  "  - Experience       one document per role",
  "  - Education        degrees and scanned certificates",
  "  - Resume.pdf       the one-page version",
  "  - DevShell         try: dir, cd \"My Projects\", type README.txt, start Resume.pdf",
].join("\n");

const skillsText = [
  heading("SKILLS"),
  "",
  ...skills.flatMap((cat) => [heading(cat.category, "-"), cat.skills.join(", "), ""]),
].join("\n");

const leadershipText = [
  heading("LEADERSHIP & COMMUNITY"),
  "",
  ...leadership.flatMap((l) => [`${l.role}${l.dates ? `  (${l.dates})` : ""}`, `  ${l.detail}`, ""]),
].join("\n");

const certificatesText = [
  heading("CERTIFICATIONS"),
  "",
  ...certificates.map((c) => `- ${c.name} | ${c.issuer}${c.date ? ` | ${c.date}` : ""}`),
  "",
  "Scans of the certificates are in this folder. Double-click one to view it.",
].join("\n");

function experienceText(e: (typeof experience)[number]): string {
  return [
    heading(e.role.toUpperCase()),
    `${e.company}${e.location ? ` (${e.location})` : ""}  |  ${e.duration}`,
    "",
    e.summary,
    "",
    heading("Highlights", "-"),
    bullets(e.highlights),
    "",
    heading("Technologies", "-"),
    e.technologies.join(", "),
  ].join("\n");
}

function educationText(e: (typeof education)[number]): string {
  return [
    heading(e.degree.toUpperCase()),
    `${e.institution}  |  ${e.years}`,
    "",
    e.description,
    "",
    heading("Focus areas", "-"),
    bullets(e.coursework),
  ].join("\n");
}

const repoLabel = (url: string) =>
  url.includes("gitlab.com") ? "GitLab" : url.includes("github.com") ? "GitHub" : "Repository";

function projectReadme(p: Project): string {
  const body: string[] = [];
  const long = p.longDescription.trim();
  if (/^https?:\/\//.test(long)) {
    body.push(p.description, "", `Full write-up: ${long}`);
  } else {
    for (const line of long.split("\n")) {
      const m = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
      body.push(...(m ? [heading(m[1], "-"), m[2], ""] : [line, ""]));
    }
  }
  const links = [
    p.website && p.website !== "#" ? `Live demo:    ${p.website}` : "",
    `Source code:  ${p.github}`,
  ].filter(Boolean);
  return [
    heading(p.title.toUpperCase()),
    `Category: ${p.category}`,
    "",
    ...body,
    heading("Technologies", "-"),
    p.technologies.join(", "),
    "",
    heading("Links", "-"),
    ...links,
  ].join("\n");
}

function projectFolder(p: Project): FolderNode {
  const ext = p.screenshot.split(".").pop();
  const children: FsNode[] = [
    textFile("README.txt", projectReadme(p), { info: "Project overview" }),
    { kind: "file", type: "image", name: `Screenshot.${ext}`, src: p.screenshot, info: `${p.title} screenshot` },
  ];
  if (p.website && p.website !== "#") children.push(linkFile("Live Demo", p.website));
  children.push(linkFile(`Source Code (${repoLabel(p.github)})`, p.github));
  return folder(p.title, children, {
    thumbnail: p.screenshot,
    info: p.description,
    view: "tiles",
    group: p.featured ? "Featured Projects" : "More Projects",
  });
}

// ------------------------------------------------------------------ the tree
const activeProjects = projects
  .filter((p) => !p.retired)
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

const myDocuments = folder(
  "My Documents",
  [
    folder("My Projects", activeProjects.map(projectFolder), {
      icon: ICONS.projects,
      view: "thumbnails",
      info: `${activeProjects.length} projects with screenshots, write-ups, demos and source code`,
    }),
    folder(
      "Experience",
      experience.map((e) =>
        textFile(`${e.fileName}.txt`, experienceText(e), { info: `${e.role} | ${e.duration}` }),
      ),
      { icon: ICONS.experience, info: "One document per role, newest first" },
    ),
    folder(
      "Education",
      [
        folder(
          "Certificates",
          [
            ...certificates
              .filter((c) => c.image)
              .map<FileNode>((c) => ({
                kind: "file",
                type: "image",
                name: `${c.name}.png`,
                src: c.image,
                info: `${c.issuer}${c.date ? `, ${c.date}` : ""}`,
              })),
            textFile("All Certifications.txt", certificatesText, { info: "Full list" }),
          ],
          { view: "thumbnails", info: "Scanned certificates" },
        ),
        ...education.map((e) =>
          textFile(`${e.fileName}.txt`, educationText(e), { info: `${e.institution} | ${e.years}` }),
        ),
      ],
      { icon: ICONS.education, info: "Degree, training program and certificates" },
    ),
    textFile("About Me.txt", aboutMeText, { info: "Who I am and how to reach me" }),
    { kind: "file", type: "pdf", name: "Resume.pdf", src: "/resume.pdf", info: "One-page resume" },
    textFile("Skills.txt", skillsText, { info: "Languages, frameworks and tools" }),
    textFile("Leadership & Community.txt", leadershipText, { info: "Communities I lead" }),
  ],
  { icon: ICONS.myDocuments, view: "tiles", info: "Leon's documents" },
);

const favorites = folder(
  "Favorites",
  [
    ...socials.map((s) => linkFile(s.name, s.url, { icon: s.icon })),
    linkFile("Email Leon", `mailto:${profile.email}`, { icon: ICONS.contact }),
  ],
  { view: "tiles", info: "Where to find me online" },
);

const desktop = folder("Desktop", [
  shortcut("My Documents", PATHS.myDocuments, ICONS.myDocuments, { arrow: false }),
  shortcut("My Computer", PATHS.myComputer, ICONS.myComputer, { arrow: false }),
  shortcut("Recycle Bin", PATHS.recycleBin, ICONS.recycle, { arrow: false }),
  shortcut("About Me.txt", PATHS.aboutMe, ICONS.text),
  shortcut("My Projects", PATHS.projects, ICONS.projects),
  shortcut("Resume.pdf", PATHS.resume, ICONS.pdf),
  shortcut("Experience", PATHS.experience, ICONS.experience),
  shortcut("Certificates", PATHS.certificates, ICONS.folder),
  shortcut("DevShell", ["C:", "Program Files", "DevShell", "DevShell.exe"], ICONS.devshell),
  shortcut("Contact Me", ["C:", "Program Files", "Contact Me", "Contact Me.exe"], ICONS.contact),
]);

const xpPortfolio = projects.find((p) => p.id === "xp-portfolio");
const leonOsIni = [
  "; LeonOS.ini - how this portfolio is built",
  "",
  "[System]",
  "Name=LeonOS Portfolio Edition",
  `Owner=${profile.name}`,
  "",
  "[Frontend]",
  "Framework=Next.js 16 (App Router)",
  "UI=React 19, TypeScript, Tailwind CSS 4",
  "State=Zustand (windows, session, settings)",
  "Windows=react-rnd (drag, resize, maximize)",
  "Animation=Framer Motion",
  "",
  "[FileSystem]",
  "; Every folder and file here is generated from typed data in src/lib/data",
  "Tree=src/lib/fs.ts",
  "Launcher=src/lib/launcher.tsx",
  "",
  "[Hosting]",
  "Platform=Vercel",
  `Source=${xpPortfolio?.github ?? "https://github.com/Leon8M"}`,
].join("\n");

const cDrive = folder(
  "C:",
  [
    folder(
      "Documents and Settings",
      [folder("Leon", [desktop, favorites, myDocuments], { icon: ICONS.user, info: "Leon's profile" })],
    ),
    folder("Program Files", [
      folder("Accessories", [
        appFile("Calculator", "calculator", ICONS.calculator, "Calculator"),
        appFile("Calendar", "calendar", ICONS.calendar, "Calendar"),
        appFile("Notepad", "notepad", ICONS.notepad, "Text editor"),
      ]),
      folder("Contact Me", [appFile("Contact Me", "contact", ICONS.contact, "Send Leon a message")]),
      folder("DevShell", [appFile("DevShell", "devshell", ICONS.devshell, "Command-line shell for LeonOS")]),
    ]),
    folder(
      "RECYCLER",
      [
        ...projects.filter((p) => p.retired).map((p) => ({ ...projectFolder(p), group: undefined })),
        textFile("README.txt", "Retired projects live here. They still work, they're just not my best work anymore.", {
          info: "What's in here",
        }),
      ],
      { label: "Recycle Bin", icon: ICONS.recycle, view: "tiles" },
    ),
    folder("WINDOWS", [
      textFile("LeonOS.ini", leonOsIni, { info: "How this site is built" }),
      appFile("Display Properties", "display", ICONS.display, "Change the wallpaper"),
      appFile("System Properties", "system", ICONS.system, "About this computer"),
      folder("Web", [
        folder("Wallpaper", [{ kind: "file", type: "image", name: "Bliss.jpg", src: "/wallpaper.jpg", info: "Wallpaper" }], {
          view: "thumbnails",
        }),
      ]),
    ]),
  ],
  { label: "Local Disk (C:)", icon: ICONS.drive, drive: true, info: "Local Disk", view: "tiles" },
);

export const root: FolderNode = folder(
  "My Computer",
  [
    shortcut("Leon's Documents", PATHS.myDocuments, ICONS.myDocuments, {
      arrow: false,
      group: "Files Stored on This Computer",
      info: "File Folder",
    }),
    { ...cDrive, group: "Hard Disk Drives" },
  ],
  { icon: ICONS.myComputer, view: "tiles" },
);

// ------------------------------------------------------------------ lookups
const eq = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0;

export function getNode(path: Path): FsNode | undefined {
  let node: FsNode = root;
  for (const segment of path) {
    if (node.kind !== "folder") return undefined;
    const next: FsNode | undefined = node.children.find((child) => eq(child.name, segment));
    if (!next) return undefined;
    node = next;
  }
  return node;
}

/** Path with each segment's canonical capitalisation, or undefined if it doesn't exist. */
export function canonical(path: Path): Path | undefined {
  const out: Path = [];
  let node: FsNode = root;
  for (const segment of path) {
    if (node.kind !== "folder") return undefined;
    const next: FsNode | undefined = node.children.find((child) => eq(child.name, segment));
    if (!next) return undefined;
    out.push(next.name);
    node = next;
  }
  return out;
}

export const samePath = (a: Path, b: Path) => a.length === b.length && a.every((s, i) => eq(s, b[i]));
export const parentPath = (path: Path): Path => path.slice(0, -1);
export const displayName = (node: FsNode) => node.label ?? node.name;

export function pathToString(path: Path): string {
  if (path.length === 0) return "My Computer";
  return path.length === 1 ? `${path[0]}\\` : `${path[0]}\\${path.slice(1).join("\\")}`;
}

const ALIASES: Record<string, Path> = {
  "my computer": PATHS.myComputer,
  "my documents": PATHS.myDocuments,
  "my projects": PATHS.projects,
  "recycle bin": PATHS.recycleBin,
  desktop: PATHS.desktop,
  favorites: PATHS.favorites,
};

/** Parse an address-bar style path ("C:\\Program Files", "my documents", "c:/windows"). */
export function parsePath(input: string): Path | undefined {
  const text = input.trim().replace(/\//g, "\\").replace(/\\+$/, "");
  if (!text) return undefined;
  const alias = ALIASES[text.toLowerCase()];
  if (alias) return alias;
  if (!/^[a-z]:/i.test(text)) return undefined;
  return canonical(text.split("\\").filter(Boolean));
}

/** Resolve a shell argument against a working directory: "..", relative, quoted or absolute. */
export function resolvePath(cwd: Path, input: string): Path | undefined {
  const text = input.trim().replace(/^"(.*)"$/, "$1").replace(/\//g, "\\");
  if (!text) return cwd;
  if (/^[a-z]:/i.test(text)) return parsePath(text);
  let path: Path = text.startsWith("\\") ? cwd.slice(0, 1) : [...cwd];
  for (const segment of text.split("\\").filter(Boolean)) {
    if (segment === ".") continue;
    if (segment === "..") path = path.length > 1 ? parentPath(path) : path;
    else path = [...path, segment];
  }
  return canonical(path);
}

export function folderTitle(path: Path): string {
  if (path.length === 0) return "My Computer";
  if (samePath(path, PATHS.myDocuments)) return "My Documents";
  const node = getNode(path);
  return node ? displayName(node) : path[path.length - 1];
}

export function iconFor(node: FsNode): string {
  if (node.icon) return node.icon;
  if (node.kind === "folder") return node.drive ? ICONS.drive : ICONS.folder;
  switch (node.type) {
    case "text":
      return ICONS.text;
    case "pdf":
      return ICONS.pdf;
    case "image":
      return ICONS.image;
    case "link":
      return ICONS.link;
    default:
      return ICONS.app;
  }
}

export function typeLabel(node: FsNode): string {
  if (node.kind === "folder") return node.drive ? "Local Disk" : "File Folder";
  switch (node.type) {
    case "text":
      return node.name.toLowerCase().endsWith(".ini") ? "Configuration Settings" : "Text Document";
    case "pdf":
      return "Adobe Acrobat Document";
    case "image":
      return /\.jpe?g$/i.test(node.name) ? "JPEG Image" : "PNG Image";
    case "link":
      return "Internet Shortcut";
    case "app":
      return "Application";
    case "shortcut":
      return "Shortcut";
  }
}

/** XP-style size column: text files round up to whole KB. */
export function sizeLabel(node: FsNode): string {
  if (node.kind === "file" && node.type === "text" && node.text) {
    return `${Math.max(1, Math.ceil(new TextEncoder().encode(node.text).length / 1024))} KB`;
  }
  if (node.kind === "folder") return `${node.children.length} item${node.children.length === 1 ? "" : "s"}`;
  return "";
}
