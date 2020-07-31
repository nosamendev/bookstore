import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { connect } from 'react-redux';
import { closeFindBookDropdown } from '../store/actions/findBookDropdown';
import { cartContents } from '../store/actions/cartStatus';
import './Layout.css';

export const UnconnectedLayout = (props) => {
  const wrapperRef = React.useCallback((node) => {
    if (node) {
      node.addEventListener('click', closeDropdowns);
    }
  });

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.cart);
    props.cartContents(cart.length);
  });

  const closeDropdowns = (e) => {
    if (!e.target.classList.contains('find-results')) {
      props.closeFindBookDropdown();
    }
  };

  if (!localStorage.cart) {
    localStorage.cart = JSON.stringify([]);
  }

  return (
    <React.Fragment>
      <BrowserRouter>
        <div id="wrapper" ref={wrapperRef} data-test="component-wrapper">
          <Header />
          <main>{props.children}</main>
          <Footer />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default connect(null, { closeFindBookDropdown, cartContents })(
  UnconnectedLayout
);
