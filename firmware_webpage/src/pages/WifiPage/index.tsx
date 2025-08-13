import { useState } from 'react'

import { Container } from '../../components/Container'
import { DefaultButton } from '../../components/DefaultButton'
import { Heading } from '../../components/Heading'
import { Input } from '../../components/Input'
import { MainTemplate } from '../../components/templates/MainTemplate'
import { Check } from 'lucide-react'
import { validateCredentialsWifi, validateWifi } from '../../utils/ValidationInputWifi'
import { AccordionItem } from '../../components/AccordionItems/AccordionItem'

import style from './style.module.css'

export function WifiPage() {
  // Ethernet (STA) states
  const [staIP, setStaIp] = useState('');
  const [staGateway, setStaGateway] = useState('');
  const [staMask, setStaMask] = useState('');
  const [staDNS, setStaDns] = useState('');
  const [staMAC, setStaMac] = useState('');
  // AP states
  const [apNetWorkName, setApNetWorkName] = useState('');
  const [apPassword, setApPassword] = useState('');
  const [apIP, setApIp] = useState('');
  const [apGateway, setApGateway] = useState('');
  const [apMask, setApMask] = useState('');

  async function handleWifiConfig(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = validateWifi(staIP, staGateway, staMask, staDNS, staMAC);
    if (!validation.isValid) return;

    return validation;
  }

  async function handleCredentialsWifi(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit cacete");

    const credentialsWifi = validateCredentialsWifi(apIP, apGateway, apMask, apNetWorkName, apPassword);
    if (!credentialsWifi.isValid) return;

    return { ...credentialsWifi };
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
              <Input id="sta-static-checkbox" labelText="Wifi STA Estático" type="checkbox" className={style.chekcbox} />
              <p>Página em manutenção...</p>
              <DefaultButton title="Atualizar" />
            </div>
          </div>
        </section>

        <form id="form-ethernet" onSubmit={handleWifiConfig}>
          <section className={style.ethernetSection}>
            <AccordionItem title="Configuração Ethernet">
              <div className={style.ethernet}>
                <Input id="ethernet-static-checkbox" labelText="Ethernet Estático" type="checkbox" className={style.chekcbox} />
              </div>

              <Input
                id="inp-IpEstatico"
                onChange={e => setStaIp(e.target.value)}
                value={staIP}
                labelText="IP Estático:"
                type="text"
                placeholder="Ex: 192.168.1.4"
              />

              <Input
                id="inp-GatewayRede"
                onChange={e => setStaGateway(e.target.value)}
                value={staGateway}
                labelText="Gateway da Rede:"
                type="text"
                placeholder="Ex: 192.168.1.1"
              />

              <Input
                id="inp-MascaraRede"
                onChange={e => setStaMask(e.target.value)}
                value={staMask}
                labelText="Máscara da Rede:"
                type="text"
                placeholder="255.255.255.0"
              />

              <Input
                id="inp-ServerDns"
                onChange={e => setStaDns(e.target.value)}
                value={staDNS}
                labelText="Endereço do servidor DNS:"
                type="text"
                placeholder="Ex: 8.8.8.8"
              />

              <Input
                id="inp-AddressMac"
                onChange={e => setStaMac(e.target.value)}
                value={staMAC}
                labelText="Endereço MAC:"
                type="text"
                placeholder="Ex: 2:0:0:12:34:56"
              />

              <DefaultButton id="button-ethernet" type="submit" icon={<Check />} />
            </AccordionItem>
          </section>
        </form>

        <form id="form-ap" onSubmit={handleCredentialsWifi}>
          <section>
            <div className={style.wifiAP}>
              <AccordionItem title="Configuração Wi-Fi AP">
                <Input
                  id="inpt-NomeRede"
                  onChange={e => setApNetWorkName(e.target.value)}
                  value={apNetWorkName}
                  labelText="Nome da rede:"
                  type="text"
                  placeholder="Ex: remota"
                />

                <Input
                  id="inpt-password"
                  onChange={e => setApPassword(e.target.value)}
                  value={apPassword}
                  labelText="Senha:"
                  type="text"
                  placeholder="Ex: 12345678..."
                />

                <Input
                  id="inpt-IpAp"
                  onChange={e => setApIp(e.target.value)}
                  value={apIP}
                  labelText="Endereço IP:"
                  type="text"
                  placeholder="Ex: 192.168.1.2"
                />

                <Input
                  id="inpt-GatewayAp"
                  onChange={e => setApGateway(e.target.value)}
                  value={apGateway}
                  labelText="Gateway da Rede:"
                  type="text"
                  placeholder="Ex: 192.168.1.1"
                />

                <Input
                  id="inpt-MaskAp"
                  onChange={e => setApMask(e.target.value)}
                  value={apMask}
                  labelText="Máscara da Rede:"
                  type="text"
                  placeholder="Ex: 255.255.255.0"
                />

                <DefaultButton id="button-Ap" type="submit" icon={<Check />} />
              </AccordionItem>
            </div>
          </section>
        </form>
      </Container >
    </MainTemplate>
  );
}