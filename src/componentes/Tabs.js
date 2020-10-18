import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component {
    static propTypes = {
      children: PropTypes.instanceOf(Array).isRequired,
    }
  
    constructor(props) {
      super(props);
  
      this.state = {
        tabActiva: this.props.children[0].props.label,
      };
    }
  
    onClickTabItem = (tab) => {
      this.setState({ tabActiva: tab });
    }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        tabActiva,
      }
    } = this;

    return (
        <div id="menu-superior">
      <div className="tabla">
        <ul id="lista-horizontal">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                tabActiva={tabActiva}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ul>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== tabActiva) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
      </div>
    );
  }
}

export default Tabs;

  