import React from 'react';

import './scenes.scss';
import Scene from '../scene/scene';
import SceneNavigation from '../scene-navigation/scene-navigation';

class Scenes extends React.Component {
  constructor() {
    super();
    this.handleSceneAdd = this.handleSceneAdd.bind(this);
    this.handleSceneUpdate = this.handleSceneUpdate.bind(this);
    this.handleSceneDelete = this.handleSceneDelete.bind(this);
    this.handleSceneSelect = this.handleSceneSelect.bind(this);
  }

  handleSceneAdd() {
    const scenes = this.props.scenes.slice();
    const scene = {
      id: Date.now(),
      name: '',
      consequences: [],
    };

    scenes.push(scene);

    this.props.onUpdate(scenes);
    this.props.onSceneSelect(scene.id);
  }

  handleSceneUpdate(updatedScene) {
    const scenes = this.props.scenes.slice();
    const index = scenes.findIndex(scene => scene.id === updatedScene.id);

    scenes[index] = updatedScene;

    this.props.onUpdate(scenes);
  }

  handleSceneDelete(id) {
    const scenes = this.props.scenes.filter(scene => scene.id !== id);
    this.props.onUpdate(scenes);
  }

  handleSceneSelect(id) {
    this.props.onSceneSelect(id);
  }

  render() {
    const sceneList = this.props.scenes.map(scene =>
      ({ id: scene.id, name: scene.name }),
    );

    const scene = this.props.scenes.find(scene => scene.id === this.props.selectedScene);

    return (
      <div className="scenes">
        <SceneNavigation
          scenes={this.props.scenes}
          selectedScene={this.props.selectedScene}
          onSceneSelect={this.handleSceneSelect}
          onSceneAdd={this.handleSceneAdd}
        />
        <div className="scenes__container">
          { scene &&
          <Scene
            id={scene.id}
            name={scene.name}
            sceneList={sceneList}
            consequences={scene.consequences}
            stats={this.props.stats}
            onUpdate={this.handleSceneUpdate}
            onDelete={this.handleSceneDelete}
          />
          }
        </div>
      </div>
    );
  }
}

export default Scenes;
