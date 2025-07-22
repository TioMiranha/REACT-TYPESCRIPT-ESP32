import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { Logo } from '../Logo';
//import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });

  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>

      <a href="/" className={styles.menuLogo}> <Logo /> </a>
      <div className={styles.menuContent}>
        <a className={styles.menuLink} href="#" aria-label='Ir para a Home' title='Ir para home'>
          <HouseIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label='Ver histórico' title='Ver histórico'>
          <HistoryIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label='Ir para as configurações' title='Ir para configurações'>
          <SettingsIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label='Trocar tema' title='Trocar tema' onClick={handleThemeChange}>
          {nextThemeIcon[theme]}
        </a>
      </div>

    </nav>
  );
}