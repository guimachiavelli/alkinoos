import React from 'react';

import './actions.scss';

import AddButton from '../add-button/add-button';
import Action from '../action/action';

class Actions extends React.Component {
  constructor() {
    super();
    this.handleActionAdd = this.handleActionAdd.bind(this);
    this.handleActionUpdate = this.handleActionUpdate.bind(this);
    this.handleActionDelete = this.handleActionDelete.bind(this);
  }

  handleActionAdd() {
    const actions = this.props.actions.slice();

    const action = {
      id: Date.now(),
      name: '',
      consequences: [],
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

  render() {
    let actions = [];
    if (this.props.actions.length > 0) {
      actions = this.props.actions.map((action) => {
        return (
          <Action
            key={action.id}
            id={action.id}
            name={action.name}
            consequences={action.consequences}
            stats={this.props.stats}
            sceneList={this.props.sceneList}
            onUpdate={this.handleActionUpdate}
            onDelete={this.handleActionDelete}
          />);
      });
    }

    const actions2 = this.props.actions.map(action =>
      (<li className="scene-navigation__item">
        <button className="scene-navigation__link">
          {action.name}
        </button>
      </li>),
    );

    return (
      <div className="actions">
        <div className="actions__header">
          <h3>Actions</h3>
          <button onClick={this.handleActionAdd}>Add action</button>
        </div>
        <div style={{background: 'coral'}} className="scene-navigation">
          <ol className="scene-navigation__list">
            {actions2}
          </ol>
        </div>
        <ol className="actions__list">
          {actions}
        </ol>
      </div>
    );
  }
}

export default Actions;
