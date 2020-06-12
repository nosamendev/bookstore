import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navigation.css';

const Navigation = (props) => {
  let welcome;
  if (props.isAuthenticated) {
    welcome = <div className="user-email">Welcome {localStorage.email}</div>;
  }

  const cartRef = useCallback((node) => {
    if (node) {
      node.innerHTML = '(' + props.cartItems + ')';
    }
  });

  return (
    <nav>
      {welcome}
      <ul>
        <li>
          <NavLink exact to="/">
            BOOKS
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        {props.isAuthenticated ? (
          <>
            <li>
              <NavLink exact to="/myorders">
                MY ORDERS
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/manage">
                MANAGE
              </NavLink>
            </li>
          </>
        ) : null}
        {!props.isAuthenticated ? (
          <li>
            <NavLink exact to="/auth">
              AUTH
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink exact to="/logout">
                LOGOUT
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/cart" exact className="cart">
            CART<span ref={cartRef}>(0)</span>
          </NavLink>
        </li>
        {props.isAuthenticated ? (
          <span className="user-email mobile">{localStorage.email}</span>
        ) : null}

        <div className="mobile-menu">
          <span className="menu"></span>

          <ul>
            <li>
              <NavLink exact to="/">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">ABOUT</NavLink>
            </li>
            {props.isAuthenticated ? (
              <>
                <li>
                  <NavLink exact to="/myorders">
                    MY ORDERS
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/manage">
                    MANAGE
                  </NavLink>
                </li>
              </>
            ) : null}
            {!props.isAuthenticated ? (
              <li>
                <NavLink exact to="/auth">
                  AUTH
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink exact to="/logout">
                  LOGOUT
                </NavLink>
              </li>
            )}
            <li>
              <NavLink className="cart" to="/cart">
                CART<span></span>
              </NavLink>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    email: state.authReducer.email,
    cartItems: state.cartStatusReducer.cartItems,
  };
};

export default connect(mapStateToProps, null)(Navigation);
