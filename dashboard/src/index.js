import './styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Topbar from './components/Topbar/Topbar';
import ScrollToTop from './components/ScrollTop';
import { Home } from './pages/routes';
import clientes from './pages/clientes';

render(
  <BrowserRouter>
    <ScrollToTop>
      <Topbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/clientes" component={clientes} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
