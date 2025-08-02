
//import { useState } from 'react'
import { useState } from 'react'
import { AccordionItem } from '../../components/AccordionItem'
import { Container } from '../../components/Container'
import { DefaultButton } from '../../components/DefaultButton'
import { Heading } from '../../components/Heading'
import { Input } from '../../components/Input'
import { MainTemplate } from '../../components/templates/MainTemplate'
import { Check } from 'lucide-react'
import { validateLogin } from '../../utils/ValidationInputLogin'
import { validateWifi } from '../../utils/ValidationInputWifi'

import style from './style.module.css'

export function WifiPage() {
  const [IP, setIp] = useState('');
  const [Gateway, setGateway] = useState('');
  const [Mask, setMask] = useState('');
  const [DNS, setDns] = useState('');
  const [MAC, setMac] = useState('');
  const [netWorkName, setNetWorkName] = useState('');
  const [password, setPassword] = useState('');

  async function handleWifiConfig(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateWifi(IP, Gateway, Mask, DNS, MAC, e);
    const nameNetWorkPassword = validateLogin(netWorkName, password, e)

    if (!validation.isValid && !nameNetWorkPassword.isValid) {
      return;
    }
  }

  return (
    <MainTemplate>
      <Container>
        <section>
          <div className={style.wifiContainer}>
            <div className={style.wifiHeader}>
              <Heading>Configurações Wi-Fi</Heading>
            </div>
            <div className={style.wifiContent}>
              <h2>Configuração WiFi-STA</h2>
              <Input id={"teste"} labelText={"Wifi STA Estático"} type='checkbox' className={style.chekcbox} />
              <p>Página em manutenção...</p>
              <DefaultButton title='Atualizar' />
            </div>
          </div>
        </section>

        <form onSubmit={e => handleWifiConfig(e)}>
          <section className={style.ethernetSection}>
            <AccordionItem title='Configuração Ethernet'>

              <div className={style.ethernet}>
                <Input id={"teste"} labelText={"Ethernet Estático"} type='checkbox' className={style.chekcbox} />
              </div>

              <Input id="inp-IpEstatico" onChange={(e) => setIp(e.target.value)} labelText={"IP Estático:"} type="text" placeholder="Ex: 192.168.1.4" />

              <Input id="inp-GatewayRede" onChange={(e) => setGateway(e.target.value)} labelText={"Gateway da Rede:"} type="text" placeholder="Ex: 192.168.1.1" />

              <Input id="inp-MascaraRede" onChange={(e) => setMask(e.target.value)} labelText={"Máscara da Rede:"} type="text" placeholder="255.255.255.0" />

              <Input id="inp-ServerDns" onChange={(e) => setDns(e.target.value)} labelText={"Endereço do servidor DNS:"} type="text" placeholder="Ex: 8.8.8.8" />

              <Input id="inp-AddressMac" onChange={(e) => setMac(e.target.value)} labelText={"Endereço MAC:"} type="text" placeholder="Ex: 2:0:0:12:34:56" />

              <DefaultButton type="submit" icon={<Check />}></DefaultButton>
            </AccordionItem>
          </section>
        </form>

        <form onSubmit={handleWifiConfig}>
          <section>
            <div className={style.wifiAP}>
              <AccordionItem title='Configuração Wi-Fi AP'>
                <Input id="inpt-NomeRede" onChange={(e) => setNetWorkName(e.target.value)} labelText={"Nome da rede:"} type="text" placeholder="Ex: remota" />

                <Input id="inpt-password" onChange={(e) => setPassword(e.target.value)} labelText={"Senha:"} type="text" placeholder="Ex: 12345678..." />

                <Input id="inpt-IpAp" onChange={(e) => setIp(e.target.value)} labelText={"Endereço IP:"} type="text" placeholder="Ex: 192.168.1.2" />

                <Input id="inpt-GatewayAp" onChange={(e) => setGateway(e.target.value)} labelText={"Gateway da Rede:"} type="text" placeholder="Ex: 192.168.1.1" />

                <Input id="inpt-MaskAp" onChange={(e) => setMask(e.target.value)} labelText={"Máscara da Rede:"} type="text" placeholder="Ex: 255.255.255.0" />

                <DefaultButton type="submit" icon={<Check />}></DefaultButton>
              </AccordionItem>
            </div>
          </section>
        </form>
      </Container>
    </MainTemplate >
  );
}