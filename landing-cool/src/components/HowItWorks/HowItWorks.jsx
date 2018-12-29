import React from 'react';
import './HowItWorks.scss';
import paperPlanes from './paper_planes-desktop.svg';

const HowItWorks = (
  <section row="" id="HowItWorks">
    <div
      className="row paperPlanes"
      align="end end"
      flex="60"
      mobile-align="center center"
      mobile-flex="100"
    >
      <img src={paperPlanes} alt="Aviõezinhos de papel, e outro em destaque / vantagem" />
    </div>

    <div flex="" className="p2">
      <h2>Como funciona?</h2>

      <p style={{ fontSize: '1.2em' }}>
      A indenizou é um serviço gratuito que vai te orientar
      e acelerar seu processo de indenização.
      Pra você continuar levando sua vida tranquilamente,
      com menos dor de cabeça, e ainda sair na frente.
      </p>

      <p className="mt2 mb1" style={{ fontSize: '.85em' }}>
      Pra isso, vamos te orientar, esclarecer quais são os seu direitos legais,
      e caso você possa ser indenizado, só no final a gente cobra uma comissãozinha
      sobre a indenização, e assim todo mundo sai ganhando.
      </p>

      <p>Maravilha não é mesmo?</p>
    </div>
  </section>
);

export default HowItWorks;
