import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.button}>
          <Home size={18} />
          <span>Back to Editor</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
