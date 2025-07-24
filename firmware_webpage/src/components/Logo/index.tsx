import LogoWhite from '../../assets/img/logoWhite.svg?react';
import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';
//import { RouterLink } from '../RouterLink';

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink className={styles.logoLink} href="/">
        <span>
          <LogoWhite />
        </span>
      </RouterLink>
    </div>
  );
}