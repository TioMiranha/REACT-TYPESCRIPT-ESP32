// Exemplo corrigido com TypeScript
import { Container } from "../../components/Container";

import React, { useState } from 'react';
import './acordeao.css';

interface DadosRTD {
  id: number;
  tag: string;
  temp: string;
  detalhes: string;
}

const dadosRTD: DadosRTD[] = [
  { id: 1, tag: 'Tag 1', temp: '100 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 2, tag: 'Tag 1', temp: '100 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 3, tag: 'Tag 1', temp: '100 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 4, tag: 'Tag 1', temp: '100 °C', detalhes: 'Detalhes do RTD 1' },
  { id: 5, tag: 'Tag 1', temp: '100 °C', detalhes: 'Detalhes do RTD 1' }

  // ... adicione mais itens aqui se necessário
];

// 1. Crie o componente Acordeoes de forma independente
function Acordeoes() {
  const [acordeaoAberto, setAcordeaoAberto] = useState<number | null>(null);

  const lidarComClique = (id: number) => {
    setAcordeaoAberto(acordeaoAberto === id ? null : id);
  };

  return (
    <div className="acordeao-container">
      {dadosRTD.map((item) => (
        <div key={item.id} className="acordeao-item">
          <div
            className="acordeao-cabecalho"
            onClick={() => lidarComClique(item.id)}
          >
            {item.tag} <br /> {item.temp}
          </div>
          <div className={`acordeao-corpo ${acordeaoAberto === item.id ? 'aberto' : ''}`}>
            <p>{item.detalhes}</p>
          </div>
        </div>
      ))}
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