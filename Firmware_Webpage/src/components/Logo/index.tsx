import LogoWhite from '../../assets/img/logoWhite.svg?react';
import styles from './styles.module.css';
//import { RouterLink } from '../RouterLink';

export function Logo() {
  return (
    <div className={styles.logo}>
      <a className={styles.logoLink} href="#">
        <span>
          <LogoWhite />
        </span>
      </a>
    </div>
  );
}