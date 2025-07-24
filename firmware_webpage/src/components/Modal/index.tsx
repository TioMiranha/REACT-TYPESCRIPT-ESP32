import { useState } from "react";
import { InputModal } from "../InputModal";
import { DefaultButton } from "../DefaultButton";
import { Settings } from "lucide-react";

import styles from './style.module.css'

export function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.modalContainer}>
        <p className={styles.vasco}> TAG 1</p>
        <div className={styles.modalContent}>

          <DefaultButton
            onClick={() => setIsModalOpen(true)}
            color="green"
            icon={<Settings />}
            aria-label="Configurar Tag"
            title="Configurar Tag"
          />
        </div>
      </div>
      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );

}