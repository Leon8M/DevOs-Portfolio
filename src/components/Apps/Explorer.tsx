'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import MenuBar from '@/components/xp/MenuBar';
import { useWindowStore } from '@/lib/store/windowStore';
import { useCoarsePointer } from '@/lib/useCoarsePointer';
import { openFile, openFolder, openApp } from '@/lib/launcher';
import { socials } from '@/lib/data/profile';
import {
  type FileNode,
  type FolderNode,
  type FsNode,
  type Path,
  type ViewMode,
  PATHS,
  displayName,
  folderTitle,
  getNode,
  iconFor,
  parentPath,
  parsePath,
  pathToString,
  root,
  samePath,
  sizeLabel,
  typeLabel,
} from '@/lib/fs';

interface ExplorerProps {
  windowId: string;
  initialPath: Path;
}

const VIEWS: { mode: ViewMode; label: string }[] = [
  { mode: 'thumbnails', label: 'Thumbnails' },
  { mode: 'tiles', label: 'Tiles' },
  { mode: 'icons', label: 'Icons' },
  { mode: 'details', label: 'Details' },
];

/** Image to preview for a node in Thumbnails view. */
const previewOf = (node: FsNode) =>
  node.kind === 'folder' ? node.thumbnail : node.type === 'image' ? node.src : undefined;

/** Folders first (keeping their authored order), then files. */
const sortChildren = (children: FsNode[]) => [
  ...children.filter((c) => c.kind === 'folder' || (c.kind === 'file' && c.type === 'shortcut' && !c.name.includes('.'))),
  ...children.filter((c) => !(c.kind === 'folder' || (c.kind === 'file' && c.type === 'shortcut' && !c.name.includes('.')))),
];

