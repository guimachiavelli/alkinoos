import React from 'react';

import './consequences.scss';
import Consequence from '../consequence/consequence';

class Consequences extends React.Component {
  constructor() {
    super();
    this.handleConsequenceAdd = this.handleConsequenceAdd.bind(this);
    this.handleConsequenceUpdate = this.handleConsequenceUpdate.bind(this);
    this.handleConsequenceDelete = this.handleConsequenceDelete.bind(this);
  }

  handleConsequenceAdd() {
    const consequences = this.props.consequences.slice();

    const consequence = {
      id: Date.now(),
      conditions: [],
      text: [],
      actions: [],
      effects: [],
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

  render() {
    const consequences = this.props.consequences.map((consequence) => {
      return (
        <Consequence
          key={consequence.id}
          id={consequence.id}
          conditions={consequence.conditions}
          text={consequence.text}
          actions={consequence.actions}
          effects={consequence.effects}
          stats={this.props.stats}
          sceneList={this.props.sceneList}
          onUpdate={this.handleConsequenceUpdate}
          onDelete={this.handleConsequenceDelete}
        />);
    });

    return (
      <div className="consequences">
        <h3 className="consequences__title">Possible outcomes</h3>

        <ol className="consequences__list">
          {consequences}
        </ol>

        <button
          className="consequences__button"
          onClick={this.handleConsequenceAdd}
        >
          Add consequence
        </button>
      </div>
    );
  }
}

export default Consequences;
