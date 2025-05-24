# User Guide Project

This project is built with React and Vite, providing a modern and efficient development experience.

## Getting Started with pnpm

[pnpm](https://pnpm.io/) is a fast, disk space efficient package manager. To use this project with pnpm:

### Installation

1. Install pnpm globally (if not already installed):
   ```bash
   npm install -g pnpm
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Common Commands

- **Start development server:**
  ```bash
  pnpm dev
  ```

- **Build for production:**
  ```bash
  pnpm build
  ```

- **Preview production build:**
  ```bash
  pnpm preview
  ```

- **Run linting:**
  ```bash
  pnpm lint
  ```

## Folder Structure

```
user-guide/
├── public/             # Static assets that will be served as-is
├── src/                # Application source code
│   ├── assets/         # Images, fonts, and other static assets
│   ├── components/     # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components used by the router
│   ├── styles/         # Global styles and theme definitions
│   ├── utils/          # Utility functions and helpers
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point for the application
│   └── vite-env.d.ts   # Type definitions for Vite
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # This documentation
```

## Available Plugins

This template uses the following Vite plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) - Uses SWC for Fast Refresh

## Development Notes

- Hot Module Replacement (HMR) is enabled by default
- ESLint is configured with React-friendly rules
- For production applications, consider using TypeScript with type-aware lint rules

## Expanding ESLint Configuration

If you're developing a production application, we recommend using TypeScript with type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [pnpm Documentation](https://pnpm.io/motivation)