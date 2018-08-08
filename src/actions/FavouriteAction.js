import {AsyncStorage} from 'react-native';
import types from '../constants/actionTypes'

export const favouriteItem=(item)=>{
    console.log('favAction', item)
   
    return {
        type: types.FAVOURITE_ITEM,
        payload: item
    }
}