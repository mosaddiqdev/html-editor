# HTML Editor - Online Code Editor with Live Preview

A minimal HTML & CSS editor with live preview. Built with React + Vite, featuring Monaco Editor and a clean light theme optimized for simplicity.

## Features

- **Split-Screen Layout**: Resizable panels with editor on left, live preview on right
- **Monaco Editor**: Full VS Code editor experience with:
  - Syntax highlighting for HTML & CSS
  - IntelliSense & auto-completion
  - Bracket pair colorization
  - Format on type/paste
  - Line numbers & code folding
- **Tab-Based File System**: Switch between HTML and CSS files
- **Live Preview**: Press **Run** to refresh the sandboxed iframe preview
- **Preview Controls**: Run and open preview in a new tab
- **Minimal UI**: Clean, daylight-friendly interface without flashy animations
- **Fully Responsive**: Mobile-first design approach

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **Monaco Editor** - Code editor (VS Code's editor)
- **Allotment** - Resizable split panes
- **Lucide React** - Icon library
- **CSS Modules** - Modular styling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── CodeEditor.jsx    # Monaco editor with tab switching
│   └── Preview.jsx       # Live preview with iframe
├── styles/
│   ├── variables.css     # Design tokens
│   ├── reset.css         # CSS reset
│   ├── App.module.css    # App layout styles
│   ├── CodeEditor.module.css
│   └── Preview.module.css
├── App.jsx               # Main app with split layout
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Design System

### Colors
- Background: White (#ffffff) to soft gray (#fafafa)
- Text: Dark gray (#1f2937) to muted (#9ca3af)
- Accent: Slate blue (#6366f1)
- Borders: Subtle black opacity (8%-18%)

### Spacing
- 4px base unit system
- Consistent padding/margins

### Typography
- Font: Geist (Google Fonts)
- Mono: Geist Mono
- Sizes: 11px - 64px scale

### Interactions
- Opacity-only hover states (no transforms)
- Fast transitions (120-180ms)
- Minimal, professional feel

## Routes
- `/` - Main editor (SEO optimized)
- `/landing` - Marketing landing page

## Editor Features

### HTML Editor
- Full HTML5 syntax support
- Tag auto-closing
- Attribute suggestions
- Format on type

### CSS Editor
- CSS3 syntax support
- Property suggestions
- Value auto-completion
- Format on type

### Preview
- Live rendering
- Sandboxed iframe for security
- Refresh capability
- Open in new tab

## Customization

### Editor Options
Edit `editorOptions` in `src/components/CodeEditor.jsx`:

```javascript
const editorOptions = {
  fontSize: 14,
  minimap: { enabled: false },
  wordWrap: 'on',
  // ... more options
};
```

### Default Code
Edit `defaultHTML` and `defaultCSS` in `src/App.jsx`.

### Theme
Modify design tokens in `src/styles/variables.css`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
