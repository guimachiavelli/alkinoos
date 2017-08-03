import React from 'react';

class Effect extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const {name, value} = event.target;

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
    let stats = [],
        scenes = [];

    if (this.props.stats.length > 0) {
      stats = this.props.stats.map(stat =>
        (
          <option key={stat.id} value={stat.name}>{stat.name}</option>
        ),
      );
    }

    if (this.props.sceneList.length > 0) {
      scenes = this.props.sceneList.map(scene =>
        (
          <option key={scene.id} value={scene.id}>{scene.name}</option>
        ),
      );
    }


    return (
      <li className="effect">
        <label>
          Effect Type
          <select name="type" value={this.props.type} onChange={this.handleInputChange}>
            <option value="">Choose effect type</option>
            <option value="goto">Go to</option>
            <option value="flag">Flag</option>
            {stats.length > 0 &&
            <option value="stat">Stat</option>
            }
          </select>
        </label>

        {(this.props.type === 'flag' || this.props.type === 'stats') &&
        <label>
          Operator
          <select name="operator" value={this.props.operator} onChange={this.handleInputChange}>
            <option value="">Choose operator</option>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </label>
        }

        { this.props.type === 'stat' && stats.length> 0 &&
        <label>
          Stat
          <select name="stat" value={this.props.stat} onChange={this.handleInputChange}>
            <option value="">Choose stat</option>
            {stats}
          </select>
        </label>
        }

        { this.props.type === 'goto' && scenes.length > 0 &&
        <label>
          Scene
          <select name="value" value={this.props.value} onChange={this.handleInputChange}>
            <option value="">Choose scene</option>
            {scenes}
          </select>
        </label>
        }

        { this.props.type !== 'goto' &&
        <label>
          Value
          <input type="text" value={this.props.value} name="value" onChange={this.handleInputChange} />
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

export default Effect;
