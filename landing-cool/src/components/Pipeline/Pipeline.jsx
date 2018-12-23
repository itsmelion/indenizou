import React from 'react';
import './Pipeline.scss';

const pipeline = [
  {
    step: 'Contato',
    description: `Você dá detalhes da situação, explicando o que aconteceu,
    e o que tem em mãos para comprovar`,
  },
  {
    step: 'Advogado da Indenizou',
    description: `Nosso advogado vai te instruir como proceder, e te dizer qual a
    expectativa indenizatória do seu caso`,
  },
  {
    step: 'Envio do pedido',
    description: `Juntamos tudo, e temos o pedido de indenização enviado para o órgão
    responsável.`,
  },
  {
    step: 'Acompanhamento',
    description: `Juntos monitoramos o andamento do seu processo, e te notificaremos caso
    haja qualquer problema`,
  },
  {
    step: 'Indenização 💸🎉',
    description: 'A melhor, a parte que percebe que seu transtorno não ficou impune',
  },
];

const Pipeline = (
  <div contain="">
    <ol id="Pipeline" align="around start" className="pv2 row">
      {pipeline.map(({ step, icon, description }) => (
        <li flex="20" mobile-flex="80" key={step}>
          <h6>{step}</h6>
          <p>{description}</p>
        </li>
      ))}
    </ol>
  </div>
);

export default Pipeline;
