import React from 'react';

import './tab-container.scss';

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.id + '-tab-0',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ active: event.target.id });
  }

  render() {
    const tabTitles = this.props.children.map((child, index) => {
      const id = `${this.props.id}-tab-${index}`;

      return (
        <li className={'tab-title ' + (this.state.active === id ? 'tab-title__active' : '')}>
          <label
            htmlFor={id}
            className="tab-title__label"
          >
            {child.type.name}
          </label>
        </li>
      );
    }
    );

    const tabElements = this.props.children.map((child, index) =>
      (
        <li className="tab">
          <input
            type="radio"
            id={this.props.id + '-tab-' + index}
            onChange={this.handleChange}
            className="tab__radio"
            checked={this.state.active === this.props.id + '-tab-' + index}
          />
          <div className="tab__content">
            {child}
          </div>
        </li>
      )
    );

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

export default TabContainer;
