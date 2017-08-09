import React from 'react';
import PropTypes from 'prop-types';

import './conditions.scss';
import Condition, { conditionTypes } from '../condition/condition';

import { statTypes } from '../stat/stat';

class Conditions extends React.Component {
  constructor() {
    super();
    this.handleConditionAdd = this.handleConditionAdd.bind(this);
    this.handleConditionUpdate = this.handleConditionUpdate.bind(this);
    this.handleConditionDelete = this.handleConditionDelete.bind(this);
  }

  handleConditionAdd() {
    const conditions = this.props.conditions.slice();

    const condition = {
      id: Date.now(),
      type: '',
      value: '',
      stat: '',
      operator: '',
      condition: [],
      stats: [],
    };

    conditions.push(condition);

    this.props.onUpdate(conditions);
  }

  handleConditionUpdate(updatedCondition) {
    const conditions = this.props.conditions.slice();
    const index = conditions.findIndex(condition => condition.id === updatedCondition.id);

    conditions[index] = updatedCondition;

    this.props.onUpdate(conditions);
  }

  handleConditionDelete(id) {
    const conditions = this.props.conditions.filter(condition => condition.id !== id);
    this.props.onUpdate(conditions);
  }

  render() {
    const hasDefaultCondition = this.props.conditions.findIndex(condition =>
      condition.type === 'default',
    );

    const conditions = this.props.conditions.map(condition =>
      (
        <Condition
          key={condition.id}
          id={condition.id}
          type={condition.type}
          value={condition.value}
          stat={condition.stat}
          stats={this.props.stats}
          operator={condition.operator}
          conditionsLength={this.props.conditions.length}
          onUpdate={this.handleConditionUpdate}
          onDelete={this.handleConditionDelete}
        />
      ),
    );

    return (
      <div className="conditions">
        <h3 className="conditions__title">Conditions</h3>
        <ol className="conditions__list">
          {conditions}
        </ol>
        {hasDefaultCondition < 0 &&
        <button
          className="conditions__button"
          onClick={this.handleConditionAdd}
        >
          Add condition
        </button>
        }
      </div>
    );
  }
}

Conditions.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.shape(conditionTypes)).isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Conditions;
