import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TabWrapper extends Component {
  state = { value: false };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs
          component="nav"
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="status" value="Item One" />
          <Tab label="Item" value="Item Two" />
          <Tab label="Item" value="Item Three" />
          <Tab label="Item" value="Item Four" />
          <Tab label="Item" value="Item Five" />
        </Tabs>

        {value === 'Item One' && <div>Item One</div>}
        {value === 'Item Two' && <div>Item Two</div>}
        {value === 'Item Three' && <div>Item Three</div>}
        {value === 'Item Four' && <div>Item Four</div>}
        {value === 'Item Five' && <div>Item Five</div>}
      </div>
    );
  }
}

export default TabWrapper;
