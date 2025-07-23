
//import { useState } from 'react'
import { AccordionItem } from '../../components/AccordionItem'
import { Container } from '../../components/Container'
import { DefaultButton } from '../../components/DefaultButton'
import { Heading } from '../../components/Heading'
import { Input } from '../../components/Input'
import { MainTemplate } from '../../components/templates/MainTemplate'
import style from './style.module.css'
import { Check } from 'lucide-react'

export function WifiPage() {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainTemplate>
      <Container>
        <div className={style.wifiContainer}>
          <div className={style.wifiHeader}>
            <Heading>Configurações Wi-Fi</Heading>
            <div className={style.wifiContent}>
              <h2>Configuração WiFi-STA</h2>
              <Input id={"teste"} labelText={"Wifi STA Estático"} type='checkbox' className={style.chekcbox} />
              <p>Página em manutenção...</p>
              <DefaultButton title='Atualizar' />
              <div className={style.content}>
                <AccordionItem title='Configuração Ethernet'>
                  <div className={style.ethernet}>
                    <Input id={"teste"} labelText={"Ethernet Estático"} type='checkbox' className={style.chekcbox} />
                  </div>

                  <Input id={"Tag1"} labelText={"Digite o seu nome de usuário"} type="text" placeholder="Ex: User..." />

                  <Input id={"Io"} labelText={"Digite a sua senha"} type="text" placeholder="Ex: 12345678..." />

                  <Input id={"Tag1"} labelText={"Digite o seu nome de usuário"} type="text" placeholder="Ex: User..." />

                  <Input id={"Io"} labelText={"Digite a sua senha"} type="text" placeholder="Ex: 12345678..." />

                  <DefaultButton /*onClick={() => alert(`Enviado ${isModalOpen}`)}*/ type="button" icon={<Check />}></DefaultButton>
                </AccordionItem>
              </div>
              <div className={style.wifiAP}>
                <AccordionItem title='Configuração Wi-Fi AP'>
                  <Input id={"Tag1"} labelText={"Digite o seu nome de usuário"} type="text" placeholder="Ex: User..." />

                  <Input id={"Io"} labelText={"Digite a sua senha"} type="text" placeholder="Ex: 12345678..." />

                  <Input id={"Tag1"} labelText={"Digite o seu nome de usuário"} type="text" placeholder="Ex: User..." />

                  <Input id={"Io"} labelText={"Digite a sua senha"} type="text" placeholder="Ex: 12345678..." />

                  <DefaultButton /*onClick={() => alert(`Enviado ${isModalOpen}`)}*/ type="button" icon={<Check />}></DefaultButton>
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MainTemplate>
  );
}