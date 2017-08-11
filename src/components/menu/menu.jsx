import React from 'react';
import PropTypes from 'prop-types';

import './menu.scss';

class Menu extends React.Component {
  render() {
    const menuItems = this.props.children.map(child =>
      (<div className="menu__item">{child}</div>)
    );

    return (
      <div className="menu">
        {menuItems}
      </div>
    );
  }
}


export default Menu;
