/*
    The saga works like a middleware inside the node (express)
    and is responsable to intercept the actions inside the redux;
    The functionability that this tool present is to invoce side efects
    during an action call (it can be asynchronous, can do api calls, database or local storage queries, ...)

    This file is responsable to save all the sagas that belongs to the cart
*/
// call - Method responsable to enable the call to asynchronous requests
// put - Method responsable to call redux actions
// all - Method to register multiple listeners
// takeLatest - Strategy to listen for the actions calls; If the user clicks more than one time,
// it will be only taken the last return from the call
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatPrice } from '../../../util/format';
import api from '../../../services/api';
import history from '../../../services/history';

import { addToCartSuccess, updateAmountSuccess } from './actions';

// The * is the "generator" function from the js
// It can be compared with the async of the async/await for promises
// The generator is more potent as the the normal async/await
// It will be basically a extra step between the action call and the reducer itself
function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('The stock is not sufficient!');
    // console.tron.warn("Error - The stock isn't sufficient");
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    // The yield works like the await for asynchronous requests
    // The paramethers for the call function is the method to be called followed from the method paramethers
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    // This way the redirect will be only done when the product was already added inside the cart
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) {
    return;
  }
  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('The stock is not sufficient!');
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}
// The listeners to intercept the actions
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
