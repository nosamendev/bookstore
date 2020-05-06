import React, { useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { connect } from 'react-redux';
import { closeFindBookDropdown } from '../store/actions/findBookDropdown';
import './Layout.css';

const Layout = (props) => {
  const wrapperRef = useCallback((node) => {
    if (node) {
      node.addEventListener('click', closeDropdowns);
    }
  });

  const closeDropdowns = (e) => {
    if (!e.target.classList.contains('find-results')) {
      props.closeFindBookDropdown();
    }
  };

  return (
    <React.Fragment>
      <BrowserRouter>
        <div id="wrapper" ref={wrapperRef}>
          <Header />
          <main>{props.children}</main>
          <Footer />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default connect(null, { closeFindBookDropdown })(Layout);
