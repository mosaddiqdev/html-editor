import { useRef, useState, useEffect } from 'react';
import { Eye, ExternalLink, ArrowLeft, Play } from 'lucide-react';
import styles from '../styles/Preview.module.css';

const Preview = ({ htmlCode, cssCode, onBack, isMobile }) => {
  const iframeRef = useRef(null);
  const [srcDoc, setSrcDoc] = useState('');

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;
  };

  const runCode = () => {
    const content = generateHTML();
    setSrcDoc('');
    setTimeout(() => setSrcDoc(content), 0);
  };

  useEffect(() => {
    if (isMobile) {
      runCode();
    }
  }, [isMobile]);

  const openInNewTab = () => {
    const content = generateHTML();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.title}>
          {isMobile && onBack ? (
            <button className={styles.backButton} onClick={onBack}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          ) : (
            <>
              <Eye size={16} />
              <span>Preview</span>
            </>
          )}
        </div>
        <div className={styles.actions}>
          {!isMobile && (
            <button className={styles.runButton} onClick={runCode}>
              <Play size={14} />
              <span>Run</span>
            </button>
          )}
          <button className={styles.iconButton} onClick={openInNewTab} title="Open in new tab">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
      
      <div className={styles.iframeWrapper}>
        <iframe
          ref={iframeRef}
          className={styles.iframe}
          title="preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          key={srcDoc.length}
        />
      </div>
    </div>
  );
};

export default Preview;