export default function Explorer({ windowId, initialPath }: ExplorerProps) {
  const [nav, setNav] = useState({ history: [initialPath], index: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [viewOverride, setViewOverride] = useState<Record<string, ViewMode>>({});
  const [viewsOpen, setViewsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updateWindow = useWindowStore((s) => s.updateWindow);
  const removeWindow = useWindowStore((s) => s.removeWindow);
  const coarse = useCoarsePointer();
  const contentRef = useRef<HTMLDivElement>(null);

  const path = nav.history[nav.index];
  const found = getNode(path);
  const folder: FolderNode = found?.kind === 'folder' ? found : root;
  const items = useMemo(() => sortChildren(folder.children), [folder]);
  const key = pathToString(path);
  const view = viewOverride[key] ?? folder.view ?? 'tiles';
  const selectedNode = items.find((i) => i.name === selected);
  // What the user is typing in the address bar; it resets whenever the folder changes.
  const [draft, setDraft] = useState<{ folder: string; text: string } | null>(null);
  const address = draft?.folder === key ? draft.text : key;
  const setAddress = (text: string) => setDraft({ folder: key, text });

  useEffect(() => {
    updateWindow(windowId, { title: folderTitle(path), icon: iconFor(folder) });
    contentRef.current?.scrollTo({ top: 0 });
  }, [key, folder, path, updateWindow, windowId]);

  const navigate = (to: Path) => {
    setNav(({ history, index }) => ({ history: [...history.slice(0, index + 1), to], index: index + 1 }));
    setSelected(null);
  };
  const go = (delta: number) => {
    setNav(({ history, index }) => ({ history, index: Math.min(history.length - 1, Math.max(0, index + delta)) }));
    setSelected(null);
  };
  const canBack = nav.index > 0;
  const canForward = nav.index < nav.history.length - 1;
  const canUp = path.length > 0;

  const open = (node: FsNode) => {
    const childPath = [...path, node.name];
    if (node.kind === 'folder') return navigate(childPath);
    // Shortcuts to folders navigate in place, like Explorer does.
    if (node.type === 'shortcut' && node.target && getNode(node.target)?.kind === 'folder') return navigate(node.target);
    openFile(node, childPath);
  };

  const submitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parsePath(address);
    const node = target && getNode(target);
    if (!target || !node) {
      setError(address);
      return;
    }
    if (node.kind === 'folder') navigate(target);
    else openFile(node, target);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return;
    const i = items.findIndex((it) => it.name === selected);
    if (e.key === 'Enter' && selectedNode) open(selectedNode);
    else if (e.key === 'Backspace' && canUp) navigate(parentPath(path));
    else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setSelected(items[Math.min(items.length - 1, i + 1)]?.name ?? null);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setSelected(items[Math.max(0, i - 1)]?.name ?? null);
    else return;
    e.preventDefault();
  };

  // ----------------------------------------------------------------- task pane content
  const projectLinks =
    selectedNode?.kind === 'folder'
      ? selectedNode.children.filter((c): c is FileNode => c.kind === 'file' && c.type === 'link')
      : folder.children.filter((c): c is FileNode => c.kind === 'file' && c.type === 'link');
  const tasks: { label: string; icon: string; onClick: () => void }[] = [];
  if (selectedNode) {
    tasks.push({ label: `Open ${displayName(selectedNode)}`, icon: iconFor(selectedNode), onClick: () => open(selectedNode) });
  }
  if (path.length > 2 && projectLinks.length && !samePath(path, PATHS.favorites)) {
    for (const link of projectLinks) {
      const label = link.name.replace(/\.url$/, '');
      tasks.push({
        label: label === 'Live Demo' ? 'View the live demo' : label.replace('Source Code', 'View source code'),
        icon: link.icon ?? '/xp-icons/website-icon.png',
        onClick: () => openFile(link, []),
      });
    }
  }
  if (canUp) tasks.push({ label: 'Go up one level', icon: '/xp-icons/fs/up.svg', onClick: () => navigate(parentPath(path)) });

  const otherPlaces: { label: string; path: Path; icon: string }[] = [
    canUp && path.length > 1 ? { label: folderTitle(parentPath(path)), path: parentPath(path), icon: iconFor(getNode(parentPath(path)) ?? root) } : null,
    { label: 'My Documents', path: PATHS.myDocuments, icon: '/xp-icons/my-documents-icon.png' },
    { label: 'My Projects', path: PATHS.projects, icon: '/xp-icons/projects-icon.png' },
    { label: 'Certificates', path: PATHS.certificates, icon: '/xp-icons/fs/folder.svg' },
    { label: 'My Computer', path: PATHS.myComputer, icon: '/xp-icons/my-computer-icon.png' },
  ].filter((p): p is { label: string; path: Path; icon: string } => !!p && !samePath(p.path, path))
    .filter((p, i, all) => all.findIndex((q) => samePath(q.path, p.path)) === i);

  const details = selectedNode ?? folder;

  // ----------------------------------------------------------------- groups
  const grouped = view !== 'details' && items.some((i) => i.group);
  const groups: { name: string; items: FsNode[] }[] = [];
  for (const item of items) {
    const name = grouped ? item.group ?? 'Other' : '';
    const g = groups.find((x) => x.name === name);
    if (g) g.items.push(item);
    else groups.push({ name, items: [item] });
  }

  const itemProps = (node: FsNode) => ({
    node,
    view,
    selected: selected === node.name,
    onSelect: () => (coarse ? open(node) : setSelected(node.name)),
    onOpen: () => open(node),
  });

  return (
    <div className="@container relative flex h-full flex-col bg-[#ece9d8] text-[11px]" onKeyDown={onKeyDown}>
      <MenuBar
        menus={[
          {
            label: 'File',
            items: [
              { label: 'Open', disabled: !selectedNode, onClick: () => selectedNode && open(selectedNode) },
              { label: 'Open in New Window', disabled: !(selectedNode?.kind === 'folder'), onClick: () => openFolder([...path, selected ?? '']) },
              { separator: true },
              { label: 'Close', onClick: () => removeWindow(windowId) },
            ],
          },
          {
            label: 'View',
            items: [
              ...VIEWS.map((v) => ({ label: v.label, checked: view === v.mode, onClick: () => setViewOverride((o) => ({ ...o, [key]: v.mode })) })),
              { separator: true as const },
              { label: 'Back', disabled: !canBack, onClick: () => go(-1) },
              { label: 'Forward', disabled: !canForward, onClick: () => go(1) },
              { label: 'Up One Level', disabled: !canUp, onClick: () => navigate(parentPath(path)) },
            ],
          },
          {
            label: 'Favorites',
            items: [
              ...socials.map((s) => ({ label: s.name, onClick: () => window.open(s.url, '_blank', 'noopener,noreferrer') })),
              { separator: true as const },
              { label: 'Open Favorites folder', onClick: () => navigate(PATHS.favorites) },
            ],
          },
          {
            label: 'Tools',
            items: [
              { label: 'Open DevShell', onClick: () => openApp('devshell') },
              { label: 'Display Properties...', onClick: () => openApp('display') },
            ],
          },
          { label: 'Help', items: [{ label: 'About LeonOS', onClick: () => openApp('system') }] },
        ]}
      />

      {/* Standard Buttons toolbar */}
      <div className="flex flex-shrink-0 items-center gap-0.5 border-y border-[#fff] border-b-[#d8d2bd] bg-gradient-to-b from-[#fbfbf9] to-[#ece9d8] px-1 py-0.5">
        <button type="button" className="xp-tool-button" disabled={!canBack} onClick={() => go(-1)} title="Back">
          <img src="/xp-icons/fs/back.svg" alt="" className="h-6 w-6" /> <span className="hidden @[420px]:inline">Back</span>
        </button>
        <button type="button" className="xp-tool-button" disabled={!canForward} onClick={() => go(1)} title="Forward">
          <img src="/xp-icons/fs/forward.svg" alt="" className="h-6 w-6" />
        </button>
        <button type="button" className="xp-tool-button" disabled={!canUp} onClick={() => navigate(parentPath(path))} title="Up">
          <img src="/xp-icons/fs/up.svg" alt="" className="h-6 w-6" />
        </button>
        <span className="mx-1 h-6 border-l border-[#c5c2b2]" />
        <button type="button" className="xp-tool-button" onClick={() => openApp('devshell')} title="Search with DevShell">
          <img src="/xp-icons/fs/search.svg" alt="" className="h-5 w-5" /> <span className="hidden @[420px]:inline">Search</span>
        </button>
        <div className="relative">
          <button type="button" className="xp-tool-button" onClick={() => setViewsOpen((v) => !v)} title="Views" aria-expanded={viewsOpen}>
            <img src="/xp-icons/fs/views.svg" alt="" className="h-5 w-5" /> ▾
          </button>
          {viewsOpen && (
            <ul className="xp-menu" onMouseLeave={() => setViewsOpen(false)}>
              {VIEWS.map((v) => (
                <li key={v.mode}>
                  <button
                    type="button"
                    className="xp-menu-item"
                    onClick={() => {
                      setViewOverride((o) => ({ ...o, [key]: v.mode }));
                      setViewsOpen(false);
                    }}
                  >
                    <span className="w-4 text-center">{view === v.mode ? '●' : ''}</span>
                    {v.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Address bar */}
      <form onSubmit={submitAddress} className="flex flex-shrink-0 items-center gap-1 border-b border-[#d8d2bd] px-1.5 py-1">
        <label htmlFor={`${windowId}-address`} className="text-[#7f7c73]">
          Address
        </label>
        <div className="flex h-[22px] min-w-0 flex-1 items-center border border-[#7f9db9] bg-white px-1">
          <img src={iconFor(folder)} alt="" className="mr-1 h-4 w-4 flex-shrink-0" />
          <input
            id={`${windowId}-address`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={(e) => e.target.select()}
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-[11px] outline-none"
          />
        </div>
        <button type="submit" className="xp-tool-button">
          <img src="/xp-icons/fs/forward.svg" alt="" className="h-4 w-4" /> Go
        </button>
      </form>

      <div className="flex min-h-0 flex-1">
        {/* Task pane */}
        <aside className="hidden w-[190px] flex-shrink-0 overflow-y-auto bg-gradient-to-b from-[#7ba2e7] to-[#6375d6] p-2.5 xp-scrollbar @[620px]:block">
          {tasks.length > 0 && (
            <TaskPanel title={samePath(parentPath(path), PATHS.projects) || samePath(path, PATHS.projects) ? 'Project Tasks' : 'File and Folder Tasks'}>
              {tasks.map((t) => (
                <TaskLink key={t.label} icon={t.icon} onClick={t.onClick}>
                  {t.label}
                </TaskLink>
              ))}
            </TaskPanel>
          )}
          <TaskPanel title="Other Places">
            {otherPlaces.map((p) => (
              <TaskLink key={p.label} icon={p.icon} onClick={() => navigate(p.path)}>
                {p.label}
              </TaskLink>
            ))}
          </TaskPanel>
          <TaskPanel title="Details">
            {previewOf(details) && (
                <img src={previewOf(details)} alt="" className="mb-2 w-full border border-[#99a8d8] bg-white" />
            )}
            <p className="font-bold break-words">{details === folder ? folderTitle(path) : displayName(details)}</p>
            <p>{typeLabel(details)}</p>
            {details.info && <p className="mt-1.5 leading-snug">{details.info}</p>}
            {sizeLabel(details) && <p className="mt-1.5">Size: {sizeLabel(details)}</p>}
          </TaskPanel>
        </aside>

        {/* Folder contents */}
        <div
          ref={contentRef}
          tabIndex={0}
          className="min-w-0 flex-1 overflow-auto bg-white p-2 outline-none xp-scrollbar"
          onClick={() => setSelected(null)}
          aria-label={`Contents of ${folderTitle(path)}`}
        >
          {items.length === 0 && <p className="p-4 text-[#777]">This folder is empty.</p>}
          {view === 'details' ? (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#ebeadb] text-[#000]">
                  {['Name', 'Size', 'Type', 'Description'].map((h) => (
                    <th key={h} className="border-r border-b border-[#d6d2c2] px-2 py-0.5 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((node) => (
                  <Item key={node.name} {...itemProps(node)} />
                ))}
              </tbody>
            </table>
          ) : (
            groups.map((g) => (
              <section key={g.name || 'all'} className="mb-3">
                {g.name && <h3 className="xp-group-heading">{g.name}</h3>}
                <div className="flex flex-wrap content-start gap-1">
                  {g.items.map((node) => (
                    <Item key={node.name} {...itemProps(node)} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      <div className="xp-statusbar">
        <span className="flex-1 truncate">
          {selectedNode
            ? `Type: ${typeLabel(selectedNode)}${sizeLabel(selectedNode) ? `  Size: ${sizeLabel(selectedNode)}` : ''}`
            : `${items.length} object${items.length === 1 ? '' : 's'}`}
        </span>
        <span className="hidden border-l border-[#c5c2b2] pl-2 sm:inline">
          {coarse ? 'Tap to open' : 'Double-click to open'}
        </span>
      </div>

      {error !== null && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10" onClick={() => setError(null)}>
          <div className="xp-dialog w-80" onClick={(e) => e.stopPropagation()} role="alertdialog" aria-label="Address not found">
            <div className="xp-dialog-title">{folderTitle(path)}</div>
            <div className="flex gap-3 p-3 text-xs">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#d8261b] text-lg font-bold text-white">
                ×
              </span>
              <p>
                Windows cannot find &apos;{error}&apos;. Check the spelling and try again. Try <b>My Documents</b> or{' '}
                <b>C:\Program Files</b>.
              </p>
            </div>
            <div className="px-3 pb-3 text-right">
              <button type="button" className="xp-button" autoFocus onClick={() => setError(null)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-3 overflow-hidden rounded-t-[3px]">
      <h3 className="bg-gradient-to-r from-white to-[#c6d3f7] px-2.5 py-1 text-[11px] font-bold text-[#215dc6]">{title}</h3>
      <div className="space-y-1 border border-t-0 border-white bg-[#d6dff7] px-2.5 py-2 text-[11px] text-[#000]">{children}</div>
    </section>
  );
}

function TaskLink({ icon, onClick, children }: { icon: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-start gap-1.5 text-left text-[#215dc6] hover:text-[#428eff] hover:underline">
      <img src={icon} alt="" className="mt-px h-4 w-4 flex-shrink-0" />
      <span className="break-words">{children}</span>
    </button>
  );
}

interface ItemProps {
  node: FsNode;
  view: ViewMode;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

function Item({ node, view, selected, onSelect, onOpen }: ItemProps) {
  const name = displayName(node);
  const icon = iconFor(node);
  const arrow = node.kind === 'file' && node.arrow;
  const handlers = {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect();
    },
    onDoubleClick: onOpen,
    title: node.info ? `${name}\n${node.info}` : name,
  };
  const label = <span className={`xp-item-label line-clamp-2 ${selected ? 'selected' : ''}`}>{name}</span>;

  if (view === 'details') {
    return (
      <tr {...handlers} className={`cursor-default ${selected ? 'bg-[#316ac5] text-white' : 'hover:bg-[#f1f5fc]'}`}>
        <td className="px-2 py-0.5">
          <span className="flex items-center gap-1.5">
            <img src={icon} alt="" className="h-4 w-4" />
            {name}
          </span>
        </td>
        <td className="px-2 whitespace-nowrap">{sizeLabel(node)}</td>
        <td className="px-2 whitespace-nowrap">{typeLabel(node)}</td>
        <td className="max-w-[260px] truncate px-2">{node.info}</td>
      </tr>
    );
  }

  if (view === 'thumbnails') {
    const preview = previewOf(node);
    return (
      <button type="button" {...handlers} className="flex w-[132px] flex-col items-center gap-1 p-1 text-center">
        <span className={`relative flex h-[90px] w-[120px] items-center justify-center overflow-hidden border bg-white p-[3px] ${selected ? 'border-[#316ac5] ring-2 ring-[#316ac5]' : 'border-[#d4d0c8]'}`}>
          {preview ? (
            <img src={preview} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
          ) : (
            <img src={icon} alt="" className="h-12 w-12" />
          )}
          {node.kind === 'folder' && preview && <img src="/xp-icons/fs/folder.svg" alt="" className="absolute bottom-0.5 left-0.5 h-6 w-6 drop-shadow" />}
        </span>
        {label}
      </button>
    );
  }

  if (view === 'icons') {
    return (
      <button type="button" {...handlers} className="flex w-[84px] flex-col items-center gap-1 p-1 text-center">
        <IconImage src={icon} arrow={arrow} selected={selected} size="h-8 w-8" />
        {label}
      </button>
    );
  }

  return (
    <button type="button" {...handlers} className="flex w-[250px] items-center gap-2 p-1 text-left">
      <IconImage src={icon} arrow={arrow} selected={selected} size="h-12 w-12" />
      <span className="min-w-0">
        <span className={`xp-item-label block truncate text-left ${selected ? 'selected' : ''}`}>{name}</span>
        <span className="block truncate text-[#7f7f7f]">{typeLabel(node)}</span>
        <span className="block truncate text-[#7f7f7f]">{node.info ?? sizeLabel(node)}</span>
      </span>
    </button>
  );
}

export function IconImage({ src, arrow, selected, size }: { src: string; arrow?: boolean; selected?: boolean; size: string }) {
  return (
    <span className={`relative flex-shrink-0 ${size}`}>
      <img src={src} alt="" className={`h-full w-full object-contain ${selected ? 'xp-icon-selected' : ''}`} />
      {arrow && <img src="/xp-icons/fs/shortcut-arrow.svg" alt="" className="absolute bottom-0 left-0 h-[38%] w-[38%]" />}
    </span>
  );
}
