import React from 'react';
import PropTypes from 'prop-types';

import './consequence.scss';

import TabContainer from '../tab-container/tab-container';
import Narration from '../narration/narration';
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

  handleUpdateText(textArray) {
    const updatedConsequence = {
      id: this.props.id,
      actions: this.props.actions,
      conditions: this.props.conditions,
      effects: this.props.effects,
      text: textArray,
      selected: this.props.selected,
    };

    this.props.onUpdate(updatedConsequence);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <li className="consequence">
        <div className="consequence__header">
          <button
            onClick={this.handleDelete}
          >
            Delete
          </button>
        </div>

        <TabContainer id={this.props.id}>
          <Narration
            text={this.props.text}
            onChange={this.handleUpdateText}
          />

          <Conditions
            conditions={this.props.conditions}
            stats={this.props.stats}
            onUpdate={this.handleUpdateConditions}
          />

          <Effects
            stats={this.props.stats}
            effects={this.props.effects}
            scenes={this.props.scenes}
            onUpdate={this.handleUpdateEffects}
          />
        </TabContainer>

        <Actions
          actions={this.props.actions}
          stats={this.props.stats}
          breadcrumb={this.props.breadcrumb}
          scenes={this.props.scenes}
          onUpdate={this.handleUpdate}
          onNavigationUpdate={this.props.onNavigationUpdate}
        />
      </li>
    );
  }
}

Consequence.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  conditions: PropTypes.arrayOf(PropTypes.object).isRequired,
  effects: PropTypes.arrayOf(PropTypes.object).isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const consequenceTypes = JSON.parse(JSON.stringify(Consequence.propTypes));

export { consequenceTypes };
export default Consequence;
