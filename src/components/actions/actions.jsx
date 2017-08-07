import React from 'react';

import './actions.scss';

import Navigation from '../navigation/navigation';
import Action from '../action/action';

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
    const action = this.props.actions.find(action => action.selected === true);

    return (
      <div className="actions">
        <div className="actions__header">
          <Navigation
            items={this.props.actions}
            title="Actions possible"
            selected={action && action.selected}
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
          consequences={action.consequences}
          selected={action.selected}
          stats={this.props.stats}
          breadcrumb={this.props.breadcrumb}
          sceneList={this.props.sceneList}
          onUpdate={this.handleActionUpdate}
          onDelete={this.handleActionDelete}
          onNavigationUpdate={this.handleNavigationUpdate}
        />
        }
      </div>
    );
  }
}

export default Actions;
