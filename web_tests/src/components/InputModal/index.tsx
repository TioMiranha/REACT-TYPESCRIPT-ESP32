import { useState } from "react";
import { Input } from "../Input";
import { DefaultButton } from "../DefaultButton";
import { Check, X } from "lucide-react";
import { Heading } from "../Heading";
//import { showMessage } from "../../adapters/showMessage";
//import { AccordionItem } from "../AccordionItem";

import styles from './style.module.css'
import { validateLogin } from "../../utils/ValidationInput";

type InputModalProps = {
  isOpen: boolean;
  onClose: () => void
};

export function InputModal({ isOpen, onClose }: InputModalProps) {
  const [inputValue, setInputValue] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateLogin(username, password, e);

    if (!validation.isValid) {
      return;
    }

    onClose();

    try {
      const ipUrl = window.location.hostname;
      const endpoint = `${window.location.protocol}//${ipUrl}/*`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, password
        })
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta do servidor:", data);
      alert(`valor fodasi ${inputValue}`);

      return data;

    } catch (err) {
      console.log(err);
    }
  }

  if (!isOpen) return null;
  return (
    <>
      <div className={styles.modalOverlay}
        onClick={() => setInputValue(false)}
      ></div>

      <form onSubmit={handleUser}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <Heading>Realizar Login</Heading>
            </div>

            <div className={styles.modalBody}>
              <Input value={username} id="user-input" onChange={(e) => setUsername(e.target.value)} labelText={"Digite o seu nome de usuário"} type="text" placeholder="Ex: admin..." />

              <Input value={password} id="pass-input" onChange={(e) => setPassword(e.target.value)} labelText={"Digite a sua senha"} type="password" placeholder="Ex: admin..." />

            </div>
            <div className={styles.modalButton}>
              <DefaultButton color="red" onClick={onClose} type="button" icon={<X />} ></DefaultButton>
              <DefaultButton color="green" type="submit" icon={<Check />}></DefaultButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}