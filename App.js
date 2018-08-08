/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { Provider, } from 'react-redux';
import { toJson } from 'unsplash-js/native';
import StackNav from './src/navigators/Navigation';
import store from './src/store';
import types from './src/constants/actionTypes';
import {FETCH_TRENDING_PHOTOS} from './src/actions/TrendingAction'
import {favouriteItem} from './src/actions/FavouriteAction';
import unsplash from './src/unSplash';

type Props = {};
export default class App extends Component<Props> {
  componentWillMount=()=>{
    store.dispatch( FETCH_TRENDING_PHOTOS(1));
    
    AsyncStorage.getItem('favourites')
    .then((data)=> {
      console.log('async',JSON.parse(data))
      store.dispatch(favouriteItem(JSON.parse(data)))
    })
  }
  render() {
    return (
      <Provider store={store}>
        <StackNav/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
