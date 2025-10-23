# Write-it-down

> A powerful markdown note-taking application designed for developers and professionals.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)

**📱 Frontend Repository** - This repository contains the frontend application. The backend API is hosted separately.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Responsive Design](#responsive-design)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

**Write-it-down** is a modern, full-featured note-taking application built with the latest web technologies. It provides developers and professionals with a powerful markdown editor, rich text formatting, and seamless note organization—all in a beautiful, responsive interface.

### Why Write-it-down?

- **Developer-Focused**: Syntax highlighting, code blocks, and markdown shortcuts
- **Fast & Efficient**: Built on TanStack's performance-first architecture
- **Secure**: User authentication and private note storage
- **Responsive**: Works beautifully on mobile, tablet, and desktop
- **Intuitive**: Clean UI with powerful search and filtering

<!--
Add screenshots here in the future:
![Landing Page](./docs/screenshots/landing.png)
![Note Editor](./docs/screenshots/editor.png)
-->

---

## Features

### Core Features

- ✅ **Rich Markdown Editor** - Full-featured MDX editor with live preview
- ✅ **Syntax Highlighting** - Support for JavaScript, TypeScript, Python, HTML, CSS, and more
- ✅ **User Authentication** - Secure login and signup with JWT tokens
- ✅ **Note Management** - Create, read, update, and delete notes
- ✅ **Search & Filter** - Powerful search by title with date/title sorting
- ✅ **Responsive Design** - Fluid typography and mobile-first design
- ✅ **Tags & Organization** - Categorize notes with tags (UI not ready)
- ✅ **Real-time Autosave** - Never lose your work (to be implemented)

### Editor Features

- Lists (ordered and unordered)
- Tables
- Code blocks with syntax highlighting
- Links and images
- Headings (H1-H6)
- Blockquotes
- Thematic breaks
- Bold, italic, underline formatting
- Keyboard shortcuts

### Coming Soon

- 🔄 **Export Notes** - Download as Markdown, PDF, or HTML
- 🔄 **Dark Mode** - Eye-friendly theme for night owls
- 🔄 **Note Sharing** - Share notes with team members

- 🔄 **Offline Mode** - PWA support for offline access
- 🔄 **Collaborative Editing** - Real-time collaboration features

---

## Tech Stack

- **[React 19](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TanStack Router](https://tanstack.com/router)** - File-based routing
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Zustand](https://github.com/pmndrs/zustand)** - Client state management
- **[MDXEditor](https://mdxeditor.dev/)** - Rich markdown editing
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icons
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

> **Note**: This is the frontend repository. The backend API is hosted separately and has its own documentation.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 22.9.0 (recommended: 22.12.0+)
- **npm** >= 10.8.3
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/write-it-down.git
   cd write-it-down
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration (Update with your backend URL)
VITE_API_BASE_URL=http://localhost:8000/api

# Optional: API timeout in milliseconds
VITE_API_TIMEOUT=10000

# Add other frontend environment variables here as needed
```

> **Note**: All environment variables must be prefixed with `VITE_` to be accessible in the application.

### Running the Application

#### Development Mode

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

#### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
write-it-down/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   │   ├── navbar.tsx      # Navigation bar
│   │   ├── note-editor.tsx # Main note editor wrapper
│   │   ├── note-list.tsx   # List of notes display
│   │   └── ...
│   ├── routes/             # File-based routing
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Landing page
│   │   ├── (auth)/         # Auth routes (login, signup)
│   │   └── _authenticated/ # Protected routes
│   │       └── notes/      # Notes pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and services
│   │   └── services/       # API service functions
│   ├── store/              # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   ├── styles.css          # Global styles and Tailwind config
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── .env                    # Environment variables (create this)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # You are here!
```

---

## Available Scripts

| Script           | Description                           |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Start development server on port 3000 |
| `npm run build`  | Build for production                  |
| `npm run start`  | Start production server               |
| `npm run serve`  | Preview production build              |
| `npm run test`   | Run unit tests                        |
| `npm run lint`   | Lint code with ESLint                 |
| `npm run format` | Format code with Prettier             |
| `npm run check`  | Format and lint code                  |

---

## Usage

### Creating a Note

1. Click the "New Note" button on the notes page
2. Enter a title for your note
3. Use the rich markdown editor to write your content
4. Click "Save Note" to save

### Editing a Note

1. Click on any note from your notes list
2. Edit the title or content
3. Changes are saved when you click "Save Note"

### Searching Notes

1. Use the search bar at the top of the notes page
2. Type your search query to filter notes by title
3. Use the "Filters" button to sort by date or title

### Deleting a Note

1. Find the note you want to delete
2. Click the "Delete" button
3. Confirm the deletion

---

## API Integration

This frontend application connects to a separate backend API. The API handles:

- User authentication (login, signup, JWT tokens)
- Note CRUD operations (create, read, update, delete)
- User profile management
- Data persistence and validation

To connect to your backend API, configure the API base URL in your `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

For detailed API documentation, refer to the backend repository.

---

## Responsive Design

Write-it-down is fully responsive and optimized for all screen sizes:

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

### Features

- Fluid typography using `clamp()` functions
- Responsive grid layouts
- Touch-friendly UI elements
- Adaptive navigation
- Mobile-first approach

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## Roadmap

### Version 1.1 (Next Release)

- [ ] Export notes to PDF/Markdown
- [ ] Dark mode theme
- [ ] Note templates
- [ ] Keyboard shortcuts guide

### Version 1.2

- [ ] Tags functionality (backend integration)
- [ ] Note sharing
- [ ] Advanced search with full-text search
- [ ] Note archiving

### Version 2.0

- [ ] Real-time collaborative editing
- [ ] Version history
- [ ] API for third-party integrations
- [ ] Mobile apps (iOS/Android)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Write-it-down

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

- **[TanStack](https://tanstack.com/)** - For amazing React libraries
- **[MDXEditor](https://mdxeditor.dev/)** - For the powerful markdown editor
- **[Tailwind CSS](https://tailwindcss.com/)** - For utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - For accessible components
- **[Lucide](https://lucide.dev/)** - For beautiful icons

---

## Support

If you encounter any issues or have questions:

- **GitHub Issues**: [Open an issue](https://github.com/yourusername/write-it-down/issues)
- **Email**: support@writeitdown.com
- **Documentation**: [Full documentation](https://docs.writeitdown.com)

---

## Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)

---

<div align="center">

**[⬆ Back to Top](#write-it-down)**

Made with ❤️ by [Your Name]

</div>
