import React from 'react';
import { yearsFromNow } from 'utilities';
import cases from './testimonials-data';
import './Cases.scss';

const Cases = (
  <section id="Cases" className="column contain" mobile-align="start center">
    <h2 className="mb1">Casos e Depoimentos</h2>

    <ul row="" align="around">
      {cases.map(u => (
        <li key={u.name} column="">
          <h6 className="mb1">{u.assunto}</h6>
          <article>{u.message}</article>
          <span flex="" />
          <legend className="mt1">
            <h6>{u.name}, {yearsFromNow(u.birth_year)} anos</h6>
            <sub>{u.address}</sub>
          </legend>
        </li>
      ))}
    </ul>
  </section>
);

export default Cases;
