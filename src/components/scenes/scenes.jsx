import PropTypes from 'prop-types';
import React from 'react';
import clone from 'lodash.clone';

import './scenes.scss';

import Scene, { sceneTypes } from '../scene/scene';
import Navigation from '../navigation/navigation';
import Breadcrumb from '../breadcrumb/breadcrumb';

class Scenes extends React.Component {
  constructor() {
    super();
    this.handleSceneAdd = this.handleSceneAdd.bind(this);
    this.handleSceneUpdate = this.handleSceneUpdate.bind(this);
    this.handleSceneDelete = this.handleSceneDelete.bind(this);
    this.handleSceneSelect = this.handleSceneSelect.bind(this);

    this.handleBreadcrumbUpdate = this.handleBreadcrumbUpdate.bind(this);

    this.state = {
      breadcrumb: [],
    };
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
    let scenes = this.props.scenes.slice();
    scenes = scenes.map((scene) => {
      const newScene = scene;
      newScene.selected = scene.id === id;
      return newScene;
    });

    this.props.onUpdate(scenes);
  }

  handleBreadcrumbUpdate(item, isVisible) {
    this.setState((prevState) => {
      const breadcrumb = prevState.breadcrumb;
      const index = breadcrumb.findIndex(crumb => crumb.id === item.id);

      if (isVisible && index < 0) {
        breadcrumb.push(item);
      }

      if (!isVisible && index > -1) {
        breadcrumb.splice(index, 1);
      }

      return { breadcrumb };
    });
  }

  render() {
    const sceneList = this.props.scenes.map(scene =>
      ({ id: scene.id, name: scene.name, selected: scene.selected }),
    );

    const scene = this.props.scenes.find(scene => scene.selected === true);

    return (
      <div className="scenes">
        <Breadcrumb text={this.state.breadcrumb} />

        <div className="scenes__header">
          <Navigation
            items={this.props.scenes}
            selected={scene.id}
            title="Scenes"
            onSelect={this.handleSceneSelect}
            onAdd={this.handleSceneAdd}
            onScroll={this.handleBreadcrumbUpdate}
          />
        </div>

        {!scene &&
        <p>Select a scene from the navigation menu above</p>
        }

        {scene &&
        <Scene
          id={scene.id}
          name={scene.name}
          sceneList={this.props.scenes}
          selected={scene.selected}
          consequences={scene.consequences}
          stats={this.props.stats}
          breadcrumb={this.state.breadcrumb}
          onUpdate={this.handleSceneUpdate}
          onDelete={this.handleSceneDelete}
          onNavigationUpdate={this.handleBreadcrumbUpdate}
        />
        }
      </div>
    );
  }
}

Scenes.propTypes = {
  scenes: PropTypes.arrayOf(PropTypes.shape(sceneTypes)).isRequired,

};

export default Scenes;
