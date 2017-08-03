import React from 'react';

class AddButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <button onClick={this.handleClick} className="consequences__add">
        Add {this.props.name}
      </button>
    );
  }
}

export default AddButton;
