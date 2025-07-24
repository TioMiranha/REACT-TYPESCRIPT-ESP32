import styles from './styles.module.css'

type ContainerHeadProps = {
  children: React.ReactNode;
}

export function ContainerHead({ children }: ContainerHeadProps) {
  return (
    <nav className={styles.containerHead}>
      <div className={styles.contentHead}> {children}
      </div>
    </nav >
  );
}