import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TabWrapper extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>

        {value === 0 && <div>Item One</div>}
        {value === 1 && <div>Item Two</div>}
        {value === 2 && <div>Item Three</div>}
        {value === 3 && <div>Item Four</div>}
        {value === 4 && <div>Item Five</div>}
        {value === 5 && <div>Item Six</div>}
        {value === 6 && <div>Item Seven</div>}
      </div>
    );
  }
}

TabWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default TabWrapper;
