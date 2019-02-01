import './styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar';
import ScrollToTop from './components/ScrollTop';
// import Home from './pages/Home';
import Clientes from './pages/Clientes';

render(
  <Router>
    <ScrollToTop>
      <Topbar />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={Clientes} />
        <Route exact path="/clientes" component={Clientes} />
      </Switch>
    </ScrollToTop>
  </Router>,
  document.getElementById('root'),
);
