import {AsyncStorage} from 'react-native';
import types from '../constants/actionTypes'

export const favouriteItem = item => {
  return {
    type: types.FAVOURITE_ITEM,
    payload: item
  };
};

const removedFav = filteredData => {
  return {
    type: types.REMOVE_FAVOURITE_ITEM,
    payload: filteredData
  };
};

export const removeFavouriteItem = item => {
  return dispatch => {
    AsyncStorage.getItem("favourites").then(data => {
      let res = JSON.parse(data);
      var filteredData = res.filter(i => item.id !== i.id);
      //    console.log('remove',filteredData)
      dispatch(removedFav(filteredData));
    });
  };
};