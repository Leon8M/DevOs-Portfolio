import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '@/lib/store/windowStore'; // Import your window store
import { projects } from '@/lib/data/projects'; // Import your projects data
import ProjectDetailWindow from './ProjectDetailWindow'; // Import your project detail component
import moment from 'moment'; // For enhanced date/time formatting

// You might need to install moment: npm install moment or yarn add moment

interface CommandOutput {
  type: 'command' | 'response' | 'error';
  text: string;
}

const DevShell: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<CommandOutput[]>([
    { type: 'response', text: "Welcome to DevShell. Type 'help' for a list of commands." },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { addWindow } = useWindowStore(); // Get addWindow from your store
  const [cwd, setCwd] = useState('C:\\Users\\Guest'); // Simulate current working directory

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    let response: string | JSX.Element = ''; // Allow JSX for more complex output
    let outputType: 'response' | 'error' = 'response';

    const parts = lowerCommand.split(' ');
    const mainCommand = parts[0];
    const args = parts.slice(1);

    switch (mainCommand) {
      case 'help':
        response = `Available commands:
- help: Show this help message.
- whoami: Display information about the user.
- ls / dir: List items in the current directory (simulated).
- cd <directory>: Change current directory (simulated).
- view --projects: List all portfolio projects.
- open <project-id>: Opens a project's detail window.
- clear: Clear the terminal screen.
- echo [message]: Echoes the provided message.
- date: Display the current date and time.
- exit: Close the DevShell (not implemented in this demo, click 'X' button).
`;
        break;
      case 'whoami':
        response = 'You are a curious developer exploring a Windows XP inspired portfolio. Your journey is just beginning!';
        break;
      case 'ls':
      case 'dir':
        response = `Simulated Directory listing for "${cwd}":
AboutMe.txt  Projects  Contact.txt  DevShell.exe`;
        break;
      case 'cd':
        if (args.length === 0) {
          response = `Usage: cd <directory>`;
          outputType = 'error';
        } else if (args[0] === '..') {
          const pathParts = cwd.split('\\');
          if (pathParts.length > 2) { // Cannot go above C:\Users
            setCwd(pathParts.slice(0, -1).join('\\'));
            response = `Changed directory to ${pathParts.slice(0, -1).join('\\')}`;
          } else {
            response = `Cannot go up further than ${cwd}`;
            outputType = 'error';
          }
        } else if (args[0] === 'projects') {
          setCwd('C:\\Users\\Guest\\Projects');
          response = `Changed directory to C:\\Users\\Guest\\Projects`;
        } else {
          response = `Directory not found: ${args[0]}`;
          outputType = 'error';
        }
        break;
      case 'view':
        if (args[0] === '--projects') {
          response = (
            <>
              {"--- Portfolio Projects ---\n"}
              {projects.map(p => `- ${p.title} (ID: ${p.id})\n`).join('')}
              {"\nType 'open <project-id>' to view details."}
            </>
          );
        } else {
          response = `Usage: view --projects`;
          outputType = 'error';
        }
        break;
      case 'open':
        if (args.length === 0) {
          response = `Usage: open <project-id>`;
          outputType = 'error';
        } else {
          const projectId = args[0];
          const projectToOpen = projects.find(p => p.id.toLowerCase() === projectId);
          if (projectToOpen) {
            addWindow(
              `project-${projectToOpen.id}`,
              `${projectToOpen.title} - Details`,
              <ProjectDetailWindow project={projectToOpen} />,
              { x: 100, y: 100 } // Provide an initial position for opened windows
            );
            response = `Opening ${projectToOpen.title}...`;
          } else {
            response = `Project with ID '${projectId}' not found. Use 'view --projects' to see available IDs.`;
            outputType = 'error';
          }
        }
        break;
      case 'clear':
        setOutput([]);
        response = ''; // Clear does not produce a response
        break;
      case 'date':
        response = moment().format('dddd, MMMM Do YYYY, h:mm:ss A');
        break;
      case 'exit':
        response = 'Exiting DevShell... (Click the "X" button on the window title bar to close it).';
        break;
      case 'echo':
        response = args.join(' ');
        break;
      default:
        response = `Command not found: ${command}. Type 'help' for a list of commands.`;
        outputType = 'error';
        break;
    }

    // Always add the command first, then its response
    setOutput((prev) => [
      ...prev,
      { type: 'command', text: `${cwd}> ${command}` }, // Show CWD
      ...(response ? [{ type: outputType, text: response }] : []), // Only add response if it exists
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') {
      // If input is empty, just add the prompt line
      setOutput((prev) => [...prev, { type: 'command', text: `${cwd}>` }]);
      return;
    };
    handleCommand(input);
    setInput('');
  };

  return (
    // REMOVED h-full from this div. This ensures the content can properly overflow
    // and the parent Window's overflow-y-auto will pick it up.
    <div className="p-4 bg-black text-green-400 font-mono flex flex-col h-full"> {/* ADDED h-full here for shell to fill its window */}
      <div ref={terminalRef} className="flex-grow overflow-y-auto pr-2 custom-scrollbar-devshell"> {/* Added custom class for scrollbar */}
        {output.map((line, index) => (
          // Using <p> instead of <pre> for better text wrapping, but retaining font-mono
          // For pre-formatted text like help, ensure the string itself has \n for line breaks
          <p key={index} className={`${line.type === 'command' ? 'text-white' : line.type === 'error' ? 'text-red-400' : 'text-green-400'} whitespace-pre-wrap`}>
            {line.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-2 flex-shrink-0"> {/* flex-shrink-0 to keep input fixed */}
        <span className="text-white mr-2">{cwd}</span> {/* Dynamic CWD prompt */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none text-green-400 caret-green-400" // Added caret color
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