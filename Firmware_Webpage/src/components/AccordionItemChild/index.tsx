import { useState } from 'react';
import type { AccordionItemProps } from '../AccordionItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

import styles from './style.module.css'

export function AccordionItemChild({ title, children }: AccordionItemProps) {
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