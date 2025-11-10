import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileCode2, FileType, Play } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import styles from '../styles/CodeEditor.module.css';

let themeConfigured = false;

const CodeEditor = ({ htmlCode, cssCode, onHtmlChange, onCssChange, onRun, isMobile }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('html');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const syncEditorContent = (editor, monacoInstance, tab = activeTab) => {
    if (!editor || !monacoInstance) return;

    const model = editor.getModel();
    if (!model) return;

    const language = tab === 'html' ? 'html' : 'css';
    const nextValue = tab === 'html' ? htmlCode : cssCode;

    monacoInstance.editor.setModelLanguage(model, language);

    if (editor.getValue() !== nextValue) {
      const position = editor.getPosition();
      editor.setValue(nextValue);
      if (position) {
        editor.setPosition(position);
      }
    }
  };

  const configureTheme = (monaco) => {
    if (themeConfigured) return;
    
    monaco.editor.defineTheme('canvas-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '818cf8' },
        { token: 'string', foreground: '34d399' },
        { token: 'number', foreground: 'fbbf24' },
        { token: 'type', foreground: 'a78bfa' },
        { token: 'class', foreground: 'fbbf24' },
        { token: 'function', foreground: 'a78bfa' },
        { token: 'variable', foreground: 'e5e7eb' },
        { token: 'tag', foreground: 'f87171' },
        { token: 'attribute.name', foreground: 'fbbf24' },
        { token: 'attribute.value', foreground: '34d399' },
        { token: 'delimiter', foreground: '9ca3af' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#e5e7eb',
        'editor.lineHighlightBackground': '#141414',
        'editorLineNumber.foreground': '#4c4c4c',
        'editorLineNumber.activeForeground': '#6b6b6b',
        'editor.selectionBackground': '#6366f140',
        'editor.inactiveSelectionBackground': '#6366f120',
        'editorCursor.foreground': '#818cf8',
        'editorWhitespace.foreground': '#1a1a1a',
        'editorIndentGuide.background': '#1a1a1a',
        'editorIndentGuide.activeBackground': '#6366f150',
        'editorWidget.background': '#141414',
        'editorWidget.foreground': '#e5e7eb',
        'editorWidget.border': '#262626',
        'editorSuggestWidget.background': '#141414',
        'editorSuggestWidget.foreground': '#e5e7eb',
        'editorSuggestWidget.border': '#262626',
        'editorSuggestWidget.selectedBackground': '#1e1b4b',
        'editorSuggestWidget.selectedForeground': '#c7d2fe',
        'editorSuggestWidget.highlightForeground': '#818cf8',
        'editorHoverWidget.background': '#141414',
        'editorHoverWidget.foreground': '#e5e7eb',
        'editorHoverWidget.border': '#262626',
        'list.activeSelectionBackground': '#1e1b4b',
        'list.activeSelectionForeground': '#c7d2fe',
        'list.focusBackground': '#1e1b4b',
        'list.focusForeground': '#c7d2fe',
        'list.hoverBackground': '#1a1a1a',
        'list.hoverForeground': '#a0a0a0',
        'list.inactiveSelectionBackground': '#1a1a1a',
        'list.inactiveSelectionForeground': '#a0a0a0',
      }
    });

    monaco.editor.defineTheme('canvas-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '2563eb' },
        { token: 'string', foreground: '059669' },
        { token: 'number', foreground: 'd97706' },
        { token: 'type', foreground: '7c3aed' },
        { token: 'class', foreground: 'd97706' },
        { token: 'function', foreground: '7c3aed' },
        { token: 'variable', foreground: '374151' },
        { token: 'tag', foreground: 'dc2626' },
        { token: 'attribute.name', foreground: 'd97706' },
        { token: 'attribute.value', foreground: '059669' },
        { token: 'delimiter', foreground: '6b7280' },
      ],
      colors: {
        'editor.background': '#fafafa',
        'editor.foreground': '#1f2937',
        'editor.lineHighlightBackground': '#f5f5f5',
        'editorLineNumber.foreground': '#9ca3af',
        'editorLineNumber.activeForeground': '#6b7280',
        'editor.selectionBackground': '#3b82f640',
        'editor.inactiveSelectionBackground': '#3b82f620',
        'editorCursor.foreground': '#2563eb',
        'editorWhitespace.foreground': '#e5e7eb',
        'editorIndentGuide.background': '#e5e7eb',
        'editorIndentGuide.activeBackground': '#3b82f650',
        'editorWidget.background': '#ffffff',
        'editorWidget.foreground': '#1f2937',
        'editorWidget.border': '#e5e7eb',
        'editorSuggestWidget.background': '#ffffff',
        'editorSuggestWidget.foreground': '#1f2937',
        'editorSuggestWidget.border': '#d1d5db',
        'editorSuggestWidget.selectedBackground': '#dbeafe',
        'editorSuggestWidget.selectedForeground': '#1e40af',
        'editorSuggestWidget.highlightForeground': '#2563eb',
        'editorHoverWidget.background': '#ffffff',
        'editorHoverWidget.foreground': '#1f2937',
        'editorHoverWidget.border': '#d1d5db',
        'list.activeSelectionBackground': '#dbeafe',
        'list.activeSelectionForeground': '#1e40af',
        'list.focusBackground': '#dbeafe',
        'list.focusForeground': '#1e40af',
        'list.hoverBackground': '#f3f4f6',
        'list.hoverForeground': '#374151',
        'list.inactiveSelectionBackground': '#f3f4f6',
        'list.inactiveSelectionForeground': '#374151',
      }
    });
    
    themeConfigured = true;
  };

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    configureTheme(monaco);
    monaco.editor.setTheme(theme === 'dark' ? 'canvas-dark' : 'canvas-light');
    syncEditorContent(editor, monaco);
  };

  useEffect(() => {
    if (monacoRef.current && editorRef.current) {
      monacoRef.current.editor.setTheme(theme === 'dark' ? 'canvas-dark' : 'canvas-light');
    }
  }, [theme]);

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      syncEditorContent(editorRef.current, monacoRef.current);
    }
  }, [activeTab, htmlCode, cssCode]);

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    fontFamily: 'Geist Mono, Consolas, monospace',
    fontLigatures: true,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    formatOnPaste: true,
    formatOnType: true,
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    folding: true,
    bracketPairColorization: { enabled: true },
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'html' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('html')}
          >
            <FileCode2 size={16} />
            <span>index.html</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'css' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('css')}
          >
            <FileType size={16} />
            <span>styles.css</span>
          </button>
        </div>
        {isMobile && onRun && (
          <button className={styles.runButton} onClick={onRun}>
            <Play size={16} />
            <span>Run</span>
          </button>
        )}
      </div>
      
      <div className={styles.editorWrapper}>
        <Editor
          height="100%"
          defaultLanguage="html"
          defaultValue=""
          theme={theme === 'dark' ? 'canvas-dark' : 'canvas-light'}
          onChange={(value) => {
            if (activeTab === 'html') {
              onHtmlChange(value || '');
            } else {
              onCssChange(value || '');
            }
          }}
          onMount={handleEditorMount}
          options={editorOptions}
          loading={
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
              <p>Loading editor...</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CodeEditor;
