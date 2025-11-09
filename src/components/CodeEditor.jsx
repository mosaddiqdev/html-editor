import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileCode2, FileType, Play } from 'lucide-react';
import styles from '../styles/CodeEditor.module.css';

let themeConfigured = false;

const CodeEditor = ({ htmlCode, cssCode, onHtmlChange, onCssChange, onRun, isMobile }) => {
  const [activeTab, setActiveTab] = useState('html');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const configureTheme = (monaco) => {
    if (themeConfigured) return;
    
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
    monaco.editor.setTheme('canvas-light');
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        const language = activeTab === 'html' ? 'html' : 'css';
        const newValue = activeTab === 'html' ? htmlCode : cssCode;
        const currentValue = editorRef.current.getValue();
        
        monacoRef.current.editor.setModelLanguage(model, language);
        
        if (currentValue !== newValue) {
          const position = editorRef.current.getPosition();
          editorRef.current.setValue(newValue);
          if (position) {
            editorRef.current.setPosition(position);
          }
        }
      }
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
          theme="canvas-light"
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
