import React from 'react';

import './scene-navigation.scss';

import SceneNavigationItem from '../scene-navigation-item/scene-navigation-item';

class SceneNavigation extends React.Component {
  constructor() {
    super();
    this.handleSceneAdd = this.handleSceneAdd.bind(this);
    this.handleSceneSelect = this.handleSceneSelect.bind(this);
  }

  handleSceneAdd() {
    this.props.onSceneAdd();
  }

  handleSceneSelect(id) {
    this.props.onSceneSelect(id);
  }

  render() {
    const scenes = this.props.scenes.map(scene =>
      (
        <SceneNavigationItem
          key={scene.id}
          id={scene.id}
          name={scene.name}
          onSceneSelect={this.handleSceneSelect}
        />
    ));


    const scene = this.props.scenes.find(scene => scene.id === this.props.selectedScene);
    let consequences;
    if (scene && scene.consequences) {
      consequences = scene.consequences.map((consequence) => {
        if (consequence.conditions[0].type === 'default') {
          return (
            <li>Default outcome</li>
          );
        }

        if (consequence.conditions[0].type === 'stat') {
          return (
            <li>
              If {consequence.conditions[0].stat} {consequence.conditions[0].operator} {consequence.conditions[0].value}
            </li>
          );
        }

        if (consequence.conditions[0].type === 'flag') {
          return (
            <li>
               If player has '{consequence.conditions[0].value}'
            </li>
          );
        }

      });

    }
    return (
        <div className="scene-navigation">
          <ol className="scene-navigation__list">
            { scenes }
            <li>
              <button
                className="scene-navigation__button"
                onClick={this.handleSceneAdd}
              >
                Add scene
              </button>
            </li>
          </ol>

          {consequences &&
          <ol className="scene-navigation__list">
            { consequences }
            <li>
              <button
                className="scene-navigation__button"
                onClick={this.handleSceneAdd}
              >
                Add consequence
              </button>
            </li>
          </ol>
          }
        </div>

    );
  }
}

export default SceneNavigation;
