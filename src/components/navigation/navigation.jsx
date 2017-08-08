import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import './navigation.scss';

import NavigationItem from '../navigation-item/navigation-item';

class Navigation extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleScroll = throttle(this.handleScroll, 250).bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleAdd() {
    this.props.onAdd();
  }

  handleSelect(id) {
    this.props.onSelect(id);
  }

  handleScroll() {
    const clientRect = this.el.getBoundingClientRect();
    const selected = this.props.items.find(item => item.selected);
    const isVisible = clientRect.top + clientRect.height < 0;

    this.props.onScroll(selected, isVisible);
  }

  render() {
    const items = this.props.items.map(item =>
      (
        <NavigationItem
          key={item.id}
          id={item.id}
          name={item.name}
          selected={item.selected}
          onSelect={this.handleSelect}
        />
    ));

    return (
      <div className="navigation" ref={(el) => { this.el = el; }}>
        <div className="navigation__header">
          {this.props.title &&
          <h2 className="navigation__title">{this.props.title}</h2>
          }
        </div>
        <ol className="navigation__list">
          { items }
          <li>
            <button
              className="navigation__button"
              onClick={this.handleAdd}
            >
              +
            </button>
          </li>
        </ol>
      </div>
    );
  }
}

Navigation.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  title: '',
};

export default Navigation;
