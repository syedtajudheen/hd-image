import {AsyncStorage} from 'react-native'
import types from "../constants/actionTypes";

export default (FavouriteReducer = (state = [], action) => {
  switch (action.type) {
    case types.FAVOURITE_ITEM:
    console.log('favReducer',[...state, ...action.payload])
    AsyncStorage.setItem('favourites',JSON.stringify([...state, ...action.payload]));
      return [...state, ...action.payload]
      break;
    default:
    return state
      break;
  }
});
