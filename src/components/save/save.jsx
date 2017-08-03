import React from 'react';

class Save extends React.Component {
  constructor() {
    super();
    this.handleDataSave = this.handleDataSave.bind(this);
  }

  handleDataSave() {
    window.localStorage.setItem('Alkinoos', JSON.stringify(this.props.game));
  }

  componentWillMount() {
    window.addEventListener('beforeunload', this.handleDataSave);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleDataSave);
  }

  render() {
    return (
      <button onClick={this.handleDataSave}>Save</button>
    );
  }

}

export default Save;
