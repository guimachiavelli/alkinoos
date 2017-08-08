import React from 'react';
import PropTypes from 'prop-types';

import './settings.scss';
import Stats from '../stats/stats';
import { statTypes } from '../stat/stat';

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
    const titleID = 'settings-input-title';

    return (
      <div className="settings">
        <h2>Settings</h2>

        <label htmlFor={titleID}>
          Story Title
          <input
            type="text"
            name="title"
            id={titleID}
            value={this.props.title || ''}
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

Settings.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape(statTypes)).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  title: '',
};

export default Settings;
