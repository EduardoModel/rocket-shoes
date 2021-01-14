import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  // It doesn't belong here the bussiness rule to verify if the amount is valid or not
  // The responsability is from the redux, because it is the only point of thruth
  function incrementProductAmount(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrementProductAmount(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <h1>Cart</h1>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => {
                        decrementProductAmount(product);
                      }}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => {
                        incrementProductAmount(product);
                      }}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete
                    size={20}
                    color="#7159c1"
                    onClick={() => {
                      removeFromCart(product.id);
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalize purchase</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

// This function converts the separated actions from redux into props for the component
// Making the use of the dispatch call implicit with the function call, makes the code less verbose
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

// Make the process to map the state to the props for the component
// Best place to make some data manipulation/calculation from the state is inside the "mapStateToProps"
const mapStateToProps = (state) => ({
  cart: state.cart.map((product) => ({
    ...product,
    // Here will be done the sum of the subtotal for the product, to avoid the overload of the render function
    subtotal: formatPrice(product.price * product.amount),
  })),
  // The sum of the total price from all the products inside the cart
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.amount * product.price,
      0
    )
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
