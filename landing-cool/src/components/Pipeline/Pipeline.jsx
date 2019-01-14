import React from 'react';
import './Pipeline.scss';
import pipeline from './steps-data';

const Pipeline = (
  <section id="Pipeline" className="column contain" mobile-align="start center">
    {/* <h3 mobile-flex="80" className="mt1 mb1">Passo a Passo:</h3> */}
    <h2 className="mb1">Passo a Passo:</h2>

    <ol align="around start" className="pt1 pb2 row">
      {pipeline.map(({ step, icon, description }) => (
        <li flex="20" mobile-flex="80" key={step}>
          <h6>{step}</h6>
          <p>{description}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default Pipeline;
