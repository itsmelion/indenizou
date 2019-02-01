import React, { Component } from 'react';
import axios from 'axios';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TabWrapper extends Component {
  state = { value: false, data: null };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/clients?by=status`)
      .then(({ data }) => this.setState(({ data })))
      .catch(e => new Error(e));
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { pipeline } = this.props;

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
          {pipeline.map(status => <Tab label={status} value={status} />)}
        </Tabs>

        {value === 'Item One' && <ClientList />}
        {value === 'Item Two' && <div>Item Two</div>}
        {value === 'Item Three' && <div>Item Three</div>}
        {value === 'Item Four' && <div>Item Four</div>}
        {value === 'Item Five' && <div>Item Five</div>}
      </div>
    );
  }
}

export default TabWrapper;
