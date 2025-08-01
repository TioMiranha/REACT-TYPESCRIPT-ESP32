import { RouterLink } from '../RouterLink';
import styles from './style.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href="#">Todos os direitos reservados Tomasoni Mecatrônica</RouterLink>
    </footer>
  );
}