// With the actions structurated this way is easier to make type changes in the future
// Avoiding to make the changes inside all the components that use that action
export function addToCartRequest(id) {
  return {
    // To identify source(module) of the action more easily, it is added the name of the module in the
    // front of the action type
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    // To identify source(module) of the action more easily, it is added the name of the module in the
    // front of the action type
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(productId) {
  return {
    type: '@cart/REMOVE',
    id: productId,
  };
}

// Everytime that the sagas will be utilized to do the requests, it is needed to devide the action into two
export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  };
}
