import styles from './Style.module.css'

type DefaultButtonProps = {
  title?: string
  icon?: React.ReactNode;
  color?: 'green' | 'red';
} & React.ComponentProps<'button'>;

export function DefaultButton({ title, icon, color = 'green', ...props }: DefaultButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}`} {...props}>
      {title ? title : icon}
    </button>
  );
}