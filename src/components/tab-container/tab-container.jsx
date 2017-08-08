import React from 'react';
import PropTypes from 'prop-types';

import './tab-container.scss';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: `${props.id}-tab-0`,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ active: event.target.id });
  }

  render() {
    const tabTitles = this.props.children.map((child, index) => {
      const id = `${this.props.id}-tab-${index}`;
      let className = 'tab-title';
      className += (this.state.active === id ? ' tab-title__active' : '');

      return (
        <li
          key={id}
          className={className}
        >
          <label
            htmlFor={id}
            className="tab-title__label"
          >
            {child.type.name}
          </label>
        </li>
      );
    },
    );

    const tabElements = this.props.children.map((child, index) => {
      const id = `${this.props.id}-tab-${index}`;
      return (
        <li className="tab" key={id}>
          <input
            type="radio"
            id={id}
            onChange={this.handleChange}
            className="tab__radio"
            checked={this.state.active === id}
          />
          <div className="tab__content">
            {child}
          </div>
        </li>
      );
    });

    return (
      <div className="tabs">
        <ol className="tabs__index">
          {tabTitles}
        </ol>
        <ol className="tabs__list">
          {tabElements}
        </ol>
      </div>
    );
  }
}

TabContainer.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default TabContainer;
