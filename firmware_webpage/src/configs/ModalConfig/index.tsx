// Exemplo corrigido com TypeScript
import { Container } from "../../components/Container";

import { useState } from 'react';
import './acordeao.css';

interface DadosRTD {
  id: number;
  tag: string;
  temp: string;
  detalhes: string;
}

const dadosRTD: DadosRTD[] = [
  { id: 0, tag: 'Tag 1', temp: '100 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 1, tag: 'Tag 2', temp: '90 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 2, tag: 'Tag 3', temp: '80 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 3, tag: 'Tag 4', temp: '75 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 4, tag: 'Tag 56', temp: '65 °C', detalhes: 'Detalhes do RTD 1' }

  // ... adicione mais itens aqui se necessário
];

// 1. Crie o componente Acordeoes de forma independente
function Acordeoes() {
  const [acordeaoAberto, setAcordeaoAberto] = useState<number | null>(null);

  const lidarComClique = (id: number) => {
    setAcordeaoAberto(acordeaoAberto == id ? null : id);
  };

  return (
    <div className="acordeao-container">
      {dadosRTD.map((item) => {
        const aberto = acordeaoAberto === item.id;
        return (
          <div key={item.id} className="acordeao-item">
            <div
              className="acordeao-cabecalho"
              onClick={() => lidarComClique(item.id)}
              aria-expanded={aberto}
            >
              {item.tag} <br /> {item.temp}
            </div>
            <div
              className={`acordeao-corpo ${aberto ? 'aberto' : ''}`}
            >
              <p>{item.detalhes}</p>
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