import { useState } from "react";
import { Input } from "../Input";
import { DefaultButton } from "../DefaultButton";
import { Check, X } from "lucide-react";
import { Heading } from "../Heading";
import { AccordionItem } from "../AccordionItem";

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
            <Heading>Defina as configurações da tag</Heading>
          </div>
          <div className={styles.modalBody}>
            <AccordionItem title="Temperatura">

              <Input id={"Tag1"} labelText={"Digite um valor"} type="text" placeholder="" />

              <Input id={"Io"} labelText={"Digite outro valor"} type="text" placeholder="" />

            </AccordionItem>

            <AccordionItem title="Digital">

              <Input id={"Tag1"} labelText={"Digite um valor"} type="text" placeholder="" />

              <Input id={"Io"} labelText={"Digite outro valor"} type="text" placeholder="" />

            </AccordionItem>

            <AccordionItem title="Digital">

              <Input id={"Tag1"} labelText={"Digite um valor"} type="text" placeholder="" />

              <Input id={"Io"} labelText={"Digite outro valor"} type="text" placeholder="" />

            </AccordionItem>

          </div>
          <div className={styles.modalButton}>
            <DefaultButton color="red" onClick={onClose} type="button" icon={<X />} >Cancelar</DefaultButton>
            <DefaultButton onClick={() => alert(`Enviado ${inputValue}`)} type="button" icon={<Check />}>Enviar</DefaultButton>
          </div>
        </div>
      </div>
    </>
  );
}