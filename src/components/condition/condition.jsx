import React from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

import './condition.scss';

import { statTypes } from '../stat/stat';

class Condition extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const updatedCondition = {
      id: this.props.id,
      type: this.props.type,
      value: this.props.value,
      stat: this.props.stat,
      operator: this.props.operator,
      stats: this.props.stats,
    };

    updatedCondition[event.target.name] = event.target.value;

    this.props.onUpdate(updatedCondition);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const stats = this.props.stats.map(stat =>
      (
        <option key={stat.id} value={stat.name}>{stat.name}</option>
      ),
    );

    const inputIDPartial = `${this.props.id}-input`;
    const typeID = `${inputIDPartial}-type`;
    const valueID = `${inputIDPartial}-value`;
    const statID = `${inputIDPartial}-stat`;
    const operatorID = `${inputIDPartial}-operator`;

    return (
      <li className="condition">
        <div className="condition__header">
          <button
            onClick={this.handleDelete}
          >
            Delete condition
          </button>
        </div>

        <label className="condition__label" htmlFor={typeID}>
          <span className="condition__label-text">Condition Type</span>
          <select
            className="condition__select"
            name="type"
            value={this.props.type}
            id={typeID}
            onChange={this.handleInputChange}
          >
            <option value="">Choose condition type</option>
            {this.props.conditionsLength < 2 &&
            <option value="default">Default</option>
            }
            <option value="flag">Flag</option>
            {stats.length > 0 &&
            <option value="stat">Stat</option>
            }
          </select>
        </label>

        {this.props.type === 'stat' && stats.length > 0 &&
        <label className="condition__label" htmlFor={statID}>
          Stat
          <select
            className="condition__select"
            name="stat"
            value={this.props.stat}
            id={statID}
            onChange={this.handleInputChange}
          >
            <option value="">Choose stat</option>
            {stats}
          </select>
        </label>
        }

        {this.props.type === 'stat' &&
        <label className="condition__label" htmlFor={operatorID}>
          Operator
          <select
            className="condition__select"
            name="operator"
            value={this.props.operator}
            id={operatorID}
            onChange={this.handleInputChange}
          >
            <option value="">Choose operator</option>
            <option value="=">=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
          </select>
        </label>
        }

        {this.props.type !== 'default' &&
        <label className="condition__label" htmlFor={valueID}>
          <span className="condition__label-text">Trigger value</span>
          <input
            className="condition__input"
            type="text"
            name="value"
            id={valueID}
            value={this.props.value}
            onChange={this.handleInputChange}
          />
        </label>
        }

      </li>
    );
  }
}

Condition.propTypes = {
  id: PropTypes.number.isRequired,
  operator: PropTypes.string,
  stat: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

const conditionTypes = clone(Condition.propTypes);

Condition.propTypes.conditionsLength = PropTypes.number.isRequired;
Condition.propTypes.onDelete = PropTypes.func.isRequired;
Condition.propTypes.onUpdate = PropTypes.func.isRequired;

Condition.defaultProps = {
  operator: '',
  stat: '',
  value: '',
};

export { conditionTypes };
export default Condition;
