import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import Layout from './Layout/Layout';
import Cart from './Layout/Cart/Cart';
import About from './Layout/About/About';
import Auth from './Layout/Auth/Auth';
import Books from './Layout/Books/Books';
import MyOrders from './Layout/MyOrders/MyOrders';
import Manage from './Layout/Manage/Manage';
import Logout from './Layout/Auth/Logout';
import BookDetails from './Layout/Books/BookDetails/BookDetails';
import EditBook from './Layout/EditBook/EditBook';
import AddBook from './Layout/AddBook/AddBook';
import Delete from './Layout/Delete/Delete';

const App = (props) => {
  useEffect(() => {
    props.authCheckState();
  }, []);

  let routes = (
    //not authenticated:
    <Switch>
      <Route path="/cart" exact component={Cart} />
      <Route path="/" exact component={Books} />
      <Route path="/about" exact component={About} />
      <Route path="/books/:id" exact component={BookDetails} />
      <Route path="/auth" exact component={Auth} />

      <Route render={() => <h1>(404) This file cannot be found</h1>} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/cart" exact component={Cart} />
        <Route path="/" exact component={Books} />
        <Route path="/about" exact component={About} />
        <Route path="/books/:id" exact component={BookDetails} />
        <Route path="/manage" exact component={Manage} />
        <Route path="/myorders" exact component={MyOrders} />
        <Route path="/edit/:id" exact component={EditBook} />
        <Route path="/add" exact component={AddBook} />

        <Route path="delete" exact component={Delete} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" exact component={Auth} />

        <Route render={() => <h1>(404) This file cannot be found</h1>} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};

export default connect(mapStateToProps, { authCheckState })(App);
