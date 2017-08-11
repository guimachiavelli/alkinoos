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
    const hasTitle = this.props.name;
    const sceneFilledInputClass = hasTitle ? 'scene__input--filled' : '';

    return (
      <div className="scene">
        <div className="scene__header">
          <label htmlFor="name" className="scene__label">
            <span className="scene__label-text">Scene Title</span>
            <input
              placeholder="Scene Title"
              className={`scene__input ${sceneFilledInputClass}`}
              name="name"
              type="text"
              value={this.props.name}
              onChange={this.handleTitleChange}
            />
          </label>

          <button
            className="scene__delete"
            onClick={this.handleDelete}
          >
            &times;
          </button>
        </div>


        <Consequences
          navigationTitle={`When entering "${this.props.name}"`}
          consequences={this.props.consequences}
          stats={this.props.stats}
          breadcrumb={this.props.breadcrumb}
          scenes={this.props.scenes}
          onUpdate={this.handleUpdate}
          onNavigationUpdate={this.props.onNavigationUpdate}
        />

      </div>
    );
  }
}

Scene.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

const simplifiedSceneTypes = clone(Scene.propTypes);

Scene.propTypes.consequences = PropTypes.arrayOf(
  PropTypes.shape(consequenceTypes),
).isRequired;

const sceneTypes = clone(Scene.propTypes);

Scene.propTypes.onDelete = PropTypes.func.isRequired;
Scene.propTypes.onUpdate = PropTypes.func.isRequired;
Scene.propTypes.onNavigationUpdate = PropTypes.func.isRequired;
Scene.propTypes.stats = PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired;
Scene.propTypes.scenes = PropTypes.arrayOf(PropTypes.shape(simplifiedSceneTypes)).isRequired;
//eslint-disable-next-line
Scene.propTypes.breadcrumb = breadcrumbTypes.text;


export { simplifiedSceneTypes, sceneTypes };
export default Scene;
