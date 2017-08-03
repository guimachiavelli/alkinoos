import React from 'react';

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

    stat[event.target.name] = event.target.value;

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

export default Stat;
