import React from 'react';

class Narration extends React.Component {
  constructor() {
    super();
    this.handleUpdateText = this.handleUpdateText.bind(this);
  }

  handleUpdateText(event) {
    const textArray = event.target.value.split('\n\n');

    this.props.onChange(textArray);
  }

  render() {
    const text = this.props.text.join('\n\n');

    return (
      <div className="narration">
        <h3 className="narration__title">Text</h3>
        <textarea
          placeholder="Narration text for this consequence"
          className="narration__textarea"
          name="text"
          value={text}
          onChange={this.handleUpdateText}
        />
      </div>
    );
  }
}

export default Narration;
