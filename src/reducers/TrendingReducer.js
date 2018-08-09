import types from "../constants/actionTypes";
import FETCH_TRENDING_PHOTOS from "../actions/TrendingAction";

export default TRENDING_PHOTOS = (state = [], action) => {
  // console.log("reduce", action);
  switch (action.type) {
    case types.FETCHING_SUCCESS:
      return {
       data: action.payload,
       page: action.page,
       photos: action.photos,
       isFetched: true,
      }
    case types.FETCHING_REQUEST:
      return {
        data: [],
        isLoading: true,
        isFetched: false,
      };
    case types.FETCHING_FAILED:
      return {
        data:[],
        isLoading: true,
        isFetched: false
      };
    default:
      return state;
  }
}
