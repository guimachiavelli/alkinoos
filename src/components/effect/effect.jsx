import React from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

import { statTypes } from '../stat/stat';
import { sceneTypes } from '../scene/scene';

class Effect extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    const updatedCondition = {
      id: this.props.id,
      type: this.props.type,
      value: this.props.value,
      stat: this.props.stat,
      operator: this.props.operator,
    };

    updatedCondition[name] = value;

    if (name === 'type') {
      updatedCondition.value = '';
      updatedCondition.operator = '';
      updatedCondition.stat = '';
    }

    this.props.onUpdate(updatedCondition);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const stats = this.props.stats.map(stat =>
      (<option key={stat.id} value={stat.name}>{stat.name}</option>),
    );

    const scenes = this.props.scenes.map(scene =>
      (<option key={scene.id} value={scene.id}>{scene.name}</option>),
    );

    const partialInputID = `${this.props.id}-input`;
    const typeID = `${partialInputID}-type`;
    const operatorID = `${partialInputID}-operator`;
    const statID = `${partialInputID}-stat`;
    const sceneID = `${partialInputID}-scene`;
    const valueID = `${partialInputID}-value`;

    return (
      <li className="effect">
        <label htmlFor={typeID}>
          Effect Type
          <select
            name="type"
            value={this.props.type}
            id={typeID}
            onChange={this.handleInputChange}
          >
            <option value="">Choose effect type</option>
            <option value="goto">Go to</option>
            <option value="flag">Flag</option>
            {stats.length > 0 &&
            <option value="stat">Stat</option>
            }
          </select>
        </label>

        {(this.props.type === 'flag' || this.props.type === 'stats') &&
        <label htmlFor={operatorID}>
          Operator
          <select
            name="operator"
            id={operatorID}
            value={this.props.operator}
            onChange={this.handleInputChange}
          >
            <option value="">Choose operator</option>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </label>
        }

        {this.props.type === 'stat' && stats.length > 0 &&
        <label htmlFor={statID}>
          Stat
          <select
            name="stat"
            id={statID}
            value={this.props.stat}
            onChange={this.handleInputChange}
          >
            <option value="">Choose stat</option>
            {stats}
          </select>
        </label>
        }

        {this.props.type === 'goto' && scenes.length > 0 &&
        <label htmlFor={sceneID}>
          Scene
          <select
            name="value"
            id={sceneID}
            value={this.props.value}
            onChange={this.handleInputChange}
          >
            <option value="">Choose scene</option>
            {scenes}
          </select>
        </label>
        }

        {this.props.type !== 'goto' &&
        <label htmlFor={valueID}>
          Value
          <input
            type="text"
            name="value"
            id={valueID}
            value={this.props.value}
            onChange={this.handleInputChange}
          />
        </label>
        }

        <button
          onClick={this.handleDelete}
        >
          Delete effect
        </button>

      </li>
    );
  }
}

Effect.propTypes = {
  id: PropTypes.number.isRequired,
  operator: PropTypes.string,
  stat: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
};

const effectTypes = clone(Effect.propTypes);

Effect.propTypes.scenes = PropTypes.arrayOf(PropTypes.shape(sceneTypes)).isRequired;
Effect.propTypes.stats = PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired;
Effect.propTypes.onDelete = PropTypes.func.isRequired;
Effect.propTypes.onUpdate = PropTypes.func.isRequired;

Effect.defaultProps = {
  operator: '',
  stat: '',
  value: '',
  type: 'default',
};

export { effectTypes };
export default Effect;
