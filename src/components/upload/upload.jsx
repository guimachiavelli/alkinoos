import React from 'react';
import PropTypes from 'prop-types';

import './upload.scss';

class Upload extends React.Component {
  constructor() {
    super();
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      const response = loadEvent.target.result;
      const json = JSON.parse(response);

      this.props.onUpload(json);
    };

    reader.readAsText(file);
  }

  render() {
    return (
      <div className="upload">
        <label
          htmlFor="upload-input"
          className="upload__label"
        >
          <span className="upload__label-text">Upload file</span>
          <input
            type="file"
            className="upload__input"
            id="upload-input"
            onChange={this.handleFileUpload}
          />
        </label>
      </div>
    );
  }
}

Upload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default Upload;
