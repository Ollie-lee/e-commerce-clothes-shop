import React from 'react';
import { Link } from 'react-router-dom';
import { connect, Connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/filebase.utils';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {
  HeaderContainer,
  OptionDiv,
  OptionLink,
  OptionsContainer,
  LogoContainer,
} from './header.styles';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.scss';

function Header({ currentUser, hidden }) {
  return (
    <HeaderContainer>
      <LogoContainer to={'/'}>
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionDiv onClick={() => auth.signOut()}>Sign Out</OptionDiv>
        ) : (
          <OptionLink to="/signin">Sign In</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {!hidden && <CartDropdown />}
    </HeaderContainer>
  );
}

//function that allows us to access the states from root producer as props
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
