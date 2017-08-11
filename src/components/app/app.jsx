import React from 'react';
import './app.scss';

import Settings from '../settings/settings';
import Scenes from '../scenes/scenes';
import Menu from '../menu/menu';
import Upload from '../upload/upload';
import Save from '../save/save';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      settings: {
        title: null,
        stats: [],
      },
      scenes: [],
    };

    this.handleUpload = this.handleUpload.bind(this);

    this.handleSceneUpdate = this.handleSceneUpdate.bind(this);
    this.handleSettingsUpdate = this.handleSettingsUpdate.bind(this);
  }

  componentWillMount() {
    if (!window.localStorage || !window.localStorage.Alkinoos) {
      return;
    }

    this.setState(JSON.parse(window.localStorage.Alkinoos));
  }

  handleUpload(json) {
    this.setState(json);
  }

  handleSettingsUpdate(settings) {
    this.setState({ settings });
  }

  handleSceneUpdate(scenes) {
    this.setState({ scenes });
  }

  render() {
    const data = encodeURIComponent(JSON.stringify(this.state));
    const json = `data:text/json;charset=utf-8,${data}`;
    const filename = `${this.state.settings.title}.json`;

    return (
      <div className="app">
        <Menu>
          <div className="menu__header">
            <h1 className="menu__title">
              Alkinoos: interactive fiction creator
            </h1>
          </div>

          <a
            className="menu__download"
            href={json}
            download={filename}
          >
            Download
          </a>

          <Upload onUpload={this.handleUpload} />
          <Save game={this.state} />
        </Menu>

        <div className="content">
          <div className="content__first-column">
            <Settings
              onUpdate={this.handleSettingsUpdate}
              stats={this.state.settings.stats}
              title={this.state.settings.title}
            />
          </div>

          <div className="content__second-column">
            <Scenes
              scenes={this.state.scenes}
              stats={this.state.settings.stats}
              onUpdate={this.handleSceneUpdate}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
