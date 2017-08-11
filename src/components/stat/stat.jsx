import React from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

import './stat.scss';

class Stat extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const stat = {
      id: this.props.id,
      name: this.props.name,
      initial: this.props.initial,
      max: this.props.max,
    };

    let { value } = event.target;
    const { name } = event.target;

    if (name === 'initial' || name === 'max') {
      value = parseInt(value, 10);
    }

    stat[name] = value;

    this.props.onUpdate(stat);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const inputID = `${this.props.id}-input`;
    return (
      <li className="stat">
        <button
          className="stat__delete"
          onClick={this.handleDelete}
        >
          &times;
        </button>

        <label
          className="stat__label"
          htmlFor={`${inputID}-name`}
        >
          <span className="stat__label-text">Stat title</span>
          <input
            type="text"
            name="name"
            className="stat__input"
            value={this.props.name}
            id={`${inputID}-name`}
            onChange={this.handleInputChange}
          />
        </label>
        <label
          className="stat__label"
          htmlFor={`${inputID}-initial`}
        >
          <span className="stat__label-text">Stat initial value</span>
          <input
            type="number"
            name="initial"
            className="stat__input"
            value={this.props.initial}
            id={`${inputID}-initial`}
            onChange={this.handleInputChange}
          />
        </label>
        <label
          className="stat__label"
          htmlFor={`${inputID}-max`}
        >
          <span className="stat__label-text">Stat max value</span>
          <input
            type="number"
            name="max"
            className="stat__input"
            value={this.props.max}
            id={`${inputID}-max`}
            onChange={this.handleInputChange}
          />
        </label>
      </li>
    );
  }
}

Stat.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  initial: PropTypes.number.isRequired,
  max: PropTypes.number,
};

const statTypes = clone(Stat.propTypes);

Stat.propTypes.onUpdate = PropTypes.func.isRequired;
Stat.propTypes.onDelete = PropTypes.func.isRequired;

Stat.defaultProps = {
  max: 0,
};

export { statTypes };
export default Stat;
