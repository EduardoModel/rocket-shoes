// Library that allows the state manipulation just like a mutable element
import produce from 'immer';

/*
  The reducer is the only point of truth inside the code and because of this fact
  all the state verification envolving the state elements will be done inside the
  reducer (because it is the element responsable for the application data)
*/

// Per default all the reducers recieve the paramether state and the action
export default function cart(state = [], action) {
  // To avoid that the other reducers change the state, it is added the switch here
  // In this case, this reducer will only change the state when the action is ADD_TO_CART
  // And if he hears any other action that isn't specified inside the switch, it just returns the state without changes
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, (draft) => {
        const { product } = action;
        draft.push(product);
      });

    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);
        if (productIndex >= 0) {
          // Remove the item, if found
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      // Ignore amounts that are smaller or equal than 0
      // if (action.amount <= 0) {
      //   return state;
      // }
      return produce(state, (draft) => {
        // For this case, the redux take care of all the validation needed, to have the correct data inside the state
        const productIndex = draft.findIndex((p) => p.id === action.id);
        if (productIndex >= 0) {
          // Update the amount for the product
          draft[productIndex].amount = Number(action.amount);
          /*
            // Corrected from the if statement more above

            // Check if the amount isn't bigger than zero
            if (!(draft[productIndex].amount > 0)) {
              draft.splice(productIndex, 1);
            }
          */
        }
      });
    }
    default:
      return state;
  }
}

/*
  The lifecycle of the reducer is basically
  1° - A component dispatch an action to the reducer
  2° - The responsable reducer to handle this action will deal with it and change the state (or not)
  3° - After the process is done, the reducer will inform all connected components that are listening to
  this reducer in specific, that the stage has change
  4° - The components are reloaded to show the new status of the state inside of themselfs
*/
