import { useState } from "react";
import { Input } from "../Input";
import { DefaultButton } from "../DefaultButton";
import { Check, X } from "lucide-react";
import { Heading } from "../Heading";
//import { AccordionItem } from "../AccordionItem";

import styles from './style.module.css'

type InputModalProps = {
  isOpen: boolean;
  onClose: () => void
};

export function InputModal({ isOpen, onClose }: InputModalProps) {
  const [inputValue, setInputValue] = useState(false);
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.modalOverlay}
        onClick={() => setInputValue(false)}
      ></div>

      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <Heading>Realizar Login</Heading>
          </div>
          <div className={styles.modalBody}>

            <Input id={"Tag1"} labelText={"Digite o seu nome de usuário"} type="text" placeholder="Ex: User..." />

            <Input id={"Io"} labelText={"Digite a sua senha"} type="text" placeholder="Ex: 12345678..." />

          </div>
          <div className={styles.modalButton}>
            <DefaultButton color="red" onClick={onClose} type="button" icon={<X />} ></DefaultButton>
            <DefaultButton onClick={() => alert(`Enviado ${inputValue}`)} type="button" icon={<Check />}></DefaultButton>
          </div>
        </div>
      </div>
    </>
  );
}