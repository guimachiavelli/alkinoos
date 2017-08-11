import React from 'react';
import PropTypes from 'prop-types';

import './actions.scss';

import Navigation from '../navigation/navigation';
import Action, { actionTypes } from '../action/action';

import { breadcrumbTypes } from '../breadcrumb/breadcrumb';
import { sceneTypes } from '../scene/scene';
import { statTypes } from '../stat/stat';

class Actions extends React.Component {
  constructor() {
    super();
    this.handleActionAdd = this.handleActionAdd.bind(this);
    this.handleActionUpdate = this.handleActionUpdate.bind(this);
    this.handleActionDelete = this.handleActionDelete.bind(this);
    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.handleNavigationUpdate = this.handleNavigationUpdate.bind(this);
  }

  handleActionAdd() {
    const actions = this.props.actions.slice();

    const action = {
      id: Date.now(),
      name: '',
      consequences: [],
      stats: [],
      breadcrumb: [],
      scenes: [],
      selected: true,
    };

    actions.push(action);

    this.props.onUpdate(actions);
  }

  handleActionUpdate(updatedAction) {
    const actions = this.props.actions.slice();
    const index = actions.findIndex(action => action.id === updatedAction.id);

    actions[index] = updatedAction;

    this.props.onUpdate(actions);
  }

  handleActionDelete(id) {
    const actions = this.props.actions.filter(action => action.id !== id);
    this.props.onUpdate(actions);
  }

  handleActionSelect(id) {
    let actions = this.props.actions.slice();
    actions = actions.map((action) => {
      const newAction = action;
      newAction.selected = action.id === id;
      return newAction;
    });

    this.props.onUpdate(actions);
  }

  handleNavigationUpdate(item, isVisible) {
    if (!item) {
      return;
    }

    this.props.onNavigationUpdate(item, isVisible);
  }

  render() {
    const action = this.props.actions.find(a => a.selected === true);

    return (
      <div className="actions">
        <div className="actions__header">
          <Navigation
            items={this.props.actions}
            title="Actions possible"
            onSelect={this.handleActionSelect}
            onAdd={this.handleActionAdd}
            onScroll={this.handleNavigationUpdate}
          />
        </div>

        {action &&
        <Action
          key={action.id}
          id={action.id}
          name={action.name}
          selected={action.selected}
          consequences={action.consequences.slice(0)}
          stats={this.props.stats.slice(0)}
          breadcrumb={this.props.breadcrumb.slice(0)}
          scenes={this.props.scenes.slice(0)}
          onUpdate={this.handleActionUpdate}
          onDelete={this.handleActionDelete}
          onNavigationUpdate={this.handleNavigationUpdate}
        />
        }
      </div>
    );
  }
}

Actions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape(actionTypes)).isRequired,
  //eslint-disable-next-line
  breadcrumb: breadcrumbTypes.text,
  scenes: PropTypes.arrayOf(PropTypes.shape(sceneTypes)).isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNavigationUpdate: PropTypes.func.isRequired,
};

export default Actions;
