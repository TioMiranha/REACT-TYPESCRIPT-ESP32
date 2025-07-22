import { Check, Upload } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../components/templates/MainTemplate";

import style from './style.module.css'
//import { useState } from "react";
import { AccordionItem } from "../../components/AccordionItem";
import { Input } from "../../components/Input";

export function ConfigPage() {
  //const [isModalOpen, setInputValue] = useState(false);

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
            <div className={style.contentConfig}>
              <AccordionItem title='Alterar informações de login'>
                <Input id={"Tag1"} labelText={"Digite o seu novo nome de usuário"} type="text" placeholder="Ex: User..." />

                <Input id={"Io"} labelText={"Digite a sua nova senha"} type="text" placeholder="Ex: 12345678..." />

                <div className={style.centralButtonConfig}>
                  <DefaultButton type="button" icon={<Check />}></DefaultButton>
                </div>
              </AccordionItem>
            </div>
          </section>
        </div>
      </Container >
    </MainTemplate >
  );
}