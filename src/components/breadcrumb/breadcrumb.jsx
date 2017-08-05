import React from 'react';

import './breadcrumb.scss';

class Breadcrumb extends React.Component {
  constructor() {
    super();
  }

  render() {
    let text = this.props.text.map(t => t.name);
    text = text.join(' > ');
    return (
      <div className="breadcrumb">
        {text}
      </div>
    );
  }
}

export default Breadcrumb;