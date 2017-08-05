import React from 'react';

import './consequences.scss';

import Navigation from '../navigation/navigation';
import Consequence from '../consequence/consequence';

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
      selected: this.props.selected,
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
    const consequence = this.props.consequences.find(consequence => consequence.selected === true);

    const consequenceList = this.props.consequences.map((consequence) => {
      let name = 'Outcome';

      if (consequence.conditions.length < 1 || consequence.conditions[0].type === 'default') {
        name = 'Default outcome';
      } else if (consequence.conditions[0].type === 'stat') {
        name = `If ${consequence.conditions[0].stat} ${consequence.conditions[0].operator} ${consequence.conditions[0].value}`;
      } else if (consequence.conditions[0].type === 'flag') {
        name = `If player has '${consequence.conditions[0].value}'`;
      }

      return {
        id: consequence.id,
        selected: consequence.selected,
        name,
      };
    });

    return (
      <div className="consequences">
        <h3 className="consequences__title">Possible outcomes</h3>

        <Navigation
          items={consequenceList}
          selected={consequence && consequence.id}
          onSelect={this.handleConsequenceSelect}
          onAdd={this.handleConsequenceAdd}
          onScroll={this.handleNavigationUpdate}
        />

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
            sceneList={this.props.sceneList}
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

export default Consequences;
