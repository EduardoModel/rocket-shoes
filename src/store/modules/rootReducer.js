// As the application grows, will be needed more and more reducers to store another data
// Every reducer is basically responsable to store one information
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
});
