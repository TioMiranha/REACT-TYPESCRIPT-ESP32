import { useState } from 'react';
import type { AccordionItemProps } from '../AccordionItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

import styles from './style.module.css'

export function AccordionItemChildTag({ title, children }: AccordionItemProps) {
  const [isOpen, setInputValue] = useState(false);

  return (
    <div className={styles.accordionItemChild}>
      <button
        className={styles.accordionHeaderChild}
        onClick={() => setInputValue(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className={styles.accordionContentChild}>
          {children}
        </div>
      )}
    </div>
  );
}