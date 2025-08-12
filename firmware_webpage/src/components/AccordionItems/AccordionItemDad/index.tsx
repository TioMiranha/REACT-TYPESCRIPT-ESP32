import { useState } from 'react';

import styles from './style.module.css'
import { ChevronDown, ChevronUp } from 'lucide-react';


export type AccordionItemDadProps = {
  title?: string;
  children: React.ReactNode;
}

export function AccordionItemDad({ title, children }: AccordionItemDadProps) {
  const [isOpen, setInputValue] = useState(false);

  return (

    <div className={styles.AccordionItem} >
      <button
        className={styles.accordionHeader}
        onClick={() => setInputValue(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {
        isOpen && (
          <div className={styles.accordionContent}>
            {children}
          </div>
        )
      }
    </div >
  );
}