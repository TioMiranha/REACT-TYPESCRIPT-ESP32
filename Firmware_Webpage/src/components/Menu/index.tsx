import { MoonIcon, RefreshCw, SettingsIcon, SunIcon, User, Wifi } from 'lucide-react';
import styles from './style.module.css';
import { useState, useEffect } from 'react';
import { Logo } from '../Logo';
import { InputModal } from '../InputModal';
import { RouterLink } from '../RouterLink';
//import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <RouterLink href="/" className={styles.menuLogo} aria-label='Home' title='Home'> <Logo /> </RouterLink>

      <div className={styles.menuContent}>
        <RouterLink className={styles.menuLink} href="/wifi" aria-label='Configurações de Wifi' title='Configurações de Wifi'>
          <Wifi />
        </RouterLink>

        <RouterLink className={styles.menuLink} href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          aria-label='Realizar login' title='Realizar login'>
          <User />
        </RouterLink>

        <RouterLink className={styles.menuLink} href="/configuracoes" aria-label='Configurações' title='Configurações'>
          <SettingsIcon />
        </RouterLink>

        <RouterLink className={styles.menuLink} href="#" aria-label='Reiniciar placa' title='Reiniciar placa'>
          <RefreshCw />
        </RouterLink>

        <RouterLink className={styles.menuLink} href="#" aria-label='Trocar tema' title='Trocar tema' onClick={handleThemeChange}>
          {nextThemeIcon[theme]}
        </RouterLink>
      </div>
      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
}