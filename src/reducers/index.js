import {combineReducers} from 'redux'
import TRENDING_PHOTOS from './TrendingReducer'
import FavouriteReducer from './FavouriteReducer'
export const combineReducer =combineReducers({
    TRENDING_PHOTOS,
    FavouriteReducer
})