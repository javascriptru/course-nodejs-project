import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import store from './store';
import Application from './components/Application';
import Home from './components/Home';
import Login from './components/Login';
import OAuthCallback from './components/OAuthCallback';
import Register from './components/Register';
import Confirm from './components/Confirm';
import Category from './components/Category';
import Search from './components/Search';
import Product from './components/Product/Product';
import Checkout from './components/Checkout';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Application>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/oauth/:provider" component={OAuthCallback} />
        <Route path="/register" component={Register} />
        <Route path="/confirm/:verificationToken" component={Confirm} />
        <Route path="/category/:category" component={Category} />
        <Route path="/search" component={Search} />
        <Route path="/product/:id" component={Product} />
        <Route path="/checkout/:id" component={Checkout} />
      </Application>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
