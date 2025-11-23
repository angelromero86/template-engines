# Template Engines - Vite + React Project

## Project Overview
This is a Vite + React project initialized for exploring template engines and modern web development.

## Tech Stack
- **Build Tool**: Vite 6.0.5
- **Framework**: React 18.3.1
- **Language**: JavaScript (JSX)
- **Linting**: ESLint 9.17.0 with React plugins

## Project Structure
```
template-engines/
├── public/              # Static assets
│   └── vite.svg
├── src/                 # Source code
│   ├── assets/          # Project assets (images, icons)
│   │   └── react.svg
│   ├── App.jsx          # Main App component
│   ├── App.css          # App styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
├── package.json         # Dependencies and scripts
└── .gitignore           # Git ignore rules
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement (HMR).
Default URL: http://localhost:5173

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview
```bash
npm run preview
```
Previews the production build locally.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality and style.

## Dependencies

### Production
- `react`: ^18.3.1
- `react-dom`: ^18.3.1

### Development
- `@vitejs/plugin-react`: ^4.3.4 - Official Vite plugin for React
- `vite`: ^6.0.5 - Build tool and dev server
- `eslint`: ^9.17.0 - Code linting
- `eslint-plugin-react`: ^7.37.2 - React specific linting rules
- `eslint-plugin-react-hooks`: ^5.0.0 - Rules for React hooks
- `eslint-plugin-react-refresh`: ^0.4.16 - Fast refresh support
- `@types/react`: ^18.3.18 - TypeScript types for React
- `@types/react-dom`: ^18.3.5 - TypeScript types for React DOM
- `globals`: ^15.14.0 - Global identifiers for ESLint

## Key Features

### Vite Configuration
- React plugin enabled for JSX support and Fast Refresh
- Lightning-fast HMR during development
- Optimized production builds with code splitting

### ESLint Configuration
- Modern flat config format
- React, React Hooks, and React Refresh rules enabled
- Browser globals configured
- Ignores `dist` directory

### React Setup
- React 18 with new root API (`createRoot`)
- Strict Mode enabled for development
- Sample counter component demonstrating state management
- CSS modules ready

## Getting Started

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to the URL shown in the terminal (usually http://localhost:5173)

## Development Guidelines

### Code Style
- Follow ESLint rules configured in the project
- Use functional components with hooks
- Keep components small and focused

### File Organization
- Components go in `src/`
- Static assets in `public/` (won't be processed by Vite)
- Imported assets in `src/assets/` (will be processed and optimized)

### Hot Module Replacement (HMR)
- Edit `src/App.jsx` to see changes instantly
- Vite preserves component state during updates when possible

## Git Repository
- Repository initialized
- Initial commit created with project setup
- Default branch: master

## Next Steps
- Start building your components in `src/`
- Configure additional Vite plugins as needed
- Add routing with React Router if needed
- Add state management (Context API, Zustand, Redux) if required
- Set up testing with Vitest or Jest
- Add TypeScript if desired (rename files to .tsx and add tsconfig.json)

## Notes for Claude
- This project uses ES modules (`"type": "module"` in package.json)
- Vite uses native ES modules in development for faster startup
- The project structure follows Vite's conventions
- React Fast Refresh is enabled for better DX
- All dependencies are up to date as of November 2024
