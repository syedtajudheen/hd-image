import React, { Component } from "react";
import { View, Text,FlatList,ActivityIndicator, StyleSheet } from "react-native";
import {connect ,MapStateToProps} from 'react-redux';
import unsplash from '../unSplash'
import ImageCardItem from "../components/ImageCardItem";
import { toJson } from "unsplash-js/native";

const mapStateToProps = state => {
  return {
    Favourites: state.FavouriteReducer
  };
};

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillReceiveProps = nextprops => {
    this.setState({
      data: [...nextprops.Favourites]
    });
  };

  renderItem = item => {
    return <ImageCardItem item={item} nav={this.props.navigation} />;
  };

  render() {
    return (
      <View style={{flex:1, justifyContent: "center"}}>
        {this.state.data.length === 0 ? (
          <Text style={styles.noFav}>No Favourites found</Text>
        ) : (
          <FlatList
            extraData={this.state}
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={() => <View style={{ margin: 3 }} />}
            keyExtractor={item => item.id}
            ListFooterComponent={this.footerLoader}
            initialNumToRender={8}
            maxToRenderPerBatch={2}
            removeClippedSubviews={true}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  noFav: { 
    fontSize: 18, 
    fontWeight: "bold", 
    alignSelf: "center" 
  }
});
export default connect(mapStateToProps, null)(Favourite);
