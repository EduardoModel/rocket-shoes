import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');
    // The price will be formated after the query of the data, to avoid excessively calls to the formatPrice function
    // This is a very good point to notice: avoid to use function calls inside the render, because some times
    // they are desnecessary or they could be done only once, to spare resources
    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  /**
   * Function responsable to add a product inside the cart
   * @param {object} product The product that need to be added to the cart
   */
  handleAddProduct = (id) => {
    // Everytime that a change inside the state need to be done, it is needed to dispatch an action
    // All actions are objetcts that have a TYPE and the content that is needed to be save inside the state

    // All components that are connected with redux recieve from the library itself the
    // function dispatch; This function is responsable to dispatch an action to the reducer
    const { addToCartRequest } = this.props;

    // Notice that every time that a dispatch is called inside the application
    // all the reducers are triggered
    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { productAmount } = this.props;
    return (
      <>
        <ProductList>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>

              <button
                type="button"
                onClick={() => this.handleAddProduct(product.id)}
              >
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" />{' '}
                  {productAmount[product.id] ?? 0}
                </div>

                <span>Add to cart</span>
              </button>
            </li>
          ))}
        </ProductList>
      </>
    );
  }
}

// Make the process to map the state to the props for the component
// Best place to make some data manipulation/calculation from the state is inside the "mapStateToProps"
const mapStateToProps = (state) => ({
  productAmount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

// This function converts the separated actions from redux into props for the component
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

// This notation is because the connect function returns another function
// And for the returned function is given the Home component as argument
export default connect(mapStateToProps, mapDispatchToProps)(Home);
