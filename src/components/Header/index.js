import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';
// The property accessed here is the one that was defined underneath with the call to the
// connect function
function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My Cart</strong>
          <span>{cartSize} items</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

// When connect is used, everytime that the state change, the changes will be visible for
// the components that are connected with the redux state
// As that sayed, when a change is detected, react will rerender the component to reflect the changes for the user
export default connect((state) => ({
  // Here the state.cart is the reducer itself that is been accessed
  cartSize: state.cart.length,
}))(Header);
