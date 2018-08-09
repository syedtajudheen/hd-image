import {AsyncStorage} from 'react-native'
import types from "../constants/actionTypes";

export default FavouriteReducer = (state = [], action) => {
  switch (action.type) {
    case types.FAVOURITE_ITEM:
    AsyncStorage.setItem('favourites',JSON.stringify([...state, ...action.payload]));
      return [...state, ...action.payload]
      break;
      case types.REMOVE_FAVOURITE_ITEM:
      AsyncStorage.setItem('favourites',JSON.stringify([ ...action.payload]));
      return [ ...action.payload]
      break;
    default:
    return state
      break;
  }
}
