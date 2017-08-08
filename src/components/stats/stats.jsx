import React from 'react';
import PropTypes from 'prop-types';

import Stat, { statTypes } from '../stat/stat';

class Stats extends React.Component {
  constructor() {
    super();

    this.handleStatAdd = this.handleStatAdd.bind(this);
    this.handleStatUpdate = this.handleStatUpdate.bind(this);
    this.handleStatDelete = this.handleStatDelete.bind(this);
  }

  handleStatAdd() {
    const stats = this.props.stats.slice();
    const stat = {
      id: Date.now(),
      name: '',
      initial: 0,
      max: 0,
    };

    stats.push(stat);

    this.props.onUpdate(stats);
  }

  handleStatUpdate(updatedStat) {
    const stats = this.props.stats;
    const index = stats.findIndex(stat => stat.id === updatedStat.id);

    stats[index] = updatedStat;

    this.props.onUpdate(stats);
  }

  handleStatDelete(id) {
    const stats = this.props.stats.filter(stat => stat.id !== id);
    this.props.onUpdate(stats);
  }

  render() {
    const stats = this.props.stats.map(stat =>
      (
        <Stat
          key={stat.id}
          id={stat.id}
          name={stat.name}
          initial={stat.initial}
          max={stat.max}
          onUpdate={this.handleStatUpdate}
          onDelete={this.handleStatDelete}
        />
      ),
    );

    return (
      <div className="stats">
        <h3>Stats</h3>
        <ol className="stats__list">
          {stats}
        </ol>
        <button onClick={this.handleStatAdd}>Add stat</button>
      </div>
    );
  }
}

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Stats;
