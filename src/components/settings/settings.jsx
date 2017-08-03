import React from 'react';

import './settings.scss';
import Stats from '../stats/stats';

class Settings extends React.Component {
  constructor() {
    super();

    this.handleStatUpdate = this.handleStatUpdate.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleStatUpdate(updatedStats) {
    const settings = {
      title: this.props.title,
      stats: updatedStats,
    };

    this.props.onUpdate(settings);
  }

  handleTitleChange(event) {
    const settings = {
      title: event.target.value,
      stats: this.props.stats,
    };

    this.props.onUpdate(settings);
  }

  render() {
    return (
      <div className="settings">
        <h2>Settings</h2>

        <label>
          Story Title
          <input
            type="text"
            name="title"
            value={this.props.title}
            onChange={this.handleTitleChange}
          />
        </label>

        <Stats
          stats={this.props.stats}
          onUpdate={this.handleStatUpdate}
        />
      </div>
    );
  }
}

export default Settings;
