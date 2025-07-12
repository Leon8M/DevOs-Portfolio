# LeonOS - Windows XP Inspired Developer Portfolio

Welcome to my developer portfolio, designed to mimic the nostalgic interface of Windows XP! This project aims to provide a unique and interactive way to showcase my skills, projects, and experience.

## ✨ Features

- **Welcome Animation:** A custom Windows XP-style boot screen with a welcome message and looping logo animation before the desktop loads.
- **Desktop Environment:** A full-screen desktop with a classic Windows XP feel, complete with a taskbar and start menu.
- **Draggable & Resizable Windows:** Open applications and folders in interactive, movable, and resizable windows.
- **Start Menu:** Access various applications, system shortcuts, and sections of the portfolio, just like the real deal.
- **Taskbar:** Manage open windows, switch between applications, and see system-tray like icons.
- **Dynamic & Retro-Themed Content:**
  - **Projects:** Showcases my work in visually enhanced, retro-styled cards with consistent image fitting.
  - **Experience:** Details my professional background in a clean, XP-themed layout with individual icons and animations.
  - **Education:** Presents my academic journey with a similar retro design, icons, and smooth transitions.
  - **Resume Viewer:** An integrated viewer for my resume, with a clear and functional download option.
  - **Skills:** Lists my technical proficiencies.
- **About Me & Contact Me Apps:** Dedicated applications for my personal bio and a functional contact form powered by EmailJS, all styled in the XP theme.
- **Responsive Design:** Optimized for various screen sizes, ensuring a consistent experience across devices.
- **Smooth Animations:** Utilizes Framer Motion for delightful transitions, micro-interactions, and the engaging welcome screen.
- **Robust State Management:** Leverages Zustand for efficient global state management, handling window states, taskbar entries, and more.

## 🧰 Technologies Used

- **Next.js (App Router)**
- **Tailwind CSS**
- **Framer Motion**
- **Zustand**
- **React Draggable & React Resizable**
- **EmailJS**

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/your-username/leon-os.git
cd leon-os
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Running the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to experience the XP interface.

## 🗂️ Project Structure

```
leon-os/
├── public/
│   ├── Leon's_Resume.pdf
│   ├── screenshots/
│   ├── xp-icons/
│   └── wallpaper.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── head.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Apps/
│   │   ├── Common/
│   │   ├── Desktop/
│   │   └── WelcomeAnimation.tsx
│   ├── lib/
│   │   ├── data/
│   │   └── store/
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🛠️ Customization

- **Update Content:** Edit `src/lib/data/*.ts` files with your own info.
- **Resume File:** Replace `public/Leon's_Resume.pdf`.
- **Icons/Images:** Replace assets in `public/xp-icons/` and `public/screenshots/`.
- **Add Apps:** Create components under `components/Apps/`, and register them in the Desktop and StartMenu.

## 🌐 Deployment

### Vercel (Recommended)

- Push code to GitHub.
- Import to Vercel.
- Set EmailJS env vars in Vercel's dashboard.

### Netlify

- Push to Git.
- Configure: `build: npm run build`, `publish: .next`
- Set environment variables.

### Other Options

AWS Amplify, Google Cloud Run, or custom servers.

## 📄 License

MIT License — Free to use and modify.