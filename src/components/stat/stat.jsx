import React from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

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
        <label htmlFor={`${inputID}-name`}>
          Stat title
          <input
            type="text"
            name="name"
            value={this.props.name}
            id={`${inputID}-name`}
            onChange={this.handleInputChange}
          />
        </label>
        <label htmlFor={`${inputID}-initial`}>
          Stat initial value
          <input
            type="number"
            name="initial"
            value={this.props.initial}
            id={`${inputID}-initial`}
            onChange={this.handleInputChange}
          />
        </label>
        <label htmlFor={`${inputID}-max`}>
          Stat max value
          <input
            type="number"
            name="max"
            value={this.props.max}
            id={`${inputID}-max`}
            onChange={this.handleInputChange}
          />
        </label>
        <button onClick={this.handleDelete}>Delete stat</button>
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
