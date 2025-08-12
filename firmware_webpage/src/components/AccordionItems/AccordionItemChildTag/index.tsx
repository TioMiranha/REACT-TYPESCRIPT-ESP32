import { useState } from 'react';
import type { AccordionItemProps } from '../AccordionItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

import styles from './style.module.css'

export function AccordionItemChildTag({ title, temp, children }: AccordionItemProps) {
  const [isOpen, setInputValue] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <button
        className={styles.accordionHeader}
        onClick={() => setInputValue(!isOpen)}
      >
        {title}
        {temp}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className={styles.accordionContentChildTag}>
          {children}
        </div>
      )}
    </div>
  );
}