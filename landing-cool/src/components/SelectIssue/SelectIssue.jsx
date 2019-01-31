import React from 'react';
import PropTypes from 'prop-types';
import './SelectIssue.module.scss';

const problems = [
  'cancelamento','overbooking', 'atraso', 'extravio de bagagem', 'outros',
];

const SelectIssue = React.memo(({ selected, handler }) => (
  <fieldset className="radio-group">
    {problems.map(problem => (
      <label
        key={problem}
        htmlFor={problem}
        className={(selected === problem).toString()}
      >
        <span>{problem}</span>
        <input
          type="radio"
          name={problem}
          id={problem}
          value={problem}
          checked={selected === problem}
          onChange={handler}
        />
      </label>
    ))}
  </fieldset>
));

SelectIssue.propTypes = {
  selected: PropTypes.string,
  handler: PropTypes.func.isRequired,
};

SelectIssue.defaultProps = {
  selected: 'atraso',
};

export default SelectIssue;
