import React from 'react';
import { Link } from 'react-router-dom';
import { connect, Connect } from 'react-redux';

import { auth } from '../../firebase/filebase.utils';
import CartIcon from '../cart-icon/CartIcon';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.scss';

function Header({ currentUser }) {
  return (
    <div className="header">
      <Link className="logo__container" to={'/'}>
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            Sign Out
          </div>
        ) : (
          <Link className="option" to="/signin">
            Sign In
          </Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
}

//function that allows us to access the states from root producer as props
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
