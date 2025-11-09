import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from '../styles/Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <span className={styles.brand}>HTML Editor</span>
        <Link to="/" className={styles.navLink}>
          Open Editor
        </Link>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}>Free & Open Source</div>
          
          <h1 className={styles.heading}>
            Write HTML & CSS.
            <br />
            See results instantly.
          </h1>
          
          <p className={styles.description}>
            A minimal code editor designed for simplicity.
            <br />
            No account. No setup. Just start coding.
          </p>
          
          <Link to="/" className={styles.button}>
            <span>Start Building</span>
            <ArrowRight size={20} strokeWidth={2} />
          </Link>
        </div>

        <div className={styles.visual}>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <div className={styles.dots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className={styles.windowContent}>
              <div className={styles.code}>
                <div className={styles.line}>
                  <span className={styles.tag}>&lt;h1&gt;</span>
                  <span className={styles.text}>Hello World</span>
                  <span className={styles.tag}>&lt;/h1&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Built for developers, designers, and learners</p>
      </footer>
    </div>
  );
};

export default Landing;
