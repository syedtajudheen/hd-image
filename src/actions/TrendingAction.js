import types from "../constants/actionTypes";
import unsplash from "../unSplash";
import { toJson } from "unsplash-js/native";

const FETCHING_REQUEST = () => {
  return {
    type: types.FETCHING_REQUEST,
    isLoading: true,
    isFetched: false
  };
};
const FETCHING_SUCCESS = (data, page, photos) => {
  // console.log('page, photos',page, photos)
  return {
    type: types.FETCHING_SUCCESS,
    payload: data,
    page: page,
    photos: photos,
    isLoading: false,
    isFetched: true
  };
};
const FETCHING_FAILED = () => {
  return {
    type: types.FETCHING_FAILED,
    isLoading: true,
    isFetched: false
  };
};

export const FETCH_TRENDING_PHOTOS = (page, fav) => {
  if (fav == null) {
    fav = [];
  }
  let photos=5;
  return dispatch => {
    dispatch(FETCHING_REQUEST());
    fetchrequest(dispatch, page, photos, fav);
  };
};

fetchrequest = (dispatch, page, photos, fav) => {
  unsplash.photos.listPhotos(page, photos, "Trending")
    .then(toJson)
    .then(json => {
      let favArr = [];
      fav.map(i => favArr.push(i.id));
      let finalJson = json.map(i => {
        if (favArr.indexOf(i.id) !== -1) {
          i["favIcon"] = true;
        } else {
          i["favIcon"] = false;
        }
        return i;
      });
      dispatch(FETCHING_SUCCESS(finalJson, page, photos));
    })
    .catch(err => {
      // console.log("fetch failed", err);
      dispatch(FETCHING_FAILED());
    });
};