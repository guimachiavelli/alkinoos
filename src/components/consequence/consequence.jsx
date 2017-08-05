import React from 'react';

import './consequence.scss';

import Conditions from '../conditions/conditions';
import Actions from '../actions/actions';
import Effects from '../effects/effects';

class Consequence extends React.Component {
  constructor() {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateConditions = this.handleUpdateConditions.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleUpdateEffects = this.handleUpdateEffects.bind(this);
  }

  handleUpdate(updatedActions) {
    const updatedConsequence = {
      id: this.props.id,
      actions: updatedActions,
      conditions: this.props.conditions,
      effects: this.props.effects,
      text: this.props.text,
      selected: this.props.selected,
    };

    this.props.onUpdate(updatedConsequence);
  }

  handleUpdateConditions(updatedConditions) {
    const updatedConsequence = {
      id: this.props.id,
      actions: this.props.actions,
      conditions: updatedConditions,
      effects: this.props.effects,
      text: this.props.text,
      selected: this.props.selected,
    };

    this.props.onUpdate(updatedConsequence);
  }

  handleUpdateEffects(updatedEffects) {
    const updatedConsequence = {
      id: this.props.id,
      actions: this.props.actions,
      conditions: this.props.conditions,
      effects: updatedEffects,
      text: this.props.text,
      selected: this.props.selected,
    };

    this.props.onUpdate(updatedConsequence);
  }

  handleUpdateText(event) {
    const textArray = event.target.value.split('\n\n');
    const updatedConsequence = {
      id: this.props.id,
      actions: this.props.actions,
      conditions: this.props.conditions,
      effects: this.props.effects,
      text: this.props.text,
      selected: this.props.selected,
    };

    updatedConsequence[event.target.name] = textArray;

    this.props.onUpdate(updatedConsequence);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const text = this.props.text.join('\n\n');
    return (
      <li className="consequence">
        <div className="consequence__header">
          <button
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </div>

        <div className="consequence__components">
          <div className="consequence__component consequence__component--full">
            <div className="narration">
              <h3 className="narration__title">Text</h3>
              <textarea
                placeholder="Narration text for this consequence"
                className="narration__textarea"
                name="text"
                value={text}
                onChange={this.handleUpdateText}
              />
            </div>
          </div>

          <div className="consequence__component consequence__component--half">
            <Conditions
              conditions={this.props.conditions}
              stats={this.props.stats}
              onUpdate={this.handleUpdateConditions}
            />
          </div>

          <div className="consequence__component consequence__component--half">
            <Effects
              stats={this.props.stats}
              effects={this.props.effects}
              sceneList={this.props.sceneList}
              onUpdate={this.handleUpdateEffects}
            />
          </div>

          <div className="consequence__component consequence__component--full">
            <Actions
              actions={this.props.actions}
              stats={this.props.stats}
              breadcrumb={this.props.breadcrumb}
              sceneList={this.props.sceneList}
              onUpdate={this.handleUpdate}
              onNavigationUpdate={this.props.onNavigationUpdate}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default Consequence;
