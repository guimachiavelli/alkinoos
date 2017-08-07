import React from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

import './scene.scss';
import Consequences from '../consequences/consequences';

import { statTypes } from '../stat/stat';
import { consequenceTypes } from '../consequence/consequence';
import { breadcrumbTypes } from '../breadcrumb/breadcrumb';

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
      selected: this.props.selected,
    };

    this.props.onUpdate(updatedScene);
  }

  handleTitleChange(event) {
    const updatedScene = {
      id: this.props.id,
      name: event.target.value,
      consequences: this.props.consequences,
      selected: this.props.selected,
    };

    this.props.onUpdate(updatedScene);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {

    return (
      <div className="scene">
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
          navigationTitle={`Consequences of entering "${this.props.name}"`}
          consequences={this.props.consequences}
          stats={this.props.stats}
          breadcrumb={this.props.breadcrumb}
          sceneList={this.props.sceneList}
          onUpdate={this.handleUpdate}
          onNavigationUpdate={this.props.onNavigationUpdate}
        />

        <button
          className="scene__delete"
          onClick={this.handleDelete}
        >
          Delete scene
        </button>
      </div>
    );
  }
}

Scene.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  consequences: PropTypes.arrayOf(
    PropTypes.shape(consequenceTypes),
  ).isRequired,
};

const sceneTypes = clone(Scene.propTypes);

Scene.propTypes.onDelete = PropTypes.func.isRequired;
Scene.propTypes.onUpdate = PropTypes.func.isRequired;
Scene.propTypes.onNavigationUpdate = PropTypes.func.isRequired;
Scene.propTypes.stats = PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired;
Scene.propTypes.sceneList = PropTypes.arrayOf(PropTypes.object).isRequired,
  //eslint-disable-next-line
Scene.propTypes.breadcrumb = breadcrumbTypes.text;


export { sceneTypes };
export default Scene;
