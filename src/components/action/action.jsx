import React from 'react';

import './action.scss';

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
      selected: this.props.selected,
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
      selected: this.props.selected,
    };

    this.props.onUpdate(updatedAction);
  }

  render() {
    return (
      <li className="action">
        <div className="action__header">
          <label>
            Action Title
            <input type="text" onChange={this.handleTitleChange} value={this.props.name} />
          </label>

          <button
            onClick={this.handleDelete}
          >
            Delete action
          </button>
        </div>

        <Consequences
          consequences={this.props.consequences}
          stats={this.props.stats}
          sceneList={this.props.sceneList}
          breadcrumb={this.props.breadcrumb}
          onUpdate={this.handleUpdate}
          onNavigationUpdate={this.props.onNavigationUpdate}
        />

      </li>
    );
  }
}

export default Action;
