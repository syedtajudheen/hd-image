import React, { Component } from "react";
import { View, Text,FlatList } from "react-native";
import {connect ,MapStateToProps} from 'react-redux';
import unsplash from '../unSplash'
import ImageCardItem from "../components/ImageCardItem";
import { toJson } from "unsplash-js/native";
const mapStateToProps=(state)=>{
// console.log('favvvvvvvvvvv',state);
return{
  Favourites: state.FavouriteReducer
}
}
class Favourite extends Component {
  componentWillReceiveProps=()=>{

  }
  renderItem =(item) => {
    console.log('item,',item)
    return <ImageCardItem item={item} nav={this.props.navigation} />;
  };

  render() {
    return (
      <View>
         <FlatList
            data={this.props.Favourites}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={() => <View style={{ margin: 3 }} />}
            keyExtractor={item => item.id}
            ListFooterComponent={this.footerLoader}
            initialNumToRender={8}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
          />
      </View>
    );
  }
}
export default connect(mapStateToProps, null)(Favourite);
