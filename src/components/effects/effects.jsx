import React from 'react';

import Effect from '../effect/effect';

class Effects extends React.Component {

  constructor() {
    super();
    this.handleEffectAdd = this.handleEffectAdd.bind(this);
    this.handleEffectUpdate = this.handleEffectUpdate.bind(this);
    this.handleEffectDelete = this.handleEffectDelete.bind(this);
  }

  handleEffectAdd() {
    const effects = this.props.effects.slice();

    const effect = {
      id: Date.now(),
      type: '',
      value: '',
      operator: '',
      stat: '',
    };

    effects.push(effect);

    this.props.onUpdate(effects);
  }

  handleEffectUpdate(updatedEffect) {
    const effects = this.props.effects.slice();
    const index = effects.findIndex(effect => effect.id === updatedEffect.id);

    effects[index] = updatedEffect;

    this.props.onUpdate(effects);
  }

  handleEffectDelete(id) {
    const effects = this.props.effects.filter(effect => effect.id !== id);
    this.props.onUpdate(effects);
  }

  render() {
    const effects = this.props.effects.map((effect) => {
      return (
        <Effect
          key={effect.id}
          id={effect.id}
          type={effect.type}
          value={effect.value}
          operator={effect.operator}
          stat={effect.stat}
          stats={this.props.stats}
          sceneList={this.props.sceneList}
          onUpdate={this.handleEffectUpdate}
          onDelete={this.handleEffectDelete}
        />);
    });

    return (
      <div className="component">
        <div className="effects">
          <h3>Effects</h3>
          <ol className="effects__list">
            {effects}
          </ol>
          <button onClick={this.handleEffectAdd}>Add effect</button>
        </div>
      </div>
    );
  }
}

export default Effects;
