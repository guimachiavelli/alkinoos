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

    let { value, name } = event.target;

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
    return (
      <li className="stat">
        <label>
          Stat title
          <input
            type="text"
            onChange={this.handleInputChange}
            name="name"
            value={this.props.name}
          />
        </label>
        <label>
          Stat initial value
          <input
            type="number"
            onChange={this.handleInputChange}
            name="initial"
            value={this.props.initial}
          />
        </label>
        <label>
          Stat max value
          <input
            type="number"
            onChange={this.handleInputChange}
            name="max"
            value={this.props.max}
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
