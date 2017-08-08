import React from 'react';
import PropTypes from 'prop-types';

import Effect, { effectTypes } from '../effect/effect';

import { sceneTypes } from '../scene/scene';
import { statTypes } from '../stat/stat';

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
    const effects = this.props.effects.map(effect =>
      (
        <Effect
          key={effect.id}
          id={effect.id}
          type={effect.type}
          value={effect.value}
          operator={effect.operator}
          stat={effect.stat}
          stats={this.props.stats}
          scenes={this.props.scenes}
          onUpdate={this.handleEffectUpdate}
          onDelete={this.handleEffectDelete}
        />
      ),
    );

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

Effects.propTypes = {
  effects: PropTypes.arrayOf(PropTypes.shape(effectTypes)).isRequired,
  scenes: PropTypes.arrayOf(PropTypes.shape(sceneTypes)).isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Effects;
