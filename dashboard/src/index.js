import './styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

// HOC
import ScrollToTop from './components/ScrollTop';
import requireAuth from './components/requireAuth';

// Pages & Components
import Topbar from './components/Topbar/Topbar';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import SignOut from './components/Auth/SignOut';
import ShowCustomer from './components/ShowCustomer/ShowCustomer';
import EditCustomer from './components/EditCustomer/EditCustomer';

// import Home from './pages/Home';
import Clientes from './pages/Clientes';

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem('token') } }, // Initial state
  applyMiddleware(reduxThunk),
);

render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <Topbar />
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <Route path="/dashboard" component={requireAuth(Clientes)} />
          <Route path="/clientes" component={requireAuth(Clientes)} />
          <Route path="/cliente/:id/edit" component={requireAuth(EditCustomer)} />
          <Route path="/cliente/:id" component={ShowCustomer} />
        </Switch>
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
