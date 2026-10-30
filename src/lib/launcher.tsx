// Decides what "open" means for anything in LeonOS, the way Windows uses file associations:
// folders -> Explorer, .txt -> Notepad, images -> Picture Viewer, .pdf -> Reader,
// .url -> a new browser tab, .exe -> the app. The desktop, Start menu, Explorer and DevShell
// all open things through here.

import { useWindowStore } from './store/windowStore';
import {
  type AppId,
  type FileNode,
  type Path,
  ICONS,
  displayName,
  folderTitle,
  getNode,
  iconFor,
  parentPath,
  pathToString,
} from './fs';

import Explorer from '@/components/Apps/Explorer';
import Notepad from '@/components/Apps/Notepad';
import PictureViewer from '@/components/Apps/PictureViewer';
import PdfViewer from '@/components/Apps/PdfViewer';
import DevShell from '@/components/Apps/DevShell';
import Calculator from '@/components/Apps/Calculator';
import Calendar from '@/components/Apps/Calendar';
import ContactMe from '@/components/Apps/ContactMe';
import DisplayProperties from '@/components/Apps/DisplayProperties';
import SystemProperties from '@/components/Apps/SystemProperties';

type Size = { width: number; height: number };

let windowSeq = 0;
const newId = (prefix: string) => `${prefix}-${++windowSeq}`;

function launch(id: string, title: string, icon: string, content: React.ReactNode, size: Size) {
  useWindowStore.getState().addWindow(id, title, content, undefined, size, icon);
}

/** Open a folder in a new Explorer window. */
export function openFolder(path: Path) {
  const id = newId('explorer');
  const node = getNode(path);
  launch(
    id,
    folderTitle(path),
    node ? iconFor(node) : ICONS.folder,
    <Explorer windowId={id} initialPath={path} />,
    { width: 820, height: 540 }
  );
}

/** Open whatever lives at `path`. Returns false if nothing is there. */
export function openPath(path: Path): boolean {
  const node = getNode(path);
  if (!node) return false;
  if (node.kind === 'folder') openFolder(path);
  else openFile(node, path);
  return true;
}

export function openFile(node: FileNode, path: Path) {
  // One window per document: opening it again brings the existing window forward.
  const key = `file:${pathToString(path)}`;
  switch (node.type) {
    case 'shortcut':
      if (node.target) openPath(node.target);
      return;
    case 'link':
      if (!node.url) return;
      if (node.url.startsWith('mailto:')) window.location.href = node.url;
      else window.open(node.url, '_blank', 'noopener,noreferrer');
      return;
    case 'app':
      if (node.app) openApp(node.app);
      return;
    case 'text':
      launch(
        key,
        `${node.name} - Notepad`,
        ICONS.notepad,
        <Notepad windowId={key} fileName={node.name} text={node.text ?? ''} />,
        { width: 680, height: 500 }
      );
      return;
    case 'image': {
      // The viewer pages through every image in the same folder, like the real one.
      const folder = getNode(parentPath(path));
      const images =
        folder?.kind === 'folder'
          ? folder.children.filter((c): c is FileNode => c.kind === 'file' && c.type === 'image')
          : [node];
      launch(
        key,
        `${node.name} - Windows Picture and Fax Viewer`,
        ICONS.image,
        <PictureViewer
          windowId={key}
          images={images.map((i) => ({ name: i.name, src: i.src ?? '' }))}
          startIndex={Math.max(0, images.findIndex((i) => i.name === node.name))}
        />,
        { width: 760, height: 560 }
      );
      return;
    }
    case 'pdf':
      launch(
        key,
        `${node.name} - Adobe Reader`,
        ICONS.pdf,
        <PdfViewer fileName={node.name} src={node.src ?? ''} />,
        { width: 780, height: 620 }
      );
      return;
  }
}

interface AppDef {
  title: string;
  icon: string;
  size: Size;
  /** Allow several copies (e.g. two shells); otherwise re-opening focuses the existing window. */
  multi?: boolean;
  render: (windowId: string) => React.ReactNode;
}

export const APPS: Record<Exclude<AppId, 'pictures' | 'pdf'>, AppDef> = {
  explorer: {
    title: 'My Computer',
    icon: ICONS.myComputer,
    size: { width: 820, height: 540 },
    multi: true,
    render: (id) => <Explorer windowId={id} initialPath={[]} />,
  },
  notepad: {
    title: 'Untitled - Notepad',
    icon: ICONS.notepad,
    size: { width: 600, height: 440 },
    multi: true,
    render: (id) => <Notepad windowId={id} fileName="Untitled" text="" editable />,
  },
  devshell: {
    title: 'DevShell',
    icon: ICONS.devshell,
    size: { width: 680, height: 420 },
    multi: true,
    render: (id) => <DevShell windowId={id} />,
  },
  calculator: { title: 'Calculator', icon: ICONS.calculator, size: { width: 300, height: 400 }, render: () => <Calculator /> },
  calendar: { title: 'Calendar', icon: ICONS.calendar, size: { width: 340, height: 500 }, render: () => <Calendar /> },
  contact: { title: 'Contact Me', icon: ICONS.contact, size: { width: 440, height: 480 }, render: () => <ContactMe /> },
  display: {
    title: 'Display Properties',
    icon: ICONS.display,
    size: { width: 420, height: 500 },
    render: (id) => <DisplayProperties windowId={id} />,
  },
  system: {
    title: 'System Properties',
    icon: ICONS.system,
    size: { width: 440, height: 470 },
    render: (id) => <SystemProperties windowId={id} />,
  },
};

export function openApp(app: AppId) {
  if (app === 'pictures' || app === 'pdf') return;
  const def = APPS[app];
  const id = def.multi ? newId(app) : `app:${app}`;
  launch(id, def.title, def.icon, def.render(id), def.size);
}

/** Label for a node in menus and the taskbar. */
export const nodeLabel = (path: Path) => {
  const node = getNode(path);
  return node ? displayName(node) : pathToString(path);
};
