import React from 'react';

import Consequences from '../consequences/consequences';

class Action extends React.Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleUpdate(updatedConsequences) {
    const updatedAction = {
      id: this.props.id,
      name: this.props.name,
      consequences: updatedConsequences,
    };

    this.props.onUpdate(updatedAction);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  handleTitleChange(event) {
    const updatedAction = {
      id: this.props.id,
      name: event.target.value,
      consequences: this.props.consequences,
    };

    this.props.onUpdate(updatedAction);
  }

  render() {
    return (
      <li className="action">
        <label>
          Action Title
          <input type="text" onChange={this.handleTitleChange} value={this.props.name} />
        </label>

        <Consequences
          consequences={this.props.consequences}
          stats={this.props.stats}
          sceneList={this.props.sceneList}
          onUpdate={this.handleUpdate}
        />

        <button
          onClick={this.handleDelete}
        >
          Delete action
        </button>

      </li>
    );
  }
}

export default Action;
