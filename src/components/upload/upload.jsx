import React from 'react';

class Upload extends React.Component {
  constructor() {
    super();
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const response = event.target.result;
      const json = JSON.parse(response);

      this.props.onUpload(json);
    };

    reader.readAsText(file);
  }

  render() {
    return (
      <div className="upload">
        Upload a json file
        <input type="file" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

export default Upload;
