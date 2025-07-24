import { useState } from 'react';

import styles from './style.module.css'
import { ChevronDown, ChevronUp } from 'lucide-react';

export type AccordionItemProps = {
  title?: string;
  children: React.ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setInputValue] = useState(false);

  return (

    <div className={styles.AccordionItem}>
      <button
        className={styles.accordionHeader}
        onClick={() => setInputValue(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
}