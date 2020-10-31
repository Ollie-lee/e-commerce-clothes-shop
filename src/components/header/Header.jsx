import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/filebase.utils";

export default function Header({ currentUser }) {
  return (
    <div className='header'>
      <Link className='logo__container' to={"/"}>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/contact'>
          CONTACT
        </Link>
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            Sign Out
          </div>
        ) : (
          <Link className='option' to='/signin'>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
