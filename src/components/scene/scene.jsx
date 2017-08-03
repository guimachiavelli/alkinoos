import React from 'react';

import './scene.scss';
import Consequences from '../consequences/consequences';

class Scene extends React.Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpdate(updatedConsequences) {
    const updatedScene = {
      id: this.props.id,
      name: this.props.name,
      consequences: updatedConsequences,
    };

    this.props.onUpdate(updatedScene);
  }

  handleTitleChange(event) {
    const updatedScene = {
      id: this.props.id,
      name: event.target.value,
      consequences: this.props.consequences,
    };

    this.props.onUpdate(updatedScene);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {

    return (
      <li className="scene">
        <label htmlFor="name" className="scene__label">
          <span className="scene__label-text">Scene Title</span>
          <input
            placeholder="Scene Title"
            className={"scene__input " + (this.props.name ? 'scene__input--filled' : '')}
            name="name"
            type="text"
            value={this.props.name}
            onChange={this.handleTitleChange}
          />
        </label>

        <Consequences
          consequences={this.props.consequences}
          stats={this.props.stats}
          sceneList={this.props.sceneList}
          onUpdate={this.handleUpdate}
        />

        <button
          className="scene__delete"
          onClick={this.handleDelete}
        >
          Delete scene
        </button>
      </li>
    );
  }
}

export default Scene;
