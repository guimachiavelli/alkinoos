import React from 'react';
import PropTypes from 'prop-types';

import './consequences.scss';

import Navigation from '../navigation/navigation';
import Consequence, { consequenceTypes } from '../consequence/consequence';

import { statTypes } from '../stat/stat';
import { sceneTypes } from '../scene/scene';
import { breadcrumbTypes } from '../breadcrumb/breadcrumb';

class Consequences extends React.Component {
  constructor() {
    super();
    this.handleConsequenceAdd = this.handleConsequenceAdd.bind(this);
    this.handleConsequenceUpdate = this.handleConsequenceUpdate.bind(this);
    this.handleConsequenceDelete = this.handleConsequenceDelete.bind(this);
    this.handleConsequenceSelect = this.handleConsequenceSelect.bind(this);
    this.handleNavigationUpdate = this.handleNavigationUpdate.bind(this);
  }

  handleConsequenceAdd() {
    const consequences = this.props.consequences.slice();

    const consequence = {
      id: Date.now(),
      conditions: [],
      text: [],
      actions: [],
      effects: [],
      stats: [],
      breadcrumb: [],
    };

    consequences.push(consequence);

    this.props.onUpdate(consequences);
  }

  handleConsequenceUpdate(updatedConsequence) {
    const consequences = this.props.consequences.slice();
    const index = consequences.findIndex(consequence => consequence.id === updatedConsequence.id);

    consequences[index] = updatedConsequence;

    this.props.onUpdate(consequences);
  }

  handleConsequenceDelete(id) {
    const consequences = this.props.consequences.filter(con => con.id !== id);
    this.props.onUpdate(consequences);
  }

  handleConsequenceSelect(id) {
    let consequences = this.props.consequences.slice();
    consequences = consequences.map((consequence) => {
      const newConsequence = consequence;
      newConsequence.selected = consequence.id === id;
      return newConsequence;
    });

    this.props.onUpdate(consequences);
  }

  handleNavigationUpdate(item, isVisible) {
    this.props.onNavigationUpdate(item, isVisible);
  }

  render() {
    const consequence = this.props.consequences.find(c => c.selected === true);

    const consequenceList = this.props.consequences.map((c) => {
      let name = 'Outcome';

      if (c.conditions.length < 1 || c.conditions[0].type === 'default') {
        name = 'Default outcome';
      } else if (c.conditions[0].type === 'stat') {
        name = `If ${c.conditions[0].stat} ${c.conditions[0].operator} ${c.conditions[0].value}`;
      } else if (c.conditions[0].type === 'flag') {
        name = `If player has ${c.conditions[0].value}`;
      }

      return {
        id: c.id,
        selected: c.selected,
        name,
      };
    });

    return (
      <div className="consequences">

        <div className="consequences__header">
          <Navigation
            items={consequenceList}
            title={this.props.navigationTitle}
            onSelect={this.handleConsequenceSelect}
            onAdd={this.handleConsequenceAdd}
            onScroll={this.handleNavigationUpdate}
          />
        </div>

        <ol className="consequences__list">
          {consequence &&
          <Consequence
            key={consequence.id}
            id={consequence.id}
            conditions={consequence.conditions}
            selected={consequence.selected}
            text={consequence.text}
            actions={consequence.actions}
            effects={consequence.effects}
            breadcrumb={this.props.breadcrumb}
            stats={this.props.stats}
            scenes={this.props.scenes}
            onUpdate={this.handleConsequenceUpdate}
            onDelete={this.handleConsequenceDelete}
            onNavigationUpdate={this.handleNavigationUpdate}
          />
          }
        </ol>
      </div>
    );
  }
}

Consequences.propTypes = {
  navigationTitle: PropTypes.string,
  //eslint-disable-next-line
  breadcrumb: breadcrumbTypes.text,
  consequences: PropTypes.arrayOf(PropTypes.shape(consequenceTypes)).isRequired,
  scenes: PropTypes.arrayOf(PropTypes.shape(sceneTypes)).isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  onNavigationUpdate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

Consequences.defaultProps = {
  navigationTitle: '',
};

export default Consequences;
