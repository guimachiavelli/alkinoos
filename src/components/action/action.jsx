import React from 'react';
import PropTypes from 'prop-types';

import './action.scss';

import Consequences from '../consequences/consequences';

import { statTypes } from '../stat/stat';
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
          sceneList={this.props.sceneList}
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
  consequences: PropTypes.arrayOf(
    PropTypes.shape({ consequenceTypes }),
  ).isRequired,
  selected: PropTypes.bool.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape(statTypes),
  ).isRequired,
  breadcrumb: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    selected: PropTypes.bool,
    name: PropTypes.string.isRequired,
  })).isRequired,
  sceneList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    selected: PropTypes.bool,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNavigationUpdate: PropTypes.func.isRequired,
};

export default Action;
