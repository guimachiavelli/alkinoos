import React from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

import './action.scss';

import Consequences from '../consequences/consequences';

import { statTypes } from '../stat/stat';
import { sceneTypes } from '../scene/scene';
import { consequenceTypes } from '../consequence/consequence';

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
      stats: this.props.stats,
      consequences: updatedConsequences,
      selected: this.props.selected,
      breadcrumb: this.props.breadcrumb,
      scenes: this.props.scenes,
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
      stats: this.props.stats,
      breadcrumb: this.props.breadcrumb,
      scenes: this.props.scenes,
    };

    this.props.onUpdate(updatedAction);
  }

  render() {
    const titleID = `${this.props.id}-title`;

    return (
      <div className="action">
        <div className="action__header">
          <label htmlFor={titleID}>
            Action Title
            <input
              type="text"
              onChange={this.handleTitleChange}
              id={titleID}
              value={this.props.name}
            />
          </label>

          <button
            onClick={this.handleDelete}
          >
            Delete action
          </button>
        </div>

        <Consequences
          navigationTitle={`Consequences of "${this.props.name}" action`}
          consequences={this.props.consequences}
          stats={this.props.stats}
          scenes={this.props.scenes}
          breadcrumb={this.props.breadcrumb}
          onUpdate={this.handleUpdate}
          onNavigationUpdate={this.props.onNavigationUpdate}
        />

      </div>
    );
  }
}

Action.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  consequences: PropTypes.arrayOf(PropTypes.shape(consequenceTypes)).isRequired,
  selected: PropTypes.bool.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  breadcrumb: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    selected: PropTypes.bool,
    name: PropTypes.string.isRequired,
  })).isRequired,
  scenes: PropTypes.arrayOf(PropTypes.shape(sceneTypes)).isRequired,
};

const actionTypes = clone(Action.propTypes);

Action.propTypes.onUpdate = PropTypes.func.isRequired;
Action.propTypes.onDelete = PropTypes.func.isRequired;
Action.propTypes.onNavigationUpdate = PropTypes.func.isRequired;


export { actionTypes };
export default Action;
