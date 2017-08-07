import React from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

import './breadcrumb.scss';

class Breadcrumb extends React.Component {
  constructor() {
    super();
  }

  render() {
    let text = this.props.text.map(t => t.name);

    if (text.length < 1) {
      return null;
    }

    text = text.join(' > ');

    return (
      <div className="breadcrumb">
        <p className="breadcrumb__text">{text}</p>
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  text: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
};

const breadcrumbTypes = clone(Breadcrumb.propTypes);

export { breadcrumbTypes };
export default Breadcrumb;
