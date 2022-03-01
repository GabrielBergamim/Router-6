import { Outlet } from 'react-router-dom';

import styles from './styles.module.css';

export function Layout() {
  return (
    <main className={styles.app}>
      <Outlet />
    </main>
  );
}