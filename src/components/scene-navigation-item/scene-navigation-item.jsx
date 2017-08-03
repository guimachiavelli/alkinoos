import React from 'react';

class SceneNavigationItem extends React.Component {
  constructor() {
    super();
    this.handleSceneSelect = this.handleSceneSelect.bind(this);
  }

  handleSceneSelect() {
    this.props.onSceneSelect(this.props.id);
  }

  render() {
    return (
      <li className="scene-navigation__item">
        <button
          className="scene-navigation__link"
          onClick={this.handleSceneSelect}
        >
          {this.props.name}
        </button>
      </li>
    );
  }
}

export default SceneNavigationItem;
