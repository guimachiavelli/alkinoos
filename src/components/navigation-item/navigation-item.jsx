import React from 'react';
import PropTypes from 'prop-types';

import './navigation-item.scss';

class NavigationItem extends React.Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    this.props.onSelect(this.props.id);
  }

  render() {
    const selected = this.props.selected;
    let classes = 'navigation__button';
    classes += selected ? ' navigation__button--selected' : '';

    return (
      <li className="navigation__item">
        <button
          className={classes}
          onClick={this.handleSelect}
        >
          {this.props.name}
        </button>
      </li>
    );
  }
}

NavigationItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

NavigationItem.defaultProps = {
  selected: false,
};

export default NavigationItem;
