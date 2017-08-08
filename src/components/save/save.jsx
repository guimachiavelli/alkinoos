import React from 'react';
import PropTypes from 'prop-types';

class Save extends React.Component {
  constructor() {
    super();
    this.handleDataSave = this.handleDataSave.bind(this);
  }

  componentWillMount() {
    window.addEventListener('beforeunload', this.handleDataSave);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleDataSave);
  }

  handleDataSave() {
    window.localStorage.setItem('Alkinoos', JSON.stringify(this.props.game));
  }

  render() {
    return (
      <button onClick={this.handleDataSave}>Save</button>
    );
  }
}

Save.propTypes = {
  game: PropTypes.shape({
    settings: PropTypes.object,
    scenes: PropTypes.array,
  }).isRequired,
};

export default Save;
