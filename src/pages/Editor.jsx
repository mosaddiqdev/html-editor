import { useState, useEffect } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import styles from '../styles/Editor.module.css';

const Editor = () => {
  const { theme, toggleTheme } = useTheme();
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowMobilePreview(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (isMobile) {
          setShowMobilePreview(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [htmlCode, cssCode, isMobile]);

  const downloadCode = () => {
    const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
</body>
</html>`;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Code2 className={styles.logoIcon} />
          <span>HTML Editor</span>
        </div>
        <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>
      
      <div className={styles.content}>
        {isMobile ? (
          showMobilePreview ? (
            <Preview 
              htmlCode={htmlCode} 
              cssCode={cssCode}
              onBack={() => setShowMobilePreview(false)}
              isMobile={true}
            />
          ) : (
            <CodeEditor
              htmlCode={htmlCode}
              cssCode={cssCode}
              onHtmlChange={setHtmlCode}
              onCssChange={setCssCode}
              onRun={() => setShowMobilePreview(true)}
              isMobile={true}
            />
          )
        ) : (
          <Allotment defaultSizes={[50, 50]}>
            <Allotment.Pane minSize={300}>
              <CodeEditor
                htmlCode={htmlCode}
                cssCode={cssCode}
                onHtmlChange={setHtmlCode}
                onCssChange={setCssCode}
                isMobile={false}
              />
            </Allotment.Pane>
            
            <Allotment.Pane minSize={300}>
              <Preview 
                htmlCode={htmlCode} 
                cssCode={cssCode}
                isMobile={false}
              />
            </Allotment.Pane>
          </Allotment>
        )}
      </div>
    </div>
  );
};

export default Editor;
