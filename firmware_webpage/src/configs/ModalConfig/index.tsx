// Exemplo corrigido com TypeScript
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";

import { useState } from 'react';
import './acordeao.css';

interface DadosRTD {
  id: number;
  tag: string;
  temp: string;
  tempFail: number;
  rangerMin: number;
  rangerMax: number;
  enable?: boolean;
}

const dadosRTD: DadosRTD[] = [
  { id: 0, tag: 'Tag 1', temp: '100 °C', tempFail: 0, rangerMin: 0, rangerMax: 100, enable: true },
  { id: 1, tag: 'Tag 2', temp: '90 °C', tempFail: 0, rangerMin: 0, rangerMax: 100, enable: false },
  { id: 2, tag: 'Tag 3', temp: '80 °C', tempFail: 0, rangerMin: 0, rangerMax: 100, enable: true },
  { id: 3, tag: 'Tag 4', temp: '75 °C', tempFail: 0, rangerMin: 0, rangerMax: 100, enable: false },
  { id: 4, tag: 'Tag 5', temp: '65 °C', tempFail: 0, rangerMin: 0, rangerMax: 100, enable: true }

  // ... adicione mais itens aqui se necessário
];

// 1. Crie o componente Acordeoes de forma independente
function Acordeoes() {
  const [acordeaoAberto, setAcordeaoAberto] = useState<number | null>(null);

  const lidarComClique = (id: number) => {
    setAcordeaoAberto(acordeaoAberto == id ? null : id);
  };

  return (
    <div className={`acordeao-container ${acordeaoAberto !== null ? 'push' : ''}`}>
      {dadosRTD.map((item) => {
        const aberto = acordeaoAberto === item.id;
        return (
          <div key={item.id} className={`acordeao-item ${aberto ? 'selected' : 'bg-gray'}`}>
            <div
              className="acordeao-cabecalho"
              onClick={() => lidarComClique(item.id)}
              aria-expanded={aberto}
            >
              <div className="header-group">
                <p>{item.tag}</p>
                <p><span>{item.temp}</span></p>
              </div>
            </div>
            <div
              className={`acordeao-corpo ${aberto ? 'aberto' : ''}`}
            >
              <form>
                <h2>Editando RTD</h2>
                <hr />
                <div className="formGroup">
                  <div className="inputContent">
                    <Input id={"rtd" + item.id} labelText={"Tag"} type="text" placeholder={"Digite o nome da Tag"} />
                  </div>
                  <div className="inputContent">
                    <Input id={"tempFail" + item.id} labelText={"Temp Falha"} type="number" placeholder={"0"} />
                  </div>
                </div>
                <div className="inputContent">
                  <Input id={"rangerMin" + item.id} labelText={"Range MIN"} type="range" min={0} max={100} />
                </div>
                <div className="inputContent">
                  <Input id={"rangerMax" + item.id} labelText={"Range MAX"} type="range" min={0} max={100} />
                </div>
                <button className="btn btn-primary">Salvar</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>

  );
}

// 2. Crie o componente ModalConfig de forma independente e o exporte
export function ModalConfig() {
  return (
    <Container>
      {/* 3. Chame o componente Acordeoes dentro de ModalConfig */}
      <Acordeoes />
    </Container>
  );
}