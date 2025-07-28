import { Check, Upload } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../components/templates/MainTemplate";

import style from './style.module.css'
import { useState } from "react";
import { AccordionItem } from "../../components/AccordionItem";
import { Input } from "../../components/Input";
import { validateLogin } from "../../utils/ValidationInput";

export function ConfigPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSetNewConfigUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateLogin(username, password, e);

    if (!validation.isValid) {
      return;
    }

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

      return data;

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainTemplate>
      <Container>
        <div className={style.contentConfig}>
          <section>
            <Heading>Configurações de Firmware e Usuário Web</Heading>
            <div className={style.sectionConfig}>
              <h3>Atualização de Firmware</h3>
              <p>-----------------------------------------------------------------------------------------------------------------------------------------------</p>
            </div>
            <div className={style.centralButtonConfig}>
              <DefaultButton icon={<Upload />} />
              <DefaultButton title='Atualizar Firmware' />
            </div>
          </section>

          <section>
            <form onSubmit={handleSetNewConfigUser}>
              <div className={style.contentConfig}>
                <AccordionItem title='Alterar informações de login'>

                  <Input value={username} id="user-NewConfig" onChange={(e) => setUsername(e.target.value)} labelText={"Digite o seu nome de usuário"} type="text" placeholder="Ex: admin..." />

                  <Input value={password} id="password-NewConfig" onChange={(e) => setPassword(e.target.value)} labelText={"Digite a sua senha"} type="password" placeholder="Ex: admin..." />

                  <div className={style.centralButtonConfig}>
                    <DefaultButton type="submit" icon={<Check />}></DefaultButton>
                  </div>
                </AccordionItem>
              </div>
            </form>
          </section>
        </div>
      </Container >
    </MainTemplate >
  );
}