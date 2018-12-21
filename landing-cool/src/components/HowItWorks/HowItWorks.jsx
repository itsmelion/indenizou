import React from 'react';
import Pipeline from 'components/Pipeline/Pipeline';
import './HowItWorks.scss';

const HowItWorks = (
  <section id="HowItWorks">
    <div className="contain column footer" align="between start">
      <h2>Como funciona?</h2>

      <p>
      A indenizou é um serviço gratuito que vai te orientar
      e acelerar seu processo de indenização.
      </p>

      {Pipeline}
    </div>
  </section>
);

export default HowItWorks;
