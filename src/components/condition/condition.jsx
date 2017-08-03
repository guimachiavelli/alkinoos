import React from 'react';

import './condition.scss';

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
    };

    updatedCondition[event.target.name] = event.target.value;

    this.props.onUpdate(updatedCondition);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    let stats = [];

    if (this.props.stats.length > 0) {
      stats = this.props.stats.map(stat =>
        (
          <option key={stat.id} value={stat.name}>{stat.name}</option>
        ),
      );
    }

    return (
      <li className="condition">
        <div className="condition__header">
          <button
            onClick={this.handleDelete}
          >
            Delete condition
          </button>
        </div>

        <label className="condition__label">
          <span className="condition__label-text">Condition Type</span>
          <select
            className="condition__select"
            name="type"
            value={this.props.type}
            onChange={this.handleInputChange}
          >
            <option value="">Choose condition type</option>
            {this.props.conditions.length < 2 &&
            <option value="default">Default</option>
            }
            <option value="flag">Flag</option>
            {stats.length > 0 &&
            <option value="stat">Stat</option>
            }
          </select>
        </label>

        { this.props.type === 'stat' && stats.length > 0 &&
        <label className="condition__label">
          Stat
          <select
            className="condition__select"
            name="stat"
            value={this.props.stat}
            onChange={this.handleInputChange}
          >
            <option value="">Choose stat</option>
            {stats}
          </select>
        </label>
        }

        { this.props.type === 'stat' &&
        <label className="condition__label">
          Operator
          <select
            className="condition__select"
            name="operator"
            value={this.props.operator}
            onChange={this.handleInputChange}
          >
            <option value="">Choose operator</option>
            <option value="=">=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
          </select>
        </label>
        }

        { this.props.type !== 'default' &&
        <label className="condition__label">
          <span className="condition__label-text">Trigger value</span>
          <input
            className="condition__input"
            type="text"
            name="value"
            value={this.props.value}
            onChange={this.handleInputChange}
          />
        </label>
        }

      </li>
    );
  }
}

export default Condition;
